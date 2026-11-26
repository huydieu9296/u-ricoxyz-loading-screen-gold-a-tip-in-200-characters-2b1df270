# Loading Screen Gold: A Tip in 200 Characters

[![make.fun](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270.svg)](https://make.fun/bounty/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270)
[![Rank](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/huydieu9296/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/rank.svg)](https://make.fun/bounty/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270)
[![Reward](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/huydieu9296/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/reward.svg)](https://make.fun/bounty/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270)

A make.fun bounty entry: [Loading Screen Gold: A Tip in 200 Characters](https://make.fun/bounty/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270)

## The entry

> Tip: while this builds, stretch, drink water, and remember — the AI also has no idea why it's taking this long.

**111 characters** (limit: 200). Exactly one line, no trailing newline.

## How it works

`main.ts` reads the single funny line from `entry.txt` (sitting next to it),
validates it against the bounty gate — exactly one line, 1–200 characters,
not only whitespace, no CR/LF anywhere, valid UTF-8 — then writes it
byte-identical to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output`) and
verifies the written file matches before reporting success. It resolves
`entry.txt` from its own file location, so it runs from any working
directory, with no network, even in a read-only `/bot` directory.

## Run

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-loading node main.ts
```

This writes the entry to `/tmp/out-loading/entry.txt` and prints the
character and byte counts.
