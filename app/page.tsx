import Nav           from './components/Nav'
import Hero          from './components/Hero'
import ServicesBento from './components/ServicesBento'
import Work          from './components/Work'
import Process       from './components/Process'
import Testimonials  from './components/Testimonials'
import ToolsStrip    from './components/ToolsStrip'
import CTA           from './components/CTA'
import Footer        from './components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ServicesBento />
        <Work />
        <Process />
        <Testimonials />
        <ToolsStrip />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
