import type { NextPage } from 'next'
import DefaultLayout from '../../../presentation/layout/DefaultLayout'
import ScheduleList from '../../../presentation/components/features/dashboard/consultation/ScheduleList'
import CircleBgAnimation from '../../../presentation/components/global/CircleBgAnimation'

const Dashboard: NextPage = () => {
  return <DefaultLayout pageTitle='Your Dashboard' additionalStyle='relative'>
    <ScheduleList />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default Dashboard