import Link from 'next/link'
import { pinkGradientBg, tailwindTransition } from '../../../styles/tailwind/Transition'

export default function LoginBtn() {
    return <button className={`${pinkGradientBg} px-4 pb-3 pt-1 text-white rounded-lg text-3xl shadow-lg my-7 hover:scale-110 hover:shadow-xl ${tailwindTransition}`}>
        <Link href="/login"><a>Login</a></Link></button>
}