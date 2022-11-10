import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { getUserFromLS, loginGoogle, selectUserState, setUser } from '../../../../app/UserSlice';
import { auth } from '../../../../infrastructure/services/firebase';
import { cardHover, pinkGradientText } from '../../../styles/TailwindStyle'
import { Toast, ToastType } from '../../global/Alert';
import Loading from '../../global/Loading';

export default function GoogleLogin() {

  const userState = useAppSelector(selectUserState);
  const dispatch = useAppDispatch();
  const router = useRouter()
  async function handleLogin() { dispatch(loginGoogle()) }

  useEffect(() => {
    dispatch(getUserFromLS())
    if (userState.isLoggedIn && userState.isExist) { router.push('/user/counseling') }
    else if (userState.isLoggedIn) { router.push('/profile-form') }
    else if (userState.errorMessage !== '') { Toast(userState.errorMessage, ToastType.error) }
  }, [userState.isLoggedIn])

  return <section className="flex flex-col p-14 w-full lg:w-1/3">
    {userState.isLoading ? <Loading /> : <>
      <h1 className={`text-4xl mt-10 mb-2 font-semibold ${pinkGradientText}`}>Welcome to <br />Healme</h1>
      <h1 className={`text-xl mb-7 text-gray-500`}>Please Login First</h1>
      <button onClick={handleLogin} className={`mx-auto text-xl flex justify-center items-center gap-3 mt-3 p-3 border border-rose-300 font-semibold rounded-2xl`}>
        <Image src="/icons/google-logo.svg" alt="Google Logo" width={40} height={40} />
        Login with Google
      </button>
    </>}
  </section>
}