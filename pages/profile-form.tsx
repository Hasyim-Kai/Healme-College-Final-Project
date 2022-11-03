import type { NextPage } from 'next'
import DefaultLayout from '../presentation/layout/DefaultLayout'
import Banner from '../presentation/components/auth/Banner'
import Form from '../presentation/components/auth/Form'

const ProfileForm: NextPage = () => {
  return <DefaultLayout additionalStyle='flex' pageTitle='Healme Profile'>
    <Banner />
    <Form />
  </DefaultLayout>
}

export default ProfileForm