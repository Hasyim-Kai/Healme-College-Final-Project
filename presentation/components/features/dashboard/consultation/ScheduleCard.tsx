import Link from 'next/link'
import { setScheduleDetail } from '../../../../../app/ScheduleSlice';
import { useAppDispatch } from '../../../../../app/store';
import { counselingSchedule } from '../../../../model/counseling-schedule';
import { cardHover, pinkGradientBg } from '../../../../styles/TailwindStyle'
import { formatDate } from '../../../../utils/DateFormatter';

export default function ScheduleCard({ item }: any) {
  const dispatch = useAppDispatch();
  return <Link href={`counseling/1`}><div onClick={() => dispatch(setScheduleDetail({ id: item.id, ...item.data }))} className={`flex items-center rounded-lg shadow-lg h-48 bg-white bg-opacity-10 backdrop-blur-lg ${cardHover}`}>
    <section className='lg:text-xl text-lg text-center p-5'>
      <h1>Section</h1>
      <h1 className='lg:text-7xl text-6xl font-light'>{item.data.session}</h1>
      <h1 className='text-sm mt-1'>{counselingSchedule[Number(item.data.session)].desc}</h1>
    </section>

    <div className={`w-1 h-4/5 rounded-lg ${pinkGradientBg}`}></div>

    <section className=' p-5'>
      <p className={`text-xl`}>{formatDate(item.data.date)}</p>
      <p className={`text-sm`}>With</p>
      <p className={`text-2xl font-medium`}>{item.data.counselor_name}</p>
    </section>
  </div></Link>
}