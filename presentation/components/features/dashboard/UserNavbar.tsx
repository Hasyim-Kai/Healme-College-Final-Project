import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoutBtn from './LogoutBtn';

export default function UserNavbar() {
  const router = useRouter()

  const navStyle = 'pb-1 border-b-4 border-pink-300 drop-shadow-lg flex item-center gap-1';
  const navStyleCounseling = router.pathname.includes(`counseling`) ? navStyle : ''
  const navStyleJournal = router.pathname.includes(`journal`) ? navStyle : ''
  const navStyleCircle = router.pathname.includes(`circle`) ? navStyle : ''

  return <header className='flex flex-col items-center text-gray-600'>
    <section className='flex gap-5 text-2xl items-center mt-5 mb-3'>
      <div className='relative w-10 h-10 rounded-full overflow-hidden'>
        <Image alt="Profile Photo" src='/smile1.png' layout='fill' objectFit='fill' />
      </div>

      <p className=''>Name</p>

      <LogoutBtn />
    </section>

    <nav className='flex gap-7 text-2xl'>
      <Link href="/user/counseling"><a className={navStyleCounseling}>
        {navStyleCounseling && <Image src="/icons/chat.svg" alt="Book Icons" width={25} height={25} />}
        Counseling
      </a></Link>
      <Link href="/user/journal"><a className={navStyleJournal}>
        {navStyleJournal && <Image src="/icons/orchid-book.svg" alt="Book Icons" width={25} height={25} />}
        Journal
      </a></Link>
      <Link href="/user/circle"><a className={navStyleCircle}>
        {navStyleCircle && <Image src="/icons/people.svg" alt="Book Icons" width={25} height={25} />}
        Circle
      </a></Link>
    </nav>
  </header>
}