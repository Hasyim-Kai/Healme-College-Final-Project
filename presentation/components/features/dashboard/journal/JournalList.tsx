import CircleBgAnimation from '../../../global/CircleBgAnimation'
import UserNavbar from '../UserNavbar'
import JournalCard from './JournalCard'

export default function JournalList() {
  const dummy = [1, 2, 3, 4, 5, 6]

  return <div className='mx-auto lg:max-w-5xl'>
    <UserNavbar />
    <section className='grid lg:grid-cols-3 grid-cols-1 gap-6 mt-10'>
      {dummy.map((item, index) => <JournalCard />)}
    </section>
  </div>
}