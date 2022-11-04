import type { NextPage } from 'next'
import Banner from '../../presentation/components/features/auth/Banner'
import Form from '../../presentation/components/features/auth/Form'
import DefaultLayout from '../../presentation/layout/DefaultLayout'

const Dashboard: NextPage = () => {
  return <DefaultLayout additionalStyle='mx-auto container' pageTitle='Welcome :)'>
    <Banner />
    <Form />
  </DefaultLayout>
}

export default Dashboard