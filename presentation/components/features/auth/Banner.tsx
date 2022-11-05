import Image from 'next/image'

export default function Banner() {
  return <div className="relative lg:w-2/3 lg:inline hidden h-screen">
    <Image alt="wave-bg" src='/img/auth-bg.png' layout='fill' objectFit='cover' />
  </div>
}