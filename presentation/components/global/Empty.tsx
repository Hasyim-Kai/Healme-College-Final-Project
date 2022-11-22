import Image from 'next/image'

type Props = { additionalstyle?: string }

export default function Empty({ additionalstyle = '' }: Props) {
  return <div className={`mt-10 flex flex-col items-center ${additionalstyle}`}>
    <Image src="/img/empty.png" alt="Data Not Found" width={400} height={280} placeholder="blur" blurDataURL='/img/blur-placeholder.png' />
    <h1 className={`text-2xl font-semibold text-gray-400`}>Currently It&#39;s Empty</h1>
  </div>
}