import Link from 'next/link'
import { cardHover, pinkGradientBg, pinkGradientText } from '../../../../styles/TailwindStyle'

export default function ScheduleCard() {
  return <Link href={`counseling/1`}><div className={`flex items-center rounded-lg shadow-lg h-48 bg-white bg-opacity-10 backdrop-blur-lg ${cardHover}`}>
    <section className='lg:text-xl text-lg text-center p-5'>
      <h1>Section</h1>
      <h1 className='lg:text-8xl text-7xl font-light'>1</h1>
      <h1>1pm - 2pm</h1>
    </section>

    <div className={`w-1 h-4/5 rounded-lg ${pinkGradientBg}`}></div>

    <section className=' p-5'>
      <p className={`text-2xl`}>November 12nd 2023</p>
      <p className={``}>With</p>
      <p className={`text-4xl font-medium`}>Mrs.Lesti</p>
    </section>
  </div></Link>
}