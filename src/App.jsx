import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import BusinessCards from './components/BusinessCards'
import Footer from './components/Footer'
import useReveal from './hooks/useReveal'

export default function App() {
  useReveal()
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <BusinessCards />
      </main>
      <Footer />
    </div>
  )
}
