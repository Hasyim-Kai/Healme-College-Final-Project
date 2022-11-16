import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { getUserFromLS, loginGoogle, loginGoogleAsCounselor, selectUserState, setUser } from '../../../../app/UserSlice';
import { auth } from '../../../../infrastructure/services/firebase';
import { cardHover, pinkGradientText } from '../../../styles/TailwindStyle'
import { Toast, ToastType } from '../../global/Alert';
import Loading from '../../global/Loading';

export default function GoogleLogin({ isCounselor = false }: { isCounselor?: boolean }) {

  const userState = useAppSelector(selectUserState);
  const dispatch = useAppDispatch();
  const router = useRouter()
  async function handleLogin() { isCounselor ? dispatch(loginGoogleAsCounselor()) : dispatch(loginGoogle()) }
  async function navigateUser() {
    dispatch(getUserFromLS())
    if (userState.isLoggedIn && userState.isExist) { router.push('/user/counseling') }
    else if (userState.isLoggedIn && !userState.isExist) { router.push('/profile-form') }
    else if (userState.errorMessage !== '') { Toast(userState.errorMessage, ToastType.error) }
  }
  async function navigateCounselor() {
    dispatch(getUserFromLS())
    if (userState.isLoggedIn && userState.isExist) { router.push('/counselor/counseling') }
    else if (userState.errorMessage !== '') { Toast(userState.errorMessage, ToastType.error) }
  }

  useEffect(() => { isCounselor ? navigateCounselor() : navigateUser() }, [isCounselor ? userState.isExist : userState.isLoggedIn])

  return <section className="flex items-center flex-col p-14 w-full lg:w-1/3">
    {userState.isLoading ? <Loading /> : <>
      <h1 className={`text-4xl mt-10 mb-2 text-center font-semibold ${pinkGradientText}`}>{isCounselor ? 'Hi!, Thankyou for your effort to Heal Community' : 'Welcome to \n Healme'}</h1>
      <h1 className={`text-xl mb-7 text-gray-500`}>Please Login First</h1>
      <button onClick={handleLogin} className={`text-lg flex justify-center items-center gap-3 mt-3 px-4 py-2 border border-rose-300 font-medium rounded-2xl`}>
        <Image src="/icons/google-logo.svg" alt="Google Logo" width={40} height={40} />
        Login with Google
      </button>

      <Link href={isCounselor ? '/login' : '/counselor-login'}>
        <a className='mt-5 text-gray-500'>Login as <span className={pinkGradientText}>{isCounselor ? 'User' : 'Counselor ?'}</span></a>
      </Link>
    </>}
  </section>
}