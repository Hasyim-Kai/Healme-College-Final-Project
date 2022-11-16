import ScheduleCard from './ScheduleCard'
import { useRouter } from 'next/router'
import FloatBottomBtn from '../../../global/FloatBottomBtn'
import Loading from '../../../global/Loading'
import { useEffect } from 'react'
import { selectScheduleState, getMySchedule, getAllSchedule } from '../../../../../app/ScheduleSlice'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { selectUserState } from '../../../../../app/UserSlice'

type Props = { isCounselor?: boolean, isAll?: boolean }

export default function ScheduleList({ isCounselor = false, isAll = true }: Props) {
  const router = useRouter()
  const goToAddForm = () => { router.push('/counselor/counseling/form/add') }
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectUserState);
  const scheduleState = useAppSelector(selectScheduleState);
  useEffect(() => { isAll ? dispatch(getAllSchedule()) : dispatch(getMySchedule(userInfo.email)) }, [])

  return <div className='mx-auto lg:max-w-5xl mb-16'>
    <section className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-10'>
      {scheduleState.isLoading ? <Loading additionalStyle='col-span-3' />
        : scheduleState.schedules.map((item, index) => <ScheduleCard item={item} key={index} />)}
    </section>

    {isCounselor && <FloatBottomBtn text='Create' clickFunc={goToAddForm}>
      <b>+</b>
    </FloatBottomBtn>}
  </div>
}