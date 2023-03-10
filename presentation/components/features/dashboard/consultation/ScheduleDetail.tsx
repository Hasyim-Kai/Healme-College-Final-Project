import Link from 'next/link'
import Image from 'next/image'
import { toggleModal } from '../../../../../app/GlobalSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/store';
import { glassCard, pinkGradientBg, pinkGradientText } from '../../../../styles/TailwindStyle';
import FloatBottomBtn from '../../../global/FloatBottomBtn';
import { useRouter } from 'next/router';
import UserScheduleFormModal from './UserScheduleFormModal';
import { checkIsBooked, delSchedule, selectScheduleState } from '../../../../../app/ScheduleSlice';
import { counselingSchedule } from '../../../../model/counseling-schedule';
import { formatDate } from '../../../../utils/DateFormatter';
import { useEffect } from 'react';
import { userInfo } from 'os';
import { selectUserState } from '../../../../../app/UserSlice';

type Props = { scheduleId: string | string[], isCounselor?: boolean }

export default function ScheduleDetail({ scheduleId = `1`, isCounselor = false }: Props) {
  const router = useRouter()
  const goToForm = () => { router.push('/counselor/counseling/form/edit') }
  const goToSchedules = () => { router.push('/counselor/counseling') }

  const { userInfo } = useAppSelector(selectUserState);
  const scheduleState = useAppSelector(selectScheduleState);
  const dispatch = useAppDispatch();
  const handleDel = async () => {
    await dispatch(delSchedule(scheduleState.scheduleDetail.id))
    goToSchedules()
  }

  useEffect(() => { dispatch(checkIsBooked()) }, [])

  return <div className='mx-auto lg:max-w-6xl'>
    <section className='mt-10 grid lg:grid-cols-4 grid-cols-1 lg:gap-6 mb-16'>

      <div className={`flex flex-col gap-5 mx-5 mb-5 lg:m-0`}>
        <div className={`px-7 text-center py-10 rounded-xl shadow-xl ${glassCard}`}>
          <h1 className='text-lg mb-1 text-gray-500'>{formatDate(scheduleState.scheduleDetail.date)}</h1>
          <h1 className={`text-xl font-semibold`}>{scheduleState.scheduleDetail.counselor_name}</h1>

          <div className={`w-11/12 h-1 my-5 rounded-lg mx-auto ${pinkGradientBg}`}></div>

          <h1 className='text-lg text-gray-500'>Session</h1>
          <h1 className={`text-8xl font-light ${pinkGradientText}`}>{scheduleState.scheduleDetail.session}</h1>
          <h1 className='text-lg text-gray-500 mt-2'>{counselingSchedule[Number(scheduleState.scheduleDetail.session) - 1].desc}</h1>
        </div>

        {(scheduleState.scheduleDetail.patient_name === userInfo.name || isCounselor) && <div className={`flex justify-center p-7 rounded-xl shadow-xl cursor-pointer ${glassCard}`}>
          <a href={scheduleState.scheduleDetail.gmeetLink} target="_blank" rel="noreferrer">
            <Image alt="Profile Photo" src='/img/gmeet.png' width={240} height={50} priority />
          </a>
        </div>}

        {(!scheduleState.isBooked && !isCounselor) && <button className={`flex justify-center p-5 rounded-xl shadow-xl ${glassCard}`} onClick={() => dispatch(toggleModal())}>
          <span className={`text-3xl font-semibold ${pinkGradientText}`}>Apply Here</span>
        </button>}
      </div>

      <article className={`col-span-3 flex flex-col rounded-xl shadow-xl p-10 mx-5 lg:mx-0 ${glassCard}`}>
        <div className={`flex jusb items-center gap-5 mb-5`}>
          {scheduleState.scheduleDetail?.patient_name === undefined ? <h1 className='text-xl font-semibold'><i>Not Applied yet</i></h1>
            : <><h1 className='text-3xl font-semibold'>By {scheduleState.scheduleDetail?.patient_name}</h1>
              <Link href={isCounselor ? `/counselor/journal` : `/user/journal`}>
                <button className='p-2 rounded-full border-2 border-rose-300'>
                  <Image src="/icons/orchid-book.svg" alt="orchid-book Icons" width={35} height={30} />
                </button>
              </Link></>}
        </div>

        <p className='text-lg'>{scheduleState.scheduleDetail?.summary}</p>

        {isCounselor && <button className='mx-auto mt-12 p-2 rounded-full border-2 border-rose-300' onClick={handleDel}>
          <Image src="/icons/trash.svg" alt="trash Icons" width={35} height={30} />
        </button>}
      </article>

    </section>

    {isCounselor && <FloatBottomBtn text='Edit' clickFunc={goToForm}>
      <Image src="/icons/edit-note.svg" alt="edit note Icons" width={25} height={25} />
    </FloatBottomBtn>}
    {!isCounselor && <UserScheduleFormModal isEdit={true} />}
  </div>
}