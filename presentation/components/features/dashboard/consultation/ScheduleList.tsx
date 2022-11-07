import Image from 'next/image'
import { pinkGradientBg, pinkGradientText } from '../../../../styles/TailwindStyle'
import CircleBgAnimation from '../../../global/CircleBgAnimation'
import ScheduleCard from './ScheduleCard'
import UserNavbar from '../UserNavbar'
import { useRouter } from 'next/router'
import FloatBottomBtn from '../../../global/FloatBottomBtn'

type Props = { isCounselor: boolean }

export default function ScheduleList({ isCounselor = false }: Props) {
  const router = useRouter()
  const goToAddForm = () => { router.push('/counselor/counseling/form/add') }
  const dummy = [1, 2, 3, 4, 5, 6]

  return <div className='mx-auto lg:max-w-5xl mb-16'>
    <section className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-10'>
      {dummy.map((item, index) => <ScheduleCard />)}
    </section>

    {isCounselor && <FloatBottomBtn text='Create' clickFunc={goToAddForm}>
      <b>+</b>
    </FloatBottomBtn>}
  </div>
}