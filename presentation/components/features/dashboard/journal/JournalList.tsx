import Image from 'next/image'
import { useEffect } from 'react';
import { toggleModal } from '../../../../../app/GlobalSlice';
import { getJournals, selectJournalState } from '../../../../../app/JournalSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/store';
import { selectUserState } from '../../../../../app/UserSlice';
import FloatBottomBtn from '../../../global/FloatBottomBtn';
import Loading from '../../../global/Loading';
import JournalCard from './JournalCard'
import JournalFormModal from './JournalFormModal';

export default function JournalList() {
  const dispatch = useAppDispatch();
  const journalState = useAppSelector(selectJournalState);
  const { userInfo } = useAppSelector(selectUserState);

  useEffect(() => {
    dispatch(getJournals(userInfo.email))
  }, [])

  return <div className='mx-auto lg:max-w-5xl'>
    <section className='grid lg:grid-cols-3 grid-cols-1 gap-6 mt-10'>
      {journalState.isLoading ? <Loading additionalStyle='col-span-3' />
        : journalState.journals.map((item, index) => <JournalCard item={item} key={index} />)}
    </section>

    <FloatBottomBtn text='Create' clickFunc={() => dispatch(toggleModal())}>
      <Image src="/icons/edit-note.svg" alt="edit note Icons" width={25} height={25} />
    </FloatBottomBtn>
    <JournalFormModal />
  </div>
}