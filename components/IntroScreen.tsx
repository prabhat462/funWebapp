import React from 'react';
import { Heart, Trophy, Crown } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center relative overflow-hidden bg-gradient-to-b from-blue-50 to-pink-50">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 text-blue-300 opacity-40 animate-bounce">
        <span className="text-6xl">🎳</span>
      </div>
      <div className="absolute bottom-20 right-10 text-pink-300 opacity-40 animate-pulse">
        <Heart size={64} fill="currentColor" />
      </div>
      <div className="absolute top-1/2 left-5 text-yellow-300 opacity-60 animate-spin-slow">
        <Crown size={48} />
      </div>
      
      <div className="z-10 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border-4 border-white max-w-md w-full transform hover:scale-105 transition-transform duration-500">
        <div className="mb-6 flex justify-center">
            <div className="bg-pink-100 p-4 rounded-full border-2 border-pink-200">
                <Trophy className="text-pink-500 w-12 h-12" />
            </div>
        </div>
        
        <h1 className="text-4xl font-bold text-slate-800 mb-2 font-handwriting">
          Cupid's Alley
        </h1>
        <h2 className="text-lg text-pink-500 font-bold mb-6 tracking-widest uppercase">
          The Rematch
        </h2>

        <p className="text-gray-600 mb-8 italic text-lg leading-relaxed">
          "I had such a great time on our first date. 🎳
          <br/><br/>
          Even though the pins weren't on your side last time, I think you deserve a rematch. Ready to settle the score? I have a feeling this game is yours to win."
        </p>

        <button
          onClick={onStart}
          className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-pink-300/50"
        >
          Challenge Accepted! 😤
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </button>
      </div>
    </div>
  );
};