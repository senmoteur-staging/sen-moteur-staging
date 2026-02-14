import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VINDecoder from './components/VINDecoder'
import WarrantySection from './components/WarrantySection'
import QualityAssurance from './components/QualityAssurance'
import Logistics from './components/Logistics'
import ContactFooter from './components/ContactFooter'
import './index.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <VINDecoder />
        <WarrantySection />
        <QualityAssurance />
        <Logistics />
      </main>
      <ContactFooter />
    </div>
  )
}

export default App
