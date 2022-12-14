import { NextPage } from "next"
import { useRouter } from "next/router"
import ScheduleDetail from "../../../presentation/components/features/dashboard/consultation/ScheduleDetail"
import UserNavbar from "../../../presentation/components/features/dashboard/UserNavbar"
import CircleBgAnimation from "../../../presentation/components/global/CircleBgAnimation"
import DefaultLayout from "../../../presentation/layout/DefaultLayout"

const ScheduleDetailPage: NextPage = () => {
  const router = useRouter()
  const { id = `1` } = router.query

  return <DefaultLayout pageTitle='Your Journal' additionalStyle='relative'>
    <UserNavbar />
    <ScheduleDetail scheduleId={id} />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default ScheduleDetailPage