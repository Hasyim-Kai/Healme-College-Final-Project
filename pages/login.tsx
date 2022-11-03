import type { NextPage } from 'next'
import DefaultLayout from '../presentation/layout/DefaultLayout'
import Banner from '../presentation/components/auth/Banner'
import Form from '../presentation/components/auth/Form'
import GoogleLogin from '../presentation/components/auth/GoogleLogin'

const Login: NextPage = () => {
  return <DefaultLayout additionalStyle='flex' pageTitle='Login'>
    <Banner />
    <GoogleLogin />
  </DefaultLayout>
}

export default Login