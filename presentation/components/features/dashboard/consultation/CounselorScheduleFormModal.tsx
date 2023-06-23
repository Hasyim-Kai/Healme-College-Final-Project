import { useRouter } from "next/router";
import { useState } from "react";
import { toggleModal } from "../../../../../app/GlobalSlice";
import { addNote, applySchedule, getDetailSchedule, selectScheduleState } from "../../../../../app/ScheduleSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import { selectUserState } from "../../../../../app/UserSlice";
import ModalLayout from "../../../../layout/ModalLayout";
import { simpleInput } from "../../../../styles/TailwindStyle";
import VioletButton from "../../../global/VioletButton";

type Props = { isEdit?: boolean }

export default function CounselorScheduleFormModal({ isEdit = false }: Props) {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectUserState);
  const scheduleState = useAppSelector(selectScheduleState);
  const [summary, setSummary] = useState<string>(``)
  const handleSummary = (e: any) => { setSummary(e.target.value) }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    await dispatch(addNote({ id, note: scheduleState.scheduleDetail.note, newNote: summary }))
    dispatch(toggleModal())
    dispatch(getDetailSchedule(id));
    setSummary(``)
  }

  return <ModalLayout>
    <form onSubmit={handleSubmit} className='text-gray-600'>
      <div>
        <label htmlFor="Summary">Write a Note</label><br />
        <textarea className={simpleInput} name="Summary" id="Summary" cols={70} rows={10} placeholder="Write some Summary .."
          value={summary} onChange={handleSummary} required></textarea>
      </div>

      <VioletButton text={'Apply'} isCenter={true} />
    </form>
  </ModalLayout>
}