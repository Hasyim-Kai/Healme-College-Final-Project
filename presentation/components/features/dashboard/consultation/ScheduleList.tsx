import ScheduleCard from './ScheduleCard'
import { useRouter } from 'next/router'
import FloatBottomBtn from '../../../global/FloatBottomBtn'
import Loading from '../../../global/Loading'
import { useEffect } from 'react'
import { selectScheduleState, getAllSchedule, getCounselorSchedule, getUserSchedule } from '../../../../../app/ScheduleSlice'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { selectUserState } from '../../../../../app/UserSlice'
import Empty from '../../../global/Empty'

type Props = { isCounselor?: boolean, isAll?: boolean }

export default function ScheduleList({ isCounselor = false, isAll = true }: Props) {
  const router = useRouter()
  const goToAddForm = () => { router.push('/counselor/counseling/form/add') }
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectUserState);
  const scheduleState = useAppSelector(selectScheduleState);
  useEffect(() => {
    if (isCounselor) { dispatch(getCounselorSchedule(userInfo.name)) }
    else if (isAll) { dispatch(getAllSchedule()) }
    else { dispatch(getUserSchedule(userInfo.name)) }
  }, [])

  return <div className='mx-auto lg:max-w-5xl mb-16'>
    <section className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-10'>
      {scheduleState.isLoading ? <Loading additionalStyle='lg:col-span-2' />
        : scheduleState.schedules.length < 1 ? <Empty additionalstyle='lg:col-span-2' text='There are no Schedule for Today' />
          : scheduleState.schedules.map((item, index) => <ScheduleCard item={item} key={index} isCounselor={isCounselor} />)}
    </section>

    {isCounselor && <FloatBottomBtn text='Create' clickFunc={goToAddForm}>
      <b>+</b>
    </FloatBottomBtn>}
  </div>
}