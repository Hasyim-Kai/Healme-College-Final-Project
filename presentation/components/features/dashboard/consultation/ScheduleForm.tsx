import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { createSchedule, selectScheduleState } from '../../../../../app/ScheduleSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/store';
import { selectUserState } from '../../../../../app/UserSlice';
import { counselingSchedule } from '../../../../model/counseling-schedule';
import { glassCard, pinkGradientText, simpleInput } from '../../../../styles/TailwindStyle';
import SessionCard from './SessionCard';

type Props = { scheduleId: string | string[], isEdit?: boolean }

export default function ScheduleForm({ scheduleId = `1`, isEdit = false }: Props) {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectUserState);
  const scheduleState = useAppSelector(selectScheduleState);

  const [gmeetLink, setGmeetLink] = useState<string>('#');
  const handleGmeetLink = (event: any) => { setGmeetLink(event.target.value) }
  const [session, setSession] = useState<string>('1');
  const handleRadio = (event: any) => { setSession(event.target.value) }

  const goToMySchedule = () => { router.push('/counselor/counseling') }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const type = event.nativeEvent.submitter.id
    if (id !== `edit`) {
      await dispatch(createSchedule({ counselor_email: userInfo.email, counselor_name: userInfo.name, gmeetLink, session }))
    } else if (id === `edit`) {
      // await dispatch(createSchedule({ counselor_email: userInfo.email, counselor_name: userInfo.name, gmeetLink, session }))
      console.log({ counselor_email: userInfo.email, counselor_name: userInfo.name, gmeetLink, session })
    }
    goToMySchedule()
  }

  return <div className='mx-auto lg:max-w-5xl'>
    <section className='mt-10'>
      <h1 className={`py-2 text-5xl font-semibold text-center drop-shadow-md ${pinkGradientText}`}>Create Counseling Schedule</h1>

      <form className={`flex flex-col mt-5 mb-16 rounded-xl shadow-xl p-10 mx-5 lg:mx-0 ${glassCard}`} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Gmeet">Gmeet Link</label><br />
          <input className={`bg-transparent ${simpleInput}`} type="text" name="Gmeet" id="Gmeet" placeholder="Enter Gmeet Link here" onChange={handleGmeetLink} required />
        </div>

        <ul className="mt-5 grid gap-6 w-full grid-cols-1 lg:grid-cols-3">
          {counselingSchedule.map((item: any) => <SessionCard value={item.value} text={item.text} desc={item.desc} checkedRadio={session} onCangeFunc={handleRadio} key={item.value} />)}
        </ul>

        <button className='mt-12' id='create'>
          <Image src="/icons/orchid-circle-check.svg" alt="trash Icons" width={60} height={60} />
        </button>
      </form>

    </section>
  </div>
}