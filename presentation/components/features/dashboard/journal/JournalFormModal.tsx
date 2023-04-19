import { useRouter } from "next/router";
import { useEffect, useReducer, useRef, useState } from "react";
import { toggleModal } from "../../../../../app/GlobalSlice";
import { createJournals, editJournals, getJournals, selectJournalState } from "../../../../../app/JournalSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import { selectUserState } from "../../../../../app/UserSlice";
import ModalLayout from "../../../../layout/ModalLayout";
import { pinkGradientText, simpleInput } from "../../../../styles/TailwindStyle";
import VioletButton from "../../../global/VioletButton";

type Props = { isEdit?: boolean }

export default function JournalFormModal({ isEdit = false }: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectUserState);
  const journalState = useAppSelector(selectJournalState);

  const [title, setTitle] = useState<string>(isEdit ? journalState.journalDetail.title : '')
  const [text, setText] = useState<string>(isEdit ? journalState.journalDetail.text : '')
  const [mood, setMood] = useState<number>(isEdit ? Number(journalState.journalDetail.mood) : 5)
  const goToJournals = () => { router.push('/user/journal') }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const type = e.nativeEvent.submitter.innerText
    if (type === `Create`) {
      await dispatch(createJournals({ title, text, mood, user_email: userInfo.email }))
      dispatch(getJournals(userInfo.email))
    } else if (type === `Update`) {
      await dispatch(editJournals({ id: journalState.journalDetail.id, title, text, mood }))
      goToJournals()
    }
    dispatch(toggleModal())
  }

  return <ModalLayout>
    <form onSubmit={handleSubmit} className='text-gray-600'>
      <div>
        <label htmlFor="title">Title</label><br />
        <input className={simpleInput} type="text" name="title" id="title" placeholder="Write your title here"
          value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="desc">Desc</label><br />
        <textarea className={simpleInput} name="desc" id="desc" cols={70} rows={10} placeholder="Write down your feelings .."
          value={text} onChange={(e) => setText(e.target.value)} required></textarea>
      </div>

      <div className="flex gap-5 items-center">
        <div className="w-full">
          <label htmlFor="minmax-range" className="">How Good is your current wellness ?</label><br />
          <input id="minmax-range" type="range" min="0" max="10" value={mood} onChange={(e) => setMood(Number(e.target.value))}
            className="mb-7 w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer" required />
        </div>
        <h1 className={`text-3xl font-medium ${pinkGradientText}`}>{mood}</h1>
      </div>

      <VioletButton text={isEdit ? 'Update' : 'Create'} isCenter={true} />
    </form>
  </ModalLayout>
}