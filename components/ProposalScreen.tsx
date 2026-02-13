import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface ProposalScreenProps {
  onSuccess: () => void;
}

export const ProposalScreen: React.FC<ProposalScreenProps> = ({ onSuccess }) => {
  // We use fixed positioning for the 'No' button to move it around
  const [noBtnPos, setNoBtnPos] = useState({ top: '60%', left: '60%' });
  const [hoverCount, setHoverCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);

  const moveButton = () => {
    const randomTop = Math.floor(Math.random() * 80) + 10; // 10% to 90%
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    setNoBtnPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
    setHoverCount(prev => prev + 1);
    setYesScale(prev => prev + 0.15); // Grow by 15% each time
  };

  const handleYes = () => {
    // Fire confetti from edges
    if (window.confetti) {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
        window.confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#ffb6c1']
        });
        window.confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#ffb6c1']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
        }());
    }
    onSuccess();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-pink-50 overflow-hidden p-4">
      
      <div className="z-10 text-center max-w-lg mb-20">
        <Heart className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse fill-red-500" />
        <h1 className="text-4xl md:text-5xl font-bold text-rose-600 font-handwriting mb-4">
          Will you be my Valentine?
        </h1>
        <p className="text-rose-400 font-medium text-lg">
          {hoverCount > 3 ? "You can't catch the 'No' button! 😉" : "You won the game, now win my heart?"}
        </p>
      </div>

      <div className="flex gap-8 items-center justify-center z-20">
        <button
          onClick={handleYes}
          style={{ transform: `scale(${yesScale})` }}
          className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-full shadow-lg transition-transform duration-200"
        >
          YES! 😍
        </button>

        {/* The Runaway Button */}
        <button
          onMouseEnter={moveButton}
          onClick={moveButton} // For mobile tap
          style={{ 
            position: 'absolute', 
            top: noBtnPos.top, 
            left: noBtnPos.left,
            transition: 'all 0.2s ease-out'
          }}
          className="px-6 py-2 bg-gray-300 text-gray-600 text-sm font-bold rounded-full opacity-80 hover:bg-gray-400"
        >
          No 😢
        </button>
      </div>
    </div>
  );
};