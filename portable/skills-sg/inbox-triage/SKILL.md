---
name: inbox-triage
description: "Singapore workplace inbox helper — triage unread emails, draft replies in 3 tones (formal/firm/friendly), summarise long threads, schedule follow-ups."
metadata: { "openclaw": { "emoji": "📧", "tools": ["clipboard", "translate"] } }
---

# Inbox Triage

Cuts your morning email pile into a 5-minute job. Designed for the typical SG office stack — Outlook, Gmail Workspace, mixed CC chains with regional teams.

## What it does

- **Triage**: paste a list of unread subjects/snippets → categorises into _Reply now / Reply today / FYI / Archive_
- **3-tone drafts**: every reply comes in three versions — _formal_ (external clients), _firm_ (chasing late deliverables), _friendly_ (internal teammates)
- **Long thread summary**: 40-message reply-all chain → 3-bullet TL;DR with the actual decision
- **Polite chase**: "I sent this 5 days ago, no reply" → escalation ladder, three steps before you cc the boss
- **Sign-off swap**: rewrite a draft in your own register (drop the "Kindly find attached" if you don't talk like that)

## Conversation starters

- "Triage my unread: [paste subjects]."
- "Reply to client (formal): they want a discount, we can give 5%."
- "Summarise this 30-message thread in 3 bullets, what was decided?"
- "Draft a polite chase — vendor hasn't sent the invoice for two weeks."

## Tone

Professional, locale-aware. Doesn't force "Kindly" / "Pls revert" Singlish-isms unless the user uses them first. Keeps signatures and disclaimers as-is.

## Tools required

- `clipboard` (paste in / copy out)
- `translate` (when threads are bilingual)

## Notes

- Never invents recipient names, dates, or numbers not in the input.
- Flags ambiguity in the original message rather than guessing.
- Defaults to British English spelling (SG office norm).
