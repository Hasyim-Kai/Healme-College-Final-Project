import { NextPage } from "next"
import { useRouter } from "next/router"

const ScheduleDetailPage: NextPage = () => {
   const router = useRouter()
   const { id = `1` } = router.query

   return <DefaultLayout pageTitle='Your Journal' additionalStyle='relative'>
      <ScheduleDetail scheduleId={id} />
      <CircleBgAnimation />
   </DefaultLayout>
}

export default ScheduleDetailPage