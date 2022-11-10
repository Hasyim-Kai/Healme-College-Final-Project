import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { checkUserExistance, getUserFromLS, saveUser, selectUserState } from '../../../../app/UserSlice'
import { pinkGradientText, simpleInput, pinkGradientBg } from '../../../styles/TailwindStyle'
import { Toast, ToastType } from '../../global/Alert';
import Loading from '../../global/Loading'

export default function Form() {
  const userState = useAppSelector(selectUserState);
  const dispatch = useAppDispatch();
  const router = useRouter()
  const [phoneNum, setPhoneNum] = useState<string>('12334521')
  const [age, setAge] = useState<string>('0')
  const [gender, setGender] = useState<string>('male')

  function handlePhoneNum(e: any) { setPhoneNum(e.target.value) }
  function handleAge(e: any) { setAge(e.target.value) }
  function handleGender(e: any) { setGender(e.target.value) }
  function handleSubmit(e: any) {
    e.preventDefault()
    dispatch(saveUser({
      age: age,
      email: userState.userInfo.email,
      gender: gender,
      phone_number: phoneNum
    }))
  }

  useEffect(() => {
    dispatch(getUserFromLS())
    if (userState.isLoggedIn && userState.isExist) { router.push('/user/counseling') }
    else if (userState.errorMessage !== '') { Toast(userState.errorMessage, ToastType.error) }
  }, [userState.isExist])

  return <section className="flex flex-col lg:w-1/3 w-full">
    {userState.isLoading ? <Loading /> : <>
      <form onSubmit={handleSubmit} className='p-14'>
        <h1 className={`text-4xl mt-10 mb-9 font-semibold drop-shadow-md ${pinkGradientText}`}>Please fill your details to continue</h1>

        <div>
          <label htmlFor="number">Phone Number</label>
          <input className={simpleInput} type="number" name="number" id="number" placeholder="Enter your Phone Number" onChange={handlePhoneNum} required />
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input className={simpleInput} type="number" name="age" id="age" placeholder="Enter your Age" onChange={handleAge} required />
        </div>

        <label htmlFor="age">Gender</label>
        <div className='flex items-center gap-10 mt-2'>
          <div className="flex items-center">
            <input id="male" type="radio" value="male" name="gender" className="w-5 h-5" onChange={handleGender} required />
            <label htmlFor="male" className="ml-2">Male</label>
          </div>

          <div className="flex items-center">
            <input id="female" type="radio" value="female" name="gender" className="w-5 h-5" onChange={handleGender} required />
            <label htmlFor="female" className="ml-2">Female</label>
          </div>
        </div>

        <button className={`mt-10 mx-auto py-2 px-3 rounded-lg text-white text-center shadow-lg ${pinkGradientBg}`}>Submit</button>
      </form></>}
  </section>
}