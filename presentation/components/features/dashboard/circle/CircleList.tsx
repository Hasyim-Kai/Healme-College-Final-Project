import { useEffect, useState } from 'react'
import { getAllCircle, getMyCircle, selectCircleState } from '../../../../../app/CircleSlice'
import { toggleModal } from '../../../../../app/GlobalSlice'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { selectUserState } from '../../../../../app/UserSlice'
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
      {circleState.isLoading ? <Loading additionalStyle='col-span-3' />
        : circleState.circles.map((item, index) => <CircleCard item={item} openModalFunc={openApplyModal} key={index} />)}
    </section>

    <FloatBottomBtn text='Create' clickFunc={openFormModal} >
      <b>+</b>
    </FloatBottomBtn>
    {activeModal === `form` ? <ModalForm />
      : activeModal === `formEdit` ? <ModalForm isEdit={true} />
        : <ApplyCircleModal changeModalFunc={() => { setActiveModal(`formEdit`) }} />}
  </div>
}