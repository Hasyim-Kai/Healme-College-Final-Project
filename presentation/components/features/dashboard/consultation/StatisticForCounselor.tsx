import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { pinkGradientBg } from '../../../../styles/TailwindStyle';
ChartJS.register(ArcElement, Tooltip, Legend);

interface props {
  title: string
  allConsultation: number
  appliedConsultation: number
}

export default function StatisticForCounselor({ title, allConsultation, appliedConsultation }: props) {
  const chartLabel = ['All Consultation', 'Applied'];

  return <div className={`rounded-lg shadow-lg bg-white bg-opacity-10 backdrop-blur-lg overflow-hidden`}>
    <h1 className='p-3 text-center text-xl font-medium'>{title}</h1>
    <div className='w-full h-80 px-7 pb-7 flex items-center justify-evenly gap-5'>
      <Doughnut data={{
        labels: chartLabel,
        datasets: [
          {
            label: '# of Votes',
            data: [allConsultation, appliedConsultation],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.4)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }} />
      <h1 className='text-8xl text-gray-500 font-medium'>
        <span>{appliedConsultation}</span><br />
        <div className={`w-16 h-1.5 rounded-lg ${pinkGradientBg}`}></div>
        <span>{allConsultation}</span>
      </h1>
    </div>
  </div>
}