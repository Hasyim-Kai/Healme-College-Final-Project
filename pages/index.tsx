import type { NextPage } from 'next'
import DefaultLayout from '../presentation/layout/DefaultLayout'
import Navbar from '../presentation/components/features/landing-page/Navbar'
import Hero from '../presentation/components/features/landing-page/Hero'
import Features from '../presentation/components/features/landing-page/Features'
import Footer from '../presentation/components/features/landing-page/Footer'

const Home: NextPage = () => {
  return <DefaultLayout>
    <Navbar />
    <Hero />
    <Features />
    <Footer />
  </DefaultLayout>
}

export default Home