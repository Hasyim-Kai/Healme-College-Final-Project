import type { NextPage } from 'next'
import DefaultLayout from '../../../presentation/layout/DefaultLayout'
import ScheduleList from '../../../presentation/components/features/dashboard/consultation/ScheduleList'
import CircleBgAnimation from '../../../presentation/components/global/CircleBgAnimation'
import CounselorNavbar from '../../../presentation/components/features/dashboard/CounselorNavbar'

const Dashboard: NextPage = () => {
  return <DefaultLayout pageTitle='Your Dashboard' additionalStyle='relative'>
    <CounselorNavbar />
    <ScheduleList isCounselor={true} />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default Dashboard