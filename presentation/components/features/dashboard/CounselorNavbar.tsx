import Image from 'next/image'
import Link from 'next/link'
import LogoutBtn from './LogoutBtn';

export default function CounselorNavbar() {
  const navStyle = 'pb-1 border-b-4 border-pink-300 drop-shadow-lg flex item-center gap-1';

  return <header className='flex flex-col items-center text-gray-600'>
    <section className='flex gap-5 text-2xl items-center mt-5 mb-3'>
      <div className='relative w-10 h-10 rounded-full overflow-hidden'>
        <Image alt="Profile Photo" src='/img/smile1.png' layout='fill' objectFit='fill' />
      </div>

      <p className=''>Name</p>

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