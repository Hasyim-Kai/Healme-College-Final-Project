import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../../../app/store';
import { selectUserState } from '../../../../app/UserSlice';
import LogoutBtn from './LogoutBtn';

export default function UserNavbar() {
  const router = useRouter()
  const { userInfo } = useAppSelector(selectUserState);
  const src = userInfo.photoUrl || '/img/smile1.png';

  let navStyleCounseling = '', navStyleMyCounseling = '', navStyleJournal = '', navStyleCircle = '', navStyleMyCircle = '';
  const navStyle = 'pb-1 border-b-4 border-pink-300 drop-shadow-lg flex item-center gap-1';
  if (router.pathname.includes(`my-co`)) { navStyleMyCounseling = navStyle }
  else if (router.pathname.includes(`my-ci`)) { navStyleMyCircle = navStyle }
  else if (router.pathname.includes(`counseling`)) { navStyleCounseling = navStyle }
  else if (router.pathname.includes(`journal`)) { navStyleJournal = navStyle }
  else if (router.pathname.includes(`circle`)) { navStyleCircle = navStyle }

  return <header className='flex flex-col items-center text-gray-600'>
    <section className='flex gap-5 text-2xl items-center mt-5 mb-3'>
      <div className='relative w-10 h-10 rounded-full overflow-hidden'>
        <Image alt="Profile Photo" loader={() => src} src={src} layout='fill' objectFit='fill' placeholder="blur" blurDataURL='/img/blur-placeholder.png' referrerPolicy="no-referrer" priority />
      </div>

      <div className='w-2/3 truncate'>
        <Link href="https://myaccount.google.com/personal-info" target={`_blank`}><a target="_blank" className={`text-sm md:text-lg cursor-pointer`}>{userInfo.name || 'Guest'}</a></Link>
      </div>

      <LogoutBtn />
    </section>

    <nav className='flex gap-7 justify-center flex-wrap text-lg md:text-2xl'>
      <Link href="/user/counseling"><a className={navStyleCounseling}>
        {navStyleCounseling && <Image src="/icons/chat.svg" alt="Book Icons" width={25} height={25} />}
        Counseling
      </a></Link>
      <Link href="/user/counseling/my-counseling"><a className={navStyleMyCounseling}>
        {navStyleMyCounseling && <Image src="/icons/chat.svg" alt="Book Icons" width={25} height={25} />}
        My Counseling
      </a></Link>
      <Link href="/user/journal"><a className={navStyleJournal}>
        {navStyleJournal && <Image src="/icons/orchid-book.svg" alt="Book Icons" width={25} height={25} />}
        Journal
      </a></Link>
      <Link href="/user/circle"><a className={navStyleCircle}>
        {navStyleCircle && <Image src="/icons/people.svg" alt="Book Icons" width={25} height={25} />}
        Circles
      </a></Link>
      <Link href="/user/circle/my-circle"><a className={navStyleMyCircle}>
        {navStyleMyCircle && <Image src="/icons/people.svg" alt="Book Icons" width={25} height={25} />}
        My Circle
      </a></Link>
    </nav>
  </header>
}