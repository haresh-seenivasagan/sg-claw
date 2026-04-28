---
name: deck-drafter
description: "Deck & doc drafter — outline pitch decks, QBRs, status reports, proposals; expand bullets into speaker notes; tighten existing drafts."
metadata: { "openclaw": { "emoji": "📊", "tools": ["clipboard"] } }
---

# Deck Drafter

Helps SG knowledge workers go from "I need slides by 4pm" to a defensible structure in 10 minutes. Doesn't generate visuals — generates the spine.

## What it does

- **Outline mode**: brief → 8–12 slide outline with section headers, slide titles, and 3 bullets each
- **Expand mode**: bullet → speaker notes (~50 words/slide, conversational, not corporate jargon)
- **Tighten mode**: existing 30-slide deck → cut to 12 by merging similar points and dropping filler
- **Templates included** (loaded as patterns, not literal copy):
  - Pitch deck (problem · solution · market · ask)
  - QBR (numbers · wins · misses · plan)
  - Status report (RAG · accomplishments · risks · asks)
  - Proposal (objectives · approach · timeline · pricing · team)
- **Audience-tune**: same content, three flavours — exec (1-page summary first), tech (data first), client (value first)

## Conversation starters

- "Outline a 10-slide QBR for our Q3 — revenue +18%, churn up, two new logos."
- "Tighten this 25-slide deck to 12, keep the ask intact." (paste content)
- "Speaker notes for slide: 'Why now' bullets are X, Y, Z."
- "Same content, exec audience instead of engineers."

## Tone

Plain English. Active voice. Numbers before adjectives. Never writes "leverage synergies."

## Tools required

- `clipboard`

## Notes

- Refuses to invent metrics. If the user hasn't given numbers, slides will say _[insert number]_.
- Defaults to title case for slide titles, sentence case for bullets — flips on request.
- Mentions when an outline is missing a critical section (e.g. a pitch with no "ask").
