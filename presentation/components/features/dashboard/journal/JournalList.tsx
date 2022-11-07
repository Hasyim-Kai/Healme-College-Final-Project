import Image from 'next/image'
import { toggleModal } from '../../../../../app/GlobalSlice';
import { useAppDispatch } from '../../../../../app/store';
import FloatBottomBtn from '../../../global/FloatBottomBtn';
import UserNavbar from '../UserNavbar'
import JournalCard from './JournalCard'
import JournalFormModal from './JournalFormModal';

export default function JournalList() {
  const dispatch = useAppDispatch();
  const dummy = [1, 2, 3, 4, 5, 6]

  return <div className='mx-auto lg:max-w-5xl'>
    <UserNavbar />
    <section className='grid lg:grid-cols-3 grid-cols-1 gap-6 mt-10'>
      {dummy.map((item, index) => <JournalCard />)}
    </section>

    <FloatBottomBtn text='Create' clickFunc={() => dispatch(toggleModal())}>
      <Image src="/icons/edit-note.svg" alt="edit note Icons" width={25} height={25} />
    </FloatBottomBtn>
    <JournalFormModal />
  </div>
}