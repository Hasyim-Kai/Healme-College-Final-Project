import { NextPage } from "next"
import { useRouter } from "next/router"
import ScheduleDetail from "../../../presentation/components/features/dashboard/consultation/ScheduleDetail"
import CounselorNavbar from "../../../presentation/components/features/dashboard/CounselorNavbar"
import CircleBgAnimation from "../../../presentation/components/global/CircleBgAnimation"
import DefaultLayout from "../../../presentation/layout/DefaultLayout"

const ScheduleDetailPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <DefaultLayout pageTitle='Your Journal' additionalStyle='relative'>
    <CounselorNavbar />
    <ScheduleDetail scheduleId={id} isCounselor={true} />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default ScheduleDetailPage