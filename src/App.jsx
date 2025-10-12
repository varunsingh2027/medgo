import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ThirdSection from './components/ThirdSection';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
//import BackendStatus from './components/BackendStatus';
import './App.css';
import Certifications from './components/Certifications';
import GlobalPresence from './components/GlobalPresence';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
             <About />
        <AboutSection />
        <Certifications />
        <ThirdSection />
        <GlobalPresence />

        <Services />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
