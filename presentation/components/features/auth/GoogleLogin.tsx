import { useRouter } from 'next/router'
import { pinkGradientText, pinkGradientBg } from '../../../styles/TailwindStyle'

export default function GoogleLogin() {

  const router = useRouter()
  function handleLogin(e: any) {
    console.log(`jalan`)
    console.log(e.target)
    router.push('/profile-form')
  }

  return <section className="flex flex-col p-14 w-full lg:w-1/3">
    <h1 className={`text-4xl mt-10 mb-7 font-semibold ${pinkGradientText}`}>Please fill your details</h1>
    <button className={`mt-10 mx-auto p-3 rounded-lg text-white text-center ${pinkGradientBg}`} onClick={handleLogin}>Submit</button>
  </section>
}