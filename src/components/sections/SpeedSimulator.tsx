import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, TrendingUp, AlertCircle } from 'lucide-react';

export default function SpeedSimulator() {
  const [loadTime, setLoadTime] = useState(2);
  
  // Mock revenue calculation: 1s = 100%, 6s = 30%
  const revenueImpact = Math.max(30, 100 - (loadTime - 1) * 14);
  const lostRevenue = 100 - revenueImpact;

  return (
    <section className="section-padding bg-white" id="speed-sim">
      <div className="container-wide">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-bold mb-6 text-luxury-black">The Velocity of Value</h2>
          <p className="text-luxury-gray-soft text-lg max-w-2xl mx-auto font-light">In the luxury digital space, performance is the ultimate sophistication.</p>
        </div>

        <div className="max-w-4xl mx-auto border border-luxury-gray-light p-8 md:p-16 bg-[#F7F7F5] space-y-12 md:space-y-16">
          <div className="space-y-8 md:space-y-10">
            <div className="flex justify-between items-end">
              <label className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-luxury-black">Page Response Time</label>
              <span className="text-3xl md:text-5xl font-serif italic text-luxury-gold">{loadTime}s</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="6" 
              step="0.1"
              value={loadTime}
              onChange={(e) => setLoadTime(parseFloat(e.target.value))}
              className="w-full h-[1px] bg-luxury-gray-light appearance-none cursor-pointer accent-luxury-gold"
            />
            <div className="flex justify-between text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-gray-soft">
              <span>Optimal (1s)</span>
              <span>Sub-Optimal (6s)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="p-6 md:p-10 bg-white border border-luxury-gray-light flex flex-col items-center text-center space-y-4">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-luxury-gold" />
              <div className="text-3xl md:text-4xl font-serif text-luxury-black">{revenueImpact.toFixed(0)}%</div>
              <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-gray-soft">Engagement Potential</div>
            </div>
            <div className="p-6 md:p-10 bg-white border border-luxury-gray-light flex flex-col items-center text-center space-y-4">
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-luxury-black opacity-20" />
              <div className="text-3xl md:text-4xl font-serif text-luxury-black">-{lostRevenue.toFixed(0)}%</div>
              <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-gray-soft">Revenue At Risk</div>
            </div>
          </div>

          <div className="relative h-[2px] bg-luxury-gray-light overflow-hidden">
            <motion.div 
              initial={false}
              animate={{ width: `${revenueImpact}%` }}
              className="absolute inset-y-0 left-0 bg-luxury-gold"
            />
          </div>
          
          <p className="text-center text-xs text-luxury-gray-soft italic font-serif">
            "Excellence is not an act, but a habit. In digital, excellence begins with speed."
          </p>
        </div>
      </div>
    </section>
  );
}
