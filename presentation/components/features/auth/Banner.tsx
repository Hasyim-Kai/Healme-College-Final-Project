import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Banner() {
  const router = useRouter()
  const isCounselorLogin = router.pathname === '/counselor-login'

  return <div className="relative lg:w-2/3 lg:inline hidden h-screen">
    <Image alt="wave-bg" src={isCounselorLogin ? '/img/auth-counselor-bg.png' : '/img/auth-bg.png'}
      layout='fill' objectFit='cover' placeholder="blur" blurDataURL='/img/blur-placeholder.png' priority />
  </div>
}