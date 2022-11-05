import { NextPage } from "next"
import { useRouter } from "next/router"
import JournalDetail from "../../../presentation/components/features/dashboard/journal/JournalDetail"
import CircleBgAnimation from "../../../presentation/components/global/CircleBgAnimation"
import DefaultLayout from "../../../presentation/layout/DefaultLayout"

const JournalDetailPage: NextPage = () => {
  const router = useRouter()
  const { id = `1` } = router.query

  return <DefaultLayout pageTitle='Your Journal' additionalStyle='relative'>
    <JournalDetail journalId={id} />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default JournalDetailPage