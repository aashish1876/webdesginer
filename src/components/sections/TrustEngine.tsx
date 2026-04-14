import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export default function TrustEngine() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-white border-y border-luxury-gray-light">
      <div className="container-wide max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="flex justify-center mb-8">
            <ShieldCheck className="w-10 h-10 text-luxury-gold opacity-50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif italic text-luxury-black leading-tight">
            "Your vision deserves more than a template; it requires a <span className="text-luxury-gold not-italic font-bold">bespoke digital legacy</span>."
          </h2>
          <p className="text-lg md:text-xl text-luxury-gray-soft font-light leading-relaxed max-w-2xl mx-auto">
            We prioritize absolute integrity and uncompromising quality in every project. Our commitment is to architect high-performance solutions that stand the test of time, ensuring your digital presence is as enduring as your brand's reputation.
          </p>
          <div className="pt-8 flex justify-center items-center gap-4">
            <div className="h-[1px] w-12 bg-luxury-gold opacity-30" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold font-bold">Built on Absolute Trust</span>
            <div className="h-[1px] w-12 bg-luxury-gold opacity-30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
