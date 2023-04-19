import Link from 'next/link'
import { setScheduleDetail } from '../../../../../app/ScheduleSlice';
import { useAppDispatch } from '../../../../../app/store';
import { counselingSchedule } from '../../../../model/counseling-schedule';
import { cardHover, pinkGradientBg } from '../../../../styles/TailwindStyle'
import { formatDate } from '../../../../utils/DateFormatter';

export default function ScheduleCard({ item, isCounselor = false }: any) {
  const dispatch = useAppDispatch();
  return isCounselor ? <Link href='/counselor/counseling/detail'><div onClick={() => dispatch(setScheduleDetail({ id: item.id, ...item.data }))} className={`flex items-center rounded-lg shadow-lg h-48 bg-white bg-opacity-10 backdrop-blur-lg ${cardHover} overflow-hidden`}>
    <section className='text-lg text-center p-5 w-40'>
      <h1>Session</h1>
      <h1 className='lg:text-3xl text-2xl font-light'>{item.data.session}</h1>
      <h1 className='text-xl mt-1 font-medium'>{counselingSchedule[Number(item.data.session) - 1].desc}</h1>
    </section>

    <div className={`w-1 h-4/5 rounded-lg ${pinkGradientBg}`}></div>

    <section className='p-5'>
      <p className={`text-lg md:text-2xl font-medium pb-2`}>{formatDate(item.data.date)}</p>
      <p className={`text-sm`}>With</p>
      <p className={`text-lg md:text-xl`}>{item.data.counselor_name}</p>
    </section>
  </div></Link>
    : <Link href='/user/counseling/detail'><div onClick={() => dispatch(setScheduleDetail({ id: item.id, ...item.data }))} className={`flex items-center rounded-lg shadow-lg h-48 bg-white bg-opacity-10 backdrop-blur-lg ${cardHover} overflow-hidden`}>
      <section className='lg:text-xl text-lg text-center p-5'>
        <h1>Session</h1>
        <h1 className='lg:text-7xl text-6xl font-light'>{item.data.session}</h1>
        <h1 className='text-sm mt-1'>{counselingSchedule[Number(item.data.session) - 1].desc}</h1>
      </section>

      <div className={`w-1 h-4/5 rounded-lg ${pinkGradientBg}`}></div>

      <section className='p-5'>
        <p className={`text-lg md:text-xl`}>{formatDate(item.data.date)}</p>
        <p className={`text-sm`}>With</p>
        <p className={`text-lg md:text-2xl font-medium`}>{item.data.counselor_name}</p>
      </section>
    </div></Link>
}