import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Lightbulb, PenTool, Code, Rocket, BarChart } from 'lucide-react';

const STEPS = [
  { title: "Conceptualization", desc: "Defining the strategic vision and digital essence of your brand.", icon: Lightbulb, color: "#C6A969" },
  { title: "Bespoke Design", desc: "Crafting timeless visual languages that resonate with authority.", icon: PenTool, color: "#C6A969" },
  { title: "Precision Engineering", desc: "Building robust architectures with uncompromising attention to detail.", icon: Code, color: "#C6A969" },
  { title: "Curated Launch", desc: "Deploying your vision to the global stage with seamless execution.", icon: Rocket, color: "#C6A969" },
  { title: "Strategic Evolution", desc: "Continuous refinement to maintain your digital competitive edge.", icon: BarChart, color: "#C6A969" }
];

export default function FutureTimeline() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="section-padding bg-white relative" id="timeline">
      <div className="container-wide">
        <div className="text-center mb-32">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-luxury-black">The Methodology</h2>
          <p className="text-luxury-gray-soft text-lg max-w-xl mx-auto font-light">A disciplined approach to digital excellence.</p>
        </div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-luxury-gray-light -translate-x-1/2" />
          <motion.div 
            style={{ scaleY: scrollYProgress }}
            className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-luxury-gold -translate-x-1/2 origin-top"
          />

          <div className="space-y-24 md:space-y-48">
            {STEPS.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse md:text-right'}`}
              >
                <div className="flex-1 w-full">
                  <div className={`space-y-4 md:space-y-6 ${i % 2 === 0 ? '' : 'md:items-end flex flex-col'}`}>
                    <div className={`flex items-center gap-4 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <span className="text-luxury-gold font-serif italic text-2xl">0{i + 1}</span>
                      <div className="h-[1px] w-12 bg-luxury-gold/30" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-luxury-black">{step.title}</h3>
                    <p className="text-luxury-gray-soft leading-relaxed font-light text-base md:text-lg">{step.desc}</p>
                  </div>
                </div>
                
                <div className="relative z-10 hidden md:block">
                  <div className="w-3 h-3 rounded-full bg-white border border-luxury-gray-light" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="absolute inset-0 rounded-full bg-luxury-gold"
                    style={{ boxShadow: `0 0 15px rgba(198, 169, 105, 0.5)` }}
                  />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
