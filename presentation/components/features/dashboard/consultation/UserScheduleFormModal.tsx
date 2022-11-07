import { useState } from "react";
import ModalLayout from "../../../../layout/ModalLayout";
import { simpleInput } from "../../../../styles/TailwindStyle";
import VioletButton from "../../../global/VioletButton";

type Props = { isEdit?: boolean }

export default function UserScheduleFormModal({ isEdit = false }: Props) {
  const [wellScore, setWellScore] = useState<number>(50)

  const handleSubmit = () => {
    console.log(`Kumpul bu`)
  }

  return <ModalLayout>
    <form onSubmit={handleSubmit} className='text-gray-600'>
      <div>
        <label htmlFor="Summary">Please Write your Summary beofre apply</label><br />
        <textarea className={simpleInput} name="Summary" id="Summary" cols={70} rows={10} placeholder="Write some Summary .."></textarea>
      </div>

      <VioletButton text={isEdit ? 'Update' : 'Create'} clickFunc={() => console.log(`Jalan :)`)} isCenter={true} />
    </form>
  </ModalLayout>
}