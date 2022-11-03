import Link from 'next/link'
import { pinkGradientText, tailwindTransition } from '../../../styles/TailwindStyle'

export default function WhiteLoginBtn() {
  return <button className={`px-4 pb-3 pt-2 bg-white rounded-lg text-2xl shadow-lg my-7 hover:scale-110 hover:shadow-xl ${tailwindTransition}`}>
    <Link href="/login"><a className={`${pinkGradientText}`}>Login</a></Link>
  </button>
}