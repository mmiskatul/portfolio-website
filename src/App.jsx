import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="container mx-auto px-4 py-5">
       <Hero />
       <About/>
       <Projects/>
       <Skills/>
       {/* contact componet */}
      </main>
      <Footer/>
    </div>
  )
}

export default App