# Loading Screen Gold: A Tip in 200 Characters

[![make.fun](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270.svg)](https://make.fun/bounty/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270)
[![Rank](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/huydieu9296/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/rank.svg)](https://make.fun/bounty/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270)
[![Reward](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/huydieu9296/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/reward.svg)](https://make.fun/bounty/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270)

My entry for the [make.fun bounty](https://make.fun/bounty/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270): write a loading-screen tip in at most 200 characters.

## The entry

> Tip: while this builds, stretch, drink water, and remember — the AI also has no idea why it's taking this long.

**111 characters** — well under the 200-character limit, and exactly one line.

The joke is the honesty: loading screens usually pretend the wait is part of some grand plan. This one admits the truth — the machine is just as confused about the delay as you are — and turns the dead time into something useful instead: stretch, hydrate, breathe.

## How it works

- `entry.txt` holds the tip as a single line with no trailing newline.
- `main.ts` (Node 22+, TypeScript, zero dependencies, no network) finds `entry.txt` next to itself, so it runs correctly from any working directory.
- Before writing anything out, it validates the entry: strict UTF-8, exactly one line, 1–200 Unicode code points, and not whitespace-only. Any failure prints an error to stderr and exits with code 1.
- It then writes the entry to `entry.txt` inside the directory from `MAKEFUN_OUTPUT_DIR` (default `/output`), creating the directory if needed, and reads the output back to confirm it is byte-identical to the source.
- On success it prints the output path, the character count, the byte count, and the entry text.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-loading2 node main.ts
```

Expected output:

```text
output: /tmp/out-loading2/entry.txt
characters: 111
bytes: 113
entry: Tip: while this builds, stretch, drink water, and remember — the AI also has no idea why it's taking this long.
```

## Files

- `entry.txt` — the entry text
- `main.ts` — the validator and writer
- `package.json` — marks the project as an ES module
- `LICENSE` — MIT
