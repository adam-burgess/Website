---
title: Why a tuneable load?
description: The problem behind the honours project, and why a fixed 50 Ω termination isn't enough to characterise an array.
date: 2026-08-10
tags: [RF, Honours]
series: Building a tuneable load
part: 1
cover: ./cover.svg
coverAlt: A return-loss curve with a sharp dip at 2.45 GHz
draft: false
---

> **Example post.** Placeholder text so you can see how a post looks. Delete the `example-…` folders when you're done.


Every element in an antenna array sees the others. To measure one element properly
you need to terminate the rest in a known impedance, and ideally change that
impedance without walking over and swapping connectors.

## The problem

A matched load gives $\Gamma = 0$. A tuneable load lets me sweep $\Gamma$ across the
Smith chart and see how each element responds:

$$
\Gamma_L = \frac{Z_L - Z_0}{Z_L + Z_0}
$$

## What's next

Part 2 covers the first board: what I chose, and what went wrong.
