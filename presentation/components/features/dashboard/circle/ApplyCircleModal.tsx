import { useState } from "react";
import ModalLayout from "../../../../layout/ModalLayout";
import { pinkGradientBg, pinkGradientText, simpleInput } from "../../../../styles/TailwindStyle";
import VioletButton from "../../../global/VioletButton";

type Props = { isEdit?: boolean, changeModalFunc?: Function }

export default function ApplyCircleModal({ isEdit = false, changeModalFunc = () => { } }: Props) {
  const handleApply = () => { console.log(`Join ahh`) }
  const handleGotoGmeet = () => { console.log(`Join Gmeet`) }

  return <ModalLayout>
    <section className='text-gray-600 text-center'>
      <h1 className={`text-3xl font-semibold ${pinkGradientText}`}>Name</h1>
      <h4 className="mb-3">Capacity</h4>
      <div className={`w-2/3 h-1 rounded-lg mx-auto ${pinkGradientBg}`}></div>
      <p className="mt-5 mb-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim itaque laborum accusantium, consequuntur distinctio obcaecati, nesciunt magni alias vel possimus voluptatem excepturi? Culpa perspiciatis obcaecati doloribus sint deserunt illo saepe!</p>

      <div className="flex gap-5 justify-center">
        <VioletButton text={'Join'} clickFunc={handleApply} />
        <VioletButton text={'Go to Gmeet'} clickFunc={handleApply} />
        <VioletButton text={'Edit'} clickFunc={changeModalFunc} />
      </div>
    </section>
  </ModalLayout>
}