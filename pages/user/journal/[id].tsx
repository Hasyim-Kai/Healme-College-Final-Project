import { NextPage } from "next"
import { useRouter } from "next/router"
import JournalDetail from "../../../presentation/components/features/dashboard/journal/JournalDetail"
import CircleBgAnimation from "../../../presentation/components/global/CircleBgAnimation"
import DefaultLayout from "../../../presentation/layout/DefaultLayout"
import UserNavbar from '../../../presentation/components/features/dashboard/UserNavbar'

const JournalDetailPage: NextPage = () => {
  const router = useRouter()
  const { id = `1` } = router.query

  return <DefaultLayout pageTitle='Your Journal' additionalStyle='relative'>
    <UserNavbar />
    <JournalDetail journalId={id} />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default JournalDetailPage