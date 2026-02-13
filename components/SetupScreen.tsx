import React, { useEffect, useState } from 'react';

interface SetupScreenProps {
  onComplete: (name: string, memory: string, color: string) => void;
}

const COLORS = [
  { id: 'pink', gradient: 'from-pink-400 to-rose-500', bg: 'bg-pink-500', label: 'Classic Pink' },
  { id: 'purple', gradient: 'from-purple-400 to-fuchsia-600', bg: 'bg-purple-500', label: 'Royal Lavender' },
  { id: 'red', gradient: 'from-red-400 to-rose-600', bg: 'bg-red-500', label: 'Passion Red' },
];

export const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'COLOR' | 'LOADING'>('COLOR');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [step, setStep] = useState(0);

  const steps = [
    { text: "Lacing up lucky shoes...", icon: "👟", color: "text-blue-400" },
    { text: "Polishing the ball...", icon: "🎳", color: "text-pink-500" },
    { text: "Channeling winning energy...", icon: "✨", color: "text-yellow-400" },
    { text: "READY TO CRUSH IT!", icon: "😤", color: "text-red-500" }
  ];

  useEffect(() => {
    if (phase !== 'LOADING') return;

    // Sequence timer
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => onComplete("My Love", "Our romantic bowling date", selectedColor.gradient), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [phase, onComplete, steps.length, selectedColor]);

  if (phase === 'COLOR') {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-6 font-quicksand">
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border-4 border-white max-w-md w-full text-center">
                  <h2 className="text-3xl font-handwriting font-bold text-rose-500 mb-2">
                      Team Style 🎀
                  </h2>
                  <p className="text-slate-500 mb-8 font-medium">Pick your winning color!</p>
                  
                  <div className="flex justify-center gap-4 mb-10">
                      {COLORS.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setSelectedColor(c)}
                            className={`relative w-16 h-16 rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center
                                ${selectedColor.id === c.id ? 'scale-110 ring-4 ring-offset-4 ring-rose-200 z-10' : 'hover:scale-105 opacity-80'}
                                ${c.bg}
                            `}
                          >
                              {selectedColor.id === c.id && <span className="text-white text-xl animate-bounce">✓</span>}
                          </button>
                      ))}
                  </div>
                  
                  <div className="mb-8 h-8">
                     <span className={`font-bold uppercase tracking-widest text-sm px-4 py-2 rounded-full bg-slate-100 text-slate-600`}>
                        {selectedColor.label}
                     </span>
                  </div>

                  <button
                    onClick={() => setPhase('LOADING')}
                    className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all bg-gradient-to-r ${selectedColor.gradient}`}
                  >
                      Let's Play! &rarr;
                  </button>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Animated Background Circle */}
        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-4 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-pink-100">
           
           {/* Icons Transition */}
           <div className="text-8xl animate-bounce transition-all duration-500 transform">
             {steps[step].icon}
           </div>

        </div>
      </div>

      <div className="mt-12 h-16 text-center">
        <h2 className={`text-2xl font-bold font-handwriting transition-colors duration-500 ${steps[step].color}`}>
          {steps[step].text}
        </h2>
        
        {/* Progress Dots */}
        <div className="flex gap-2 justify-center mt-4">
          {steps.map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === step ? 'bg-pink-500 scale-125' : 'bg-pink-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};