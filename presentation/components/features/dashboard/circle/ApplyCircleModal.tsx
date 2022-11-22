import { useRouter } from "next/router";
import { useState } from "react";
import { selectCircleState, applyCircle } from "../../../../../app/CircleSlice";
import { toggleModal } from "../../../../../app/GlobalSlice";
import { useAppSelector, useAppDispatch } from "../../../../../app/store";
import { selectUserState } from "../../../../../app/UserSlice";
import ModalLayout from "../../../../layout/ModalLayout";
import { pinkGradientBg, pinkGradientText, simpleInput } from "../../../../styles/TailwindStyle";
import Loading from "../../../global/Loading";
import VioletButton from "../../../global/VioletButton";

type Props = { isEdit?: boolean, changeModalFunc?: Function }

export default function ApplyCircleModal({ isEdit = false, changeModalFunc = () => { } }: Props) {
  const router = useRouter()
  const goToMyCircle = () => { router.push('/user/circle/my-circle') }
  const { userInfo } = useAppSelector(selectUserState);
  const circleState = useAppSelector(selectCircleState);
  const dispatch = useAppDispatch();
  const handleApply = async () => {
    await dispatch(applyCircle({ members: circleState.circlesDetail.members, member_name: userInfo.name, id: circleState.circlesDetail.id, filled: circleState.circlesDetail.filled }))
    dispatch(toggleModal())
    goToMyCircle()
  }

  return <ModalLayout>
    {circleState.isLoading ? <Loading additionalStyle="p-24" /> : <section className='text-gray-600 text-center'>
      <h1 className={`text-4xl p-12 font-semibold ${pinkGradientText}`}>Are You Sure <br /> Want to Join <br /> this Circle ?</h1>
      <div className="flex gap-5 justify-center">
        <VioletButton text={'Join'} clickFunc={handleApply} />
      </div>
    </section>}
  </ModalLayout>
}