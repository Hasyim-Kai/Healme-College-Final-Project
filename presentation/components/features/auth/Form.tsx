import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { pinkGradientText, simpleInput, pinkGradientBg } from '../../../styles/TailwindStyle'

export default function Form() {
  const router = useRouter()
  const [gender, setGender] = useState<string>('male')

  function handleGender(e: any) { setGender(e.target.value) }
  function handleSubmit(e: any) {
    e.preventDefault()
    console.log(e.target)
    router.push('/user/dashboard')
  }


  return <section className="flex flex-col lg:w-1/3 w-full">
    <form onSubmit={handleSubmit} className='p-14'>
      <h1 className={`text-4xl mt-10 mb-9 font-semibold drop-shadow-md ${pinkGradientText}`}>Please fill your details to continue</h1>

      <div>
        <label htmlFor="job">Job</label><br />
        <input className={simpleInput} type="text" name="job" id="job" />
      </div>

      <div>
        <label htmlFor="number">Phone Number</label>
        <input className={simpleInput} type="number" name="number" id="number" />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input className={simpleInput} type="number" name="age" id="age" />
      </div>

      <label htmlFor="age">Gender</label>
      <div className='flex items-center gap-10 mt-2'>
        <div className="flex items-center">
          <input id="male" type="radio" value="male" name="gender" className="w-5 h-5" onChange={handleGender} />
          <label htmlFor="male" className="ml-2">Male</label>
        </div>

        <div className="flex items-center">
          <input id="female" type="radio" value="female" name="gender" className="w-5 h-5" onChange={handleGender} />
          <label htmlFor="female" className="ml-2">Female</label>
        </div>
      </div>

      <button className={`mt-10 mx-auto py-2 px-3 rounded-lg text-white text-center shadow-lg ${pinkGradientBg}`}>Submit</button>
    </form>
  </section>
}