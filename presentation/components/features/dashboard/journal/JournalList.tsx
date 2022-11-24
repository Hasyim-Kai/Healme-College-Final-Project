import Image from 'next/image'
import { useEffect } from 'react';
import { toggleModal } from '../../../../../app/GlobalSlice';
import { getJournals, selectJournalState } from '../../../../../app/JournalSlice';
import { selectScheduleState } from '../../../../../app/ScheduleSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/store';
import { selectUserState } from '../../../../../app/UserSlice';
import Empty from '../../../global/Empty';
import FloatBottomBtn from '../../../global/FloatBottomBtn';
import Loading from '../../../global/Loading';
import JournalCard from './JournalCard'
import JournalFormModal from './JournalFormModal';

export default function JournalList({isCounselor = false}: {isCounselor?: boolean}) {
  const dispatch = useAppDispatch();
  const scheduleState = useAppSelector(selectScheduleState);
  const journalState = useAppSelector(selectJournalState);
  const { userInfo } = useAppSelector(selectUserState);
  useEffect(() => { isCounselor 
    ? dispatch(getJournals(scheduleState.scheduleDetail?.patient_email)) 
    : dispatch(getJournals(userInfo.email)) }, [])

  return <div className='mx-auto lg:max-w-5xl'>
    <section className='grid lg:grid-cols-3 grid-cols-1 gap-6 mt-10'>
      {journalState.isLoading ? <Loading additionalStyle='lg:col-span-3' />
        : journalState.journals.length < 1 ? <Empty additionalstyle='lg:col-span-3' />
          : journalState.journals.map((item, index) => <JournalCard item={item} key={index} />)}
    </section>

    {!isCounselor && <><FloatBottomBtn text='Create' clickFunc={() => dispatch(toggleModal())}>
      <Image src="/icons/edit-note.svg" alt="edit note Icons" width={25} height={25} />
    </FloatBottomBtn>
    <JournalFormModal /></>}
  </div>
}