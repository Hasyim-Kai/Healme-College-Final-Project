import { NextPage } from "next"
import { useRouter } from "next/router"
import ScheduleForm from "../../../../presentation/components/features/dashboard/consultation/ScheduleForm"
import CircleBgAnimation from "../../../../presentation/components/global/CircleBgAnimation"
import DefaultLayout from "../../../../presentation/layout/DefaultLayout"

const ScheduleDetailPage: NextPage = () => {
   const router = useRouter()
   const { id = `1` } = router.query

   return <DefaultLayout pageTitle='Your Journal' additionalStyle='relative'>
      <ScheduleForm scheduleId={id} />
      <CircleBgAnimation />
   </DefaultLayout>
}

export default ScheduleDetailPage