import Image from 'next/image'
import LoginBtn from './LoginBtn'
import { pinkGradientBg, pinkGradientText } from '../../../styles/TailwindStyle'
import WhiteLoginBtn from './WhiteLoginBtn'

export default function Footer() {
  return <article className='relative mt-10 h-full text-white'>
    <div className='absolute w-full h-full -z-10'>
      <Image alt="wave-bg" src='/img/wave-bg.png' layout='fill' placeholder="blur" blurDataURL='/img/blur-placeholder.png' />
    </div>

    <section className='text-center my-5 pt-32'>
      <p className={`text-4xl font-medium`}>Take your time here</p>
      <p className={`text-3xl my-1`}>On Healme</p>
      <WhiteLoginBtn />
    </section>

    <section className='text-center mt-16 pb-12'>
      <p className={`text-2xl font-semibold`}>Healme Copyright ©</p>
      <p className={`my-2`}>Information System for Mental Health & <br /> Sexual Harassment Consultation Management</p>
      <p className={`mt-2`}>Made by <br /> Muhammad Hasyim Chaidir Ali</p>
    </section>
  </article>
}