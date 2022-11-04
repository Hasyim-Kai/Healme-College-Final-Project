import { pinkGradientBg, tailwindTransition } from "../../styles/TailwindStyle"

type Props = { children: JSX.Element | JSX.Element[] | null, text?: string }

export default function VioletButton({ text = 'Submit', children }: Props) {
  return <button className={`flex gap-5 px-4 py-3 pt-1 text-white rounded-lg text-3xl shadow-lg my-7 hover:scale-110 hover:shadow-xl ${pinkGradientBg} ${tailwindTransition}`}>
    {children}
    <span>{text}</span>
  </button>
}