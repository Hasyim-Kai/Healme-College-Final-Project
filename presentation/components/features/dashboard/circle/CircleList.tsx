import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getAllCircle, getMyCircle, selectCircleState } from '../../../../../app/CircleSlice'
import { toggleModal } from '../../../../../app/GlobalSlice'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { selectUserState } from '../../../../../app/UserSlice'
import Empty from '../../../global/Empty'
import FloatBottomBtn from '../../../global/FloatBottomBtn'
import Loading from '../../../global/Loading'
import ApplyCircleModal from './ApplyCircleModal'
import CircleCard from './CircleCard'
import ModalForm from './ModalForm'

type Props = { isAll?: boolean }

export default function CircleList({ isAll = true }: Props) {
  const [activeModal, setActiveModal] = useState<string>(`form`)
  const openApplyModal = () => { setActiveModal(`apply`); dispatch(toggleModal()) }
  const openFormModal = () => { setActiveModal(`form`); dispatch(toggleModal()) }

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectUserState);
  const circleState = useAppSelector(selectCircleState);
  useEffect(() => { isAll ? dispatch(getAllCircle()) : dispatch(getMyCircle(userInfo.email)) }, [])

  return <div className='mx-auto lg:max-w-5xl'>
    <section className='grid lg:grid-cols-3 grid-cols-1 gap-8 mt-10'>
      {circleState.isLoading ? <Loading additionalStyle='lg:col-span-3' />
        : circleState.circles.length < 1 ? <Empty additionalstyle='lg:col-span-3' />
          : circleState.circles.map((item, index) => <CircleCard item={item} key={index} />)}
    </section>

    {!isAll && <>
      <FloatBottomBtn text='Create' clickFunc={openFormModal}>
        <b>+</b>
      </FloatBottomBtn>
      <ModalForm />
    </>}
  </div>
}