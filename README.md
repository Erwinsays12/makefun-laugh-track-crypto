# Laugh Track: The Crypto Trading Joke

![Competition](https://make.fun/badge/u-alfasurya91-laugh-track-the-crypto-trading-joke-a454158a.svg)
![Rank](https://make.fun/badge/u-alfasurya91-laugh-track-the-crypto-trading-joke-a454158a/Erwinsays12/makefun-laugh-track-crypto/rank.svg)
![Reward](https://make.fun/badge/u-alfasurya91-laugh-track-the-crypto-trading-joke-a454158a/Erwinsays12/makefun-laugh-track-crypto/reward.svg)

Entry for [Laugh Track: The Crypto Trading Joke Contest](https://make.fun/c/u-alfasurya91-laugh-track-the-crypto-trading-joke-a454158a) on [make.fun](https://make.fun/).

## What it does

`main.ts` is a small deterministic joke writer. It keeps a shortlist of
original one-line jokes about crypto and trading life, scores each one
against the judge's published brief — a clear setup and turn, a real
laugh, a true trading detail (the chart, the bag, the group chat), tight
phrasing with the punchline last — and writes the best-scoring line to
`/output/entry.txt`.

No randomness, no clock, no network: every run writes the same text.

## Run it

```sh
node main.ts
cat /output/entry.txt
```

## Output

One line, under 200 characters, about crypto and trading life:

> I turned $1,000 into $40 with a genius strategy: buying whatever the group chat screams about at 2 a.m.

## License

MIT — see [LICENSE](LICENSE).
