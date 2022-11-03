import Image from 'next/image'
import { pinkGradientText } from '../../../styles/TailwindStyle'
import CircleBgAnimation from '../../global/CircleBgAnimation'
import LoginBtn from './LoginBtn'

export default function Hero() {
  return <section className='flex justify-around items-center py-5 px-7 text-6xl flex-wrap relative'>
    <article className='flex flex-col items-center'>
      <div>
        <p className='text-gray-600'>Heal Yourself</p>
        <p className='text-gray-600'>Bloom your</p>
        <p className={`${pinkGradientText} font-bold text-7xl py-2`}>Happiness</p>
      </div>
      <LoginBtn />
    </article>

    <div className=''>
      <Image src="/smile1.png" alt="Smiling Woman" width={500} height={500} priority />
    </div>

    <CircleBgAnimation />
  </section>
}