import type { NextPage } from 'next'
import DefaultLayout from '../../presentation/layout/DefaultLayout'
import ScheduleList from '../../presentation/components/features/dashboard/consultation/ScheduleList'

const Dashboard: NextPage = () => {
  return <DefaultLayout pageTitle='Your Dashboard' additionalStyle='relative'>
    <ScheduleList />
  </DefaultLayout>
}

export default Dashboard