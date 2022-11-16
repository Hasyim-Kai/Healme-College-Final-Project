import Link from 'next/link';
import { setCircleDetail } from '../../../../../app/CircleSlice';
import { setScheduleDetail } from '../../../../../app/ScheduleSlice';
import { useAppDispatch } from '../../../../../app/store';
import { cardHover, pinkGradientBg } from '../../../../styles/TailwindStyle'
type Props = { item: any }

export default function CircleCard({ item }: Props) {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setCircleDetail({ id: item.id, ...item.data }))
  }

  return <Link href={`/user/circle/1`}><div className={`text-center rounded-full shadow-lg shadow-rose-200 h-40 bg-white bg-opacity-10 backdrop-blur-lg ${cardHover}`} onClick={handleClick}>
    <p className={`text-2xl font-medium mt-6`}>Name</p>
    <div className={`w-2/3 h-1 rounded-lg mx-auto ${pinkGradientBg}`}></div>
    <p className={`text-sm mb-1`}>capacity</p>
    <p className={`text-lg`}>Desc</p>
  </div></Link>
}