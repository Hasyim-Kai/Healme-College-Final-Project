import Image from 'next/image'
import { tailwindTransition } from '../../../../styles/TailwindStyle'

type Props = { value: string, text: string, desc: string, checkedRadio: string, onCangeFunc: Function }

export default function SessionCard({ value, text, desc, checkedRadio, onCangeFunc }: Props) {
   return <li>
      <input type="radio" id={`choice-${value}`} name="session" value={value} className="hidden peer" checked={checkedRadio === value ? true : false} onChange={(e) => onCangeFunc(e)} required />
      <label htmlFor={`choice-${value}`} className={`inline-flex justify-between items-center p-5 w-full bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-rose-400 peer-checked:text-rose-400 hover:text-gray-600 hover:bg-rose-50/50 ${tailwindTransition}`}>
         <div className="block">
            <div className="text-xl font-semibold">{text}</div>
            <div className="">{desc}</div>
         </div>

         <Image src="/icons/circle-check.svg" alt="circle-check" width={30} height={30} />
      </label>
   </li>
}