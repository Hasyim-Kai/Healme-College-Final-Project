import Image from 'next/image'
import { pinkGradientBg, pinkGradientText } from '../../../styles/TailwindStyle'

export default function Features() {
    return <article className=''>
        <h1 className={`text-6xl text-center font-semibold mt-28 drop-shadow-lg ${pinkGradientText}`}>Features</h1>
        <div className={`w-52 h-2 mx-auto mt-3 mb-16 drop-shadow-lg rounded-lg ${pinkGradientBg}`}></div>

        <section className='flex flex-wrap justify-center items-center lg:gap-24 my-5'>
            <div className=''>
                <Image className='shadow-2xl' src="/consultation.png" alt="consultation" width={400} height={400} />
            </div>
            <div className='max-w-xs'>
                <p className={`text-5xl font-semibold ${pinkGradientText}`}>Consultation</p>
                <p className={`my-5 text-gray-600`}>Choose the Consultation Schedule with the Professional that fits your time</p>
                <div className={`w-36 h-1 rounded-lg ${pinkGradientBg}`}></div>
            </div>
        </section>

        <section className='flex flex-wrap lg:flex-row-reverse justify-center items-center lg:gap-24 my-5'>
            <div className=''>
                <Image className='shadow-2xl' src="/journal.png" alt="journal" width={400} height={400} />
            </div>
            <div className='max-w-xs'>
                <p className={`text-5xl font-semibold ${pinkGradientText}`}>Journal</p>
                <p className={`my-5 text-gray-600`}>Write down your feeling and track your mental health wellness</p>
                <div className={`w-36 h-1 rounded-lg ${pinkGradientBg}`}></div>
            </div>
        </section>

        <section className='flex flex-wrap justify-center items-center lg:gap-24 my-5'>
            <div className=''>
                <Image className='shadow-2xl' src="/circle.png" alt="consultation" width={400} height={400} />
            </div>
            <div className='max-w-xs'>
                <p className={`text-5xl font-semibold ${pinkGradientText}`}>Circle</p>
                <p className={`my-5 text-gray-600`}>Join a Circle to socialize and share your feeling or support others</p>
                <div className={`w-36 h-1 rounded-lg ${pinkGradientBg}`}></div>
            </div>
        </section>
    </article>
}