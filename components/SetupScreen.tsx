import React, { useEffect, useState } from 'react';

interface SetupScreenProps {
  onComplete: (name: string, memory: string) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    { text: "Lacing up lucky shoes...", icon: "👟", color: "text-blue-400" },
    { text: "Polishing the ball...", icon: "🎳", color: "text-pink-500" },
    { text: "Channeling winning energy...", icon: "✨", color: "text-yellow-400" },
    { text: "READY TO CRUSH IT!", icon: "😤", color: "text-red-500" }
  ];

  useEffect(() => {
    // Sequence timer
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => onComplete("My Love", "Our romantic bowling date"), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

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
