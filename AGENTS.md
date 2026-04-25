# AGENTS.md

Operational instructions for AI coding agents working on this repository. Read `CLAUDE.md` first for architecture and current-vs-target state.

## First Rule

Do not assume the SG migration is complete.

Current repo reality:
- No `portable/Onboarding.html`.
- No `portable/skills-sg/`.
- Main portable config UI is `portable/config-server/public/index.html`.
- Legacy/reference config UI is `portable/Config.html`.
- Existing preloaded skills are China-oriented under `portable/skills-cn/`.

If a task asks for SG onboarding or SG skills, create the missing files/directories and update setup/install scripts. Do not only update UI labels.

## Before Editing

Check actual files, not only docs:

```bash
find portable -maxdepth 2 -type f | sort
find portable -maxdepth 2 -type d | sort
rg -n "skills-cn|skills-sg|Onboarding.html|Config.html|config-server|openclaw.json" portable u-claw-app install bootable
```

Useful current files:
- `portable/Mac-Start.command`
- `portable/Windows-Start.bat`
- `portable/config-server/server.js`
- `portable/config-server/public/index.html`
- `portable/Config.html`
- `portable/setup.sh`
- `install/install.sh`
- `install/install.ps1`
- `u-claw-app/src/main.js`

## Config UI Work

Current browser UI served by the portable config-server:

```text
portable/config-server/public/index.html
```

It saves config through:

```javascript
fetch('/api/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) })
```

Reference config-building logic:
- `portable/config-server/public/index.html`: `buildConfig(...)`
- `portable/Config.html`: `buildOpenClawConfig(...)`

Common failure modes:
- Missing `baseUrl`
- Missing provider `api`
- Missing `models[]`
- `agents.defaults.model.primary` does not match `<provider>/<model-id>`
- Client overwrites config and accidentally drops existing `channels`
- UI references skills that do not exist on disk

Important: `POST /api/config` overwrites the whole config object. If preserving existing settings, GET first, merge intentionally, then POST the full result.

## Config-Server Work

Current file:

```text
portable/config-server/server.js
```

Current behavior:
- Fixed localhost port `18788`.
- `GET /api/config` reads `portable/data/.openclaw/openclaw.json`.
- `POST /api/config` writes the posted JSON to that file.
- Static serving is from `portable/config-server/public/`.
- `/` maps to `portable/config-server/public/index.html`.
- The server currently includes legacy WeChat/iLink endpoints and plugin-copy logic.

Do not document or implement it as a pure dumb pipe unless you first remove the legacy WeChat behavior.

Do not add provider API calls here unless there is a clear architectural decision. Prefer OpenClaw handling runtime integrations. If the UI performs credential verification, keep it explicit and limited.

## Startup Script Work

Portable launchers start two local services:
- OpenClaw gateway: first available port from `18789` to `18799`.
- Config-server: fixed port `18788`.

Rules:
- Do not hardcode the OpenClaw gateway to only `18789`.
- Do not remove config-server startup while browser UI needs file writes.
- Keep `OPENCLAW_HOME`, `OPENCLAW_STATE_DIR`, and `OPENCLAW_CONFIG_PATH` consistent across Mac, Windows, Electron, install, and bootable modules if changed.
- Keep startup scripts offline-capable where possible.

## SG Skills Work

Current skills:

```text
portable/skills-cn/*/SKILL.md
```

Target SG skills should be created under:

```text
portable/skills-sg/<skill-id>/SKILL.md
```

If creating SG skills, also update:
- `portable/setup.sh`
- `portable/setup.bat`
- `portable/setup.ps1`
- `install/install.sh`
- `install/install.ps1`
- Any UI that lists selectable skills
- Any release copy under `usb-release/` if it is still used

Skill format:

```markdown
---
name: skill-id
description: "One-line description"
metadata: { "openclaw": { "emoji": "home" } }
---

# Skill Title

Instructions...
```

Keep skill IDs stable and make the frontmatter `name` match the directory name.

Recommended SG skill targets:
- `family-command-center`
- `home-admin-bills`
- `groceries-cooking`
- `scam-document-shield`
- `singapore-life-admin`

## SG Product Boundaries

The product direction is a private family assistant for Singapore households.

Default channels:
- WhatsApp
- Telegram

Do not add China-market defaults to SG onboarding:
- QQ
- Feishu
- WeCom
- WeChat Enterprise
- Doubao
- MiniMax
- Zhipu GLM
- SiliconFlow

Do not ask users for:
- Singpass passwords
- Bank passwords
- OTPs
- CPF/HDB/IRAS/SP/telco passwords
- Full NRIC unless explicitly required for a local-only document workflow and the user understands the risk

Do not automate:
- Bill payment
- Bank transfers
- Government submissions
- Healthcare decisions
- Tax/legal advice as final authority

Use safe verbs:
- Summarise
- Extract
- Remind
- Draft
- Compare
- Prepare checklist
- Ask for confirmation

## Testing Checklist

Portable smoke test:

```bash
cd portable
bash setup.sh
bash Mac-Start.command
```

Then verify:
- Config center opens at `http://127.0.0.1:18788/`.
- Dashboard opens on the selected OpenClaw port.
- `portable/data/.openclaw/openclaw.json` is valid JSON.
- Selected provider has `baseUrl`, `api`, `models[]`, and matching `agents.defaults.model.primary`.
- Channel config was not accidentally dropped.
- Skills offered in UI exist on disk and are copied into OpenClaw's skills directory during setup.

Static verification:

```bash
node -e "JSON.parse(require('fs').readFileSync('portable/default-config.json','utf8')); console.log('ok')"
rg -n "Onboarding.html|skills-sg|skills-cn|QQ|Feishu|WeChat|U-Claw|中国|中文" CLAUDE.md AGENTS.md portable u-claw-app install
```

## Common Mistakes

Mistake: editing nonexistent onboarding.

Wrong:
```text
portable/Onboarding.html
```

Current:
```text
portable/config-server/public/index.html
```

Mistake: creating SG skill docs but not installing them.

If `portable/skills-sg/` exists but setup scripts still copy only `portable/skills-cn/`, users will never get the SG skills.

Mistake: treating email or calendar integration as already available.

Unless an integration is implemented and tested, UI copy should say users can forward/upload screenshots/PDFs manually.

Mistake: making the agent too autonomous.

For bills, government, healthcare, school, and banking workflows, the assistant should prepare and remind. The user confirms and executes.

