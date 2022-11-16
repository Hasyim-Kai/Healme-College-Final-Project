import type { NextPage } from 'next'
import DefaultLayout from '../../../presentation/layout/DefaultLayout'
import ScheduleList from '../../../presentation/components/features/dashboard/consultation/ScheduleList'
import CircleBgAnimation from '../../../presentation/components/global/CircleBgAnimation'
import UserNavbar from '../../../presentation/components/features/dashboard/UserNavbar'

const Dashboard: NextPage = () => {
  return <DefaultLayout pageTitle='Your Dashboard' additionalStyle='relative'>
    <UserNavbar />
    <ScheduleList isAll={false} />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default Dashboard