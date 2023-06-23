import type { NextPage } from 'next'
import Banner from '../presentation/components/features/auth/Banner'
import Form from '../presentation/components/features/auth/Form'
import DefaultLayout from '../presentation/layout/DefaultLayout'

const ProfileForm: NextPage = () => {
  return <DefaultLayout additionalStyle='flex' pageTitle='Healme Profile' getUserFromLS={false}>
    <Banner />
    <Form />
  </DefaultLayout>
}

export default ProfileForm