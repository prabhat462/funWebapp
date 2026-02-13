import { Prize } from './types';

// Funny commentary for when the boy misses
export const BOY_FAIL_COMMENTS = [
  "I got lost in your eyes... again. 😍",
  "My hands are shaking cause you're looking at me. 💓",
  "Letting you win so you owe me a kiss later. 😉",
  "Calculated miss... just for the plot. 📉",
  "I think Cupid nudged the ball away. 💘",
  "Who put this gutter here?! 🍌",
  "Distracted by your smile! 🙈",
];

// Cheering for when she wins
export const GIRL_WIN_COMMENTS = [
  "Okay, are you a secret pro?! 🎳✨",
  "Beauty AND skills? Unfair advantage! 💖",
  "My heart just did a strike too. 💘",
  "Winner gets to pick the date spot! 🏆",
  "Stop being so cute, I can't concentrate! 🙈",
  "You're stealing the show (and my heart)! 💃",
  "Perfect form! (And I don't mean the bowling) 😉",
];

export const FIXED_PRIZE: Prize = {
  title: "The Diamond Pin Distinction",
  description: "A title for the comeback champion. You owned the lanes today, so you've definitely earned the right to pick the spot for our next date.",
  note: "I have to admit, victory looks pretty good on you.",
  emoji: "🏆"
};

export const FALLBACK_PRIZE = FIXED_PRIZE;
