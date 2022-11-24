import type { NextPage } from 'next'
import DefaultLayout from '../../../presentation/layout/DefaultLayout'
import JournalList from '../../../presentation/components/features/dashboard/journal/JournalList'
import CircleBgAnimation from '../../../presentation/components/global/CircleBgAnimation'
import CounselorNavbar from '../../../presentation/components/features/dashboard/CounselorNavbar'

const Journal: NextPage = () => {
  return <DefaultLayout pageTitle='Your Journal' additionalStyle='relative'>
    <CounselorNavbar />
    <JournalList isCounselor={true} />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default Journal