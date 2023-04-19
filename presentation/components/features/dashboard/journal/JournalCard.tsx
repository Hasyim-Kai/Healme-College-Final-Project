import Link from 'next/link';
import { cardHover } from '../../../../styles/TailwindStyle'
import { useAppDispatch } from '../../../../../app/store';
import { formatDate } from '../../../../utils/DateFormatter';
import { setJournalDetail } from '../../../../../app/JournalSlice';

export default function JournalCard({ item }: any) {
  const dispatch = useAppDispatch();
  const { radius, stroke } = { radius: 45, stroke: 6 };
  const normalizedRadius = () => radius - stroke * 2;
  const circumference = () => normalizedRadius() * 2 * Math.PI;
  const strokeDashoffset = () => circumference() - Number(item.data.mood) / 10 * circumference();

  return <Link href={`journal/1`}>
    <div onClick={() => dispatch(setJournalDetail({ id: item.id, ...item.data }))} className={`flex items-center rounded-lg shadow-lg h-36 bg-white bg-opacity-10 backdrop-blur-lg ${cardHover}`}>
      <div className='p-3 relative'>
        <h1 className='absolute top-10 left-12 text-2xl drop-shadow-lg text-gray-600'>{item.data.mood}</h1>
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
        <p className={`text-sm mb-1`}><i>{formatDate(item.data.date)}</i></p>
        <p className={`text-2xl font-medium`}>{item.data.title}</p>
        <p className={`text-sm truncate`}>{item.data.text}</p>
      </section>
    </div>
  </Link>
}