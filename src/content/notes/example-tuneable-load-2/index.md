---
title: The first board
description: Choosing a digital step attenuator and phase shifter, laying out the RF path, and the three mistakes on revision A.
date: 2026-08-31
tags: [RF, PCB, Altium]
series: Building a tuneable load
part: 2
draft: true
---

> **Example post.** Placeholder text so you can see how a post looks. Delete the `example-…` folders when you're done.


Revision A had one job: prove the RF path works before adding any wireless control.

## Parts

| Part | Role | Range |
|------|------|-------|
| Step attenuator | Magnitude of Γ | 0–31.5 dB |
| Phase shifter | Angle of Γ | 0–360° |
| Microcontroller | Sets both over SPI | — |

## Setting the attenuator

```c
void set_atten(uint8_t steps) {
    spi_write(ATTEN_CS, steps & 0x3F);
}
```

## What went wrong

1. A via too close to the RF trace.
2. The wrong footprint for the phase shifter.
3. No test point on the SPI clock.
