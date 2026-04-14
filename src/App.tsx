import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Shield, Code, Command, Github, Instagram, Linkedin } from 'lucide-react';

// Internal Component Imports
import HeroCanvas from './components/canvas/HeroCanvas';
import FutureTimeline from './components/sections/FutureTimeline';
import SpeedSimulator from './components/sections/SpeedSimulator';
import SmartContact from './components/sections/SmartContact';
import ExperienceSimulator from './components/sections/ExperienceSimulator';
import TrustEngine from './components/sections/TrustEngine';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-luxury-white">
      {/* Right Side Rail Text */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-12">
        <div className="w-[1px] h-24 bg-luxury-gray-light" />
        <span className="font-serif text-[10px] uppercase tracking-[0.5em] text-luxury-gray-soft vertical-text whitespace-nowrap opacity-30">
          Aashish Web Designer
        </span>
        <div className="w-[1px] h-24 bg-luxury-gray-light" />
      </div>

      {/* Navigation */}
      <nav id="main-nav" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-12 py-8 flex justify-between items-center ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-6 shadow-sm' : 'bg-transparent'
      }`}>
        <motion.a 
          href="#"
          whileHover="hover"
          className="flex items-center gap-4 group cursor-pointer"
        >
          <motion.div 
            variants={{
              hover: { backgroundColor: '#C6A969' }
            }}
            className="w-8 h-8 bg-luxury-black flex items-center justify-center font-serif text-white text-sm transition-colors duration-500"
          >
            A
          </motion.div>
          <span className="font-serif font-bold text-lg tracking-widest uppercase text-luxury-black group-hover:text-luxury-gold transition-colors duration-500">
            Aashish <span className="text-luxury-gold group-hover:text-luxury-black transition-colors duration-500">Web Designer</span>
          </span>
        </motion.a>
        <div className="hidden lg:flex items-center gap-8 xl:gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-black">
          <a href="#experience-sim" className="hover:text-luxury-gold transition-colors relative group py-2">
            Expertise
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 ease-out group-hover:w-full" />
          </a>
          <a href="#timeline" className="hover:text-luxury-gold transition-colors relative group py-2">
            Methodology
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 ease-out group-hover:w-full" />
          </a>
          <a href="#speed-sim" className="hover:text-luxury-gold transition-colors relative group py-2">
            Performance
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 ease-out group-hover:w-full" />
          </a>
          <motion.a 
            href="#contact" 
            whileHover={{ 
              scale: 1.02, 
              backgroundColor: '#141414', 
              color: '#FFFFFF',
              boxShadow: '0 10px 20px -10px rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="px-8 xl:px-10 py-4 border border-luxury-black"
          >
            Inquire
          </motion.a>
          <div className="h-4 w-[1px] bg-luxury-gray-light mx-2 hidden xl:block" />
          <span className="font-serif italic text-luxury-gold lowercase tracking-wider hidden xl:block opacity-60">aashish web designer</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <HeroCanvas />
        <div className="relative z-10 max-w-5xl space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.5em] text-luxury-gold mb-4"
          >
            Established MMXXVI
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-9xl font-bold leading-[0.9] tracking-tighter text-luxury-black font-serif italic"
          >
            Digital <br />
            <span className="text-luxury-gold not-italic">Excellence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl text-luxury-gray-soft max-w-2xl mx-auto font-light leading-relaxed"
          >
            Crafting bespoke digital architectures for the world's most distinguished enterprises. High-performance engineering meets timeless aesthetic.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-wrap justify-center gap-8 pt-8"
          >
            <motion.a 
              href="#contact" 
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: '#C6A969',
                boxShadow: '0 20px 40px -15px rgba(198, 169, 105, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="px-14 py-6 bg-luxury-black text-white font-bold text-[10px] uppercase tracking-[0.4em] shadow-2xl"
            >
              Start Consultation
            </motion.a>
            <motion.a 
              href="#experience-sim" 
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: '#141414', 
                color: '#FFFFFF',
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="px-14 py-6 border border-luxury-black text-luxury-black font-bold text-[10px] uppercase tracking-[0.4em]"
            >
              View Portfolios
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-luxury-gray-soft opacity-30"
        >
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-luxury-black to-transparent" />
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="relative z-10">
        <TrustEngine />
        <ExperienceSimulator />
        <FutureTimeline />
        <SpeedSimulator />
        <SmartContact />
      </main>

      {/* Footer */}
      <footer id="main-footer" className="py-24 px-12 bg-white border-t border-luxury-gray-light">
        <div className="container-wide flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6 max-w-sm">
            <motion.div 
              whileHover={{ color: '#C6A969' }}
              className="font-serif font-bold text-2xl tracking-widest uppercase cursor-pointer transition-colors duration-500"
            >
              AASHISH <span className="text-luxury-gold hover:text-luxury-black transition-colors duration-500">WEB DESIGN</span>
            </motion.div>
            <p className="text-luxury-gray-soft text-sm font-light leading-relaxed">Redefining the digital landscape through precision engineering and curated design. Based globally, serving the elite.</p>
            <p className="text-luxury-gray-soft text-[10px] uppercase tracking-widest">© 2026 Aashish Web Designer. All Rights Reserved.</p>
          </div>
          <div className="grid grid-cols-2 gap-24">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-black">Navigation</h4>
              <ul className="space-y-4 text-sm text-luxury-gray-soft font-light">
                <li><motion.a whileHover={{ x: 5, color: '#C6A969' }} href="#experience-sim" className="inline-block transition-colors">Expertise</motion.a></li>
                <li><motion.a whileHover={{ x: 5, color: '#C6A969' }} href="#timeline" className="inline-block transition-colors">Methodology</motion.a></li>
                <li><motion.a whileHover={{ x: 5, color: '#C6A969' }} href="#speed-sim" className="inline-block transition-colors">Performance</motion.a></li>
                <li><motion.a whileHover={{ x: 5, color: '#C6A969' }} href="#contact" className="inline-block transition-colors">Consultation</motion.a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-black">Connect</h4>
              <ul className="space-y-4">
                <li>
                  <motion.a 
                    whileHover={{ x: 5, color: '#C6A969', fontWeight: 700 }} 
                    href="https://github.com/aashish1876" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-luxury-gray-soft font-light transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    whileHover={{ x: 5, color: '#C6A969', fontWeight: 700 }} 
                    href="https://www.instagram.com/imyour._aash/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-luxury-gray-soft font-light transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    whileHover={{ x: 5, color: '#C6A969', fontWeight: 700 }} 
                    href="https://www.linkedin.com/in/matta-venakata-aashish-kumar-yadav-584b24357?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-luxury-gray-soft font-light transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </motion.a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
