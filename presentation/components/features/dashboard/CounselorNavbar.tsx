import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector } from '../../../../app/store';
import { selectUserState } from '../../../../app/UserSlice';
import LogoutBtn from './LogoutBtn';

export default function CounselorNavbar() {
  const { userInfo } = useAppSelector(selectUserState);
  const navStyle = 'pb-1 border-b-4 border-pink-300 drop-shadow-lg flex item-center gap-1';
  const src = userInfo.photoUrl || '/img/smile1.png';

  return <header className='flex flex-col items-center text-gray-600'>
    <section className='flex gap-5 text-2xl items-center mt-5 mb-3'>
      <div className='relative w-10 h-10 rounded-full overflow-hidden'>
        <Image alt="Profile Photo" loader={() => src} src={src} layout='fill' objectFit='fill' placeholder="blur" blurDataURL='/img/blur-placeholder.png' referrerPolicy="no-referrer" priority />
      </div>

      <Link href="https://myaccount.google.com/personal-info" target={`_blank`}><a target="_blank" className={`text-lg cursor-pointer`}>{userInfo.name || 'Guest'}</a></Link>

      <LogoutBtn />
    </section>

    <nav className='flex gap-7 text-2xl'>
      <Link href="/counselor/counseling"><a className={navStyle}>
        <Image src="/icons/chat.svg" alt="Book Icons" width={25} height={25} />
        Counseling
      </a></Link>
    </nav>
  </header>
}