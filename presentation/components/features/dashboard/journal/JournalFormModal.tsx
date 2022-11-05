import { useState } from "react";
import ModalLayout from "../../../../layout/ModalLayout";
import { simpleInput } from "../../../../styles/TailwindStyle";
import VioletButton from "../../../global/VioletButton";

type Props = { isEdit?: boolean }

export default function JournalFormModal({ isEdit = false }: Props) {
  const [wellScore, setWellScore] = useState<number>(50)

  const handleSubmit = () => {
    console.log(`Kumpul bu`)
  }

  return <ModalLayout>
    <form onSubmit={handleSubmit} className='text-gray-600'>
      <div>
        <label htmlFor="title">Title</label><br />
        <input className={simpleInput} type="text" name="title" id="title" placeholder="Write your title here" />
      </div>

      <div>
        <label htmlFor="desc">Desc</label><br />
        <textarea className={simpleInput} name="desc" id="desc" cols={70} rows={10} placeholder="Write down your feelings .."></textarea>
      </div>

      <div>
        <label htmlFor="minmax-range" className="">How Good is your current wellness ?</label><br />
        <input id="minmax-range" type="range" min="0" max="100" onChange={(e) => setWellScore(Number(e.target.value))}
          className="mb-7 w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer" />
      </div>

      <VioletButton text={isEdit ? 'Update' : 'Create'} clickFunc={() => console.log(`Jalan :)`)} isCenter={true} />
    </form>
  </ModalLayout>
}