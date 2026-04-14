import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Rocket, Dumbbell, User, ShoppingBag, ArrowRight } from 'lucide-react';

const THEMES = [
  { id: 'hospitality', name: 'Hospitality', icon: Utensils, color: '#C6A969', bg: 'bg-[#C6A969]/5', text: 'The Art of Fine Dining' },
  { id: 'enterprise', name: 'Enterprise', icon: Rocket, color: '#0A0A0A', bg: 'bg-black/5', text: 'Architecting Digital Authority' },
  { id: 'wellness', name: 'Wellness', icon: Dumbbell, color: '#C6A969', bg: 'bg-[#C6A969]/5', text: 'Elevated Personal Growth' },
  { id: 'curated', name: 'Curated', icon: User, color: '#0A0A0A', bg: 'bg-black/5', text: 'Bespoke Digital Identity' },
  { id: 'boutique', name: 'Boutique', icon: ShoppingBag, color: '#C6A969', bg: 'bg-[#C6A969]/5', text: 'Luxury Commerce Redefined' },
];

export default function ExperienceSimulator() {
  const [activeTheme, setActiveTheme] = useState(THEMES[1]);

  return (
    <section className="section-padding bg-[#F7F7F5]" id="experience-sim">
      <div className="container-wide">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-luxury-black">Industry Expertise</h2>
          <p className="text-luxury-gray-soft text-lg max-w-2xl mx-auto font-light">Tailoring digital excellence for the world's most discerning brands.</p>
        </div>

        <div className="grid lg:grid-cols-[350px_1fr] gap-16 items-center">
          <div className="space-y-6">
            {THEMES.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => setActiveTheme(theme)}
                whileHover="hover"
                className={`w-full p-6 rounded-none flex items-center gap-6 transition-all duration-500 border-b ${
                  activeTheme.id === theme.id 
                    ? 'border-luxury-gold bg-white shadow-sm' 
                    : 'border-transparent opacity-40 hover:opacity-100'
                }`}
              >
                <motion.div 
                  variants={{ hover: { x: 10 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex items-center gap-6"
                >
                  <theme.icon className={`w-5 h-5 ${activeTheme.id === theme.id ? 'text-luxury-gold' : 'text-luxury-black'}`} />
                  <span className="font-medium tracking-widest uppercase text-xs">{theme.name}</span>
                </motion.div>
              </motion.button>
            ))}
          </div>

          <div className="relative aspect-[16/10] min-h-[400px] rounded-none overflow-hidden bg-white shadow-2xl border border-luxury-gray-light p-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full h-full flex flex-col items-center justify-center p-8 md:p-16 text-center relative overflow-hidden`}
              >
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-10 w-full">
                  <activeTheme.icon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-20" />
                  <h3 className="text-4xl md:text-6xl font-bold leading-tight text-luxury-black italic font-serif">{activeTheme.text}</h3>
                  <p className="text-base md:text-lg text-luxury-gray-soft max-w-xl mx-auto font-light leading-relaxed">
                    We create premium digital experiences for {activeTheme.name.toLowerCase()} leaders, focused on prestige and performance.
                  </p>
                  <div className="pt-4 md:pt-8">
                    <motion.a 
                      href="#contact"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: '#141414', 
                        color: '#FFFFFF',
                        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="inline-block px-8 md:px-12 py-4 md:py-5 border border-luxury-black text-luxury-black uppercase tracking-[0.3em] text-[10px] font-bold transition-colors duration-500"
                    >
                      Inquire Now
                    </motion.a>
                  </div>
                </div>

                <div className="mt-auto pt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-12 text-[9px] font-medium tracking-[0.2em] uppercase text-luxury-gray-soft opacity-50">
                  <span>Sector: {activeTheme.id}</span>
                  <span className="hidden sm:block w-[1px] h-2 bg-luxury-gray-light" />
                  <span>Standard: Tier 1</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
