import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Summaries from './components/Summaries'
import Flow from './components/Flow'
import Traceability from './components/Traceability'
import Footer from './components/Footer'
import useReveal from './hooks/useReveal'

export default function App() {
  useReveal()
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Summaries />
        <Flow />
        <Traceability />
      </main>
      <Footer />
    </div>
  )
}
