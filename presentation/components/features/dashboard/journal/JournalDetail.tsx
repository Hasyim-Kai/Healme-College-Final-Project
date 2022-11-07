import Image from 'next/image'
import { toggleModal } from '../../../../../app/GlobalSlice'
import { useAppDispatch } from '../../../../../app/store'
import VioletButton from "../../../global/VioletButton";
import { cardHover, pinkGradientText } from '../../../../styles/TailwindStyle'
import FloatBottomBtn from '../../../global/FloatBottomBtn'
import UserNavbar from '../UserNavbar'
import JournalFormModal from './JournalFormModal'

type Props = { journalId: string | string[] }

export default function JournalDetail({ journalId = `1` }: Props) {
  const dispatch = useAppDispatch();

  return <div className='mx-auto lg:max-w-5xl'>
    <section className='mt-10'>

      <div className='flex lg:items-center justify-between mx-5 flex-col-reverse lg:flex-row gap-3'>
        <div className='flex items-center gap-3'>
          <Image src="/icons/orchid-bookmark.svg" alt="Book Icons" width={60} height={60} />
          <div>
            <h1 className={`text-5xl font-semibold ${pinkGradientText}`}>Title {journalId}</h1>
            <h1 className='text-lg text-gray-500'><i>date</i></h1>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <h1 className={`text-6xl font-semibold ${pinkGradientText}`}>80</h1>
          <h1 className='text-lg text-gray-500'>Mood<br />Score</h1>
        </div>
      </div>

      <article className={`flex flex-col mt-5 mb-16 rounded-xl shadow-xl p-10 bg-white bg-opacity-20 backdrop-blur-lg mx-5 lg:mx-0`}>
        <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Natus similique alias repudiandae, unde dolor, pariatur incidunt fugit
          architecto accusantium impedit voluptatem. Ad eius similique recusandae
          assumenda incidunt, aperiam ex maxime.</p>
        <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Natus similique alias repudiandae, unde dolor, pariatur incidunt fugit
          architecto accusantium impedit voluptatem. Ad eius similique recusandae
          assumenda incidunt, aperiam ex maxime.</p>
        <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Natus similique alias repudiandae, unde dolor, pariatur incidunt fugit
          architecto accusantium impedit voluptatem. Ad eius similique recusandae
          assumenda incidunt, aperiam ex maxime.</p>
        <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Natus similique alias repudiandae, unde dolor, pariatur incidunt fugit
          architecto accusantium impedit voluptatem. Ad eius similique recusandae
          assumenda incidunt, aperiam ex maxime.</p>
        <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Natus similique alias repudiandae, unde dolor, pariatur incidunt fugit
          architecto accusantium impedit voluptatem. Ad eius similique recusandae
          assumenda incidunt, aperiam ex maxime.</p>

        <button className='mx-auto mt-7 p-2 rounded-full border-2 border-rose-300' onClick={() => console.log(`Jalan :)`)}>
          <Image src="/icons/trash.svg" alt="trash Icons" width={35} height={30} />
        </button>
      </article>

    </section>

    <FloatBottomBtn text='Edit' clickFunc={() => dispatch(toggleModal())}>
      <Image src="/icons/edit-note.svg" alt="edit note Icons" width={25} height={25} />
    </FloatBottomBtn>
    <JournalFormModal isEdit={true} />
  </div>
}