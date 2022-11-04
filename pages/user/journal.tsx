import type { NextPage } from 'next'
import DefaultLayout from '../../presentation/layout/DefaultLayout'
import JournalList from '../../presentation/components/features/dashboard/journal/JournalList'
import CircleBgAnimation from '../../presentation/components/global/CircleBgAnimation'

const Journal: NextPage = () => {
  return <DefaultLayout pageTitle='Your Journal' additionalStyle='relative'>
    <JournalList />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default Journal