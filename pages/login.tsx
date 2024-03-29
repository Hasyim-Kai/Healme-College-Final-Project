import type { NextPage } from 'next'
import Banner from '../presentation/components/features/auth/Banner'
import GoogleLogin from '../presentation/components/features/auth/GoogleLogin'
import DefaultLayout from '../presentation/layout/DefaultLayout'

const Login: NextPage = () => {
  return <DefaultLayout additionalStyle='flex' pageTitle='Login' getUserFromLS={false}>
    <Banner />
    <GoogleLogin />
  </DefaultLayout>
}

export default Login