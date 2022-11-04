import UserNavbar from '../UserNavbar'
import CircleCard from './CircleCard'

export default function CircleList() {
  const dummy = [1, 2, 3, 4, 5, 6]

  return <div className='mx-auto lg:max-w-5xl'>
    <UserNavbar />
    <section className='grid lg:grid-cols-3 grid-cols-1 gap-8 mt-10'>
      {dummy.map((item, index) => <CircleCard />)}
    </section>
  </div>
}