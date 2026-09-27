---
title: Going wireless
description: Adding Bluetooth control so the load can be retuned from the other side of the anechoic chamber.
date: 2026-09-20
tags: [RF, Embedded]
series: Building a tuneable load
part: 3
draft: false
---

> **Example post.** Placeholder text so you can see how a post looks. Delete the `example-…` folders when you're done.


With the RF path working, the next step was removing the cable. The chamber is
the whole point: anything I walk in with changes the measurement.

## Approach

A small Bluetooth module takes commands like `SET 12 180` (attenuation steps,
phase in degrees) and the microcontroller does the rest.

***

The series ends here for now. Part 4 will cover calibration.
