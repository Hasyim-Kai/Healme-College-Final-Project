import type { NextPage } from 'next'
import DefaultLayout from '../presentation/layout/DefaultLayout'
import Banner from '../presentation/components/auth/Banner'
import Form from '../presentation/components/auth/Form'

const UserDashboard: NextPage = () => {
  return <DefaultLayout additionalStyle='mx-auto container' pageTitle='Welcome :)'>
    <Banner />
    <Form />
  </DefaultLayout>
}

export default UserDashboard