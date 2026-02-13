import React, { useState, useEffect, useRef } from 'react';
import { BOY_FAIL_COMMENTS, GIRL_WIN_COMMENTS } from '../constants';

interface GameScreenProps {
  girlName: string;
  onFinish: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ girlName, onFinish }) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false); // Start with Boy (CPU)
  const [ballPosition, setBallPosition] = useState(50); // 0 to 100%
  const [isRolling, setIsRolling] = useState(false);
  const [pins, setPins] = useState<boolean[]>(Array(10).fill(true)); // true = standing
  const [commentary, setCommentary] = useState("Best of 3 Frames! Good luck! 🍀");
  const [gameMessage, setGameMessage] = useState("");
  
  // Scores
  const [boyScore, setBoyScore] = useState(0);
  const [girlScore, setGirlScore] = useState(0);

  const boyName = "Prabhat";

  // Power meter for visual effect only
  const [power, setPower] = useState(0);
  const powerDir = useRef(1);

  // Power meter animation loop
  useEffect(() => {
    if (isPlayerTurn && !isRolling) {
      const interval = setInterval(() => {
        setPower(p => {
          if (p >= 100) powerDir.current = -1;
          if (p <= 0) powerDir.current = 1;
          return p + (powerDir.current * 2); // Speed
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isPlayerTurn, isRolling]);

  // CPU Turn Logic
  useEffect(() => {
    if (!isPlayerTurn && currentFrame <= 3 && !isRolling) {
      const turnTimeout = setTimeout(() => {
        playCpuTurn();
      }, 2000);
      return () => clearTimeout(turnTimeout);
    }
  }, [isPlayerTurn, currentFrame]);

  const playCpuTurn = () => {
    setCommentary("He is focusing very hard... 🤔");
    setIsRolling(true);

    // Animate Ball for CPU (Goes to gutter)
    let pos = 50;
    const animateInterval = setInterval(() => {
      pos = pos > 15 ? pos - 0.8 : pos; // Slow drift to gutter
      setBallPosition(pos);
    }, 20);

    setTimeout(() => {
      clearInterval(animateInterval);
      const pinsHit = Math.floor(Math.random() * 4); 
      handlePinsHit(pinsHit, false);
    }, 2000); 
  };

  const playUserTurn = () => {
    if (isRolling) return;
    setIsRolling(true);
    setCommentary("Show him how it's done! 💅");

    // Animate Ball for User (Goes straight to center)
    // Visual "Rigging": It stays perfectly centered
    let pos = 50;
    const animateInterval = setInterval(() => {
      setBallPosition(50); // Stay center
    }, 20);

    setTimeout(() => {
      clearInterval(animateInterval);
      handlePinsHit(10, true); // ALWAYS STRIKE
    }, 2000);
  };

  const handlePinsHit = (count: number, isUser: boolean) => {
    // Update Pins visual
    const newPins = [...pins];
    for (let i = 0; i < count; i++) {
        // Knock down random pins for CPU, all for User
        if (isUser) newPins[i] = false; 
        else newPins[9-i] = false; 
    }
    setPins(isUser ? Array(10).fill(false) : newPins);

    // Update Score
    if (isUser) {
        setGirlScore(s => s + count);
        setGameMessage("STRIKE!!! 💖✨");
        setCommentary(GIRL_WIN_COMMENTS[Math.floor(Math.random() * GIRL_WIN_COMMENTS.length)]);
        window.confetti({ 
            particleCount: 100, 
            spread: 70, 
            origin: { y: 0.6 },
            colors: ['#f472b6', '#fb7185', '#fbbf24']
        });
    } else {
        setBoyScore(s => s + count);
        setGameMessage(count === 0 ? "GUTTER!" : `${count} PINS... 😬`);
        setCommentary(BOY_FAIL_COMMENTS[Math.floor(Math.random() * BOY_FAIL_COMMENTS.length)]);
    }

    // Reset for next turn
    setTimeout(() => {
      setPins(Array(10).fill(true));
      setGameMessage("");
      setBallPosition(50);
      setIsRolling(false);
      
      if (!isUser) {
        setIsPlayerTurn(true); // Switch to User
      } else {
        // End of frame
        if (currentFrame < 3) {
            setCurrentFrame(f => f + 1);
            setIsPlayerTurn(false); // Switch back to CPU
            setCommentary(`Frame ${currentFrame + 1} starting...`);
        } else {
            // Game Over
            onFinish();
        }
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fff0f5] flex flex-col items-center justify-between overflow-hidden relative font-quicksand">
      {/* Cute Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
          backgroundImage: 'radial-gradient(#f472b6 2px, transparent 2px)', 
          backgroundSize: '30px 30px' 
      }}></div>

      {/* Scoreboard - Updated to match screenshot */}
      <div className="w-full max-w-lg mt-8 mx-4 z-20">
        <div className="bg-white/90 backdrop-blur-md rounded-[3rem] shadow-xl border-4 border-white p-3 flex items-center justify-between relative mx-4">
            
            {/* Player 1 (Prabhat) */}
            <div className={`flex flex-col items-center pl-2 transition-opacity duration-300 ${!isPlayerTurn ? 'opacity-100' : 'opacity-60'}`}>
                <div className="relative">
                     <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-50 shadow-sm">
                        <span className="text-3xl">👱‍♂️</span>
                    </div>
                </div>
                <div className="mt-1 flex flex-col items-center">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">{boyName}</span>
                    <p className="text-3xl font-bold text-blue-500 leading-none">{boyScore}</p>
                </div>
            </div>

            {/* Center Info */}
            <div className="flex-1 px-2 text-center flex flex-col items-center -mt-6">
                <div className="bg-[#fff9c4] text-yellow-700 px-8 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] border-2 border-white shadow-sm mb-2 transform translate-y-2">
                    FRAME {currentFrame}/3
                </div>
                <div className="h-12 flex items-center justify-center w-full">
                    <p className="text-sm text-pink-500 font-bold leading-tight drop-shadow-sm">
                        {commentary}
                    </p>
                </div>
            </div>

            {/* Player 2 (Pooja) */}
             <div className={`flex flex-col items-center pr-2 transition-opacity duration-300 ${isPlayerTurn ? 'opacity-100' : 'opacity-60'}`}>
                <div className="relative">
                     <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center border-4 border-pink-50 shadow-sm">
                        <span className="text-3xl">👱‍♀️</span>
                    </div>
                </div>
                <div className="mt-1 flex flex-col items-center">
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-wide">{girlName}</span>
                    <p className="text-3xl font-bold text-pink-500 leading-none">{girlScore}</p>
                </div>
            </div>
        </div>
      </div>

      {/* The Lane */}
      <div className="flex-1 w-full max-w-md relative flex flex-col items-center perspective-1000 overflow-hidden mt-6 mb-24">
        
        {/* Floor */}
        <div className="absolute inset-x-8 top-0 bottom-0 bg-[#ffe4e6] transform-gpu border-x-8 border-pink-200 rounded-t-3xl shadow-inner overflow-hidden">
             
             {/* Animated Lane Shine/Reflection */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent z-0 pointer-events-none"
                  style={{ animation: 'laneShine 3s linear infinite' }}>
             </div>

             {/* Animated Lane Texture */}
             <div className="absolute inset-0 opacity-10 z-0 pointer-events-none" 
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, #fb7185 50px)' }}>
             </div>

             {/* Lane Arrows */}
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-pink-300/40 absolute top-[20%] left-1/2 -translate-x-1/2 z-0"></div>
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-pink-300/40 absolute top-[40%] left-1/2 -translate-x-1/2 z-0"></div>
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-pink-300/40 absolute top-[60%] left-1/2 -translate-x-1/2 z-0"></div>
        </div>

        {/* Gutter Neon Glow (Animated) */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-pink-400 blur-[3px] animate-pulse"></div>
        <div className="absolute right-8 top-0 bottom-0 w-1 bg-pink-400 blur-[3px] animate-pulse delay-75"></div>

        {/* Pins Area */}
        <div className="mt-16 grid grid-cols-4 gap-3 w-40 relative z-10">
            {/* Row 4 */}
            <Pin visible={pins[6]} /> <Pin visible={pins[7]} /> <Pin visible={pins[8]} /> <Pin visible={pins[9]} />
            {/* Row 3 */}
            <div className="col-span-4 flex justify-center gap-3 -mt-6">
                <Pin visible={pins[3]} /> <Pin visible={pins[4]} /> <Pin visible={pins[5]} />
            </div>
            {/* Row 2 */}
            <div className="col-span-4 flex justify-center gap-3 -mt-6">
                <Pin visible={pins[1]} /> <Pin visible={pins[2]} />
            </div>
            {/* Row 1 */}
            <div className="col-span-4 flex justify-center -mt-6">
                <Pin visible={pins[0]} />
            </div>
        </div>

        {/* Message Popup */}
        {gameMessage && (
            <div className="absolute top-1/3 z-50 animate-bounce">
                <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-3xl border-4 border-pink-400 shadow-xl transform rotate-[-3deg]">
                     <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                        {gameMessage}
                     </h2>
                </div>
            </div>
        )}

        {/* The Ball */}
        <div 
            className="absolute z-30 w-16 h-16 transition-all duration-[2000ms] ease-in-out"
            style={{ 
                left: `${ballPosition}%`,
                bottom: isRolling ? '75%' : '5%',
                transform: `translateX(-50%) scale(${isRolling ? 0.4 : 1}) rotate(${isRolling ? 720 : 0}deg)`,
                opacity: isRolling && !gameMessage ? 1 : (gameMessage ? 0 : 1)
            }}
        >
             <div className={`w-full h-full rounded-full shadow-xl flex items-center justify-center relative border-4 border-white/20
                ${isPlayerTurn 
                    ? 'bg-gradient-to-br from-pink-400 to-rose-500' 
                    : 'bg-gradient-to-br from-blue-400 to-indigo-500'}
             `}>
                <span className="text-2xl opacity-80">{isPlayerTurn ? '💖' : '💨'}</span>
            </div>
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] border-t border-pink-100 z-40 max-w-md mx-auto">
        {isPlayerTurn && !isRolling ? (
            <div className="w-full text-center">
                <div className="mb-3 relative">
                    <p className="text-pink-400 text-xs font-bold mb-1 uppercase tracking-widest">Power Meter</p>
                    <div className="w-full h-6 bg-pink-100 rounded-full overflow-hidden border-2 border-pink-200 p-1">
                        <div 
                            className="h-full rounded-full bg-gradient-to-r from-green-300 via-yellow-300 to-red-400 transition-all duration-75"
                            style={{ width: `${power}%` }}
                        ></div>
                    </div>
                </div>
                <button 
                    onClick={playUserTurn}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xl py-4 rounded-2xl shadow-lg shadow-pink-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                   <span>🎳</span> Roll the Ball!
                </button>
            </div>
        ) : (
            <div className="h-20 flex items-center justify-center">
                <p className="text-pink-400 animate-pulse font-bold text-lg flex items-center gap-2">
                    {isRolling ? "Rolling..." : "Waiting for opponent..."}
                    {isRolling && <span className="animate-spin">🍥</span>}
                </p>
            </div>
        )}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes laneShine {
            0% { transform: translateY(-100%) skewY(0deg); opacity: 0; }
            20% { opacity: 0.5; }
            80% { opacity: 0.5; }
            100% { transform: translateY(100%) skewY(0deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const Pin = ({ visible }: { visible: boolean }) => (
    <div className={`w-8 h-20 transition-all duration-200 transform origin-bottom ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 rotate-45 translate-y-10'}`}>
        {/* Cute Pin */}
        <div className="w-full h-full bg-white rounded-t-full rounded-b-xl relative shadow-sm border border-pink-50 flex items-center justify-center flex-col">
            <div className="w-full h-2 bg-red-400 absolute top-3 opacity-30"></div>
            <div className="w-full h-2 bg-red-400 absolute top-5 opacity-30"></div>
            {/* Pin Face */}
            <div className="mt-2 flex gap-1 opacity-40">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            <div className="w-2 h-1 bg-pink-300 rounded-full mt-1 opacity-40"></div>
        </div>
    </div>
);
