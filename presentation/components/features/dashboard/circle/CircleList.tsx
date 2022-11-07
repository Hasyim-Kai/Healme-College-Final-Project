import { useState } from 'react'
import { toggleModal } from '../../../../../app/GlobalSlice'
import { useAppDispatch } from '../../../../../app/store'
import FloatBottomBtn from '../../../global/FloatBottomBtn'
import UserNavbar from '../UserNavbar'
import ApplyCircleModal from './ApplyCircleModal'
import CircleCard from './CircleCard'
import ModalForm from './ModalForm'

export default function CircleList() {
  const dispatch = useAppDispatch();
  const [activeModal, setActiveModal] = useState<string>(`form`)
  const openApplyModal = () => { setActiveModal(`apply`); dispatch(toggleModal()) }
  const openFormModal = () => { setActiveModal(`form`); dispatch(toggleModal()) }
  const dummy = [1, 2, 3, 4, 5, 6]

  return <div className='mx-auto lg:max-w-5xl'>
    <UserNavbar />
    <section className='grid lg:grid-cols-3 grid-cols-1 gap-8 mt-10'>
      {dummy.map((item, index) => <CircleCard openModalFunc={openApplyModal} key={index} />)}
    </section>

    <FloatBottomBtn text='Create' clickFunc={openFormModal} >
      <b>+</b>
    </FloatBottomBtn>
    {activeModal === `form` ? <ModalForm />
      : activeModal === `formEdit` ? <ModalForm isEdit={true} />
        : <ApplyCircleModal changeModalFunc={() => { setActiveModal(`formEdit`) }} />}
  </div>
}