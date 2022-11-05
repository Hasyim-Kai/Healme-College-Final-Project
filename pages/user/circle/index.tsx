import type { NextPage } from 'next'
import DefaultLayout from '../../../presentation/layout/DefaultLayout'
import CircleBgAnimation from '../../../presentation/components/global/CircleBgAnimation'
import CircleList from '../../../presentation/components/features/dashboard/circle/CircleList'

const Circle: NextPage = () => {
  return <DefaultLayout pageTitle='Circle Community' additionalStyle='relative'>
    <CircleList />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default Circle