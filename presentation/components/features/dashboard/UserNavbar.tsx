import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoutBtn from './LogoutBtn';

export default function UserNavbar() {
  const router = useRouter()

  const navStyle = 'border-b-4 border-rose-300 drop-shadow-lg';
  const navStyleDashboard = router.pathname === '/user/dashboard' ? navStyle : '';
  const navStyleJournal = router.pathname === '/user/journal' ? navStyle : '';
  const navStyleCircle = router.pathname === '/user/circle' ? navStyle : '';

  return <header className='flex flex-col items-center'>
    <section className='flex gap-5 text-2xl items-center mt-5 mb-3'>
      <div className='relative w-10 h-10 rounded-full overflow-hidden'>
        <Image alt="Profile Photo" src='/smile1.png' layout='fill' objectFit='fill' />
      </div>

      <p className=''>Name</p>

      <LogoutBtn />
    </section>

    <nav className='flex gap-7 text-2xl'>
      <Link href="/user/dashboard"><a className={navStyleDashboard}>Consultation</a></Link>
      <Link href="/user/journal"><a className={navStyleJournal}>Journal</a></Link>
      <Link href="/user/circle"><a className={navStyleCircle}>Circle</a></Link>
    </nav>
  </header>
}