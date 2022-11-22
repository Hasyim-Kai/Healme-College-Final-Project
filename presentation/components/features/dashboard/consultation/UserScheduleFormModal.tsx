import { useRouter } from "next/router";
import { useState } from "react";
import { toggleModal } from "../../../../../app/GlobalSlice";
import { applySchedule, selectScheduleState } from "../../../../../app/ScheduleSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import { selectUserState } from "../../../../../app/UserSlice";
import ModalLayout from "../../../../layout/ModalLayout";
import { simpleInput } from "../../../../styles/TailwindStyle";
import VioletButton from "../../../global/VioletButton";

type Props = { isEdit?: boolean }

export default function UserScheduleFormModal({ isEdit = false }: Props) {
  const router = useRouter()
  const goToMySchedule = () => { router.push('/user/counseling') }

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectUserState);
  const scheduleState = useAppSelector(selectScheduleState);
  const [summary, setSummary] = useState<string>(`...`)
  const handleSummary = (e: any) => { setSummary(e.target.value) }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    await dispatch(applySchedule({ id: scheduleState.scheduleDetail.id, patient_name: userInfo.name, summary }))
    dispatch(toggleModal())
    goToMySchedule()
  }

  return <ModalLayout>
    <form onSubmit={handleSubmit} className='text-gray-600'>
      <div>
        <label htmlFor="Summary">Please Write your Summary beofre apply</label><br />
        <textarea className={simpleInput} name="Summary" id="Summary" cols={70} rows={10} placeholder="Write some Summary .." value={summary} onChange={handleSummary} required></textarea>
      </div>

      <VioletButton text={'Apply'} isCenter={true} />
    </form>
  </ModalLayout>
}