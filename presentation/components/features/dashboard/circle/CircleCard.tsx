import { cardHover, pinkGradientBg } from '../../../../styles/TailwindStyle'
type Props = { openModalFunc: Function }

export default function CircleCard({ openModalFunc }: Props) {
  return <div className={`text-center rounded-full shadow-lg shadow-rose-200 h-40 bg-white bg-opacity-10 backdrop-blur-lg ${cardHover}`}
    onClick={() => openModalFunc()}>
    <p className={`text-2xl font-medium mt-6`}>Name</p>
    <div className={`w-2/3 h-1 rounded-lg mx-auto ${pinkGradientBg}`}></div>
    <p className={`text-sm mb-1`}>capacity</p>
    <p className={`text-lg`}>Desc</p>
  </div>
}