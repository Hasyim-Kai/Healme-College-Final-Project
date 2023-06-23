import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { getUserFromLocalStorage, loginGoogle, loginGoogleAsCounselor, selectUserState } from '../../../../app/UserSlice';
import { pinkGradientText } from '../../../styles/TailwindStyle'
import Loading from '../../global/Loading';

export default function GoogleLogin({ isCounselor = false }: { isCounselor?: boolean }) {

  const userState = useAppSelector(selectUserState);
  const dispatch = useAppDispatch();
  const router = useRouter()
  async function handleLogin() { isCounselor ? dispatch(loginGoogleAsCounselor()) : dispatch(loginGoogle()) }
  async function navigateUser() {
    dispatch(getUserFromLocalStorage())
    if (userState.isLoggedIn && userState.isExist) { router.push('/user/counseling') }
    else if (userState.isLoggedIn) { router.push('/profile-form') }
  }
  async function navigateCounselor() {
    dispatch(getUserFromLocalStorage())
    if (userState.isLoggedIn && userState.isExist) { router.push('/counselor/counseling') }
  }

  useEffect(() => { isCounselor ? navigateCounselor() : navigateUser() }, [isCounselor ? userState.isExist : userState.isLoggedIn])

  return <section className="flex justify-center items-center flex-col p-14 w-full lg:w-1/3">
    {userState.isLoading ? <Loading /> : <>
      <h1 className={`text-4xl mt-10 mb-2 text-center font-semibold ${pinkGradientText}`}>{isCounselor ? 'Hi!, Thankyou for your effort to Heal Community' : 'Welcome to \n Healme'}</h1>
      <h1 className={`text-xl mb-7 text-gray-500`}>Please Login First</h1>
      <button onClick={handleLogin} className={`text-lg flex justify-center items-center gap-3 mt-3 px-4 py-2 border border-rose-300 font-medium rounded-2xl`}>
        <Image src="/icons/google-logo.svg" alt="Google Logo" width={40} height={40} />
        Login with Google
      </button>

      {userState.errorMessage.length > 0 && <div className='mt-7 p-5 bg-red-200 border-2 border-red-400 rounded-lg'>
        <h1 className='text-gray-600 text-center'>{userState.errorMessage}</h1>
      </div>}

      <Link href={isCounselor ? '/login' : '/counselor-login'}>
        <a className='mt-5 text-gray-500'>Login as <span className={pinkGradientText}>{isCounselor ? 'User' : 'Counselor ?'}</span></a>
      </Link>
    </>}
  </section>
}