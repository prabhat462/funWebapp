import { Prize } from './types';

// Cute & Flirty commentary for when the boy (Prabhat) misses
export const BOY_FAIL_COMMENTS = [
  "I think the wind blew it... indoors. 🌬️",
  "Distracted by your smile! 🙈",
  "My hands are shaking cause you're looking. 💓",
  "The floor is definitely uneven here. 🤥",
  "I swear the lane is tilted! 📐",
  "Just warming up! Watch out for the next one. 🔥",
  "Oops! I was aiming for your heart, not the pins. 🎯",
  "I got lost in your eyes... again. 😍"
];

// Cheering commentary for when the girl (Pooja) wins
export const GIRL_WIN_COMMENTS = [
  "Beauty AND skills? Unfair advantage! 💖",
  "Okay, are you a secret pro?! 🎳✨",
  "My heart just did a strike too. 💘",
  "Winner gets to pick the date spot! 🏆",
  "Stop being so cute, I can't focus! 🙈",
  "You're stealing the show (and my heart)! 💃",
  "Perfect form! (And I don't mean the bowling) 😉",
  "You make winning look so good! 😍"
];

export const FIXED_PRIZE: Prize = {
  title: "The Diamond Pin Distinction",
  description: "A title for the comeback champion. You owned the lanes today, so you've definitely earned the right to pick the spot for our next date.",
  note: "I have to admit, victory looks pretty good on you.",
  emoji: "🏆"
};

export const FALLBACK_PRIZE = FIXED_PRIZE;