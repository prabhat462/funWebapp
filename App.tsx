import React, { useState } from 'react';
import { AppState, Prize } from './types';
import { FIXED_PRIZE } from './constants';
import { IntroScreen } from './components/IntroScreen';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';
import { RevealScreen } from './components/RevealScreen';
import { ProposalScreen } from './components/ProposalScreen';
import { SuccessScreen } from './components/SuccessScreen';

function App() {
  const [state, setState] = useState<AppState>(AppState.INTRO);
  const [girlName, setGirlName] = useState('Pooja'); 
  const [teamColor, setTeamColor] = useState('from-pink-400 to-rose-500');
  
  const handleStart = () => setState(AppState.SETUP);

  const handleSetupComplete = (name: string, mem: string, color: string) => {
    setTeamColor(color);
    setState(AppState.GAME);
  };

  const handleGameFinish = async () => {
    // Use the fixed content directly as requested
    // We add a small delay to simulate the "calculation" or suspense if needed, 
    // but for now immediate transition is smoother.
    setState(AppState.REVEAL);
  };

  const handleClaimPrize = () => setState(AppState.PROPOSAL);
  
  const handleSuccess = () => setState(AppState.SUCCESS);

  return (
    <div className="antialiased text-slate-800 font-quicksand">
      {state === AppState.INTRO && <IntroScreen onStart={handleStart} />}
      {state === AppState.SETUP && <SetupScreen onComplete={handleSetupComplete} />}
      {state === AppState.GAME && <GameScreen girlName={girlName} teamColor={teamColor} onFinish={handleGameFinish} />}
      {state === AppState.REVEAL && (
        <RevealScreen prize={FIXED_PRIZE} onNext={handleClaimPrize} />
      )}
      {state === AppState.PROPOSAL && <ProposalScreen onSuccess={handleSuccess} />}
      {state === AppState.SUCCESS && <SuccessScreen />}
    </div>
  );
}

export default App;