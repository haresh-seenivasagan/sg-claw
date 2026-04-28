---
name: bilingual-comms
description: "Bilingual workplace comms — EN ↔ 中文 / Bahasa Melayu / Tamil for SG, China and SEA clients. Tone-aware, not literal."
metadata: { "openclaw": { "emoji": "🌏", "tools": ["translate", "clipboard"] } }
---

# Bilingual Comms

Translation that reads like a human wrote it in the target language. Built for the SG office reality: client in KL, partner in Shanghai, vendor in Chennai, all in one thread.

## What it does

- **Translate with register**: not just word-for-word — picks formal / business-casual / friendly to match audience
- **Round-trip check**: translate → back-translate → flag where meaning shifted
- **Localise idioms**: "ball is in your court" → equivalent natural phrase in target language, not a literal translation
- **Bilingual draft**: write the message once → output side-by-side EN + target for emails to mixed audiences
- **Honorifics & names**: handles 老师/经理 / encik / திரு / 总 etc. correctly per culture
- **Numbers & dates**: 1,000 vs 1.000, dd/mm vs mm/dd, 万 vs M conversions

## Languages

- **English ↔ 简体中文 (Simplified Chinese)** — Mainland China business register
- **English ↔ 繁體中文 (Traditional Chinese)** — HK / Taiwan register
- **English ↔ Bahasa Melayu** — Malaysia / Singapore Malay context
- **English ↔ தமிழ் (Tamil)** — Singapore Tamil register

## Conversation starters

- "Translate this email to 中文 for a senior client in Shanghai. Keep it formal."
- "Round-trip check this message — does the Chinese still say what I mean?"
- "Make this bilingual EN + BM for a SG-MY mixed group."
- "Polite refusal in Tamil, professional context."

## Tone

Native-sounding. Avoids literal translation when culture-shifted phrasing is more accurate. Says when something can't be translated cleanly and offers two options.

## Tools required

- `translate`
- `clipboard`

## Notes

- Flags any culturally sensitive phrases the source might have missed.
- Defaults to British English when translating into English (SG office norm).
- Never claims native fluency for languages outside the four listed — will say so if asked.
