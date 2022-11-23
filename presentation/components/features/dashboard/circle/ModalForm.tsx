import { useRouter } from "next/router";
import { useState } from "react";
import { createCircle, editCircle, selectCircleState, delCircle, getMyCircle } from "../../../../../app/CircleSlice";
import { toggleModal } from "../../../../../app/GlobalSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import { selectUserState } from "../../../../../app/UserSlice";
import ModalLayout from "../../../../layout/ModalLayout";
import { simpleInput } from "../../../../styles/TailwindStyle";
import Loading from "../../../global/Loading";
import VioletButton from "../../../global/VioletButton";

type Props = { isEdit?: boolean }

export default function ModalForm({ isEdit = false }: Props) {
  const router = useRouter()
  const goToCircles = () => { router.push('/user/circle') }
  const goToMyCircles = () => { router.push('/user/circle/my-circle') }
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectUserState);
  const circleState = useAppSelector(selectCircleState);

  const [name, setName] = useState<string>(isEdit ? circleState.circlesDetail.name : ``)
  const [gmeetLink, setGmeetLink] = useState<string>(isEdit ? circleState.circlesDetail.gmeetLink : ``)
  const [capacity, setCapacity] = useState<number>(isEdit ? circleState.circlesDetail.capacity : 0)
  const [desc, setDesc] = useState<string>(isEdit ? circleState.circlesDetail.desc : ``)
  const handleName = (e: any) => { setName(e.target.value) }
  const handleGmeetLink = (e: any) => { setGmeetLink(e.target.value) }
  const handleCapacity = (e: any) => { setCapacity(Number(e.target.value)) }
  const handleDesc = (e: any) => { setDesc(e.target.value) }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const type = e.nativeEvent.submitter.innerText
    if (type === `Create`) {
      await dispatch(createCircle({ name, gmeetLink, capacity, desc, owner: userInfo.email, filled: 0, members: [] }))
    } else if (type === `Update`) {
      await dispatch(editCircle({ id: circleState.circlesDetail.id, name, gmeetLink, capacity, desc }))
    } else if (type === `Delete`) {
      await dispatch(delCircle(circleState.circlesDetail.id))
    }
    await dispatch(getMyCircle(userInfo.email))
    dispatch(toggleModal())
    goToMyCircles()
  }

  return <ModalLayout>
    {circleState.isLoading ? <Loading additionalStyle="p-36" />
      : <form onSubmit={handleSubmit} className='text-gray-600'>
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
          <textarea className={simpleInput} name="desc" id="desc" cols={70} rows={10} placeholder="Write down circle's description .." value={desc} onChange={handleDesc} required></textarea>
        </div>

        <div className="flex gap-5 justify-center">
          <VioletButton text={isEdit ? 'Update' : 'Create'} />
          {isEdit && <VioletButton text={'Delete'} />}
        </div>
      </form>}
  </ModalLayout>
}