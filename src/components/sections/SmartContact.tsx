import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, ChevronRight } from 'lucide-react';
import { db, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const STEPS = [
  { id: 'name', question: "Hello! I'm Aashish, your lead designer. I'm ready to build your next-level website. What's your name?", placeholder: "Your name..." },
  { id: 'business', question: "Nice to meet you! What's your business name or project idea?", placeholder: "Business/Project name..." },
  { id: 'goal', question: "What's the main goal of this website?", placeholder: "e.g. Sell products, get leads, portfolio..." },
  { id: 'budget', question: "What's your budget range for this project?", placeholder: "e.g. $2k - $10k" },
  { id: 'finish', question: "Great! I've received your details. Would you like to schedule a 15-minute discovery call?", placeholder: "Type 'Yes' to confirm" }
];

export default function SmartContact() {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: STEPS[0].question }
  ]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const saveInquiry = async (finalData: Record<string, string>) => {
    setIsSubmitting(true);
    try {
      // 1. Save to Firestore
      try {
        await addDoc(collection(db, 'inquiries'), {
          ...finalData,
          createdAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'inquiries');
      }

      // 2. Send Email via our new API
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: finalData.name,
          business: finalData.business,
          goal: finalData.goal,
          budget: finalData.budget,
          scheduleCall: finalData.finish?.toLowerCase().includes('yes')
        }),
      });
    } catch (error) {
      console.error("Error processing inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    const userMsg = input;
    const currentStepId = STEPS[step].id;
    
    // Update form data
    const updatedFormData = { ...formData, [currentStepId]: userMsg };
    setFormData(updatedFormData);
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    setTimeout(() => {
      if (step < STEPS.length - 1) {
        const nextStep = step + 1;
        setStep(nextStep);
        setMessages(prev => [...prev, { role: 'ai', text: STEPS[nextStep].question }]);
      } else {
        // Final step reached, save to database
        saveInquiry(updatedFormData);
        setMessages(prev => [...prev, { role: 'ai', text: "Thank you. Your inquiry has been received and saved securely. Aashish will contact you personally within 24 hours to discuss your vision." }]);
      }
    }, 1000);
  };

  return (
    <section className="section-padding bg-[#F7F7F5]" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-luxury-black">Start Your Journey</h2>
          <p className="text-luxury-gray-soft text-lg font-light">Let's build something extraordinary together.</p>
        </div>

        <div className="bg-white border border-luxury-gray-light shadow-2xl overflow-hidden flex flex-col h-[550px] md:h-[650px]">
          <div className="p-6 md:p-8 border-b border-luxury-gray-light bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
              <span className="font-serif italic text-xs md:text-sm text-luxury-black">Direct Inquiry to Aashish</span>
            </div>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-luxury-gray-soft font-bold">Secure Channel</span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 md:space-y-8 no-scrollbar bg-white">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] md:max-w-[75%] p-4 md:p-6 flex gap-3 md:gap-4 ${
                    msg.role === 'user' 
                      ? 'bg-luxury-black text-white' 
                      : 'bg-[#F7F7F5] text-luxury-black border border-luxury-gray-light'
                  }`}>
                    {msg.role === 'ai' ? <Bot className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-luxury-gold" /> : <User className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-luxury-gold" />}
                    <p className="text-xs md:text-sm leading-relaxed font-light">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-white border-t border-luxury-gray-light flex flex-col sm:flex-row gap-4 md:gap-6">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSubmitting}
              placeholder={isSubmitting ? "Saving your details..." : (STEPS[step]?.placeholder || "Type your message...")}
              className="flex-1 bg-transparent border-b border-luxury-gray-light px-0 py-3 md:py-4 focus:outline-none focus:border-luxury-gold transition-colors text-xs md:text-sm font-light disabled:opacity-50"
            />
            <motion.button 
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? {} : "hover"}
              whileTap={{ scale: 0.98 }}
              variants={{
                hover: { 
                  scale: 1.02,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              className="relative bg-luxury-black text-white px-8 md:px-10 py-3 md:py-4 uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-bold overflow-hidden border border-luxury-black shadow-sm"
            >
              <motion.div 
                variants={{
                  hover: { x: '150%', y: '-150%' }
                }}
                initial={{ x: '-150%', y: '150%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-luxury-gold skew-x-[-20deg] scale-[2.5]"
              />
              <motion.span 
                variants={{
                  hover: { scale: 1.05, color: '#0A0A0A' }
                }}
                transition={{ duration: 0.4 }}
                className="relative z-10 block"
              >
                Send Message
              </motion.span>
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
