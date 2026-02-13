import React, { useState } from 'react';
import { Prize } from '../types';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';

interface RevealScreenProps {
  prize: Prize;
  onNext: () => void;
}

export const RevealScreen: React.FC<RevealScreenProps> = ({ prize, onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (window.confetti) {
        window.confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FF69B4', '#FFD700', '#ffffff']
        });
    }
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fff0f5] relative overflow-hidden font-quicksand">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-pink-200 animate-spin-slow"><Sparkles size={40}/></div>
        <div className="absolute bottom-10 right-10 text-yellow-200 animate-pulse"><Sparkles size={60}/></div>
      </div>

      {!isOpen ? (
        <div className="z-10 flex flex-col items-center cursor-pointer" onClick={handleOpen}>
           <div className="relative group">
              {/* Gift Box */}
              <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Gift size={160} className="text-pink-500 drop-shadow-2xl" strokeWidth={1.5} />
                  {/* Bow tie overlay hint */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-20"></span>
                  </div>
              </div>
              
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max">
                  <div className="bg-white px-4 py-2 rounded-full shadow-lg border-2 border-pink-200 animate-bounce">
                    <p className="text-pink-500 font-bold text-sm">✨ A Prize for the Winner! ✨</p>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-pink-200 mx-auto"></div>
              </div>
           </div>
           
           <p className="mt-12 text-slate-400 font-bold tracking-widest uppercase text-xs">Tap to Unwrap</p>
        </div>
      ) : (
        <div className="max-w-md w-full relative z-20 animate-pop-in">
             {/* The Card */}
            <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white">
                {/* Header Image/Emoji Area - Styled with dots */}
                <div className="bg-[#e97d98] h-48 relative flex items-center justify-center overflow-hidden">
                    {/* Dotted pattern overlay */}
                    <div className="absolute inset-0 opacity-20" 
                         style={{
                             backgroundImage: 'radial-gradient(#ffffff 20%, transparent 20%)', 
                             backgroundSize: '16px 16px',
                             backgroundPosition: '0 0'
                         }}>
                    </div>
                    
                    <div className="relative z-10 transform hover:scale-110 transition-transform duration-500 cursor-default drop-shadow-lg">
                        <span className="text-8xl">{prize.emoji}</span>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-8 text-center bg-white">
                    <h2 className="text-3xl text-slate-800 font-handwriting mb-6 leading-tight">
                        {prize.title}
                    </h2>
                    
                    {/* Description Box */}
                    <div className="bg-pink-50 rounded-2xl p-6 mb-8">
                        <p className="text-slate-600 text-sm italic leading-relaxed font-medium">
                            "{prize.description}"
                        </p>
                    </div>
                    
                    <p className="text-rose-400 font-light text-lg mb-8 leading-relaxed">
                        {prize.note}
                    </p>

                    <button
                        onClick={onNext}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 group"
                    >
                        Accept Prize 
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>
            </div>
        </div>
      )}
      
      <style>{`
        @keyframes popIn {
            0% { opacity: 0; transform: scale(0.5) translateY(50px); }
            60% { transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in {
            animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};
