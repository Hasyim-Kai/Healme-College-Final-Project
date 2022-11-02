import Image from 'next/image'
import { pinkGradientText } from '../../../styles/tailwind/Transition'
import LoginBtn from './LoginBtn'

export default function Hero() {
  return <section className='flex justify-around items-center py-5 px-7 text-5xl'>
    <div>
        <p className='text-gray-600'>Heal Yourself</p>
        <p className='text-gray-600'>Bloom your</p>
        <p className={`${pinkGradientText} font-bold text-6xl bg-blue-300 py-2`}>Happiness</p>
        <LoginBtn/>
    </div>
    <div>
        <Image src="/smile1.png" alt="Smiling Woman" width={500} height={500}/>
    </div>
    <div className='left-circle-bg'></div>
    <div className='left-circle-bg'></div>
    
    <div className='right-circle-bg'></div>
    <div className='right-circle-bg'></div>
  </section>
}