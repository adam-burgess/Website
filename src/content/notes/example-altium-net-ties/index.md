---
title: Altium net ties and RF clearance rules
description: How to join two nets on purpose without the design rule checker fighting you.
date: 2026-09-05
tags: [Altium, PCB]
draft: true
---

> **Example post.** Placeholder text so you can see how a post looks. Delete the `example-…` folders when you're done.


Sometimes two nets *should* touch: a star ground, or a split between analogue and
digital returns. Altium calls this a **net tie**.

## Setting one up

1. Make a footprint with two pads joined by copper.
2. Set its component type to *Net Tie (In BOM)*.
3. Add a clearance rule so the RF traces keep their distance.

The rule itself is one line in the query builder: `InNetClass('RF')`.
