import ScheduleCard from './ScheduleCard'
import { useRouter } from 'next/router'
import FloatBottomBtn from '../../../global/FloatBottomBtn'
import Loading from '../../../global/Loading'
import { useEffect, useState } from 'react'
import { selectScheduleState, getAllSchedule, getCounselorSchedule, getUserSchedule } from '../../../../../app/ScheduleSlice'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { selectUserState } from '../../../../../app/UserSlice'
import Empty from '../../../global/Empty'
import StatisticForCounselor from './StatisticForCounselor'
import { filterAppliedConsultation, filterNotAppliedConsultation, filterTodayAppliedConsultation, filterTodayConsultation } from '../../../../utils/FilterConsultation'
import { pinkGradientBg, tailwindTransition } from '../../../../styles/TailwindStyle'

type Props = { isCounselor?: boolean, isAll?: boolean }

export default function ScheduleList({ isCounselor = false, isAll = true }: Props) {
  const [isStatisticOpen, setIsStatisticOpen] = useState(false)
  const toggleStatistic = () => { setIsStatisticOpen(!isStatisticOpen) }
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

  function renderConsultation(){
    if(scheduleState.isLoading){
      return <Loading additionalStyle='lg:col-span-2' />
    } else if (scheduleState.schedules.length < 1 || (isAll && filterNotAppliedConsultation(scheduleState.schedules).length < 1)){
      return <Empty additionalstyle='lg:col-span-2' text='There are no Schedule for Today' />
    } else if (isAll){
      return filterNotAppliedConsultation(scheduleState.schedules).map((item: any, index: any) => <ScheduleCard item={item} key={index} isCounselor={isCounselor} />)
    } else {
      return scheduleState.schedules.map((item: any, index: any) => <ScheduleCard item={item} key={index} isCounselor={isCounselor} />)
    }
  }

  return <div className='mx-auto lg:max-w-5xl mb-16'>
    {/* STATISTIC */}
    {isCounselor && <>
      <div className={`${isStatisticOpen ? `lg:h-[25rem] h-[48rem] pb-10 mt-8` : `h-0 p-0`} ${tailwindTransition} overflow-hidden flex flex-wrap justify-evenly gap-5`}>
        <StatisticForCounselor title='Today Consultation Schedule Statistic'
          allConsultation={filterTodayConsultation(scheduleState.schedules).length}
          appliedConsultation={filterTodayAppliedConsultation(scheduleState.schedules).length} />
        <StatisticForCounselor title='All Consultation Schedule Statistic'
          allConsultation={scheduleState.schedules.length}
          appliedConsultation={filterAppliedConsultation(scheduleState.schedules).length} />
      </div>
      <button className={`py-3 px-5 text-lg text-white rounded-xl ${pinkGradientBg}`}
        onClick={toggleStatistic}>{isStatisticOpen ? `Close Statistic` : `Open Statistic`}</button>
    </>}

    {/* LIST */}
    <section className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-8'>
      {renderConsultation()}
      {/* {scheduleState.isLoading ? <Loading additionalStyle='lg:col-span-2' />
        : scheduleState.schedules.length < 1 ? <Empty additionalstyle='lg:col-span-2' text='There are no Schedule for Today' />
          : isAll ? 
              filterNotAppliedConsultation(scheduleState.schedules).map((item: any, index: any) => <ScheduleCard item={item} key={index} isCounselor={isCounselor} />)
            : scheduleState.schedules.map((item: any, index: any) => <ScheduleCard item={item} key={index} isCounselor={isCounselor} />)} */}
    </section>

    {isCounselor && <FloatBottomBtn text='Create' clickFunc={goToAddForm}>
      <b>+</b>
    </FloatBottomBtn>}
  </div>
}