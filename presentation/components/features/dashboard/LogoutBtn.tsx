import Link from "next/link";
import { pinkGradientBg, tailwindTransition } from "../../../styles/TailwindStyle";

export default function LogoutBtn() {
  return <button className={`absolute right-7 top-7 hover:scale-110 ${tailwindTransition}`}>
    <Link href={'/'}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
      </svg>
    </Link>
  </button>
}