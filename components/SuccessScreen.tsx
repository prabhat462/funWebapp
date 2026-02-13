import React, { useEffect } from 'react';

export const SuccessScreen: React.FC = () => {
  useEffect(() => {
    // Fire confetti on load for celebration
    if (window.confetti) {
      const duration = 3000;
      const end = Date.now() + duration;

      (function frame() {
        window.confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#ff69b4']
        });
        window.confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#ff69b4']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-100 to-rose-300 text-center p-6 relative overflow-hidden font-quicksand">
      {/* Background Decor */}
      <div className="absolute top-10 left-10 text-white/40 animate-bounce text-5xl">💌</div>
      <div className="absolute bottom-20 right-10 text-white/40 animate-pulse text-6xl">✨</div>
      <div className="absolute top-1/3 right-5 text-white/30 animate-spin-slow text-4xl">🎡</div>

      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-2xl max-w-md w-full border-[8px] border-white/50 transform hover:scale-[1.01] transition-transform duration-500">
        
        <h1 className="text-4xl font-bold text-rose-500 mb-2 font-handwriting tracking-wide">
          STRIKE! It's a Date! ❤️
        </h1>
        
        <div className="flex justify-center items-center gap-4 text-6xl my-6">
            <span className="drop-shadow-md animate-bounce">🎳</span>
            <span className="drop-shadow-md animate-pulse delay-75">🥰</span>
        </div>

        <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
            You officially redeemed yourself! <br/>
            The scoreboard has spoken! 🏆
        </p>

        <div className="bg-pink-50 p-6 rounded-3xl border-2 border-pink-100 relative group shadow-inner">
            <p className="text-rose-400 font-bold text-xs mb-4 uppercase tracking-[0.2em]">Screenshot This Ticket</p>
            
            <div className="border-2 border-dashed border-rose-300 p-6 rounded-2xl bg-white relative overflow-hidden shadow-sm">
                {/* Ticket Cutouts */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-pink-50 rounded-full"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-pink-50 rounded-full"></div>

                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] px-3 py-1 rounded-bl-xl font-bold shadow-sm">
                    NO EXPIRATION
                </div>
                
                <h3 className="font-handwriting text-4xl text-rose-500 mb-2 mt-1">
                    Admit One
                </h3>
                <p className="text-slate-700 font-bold text-lg mb-2">
                    To A Victory Date Night
                </p>
                <div className="w-16 h-1 bg-rose-100 mx-auto rounded-full mb-3"></div>
                <p className="text-xs text-slate-400 font-medium italic">
                    Includes dinner on me & bragging rights 😉
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};