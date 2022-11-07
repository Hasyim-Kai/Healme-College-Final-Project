import Image from 'next/image'
import { useState } from 'react'
import { useAppDispatch } from '../../../../../app/store';
import { counselingSchedule } from '../../../../model/counseling-schedule';
import { glassCard, pinkGradientText, simpleInput } from '../../../../styles/TailwindStyle';
import UserNavbar from '../UserNavbar';
import SessionCard from './SessionCard';

type Props = { scheduleId: string | string[] }

export default function ScheduleForm({ scheduleId = `1` }: Props) {
  const dispatch = useAppDispatch();
  const [selectedSession, setSelectedSession] = useState<string>('1');
  const handleRadio = (event: any) => { setSelectedSession(event.target.value) }
  const handleSubmit = (event: any) => {
    event.preventDefault()
  }

  return <div className='mx-auto lg:max-w-5xl'>
    <UserNavbar />
    <section className='mt-10'>
      <h1 className={`py-2 text-5xl font-semibold text-center drop-shadow-md ${pinkGradientText}`}>Create Counseling Schedule</h1>

      <form className={`flex flex-col mt-5 mb-16 rounded-xl shadow-xl p-10 mx-5 lg:mx-0 ${glassCard}`} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Gmeet">Gmeet Link</label><br />
          <input className={`bg-transparent ${simpleInput}`} type="text" name="Gmeet" id="Gmeet" placeholder="Enter Gmeet Link here" />
        </div>

        <ul className="mt-5 grid gap-6 w-full grid-cols-1 lg:grid-cols-3">
          {counselingSchedule.map((item: any) => <SessionCard value={item.value} text={item.text} desc={item.desc} checkedRadio={selectedSession} onCangeFunc={handleRadio} key={item.value} />)}
        </ul>

        <button className='mt-12' onClick={() => console.log(`Create :)`)}>
          <Image src="/icons/orchid-circle-check.svg" alt="trash Icons" width={60} height={60} />
        </button>
      </form>

    </section>
  </div>
}