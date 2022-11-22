import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toggleModal } from '../../../../../app/GlobalSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/store';
import { glassCard, pinkGradientBg, pinkGradientText } from '../../../../styles/TailwindStyle';
import { checCircleOwnership, checkCapacity, checkUserMembership, delCircle, leaveCircle, selectCircleState } from '../../../../../app/CircleSlice';
import { selectUserState } from "../../../../../app/UserSlice";
import FloatBottomBtn from '../../../global/FloatBottomBtn';
import ApplyCircleModal from './ApplyCircleModal';
import ModalForm from './ModalForm';

type Props = { isCounselor?: boolean }

export default function CircleDetail({ isCounselor = false }: Props) {
  const [activeModal, setActiveModal] = useState<string>(`formEdit`)
  const openApplyModal = () => { setActiveModal(`apply`); dispatch(toggleModal()) }
  const openFormEditModal = () => { setActiveModal(`formEdit`); dispatch(toggleModal()) }

  const router = useRouter()
  const goToSchedules = () => { router.push('/user/circle') }

  const { userInfo } = useAppSelector(selectUserState);
  const circleState = useAppSelector(selectCircleState);
  const dispatch = useAppDispatch();
  const handleDel = async () => {
    await dispatch(delCircle(circleState.circlesDetail.id))
    goToSchedules()
  }

  const handleLeave = async () => {
    await dispatch(leaveCircle({ members: circleState.circlesDetail.members, member_name: userInfo.name, id: circleState.circlesDetail.id, filled: circleState.circlesDetail.filled }))
    goToSchedules()
  }

  useEffect(() => {
    dispatch(checCircleOwnership(userInfo.name))
    dispatch(checkUserMembership(userInfo.name))
    dispatch(checkCapacity())
  }, [])

  return <div className='mx-auto lg:max-w-6xl'>
    <section className='mt-10 grid lg:grid-cols-4 grid-cols-1 gap-6 mb-16'>

      <div className={`flex flex-col gap-5`}>
        <div className={`px-7 text-center py-10 rounded-xl shadow-xl ${glassCard}`}>
          <h1 className='text-2xl font-semibold mb-1'>{circleState.circlesDetail.name}</h1>

          <div className={`w-11/12 h-1 my-5 rounded-lg mx-auto ${pinkGradientBg}`}></div>

          <h1 className={`text-8xl font-light ${pinkGradientText}`}>{circleState.circlesDetail.filled}</h1>
          <h1 className='mt-3 text-lg text-gray-500'>Member by {circleState.circlesDetail.capacity}</h1>
        </div>

        {(circleState.isMine || circleState.amIMember) && <div className={`flex justify-center p-7 rounded-xl shadow-xl cursor-pointer ${glassCard}`}>
          <Link href={circleState.circlesDetail.gmeetLink}>
            <Image alt="gmeet Photo" src='/img/gmeet.png' width={240} height={50} priority />
          </Link>
        </div>}

        {(!circleState.isMine && !circleState.isFull && !circleState.amIMember) && <button className={`flex justify-center p-5 rounded-xl shadow-xl ${glassCard}`} onClick={circleState.amIMember ? handleLeave : openApplyModal}>
          <span className={`text-3xl font-semibold ${pinkGradientText}`}>Apply Here</span>
        </button>}

        {(!circleState.isMine && circleState.amIMember) && <button className={`flex justify-center p-5 rounded-xl shadow-xl ${glassCard}`} onClick={circleState.amIMember ? handleLeave : openApplyModal}>
          <span className={`text-3xl font-semibold ${pinkGradientText}`}>Leave Circle</span>
        </button>}
      </div>

      <article className={`col-span-2 flex flex-col rounded-xl shadow-xl p-10 mx-5 lg:mx-0 ${glassCard}`}>

        <h1 className='text-3xl font-semibold text-center'>Desc</h1>
        <div className={`w-11/12 h-1 my-5 rounded-lg mx-auto ${pinkGradientBg}`}></div>
        <p className='text-lg'>{circleState.circlesDetail.desc}</p>
        {circleState.isMine && <p className='text-center text-gray-500 mt-auto'><i>Circle made by You</i></p>}

        {isCounselor && <button className='mx-auto mt-12 p-2 rounded-full border-2 border-rose-300' onClick={handleDel}>
          <Image src="/icons/trash.svg" alt="trash Icons" width={35} height={30} />
        </button>}
      </article>

      <aside className={`flex flex-col rounded-xl shadow-xl p-10 mx-5 lg:mx-0 ${glassCard}`}>
        <h2 className='text-center text-2xl font-semibold'>Members</h2>
        <div className={`w-11/12 h-1 my-5 rounded-lg mx-auto ${pinkGradientBg}`}></div>
        <ul className='flex flex-col gap-2 items-center'>
          {circleState.circlesDetail.members.map((user: any, index: any) => <li key={index}>{user}</li>)}
        </ul>
      </aside>

    </section>

    {circleState.isMine && <FloatBottomBtn text='Edit' clickFunc={openFormEditModal} >
      <Image src="/icons/edit-note.svg" alt="edit note Icons" width={25} height={25} />
    </FloatBottomBtn>}
    {activeModal === `formEdit` ? <ModalForm isEdit={true} /> : <ApplyCircleModal />}
  </div>
}