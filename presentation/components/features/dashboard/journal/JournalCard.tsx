import Link from 'next/link';
import { cardHover } from '../../../../styles/TailwindStyle'

export default function JournalCard() {

  const { radius, stroke, progress } = { radius: 45, stroke: 6, progress: 79 };
  const normalizedRadius = () => radius - stroke * 2;
  const circumference = () => normalizedRadius() * 2 * Math.PI;
  const strokeDashoffset = () => circumference() - progress / 100 * circumference();

  return <Link href={`journal/1`}>
    <div className={`flex items-center rounded-lg shadow-lg h-36 bg-white bg-opacity-10 backdrop-blur-lg ${cardHover}`}>
      <div className='p-3 relative'>
        <h1 className='absolute top-10 left-11 text-2xl drop-shadow-lg text-gray-600'>{progress}</h1>
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="orchid"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference() + ' ' + circumference()}
            style={{ strokeDashoffset: strokeDashoffset() }}
            r={normalizedRadius()}
            strokeLinecap="round"
            cx={radius} cy={radius} />
        </svg>
      </div>

      <section className=''>
        <p className={`text-sm mb-1`}><i>November 12nd 2023</i></p>
        <p className={`text-2xl font-medium`}>Title</p>
        <p className={`text-sm`}>Desc</p>
      </section>
    </div>
  </Link>
}