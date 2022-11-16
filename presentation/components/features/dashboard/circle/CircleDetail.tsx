import Link from 'next/link'
import Image from 'next/image'
import { toggleModal } from '../../../../../app/GlobalSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/store';
import { glassCard, pinkGradientBg, pinkGradientText } from '../../../../styles/TailwindStyle';
import FloatBottomBtn from '../../../global/FloatBottomBtn';
import { useRouter } from 'next/router';
import { delSchedule, selectScheduleState } from '../../../../../app/ScheduleSlice';
import { formatDate } from '../../../../utils/DateFormatter';
import { useState } from 'react';
import ApplyCircleModal from './ApplyCircleModal';
import ModalForm from './ModalForm';

type Props = { isCounselor?: boolean }

export default function CircleDetail({ isCounselor = false }: Props) {
  const [activeModal, setActiveModal] = useState<string>(`formEdit`)
  const openApplyModal = () => { setActiveModal(`apply`); dispatch(toggleModal()) }
  const openFormModal = () => { setActiveModal(`form`); dispatch(toggleModal()) }

  const router = useRouter()
  const goToForm = () => { router.push('/counselor/counseling/form/edit') }
  const goToSchedules = () => { router.push('/counselor/counseling') }

  const scheduleState = useAppSelector(selectScheduleState);
  const dispatch = useAppDispatch();
  const handleDel = async () => {
    await dispatch(delSchedule(scheduleState.scheduleDetail.id))
    goToSchedules()
  }

  return <div className='mx-auto lg:max-w-6xl'>
    <section className='mt-10 grid lg:grid-cols-4 grid-cols-1 gap-6 mb-16'>

      <div className={`flex flex-col gap-5`}>
        <div className={`px-7 text-center py-10 rounded-xl shadow-xl ${glassCard}`}>
          <h1 className='text-2xl font-semibold mb-1'>name</h1>

          <div className={`w-11/12 h-1 my-5 rounded-lg mx-auto ${pinkGradientBg}`}></div>

          <h1 className='text-lg text-gray-500'>Member of</h1>
          <h1 className={`text-8xl font-light ${pinkGradientText}`}>6</h1>
        </div>

        <div className={`flex justify-center p-7 rounded-xl shadow-xl cursor-pointer ${glassCard}`}>
          <Link href={'#'}>
            <Image alt="Profile Photo" src='/img/gmeet.png' width={240} height={50} priority />
          </Link>
        </div>

        {!isCounselor && <button className={`flex justify-center p-5 rounded-xl shadow-xl ${glassCard}`} onClick={() => dispatch(toggleModal())}>
          <span className={`text-3xl font-semibold ${pinkGradientText}`}>Apply Here</span>
        </button>}
      </div>

      <article className={`col-span-2 flex flex-col rounded-xl shadow-xl p-10 mx-5 lg:mx-0 ${glassCard}`}>

        <h1 className='text-3xl font-semibold text-center'>Desc</h1>
        <div className={`w-11/12 h-1 my-5 rounded-lg mx-auto ${pinkGradientBg}`}></div>
        <p className='text-lg'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero sit vitae optio ab rem alias, maxime omnis porro nobis blanditiis deleniti tempore, nisi est! Non aliquid molestias hic harum soluta.</p>

        {isCounselor && <button className='mx-auto mt-12 p-2 rounded-full border-2 border-rose-300' onClick={handleDel}>
          <Image src="/icons/trash.svg" alt="trash Icons" width={35} height={30} />
        </button>}
      </article>

      <aside className={`flex flex-col rounded-xl shadow-xl p-10 mx-5 lg:mx-0 ${glassCard}`}>
        <h2 className='text-center text-2xl font-semibold'>Members</h2>
        <div className={`w-11/12 h-1 my-5 rounded-lg mx-auto ${pinkGradientBg}`}></div>
        <ul className='flex flex-col gap-2 items-center'>
          <li>aaaaa</li>
          <li>aaaaa</li>
          <li>aaaaa</li>
          <li>aaaaa</li>
          <li>aaaaa</li>
          <li>aaaaa</li>
          <li>aaaaa</li>
          <li>aaaaa</li>
          <li>aaaaa</li>
          <li>aaaaa</li>
          <li>aaaaa</li>
        </ul>
      </aside>

    </section>

    <FloatBottomBtn text='Edit' clickFunc={openFormModal} >
      <Image src="/icons/edit-note.svg" alt="edit note Icons" width={25} height={25} />
    </FloatBottomBtn>
    {activeModal === `formEdit`
      ? <ModalForm isEdit={true} />
      : <ApplyCircleModal changeModalFunc={() => { setActiveModal(`formEdit`) }} />}
  </div>
}