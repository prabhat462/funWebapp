export enum AppState {
  INTRO = 'INTRO',
  SETUP = 'SETUP', // Input names/memory
  GAME = 'GAME',
  REVEAL = 'REVEAL', // Prize reveal
  PROPOSAL = 'PROPOSAL',
  SUCCESS = 'SUCCESS',
}

export interface Player {
  name: string;
  avatar: string;
  score: number;
  isCpu: boolean;
}

export interface Prize {
  title: string;
  description: string;
  note: string;
  emoji: string;
}

// Augment window for confetti
declare global {
  interface Window {
    confetti: any;
  }
}
