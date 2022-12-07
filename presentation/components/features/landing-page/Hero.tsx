import Image from 'next/image'
import { pinkGradientText } from '../../../styles/TailwindStyle'
import LoginBtn from './LoginBtn'

export default function Hero() {
  return <section className='flex justify-around items-center py-5 px-7 text-6xl flex-wrap max-w-7xl mx-auto'>
    <article className='flex flex-col items-center'>
      <div>
        <p className='text-gray-600'>Heal Yourself</p>
        <p className='text-gray-600'>Bloom your</p>
        <p className={`${pinkGradientText} font-bold text-7xl py-2`}>Happiness</p>
      </div>
      <LoginBtn />
    </article>

    <div className='relative w-96 aspect-square rounded-lg shadow-lg overflow-hidden'>
      <Image src="/img/smile1.png" alt="Smiling Woman" layout='fill' objectFit='fill' placeholder="blur" blurDataURL='/img/blur-placeholder.png' priority />
    </div>
  </section>
}