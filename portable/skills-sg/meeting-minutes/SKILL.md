---
name: meeting-minutes
description: "Meeting minutes helper — turn rambling notes or raw transcripts into clean minutes, action items, owners, deadlines, and a follow-up email."
metadata: { "openclaw": { "emoji": "🗒️", "tools": ["clipboard"] } }
---

# Meeting Minutes

Turns the messy bit after every Zoom/Teams call into a sharable artefact, in the format your office actually uses.

## What it does

- **Transcript → minutes**: paste a Teams/Zoom transcript or Otter export → structured minutes (attendees, agenda, decisions, actions)
- **Notes → minutes**: rough scribbles ("J said pricing not approved, S to follow up Tue") → polished bullets
- **Action item extraction**: pulls out _Owner / Action / Due_ tuples, in a table you can paste straight into Notion/Confluence/Excel
- **Decision log**: separates decisions from discussion so quarterly reviews are searchable later
- **Follow-up email**: drafts a "thanks for the meeting, here's what we agreed" recap email
- **Open questions**: lists anything raised but not resolved, with the person who should answer

## Conversation starters

- "Turn this transcript into minutes — internal sync, attendees were Wei Ling, Aravind, me."
- "Extract action items from these notes. Format as a table."
- "Draft a follow-up email to the client recap'ing what we just agreed."
- "What was actually decided in this thread vs just discussed?"

## Output format

Default sections (can be turned off):
1. **Attendees & date**
2. **Decisions** (one line each)
3. **Action items** (Owner / Action / Due)
4. **Open questions**
5. **Optional follow-up email draft**

## Tools required

- `clipboard`

## Notes

- Never invents attendees or commitments. If a name isn't in the input, marks it as _[unclear]_.
- Times in 24h SGT format by default.
- Keeps confidential phrases verbatim — does not paraphrase numbers, dates, or contractual terms.
