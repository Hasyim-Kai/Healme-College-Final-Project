import { useRouter } from "next/router";
import { useState } from "react";
import { selectCircleState } from "../../../../../app/CircleSlice";
import { selectJournalState } from "../../../../../app/JournalSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import { selectUserState } from "../../../../../app/UserSlice";
import ModalLayout from "../../../../layout/ModalLayout";
import { simpleInput } from "../../../../styles/TailwindStyle";
import VioletButton from "../../../global/VioletButton";

type Props = { isEdit?: boolean }

export default function ModalForm({ isEdit = false }: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectUserState);
  const circleState = useAppSelector(selectCircleState);

  const [name, setName] = useState<string>(`Name`)
  const [gmeetLink, setGmeetLink] = useState<string>(`#`)
  const [capacity, setCapacity] = useState<number>(1)
  const [desc, setDesc] = useState<string>(`...`)
  const handleName = (e: any) => { setName(e.target.value) }
  const handleGmeetLink = (e: any) => { setGmeetLink(e.target.value) }
  const handleCapacity = (e: any) => { setCapacity(e.target.value) }
  const handleDesc = (e: any) => { setDesc(e.target.value) }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const type = e.nativeEvent.submitter.innerText
    if (type === `Create`) {
      console.log(`Buat ya`)
      console.log({ name, gmeetLink, capacity, desc, user_email: userInfo.email })
    } else if (type === `Update`) {
      console.log({ name, gmeetLink, capacity, desc, user_email: userInfo.email })
      console.log(`Update ini ya`)
    } else if (type === `Delete`) {
      console.log({ name, gmeetLink, capacity, desc, user_email: userInfo.email })
      console.log(`Hapus`)
    }
  }

  return <ModalLayout>
    <form onSubmit={handleSubmit} className='text-gray-600'>
      <div>
        <label htmlFor="circleName">Circle Name</label><br />
        <input className={simpleInput} type="text" name="circleName" id="circleName" placeholder="Enter the Circle Name" value={name} onChange={handleName} required />
      </div>

      <div className="flex flex-wrap items-center gap-10">
        <div className="w-3/5">
          <label htmlFor="Gmeet">Gmeet Link</label><br />
          <input className={simpleInput} type="text" name="Gmeet" id="Gmeet" placeholder="Enter Gmeet Link here" value={gmeetLink} onChange={handleGmeetLink} required />
        </div>

        <div className="w-1/5">
          <label htmlFor="capacity">Capacity</label><br />
          <input className={simpleInput} type="number" name="capacity" id="capacity" placeholder="Enter Circle's capacity here" value={capacity} onChange={handleCapacity} required />
        </div>
      </div>

      <div>
        <label htmlFor="desc">Desc</label><br />
        <textarea className={simpleInput} name="desc" id="desc" cols={70} rows={10} placeholder="Write down your feelings .." value={desc} onChange={handleDesc} required></textarea>
      </div>

      <div className="flex gap-5 justify-center">
        <VioletButton text={isEdit ? 'Update' : 'Create'} />
        {isEdit && <VioletButton text={'Delete'} />}
      </div>
    </form>
  </ModalLayout>
}