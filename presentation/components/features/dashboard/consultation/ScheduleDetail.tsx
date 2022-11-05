import Link from 'next/link'
import Image from 'next/image'
import { toggleModal } from '../../../../../app/GlobalSlice';
import { useAppDispatch } from '../../../../../app/store';
import { glassCard, pinkGradientBg, pinkGradientText } from '../../../../styles/TailwindStyle';
import FloatBottomBtn from '../../../global/FloatBottomBtn';
import JournalFormModal from '../journal/JournalFormModal';
import UserNavbar from '../UserNavbar';
import { useRouter } from 'next/router';
import UserScheduleFormModal from './UserScheduleFormModal';

type Props = { scheduleId: string | string[] }

export default function ScheduleDetail({ scheduleId = `1` }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const goToForm = () => { router.push('/user/counseling/form/1') }

  return <div className='mx-auto lg:max-w-6xl'>
    <UserNavbar />
    <section className='mt-10 grid lg:grid-cols-4 grid-cols-1 gap-6'>

      <div className={`flex flex-col gap-5`}>
        <div className={`px-7 text-center py-10 rounded-xl shadow-xl ${glassCard}`}>
          <h1 className='text-lg text-gray-500'>November 22 2022</h1>
          <h1 className={`text-2xl font-semibold`}>Mrs. Lesti Keygen Pemuja Kebaikan</h1>

          <div className={`w-11/12 h-1 my-5 rounded-lg mx-auto ${pinkGradientBg}`}></div>

          <h1 className='text-lg text-gray-500'>Session</h1>
          <h1 className={`text-8xl font-light ${pinkGradientText}`}>1</h1>
          <h1 className='text-lg text-gray-500 mt-2'>1pm - 2pm</h1>
        </div>

        <div className={`flex justify-center p-7 rounded-xl shadow-xl ${glassCard}`}>
          <Image alt="Profile Photo" src='/img/gmeet.png' width={240} height={50} priority />
        </div>

        <button className={`flex justify-center p-5 rounded-xl shadow-xl ${glassCard}`} onClick={() => dispatch(toggleModal())}>
          <span className={`text-3xl font-semibold ${pinkGradientText}`}>Apply Here</span>
        </button>
      </div>

      <article className={`col-span-3 flex flex-col rounded-xl shadow-xl p-10 mx-5 lg:mx-0 ${glassCard}`}>
        <div className={`flex jusb items-center gap-5 mb-5`}>
          <h1 className='text-3xl font-semibold'>By Pemuda</h1>
          <Link href={`/user/journal`}>
            <button className='p-2 rounded-full border-2 border-rose-300' onClick={() => console.log(`Jalan :)`)}>
              <Image src="/icons/orchid-book.svg" alt="orchid-book Icons" width={35} height={30} />
            </button>
          </Link>
        </div>

        <p className='text-lg'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero sit vitae optio ab rem alias, maxime omnis porro nobis blanditiis deleniti tempore, nisi est! Non aliquid molestias hic harum soluta.</p>

        <button className='mx-auto mt-12 p-2 rounded-full border-2 border-rose-300' onClick={() => console.log(`Jalan :)`)}>
          <Image src="/icons/trash.svg" alt="trash Icons" width={35} height={30} />
        </button>
      </article>

    </section>

    <FloatBottomBtn text='Edit' clickFunc={goToForm}>
      <Image src="/icons/edit-note.svg" alt="edit note Icons" width={25} height={25} />
    </FloatBottomBtn>
    <UserScheduleFormModal isEdit={true} />
  </div>
}