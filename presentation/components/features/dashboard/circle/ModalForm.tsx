import { useState } from "react";
import ModalLayout from "../../../../layout/ModalLayout";
import { simpleInput } from "../../../../styles/TailwindStyle";
import VioletButton from "../../../global/VioletButton";

type Props = { isEdit?: boolean }

export default function ModalForm({ isEdit = false }: Props) {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const type = e.nativeEvent.submitter.innerText
    if (type === `Create`) {
      console.log(`Buatt lah`)
    } else if (type === `Update`) {
      console.log(`Update ini ya`)
    } else if (type === `Delete`) {
      console.log(`Hapus`)
    }
  }

  return <ModalLayout>
    <form onSubmit={handleSubmit} className='text-gray-600'>
      <div>
        <label htmlFor="circleName">Circle Name</label><br />
        <input className={simpleInput} type="text" name="circleName" id="circleName" placeholder="Enter the Circle Name" />
      </div>

      <div className="flex flex-wrap items-center gap-10">
        <div className="w-3/5">
          <label htmlFor="Gmeet">Gmeet Link</label><br />
          <input className={simpleInput} type="text" name="Gmeet" id="Gmeet" placeholder="Enter Gmeet Link here" />
        </div>

        <div className="w-1/5">
          <label htmlFor="capacity">Capacity</label><br />
          <input className={simpleInput} type="number" name="capacity" id="capacity" placeholder="Enter Circle's capacity here" />
        </div>
      </div>

      <div>
        <label htmlFor="desc">Desc</label><br />
        <textarea className={simpleInput} name="desc" id="desc" cols={70} rows={10} placeholder="Write down your feelings .."></textarea>
      </div>
      <div className="flex gap-5 justify-center">
        <VioletButton text={isEdit ? 'Update' : 'Create'} />
        {isEdit && <VioletButton text={'Delete'} />}
      </div>
    </form>
  </ModalLayout>
}