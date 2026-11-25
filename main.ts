// Laugh Track: The Crypto Trading Joke Contest
// ------------------------------------------------
// A small deterministic joke writer. It keeps a shortlist of original
// one-line jokes about crypto and trading life, scores each one against
// the judge's published brief (setup + turn, a real laugh, a true
// trading detail, tight phrasing with the punchline last), and writes
// the best-scoring line to /output/entry.txt.
//
// No randomness, no clock, no network: every run writes the same text,
// so the two grading runs agree byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// Original one-line jokes about crypto and trading life. Each one is a
// setup followed by a turn, with the punchline landing at the very end.
const CANDIDATES: string[] = [
  "I turned $1,000 into $40 with a genius strategy: buying whatever the group chat screams about at 2 a.m.",
  "My trading plan is simple: buy the top, sell the bottom, then tell the group chat I did it on purpose for tax reasons.",
  "I bought the dip so many times my portfolio is now just dips. At this point I'm not a trader, I'm a dip sommelier.",
  "My portfolio is down 90%, but at least the group chat finally stopped asking me for tips.",
  "I asked the chart for a sign. It gave me a red candle shaped exactly like my bank balance.",
];

// Trading-life details the judge's brief calls out as earning the joke:
// the chart, the bag, the group chat, the dip, the candle, the portfolio.
const TRADING_DETAILS = [
  "group chat",
  "chart",
  "dip",
  "bag",
  "candle",
  "portfolio",
  "leverage",
  "wallet",
];

// Words that signal a turn: the setup promises one thing, the payoff
// delivers the opposite.
const TURN_MARKERS = [
  "but",
  "then",
  "at this point",
  "genius",
  "on purpose",
  "exactly",
  "finally",
];

function countMatches(text: string, words: string[]): number {
  const lower = text.toLowerCase();
  let hits = 0;
  for (const word of words) {
    if (lower.includes(word)) hits += 1;
  }
  return hits;
}

function scoreJoke(joke: string): number {
  const length = [...joke].length;
  let score = 0;

  // 1. Gate: the entry must be 1-200 characters of real text.
  if (length < 1 || length > MAX_CHARS) return -1000;
  if (joke.trim().length === 0) return -1000;

  // 2. Length sweet spot: long enough for a setup and a turn, short
  //    enough that every word has to earn its place.
  if (length >= 90 && length <= 150) score += 30;
  else if (length >= 60 && length <= 180) score += 15;

  // 3. A recognisable trading detail makes the joke earned, not generic.
  score += 12 * countMatches(joke, TRADING_DETAILS);

  // 4. A turn marker shows the setup flips into a payoff.
  score += 8 * countMatches(joke, TURN_MARKERS);

  // 5. A concrete number makes the loss feel real and repeatable. A
  //    before/after pair of amounts is stronger still: the setup
  //    promises wealth and the payoff delivers the loss, which is the
  //    classic trading-joke arc.
  if (/\$\d[\d,]*/.test(joke)) score += 10;
  const amounts = joke.match(/\$\d[\d,]*/g) ?? [];
  if (amounts.length >= 2) score += 12;
  if (/\d+%/.test(joke)) score += 6;

  // 6. The punchline belongs at the end: reward a closing clause that
  //    names a specific, slightly absurd scene (a time, a place, a chat).
  const tail = joke.slice(Math.floor(joke.length * 0.6));
  if (/2 a\.m\.|3 a\.m\.|midnight|group chat|bank balance/.test(tail)) {
    score += 14;
  }

  // 7. One line only: penalise anything that reads like two jokes.
  const sentences = joke.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length > 2) score -= 10;

  return score;
}

function pickBest(candidates: string[]): { joke: string; score: number } {
  let best = candidates[0];
  let bestScore = scoreJoke(best);
  for (let i = 1; i < candidates.length; i += 1) {
    const score = scoreJoke(candidates[i]);
    if (score > bestScore) {
      best = candidates[i];
      bestScore = score;
    }
  }
  return { joke: best, score: bestScore };
}

function main(): void {
  const { joke, score } = pickBest(CANDIDATES);
  const chars = [...joke].length;

  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`Selected joke is ${chars} characters; must be 1-200.`);
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(join(OUTPUT_PATH), joke + "\n", "utf8");

  console.log(`score=${score} chars=${chars}`);
  console.log(joke);
}

main();
