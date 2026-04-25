# CLAUDE.md

Guidance for Claude Code and other coding agents working in this repository.

## Current State

This repository is being converted from **U-Claw** to **SG Claw**.

Current reality:
- The repo still contains U-Claw/China-oriented UI, scripts, docs, and skills.
- The portable launcher currently opens the config center at `portable/config-server/public/index.html`.
- There is no `portable/Onboarding.html` yet.
- There is no `portable/skills-sg/` yet.
- Existing skills live in `portable/skills-cn/` and are copied into OpenClaw during setup.

Target direction:
- SG Claw should become a Singapore-localised OpenClaw wrapper.
- Priority use cases are household admin/bills, groceries/cooking, family coordination, scam/document checking, and Singapore life admin.


## Project Model

SG Claw packages OpenClaw onto a USB/app experience so non-technical users can configure and run an AI assistant with minimal setup.

We do not build the AI engine. OpenClaw is the engine. This repository provides:
- Launchers
- Bundled Node.js runtime
- OpenClaw installation wrapper
- Config/onboarding UI
- Local config/data layout
- Preloaded skills
- Maintenance/install scripts

## Current Runtime Pieces

### 1. OpenClaw

OpenClaw is installed as an npm package under:

```text
portable/app/core/node_modules/openclaw/
```

Do not edit OpenClaw package files directly. Change this wrapper, config, skills, or setup scripts instead.

OpenClaw reads:

```text
portable/data/.openclaw/openclaw.json
```

The launchers set:
- `OPENCLAW_HOME`
- `OPENCLAW_STATE_DIR`
- `OPENCLAW_CONFIG_PATH`

### 2. Bundled Node.js

Users should not need a system Node.js install. Runtime binaries are downloaded by setup scripts into:

```text
portable/app/runtime/node-mac-arm64/
portable/app/runtime/node-mac-x64/
portable/app/runtime/node-win-x64/
```

### 3. Portable Launchers

Portable entrypoints:
- `portable/Mac-Start.command`
- `portable/Windows-Start.bat`

The Mac launcher currently:
- Detects architecture
- Finds bundled Node.js
- Creates `portable/data/.openclaw/openclaw.json` if missing
- Starts OpenClaw gateway on the first available port from `18789` to `18799`
- Starts config-server on fixed port `18788`
- Opens both the OpenClaw dashboard and config center

Do not remove the config-server startup unless the UI no longer needs browser-to-disk writes.

### End-to-End Flow

This is how all pieces connect at runtime. Every contributor should understand this before changing anything.

```
User plugs in USB, double-clicks Mac-Start.command
  │
  ├─ Script detects CPU arch, finds bundled Node.js in app/runtime/
  ├─ Sets env vars: OPENCLAW_HOME, OPENCLAW_STATE_DIR, OPENCLAW_CONFIG_PATH
  ├─ Scans ports 18789–18799, picks first free one
  │
  ├─ Starts config-server on port 18788          (config-server/server.js)
  │     Serves HTML pages
  │     GET/POST /api/config reads/writes openclaw.json
  │
  ├─ Starts OpenClaw gateway on port 18789       (app/core/node_modules/openclaw/openclaw.mjs)
  │     The actual AI engine
  │     Reads openclaw.json for all configuration
  │
  └─ Opens browser to both ports
        │
        v
  Browser loads config UI from config-server (port 18788)
        │
        ├─ User picks model (e.g. DeepSeek)
        ├─ User enters API key
        ├─ User enters Telegram bot token
        │
        ├─ JavaScript builds config JSON   ← THIS IS THE CRITICAL STEP
        │     Must include: baseUrl, api, models[], matching primary
        │     Reference: Config.html buildOpenClawConfig() ~line 428
        │
        └─ fetch POST to http://127.0.0.1:18788/api/config
              │
              v
        Config-server writes JSON to data/.openclaw/openclaw.json
              │
              v
        OpenClaw hot-reloads the config
              ├─ Connects to DeepSeek API (using baseUrl + apiKey from config)
              ├─ Connects to Telegram Bot API (using token from config)
              └─ Dashboard is live on port 18789
                    │
                    v
              User messages their Telegram bot → AI responds
```

Key insight: the HTML page never talks to DeepSeek or Telegram. It only writes JSON. The config-server only moves JSON between browser and disk. OpenClaw does all the real work. If the JSON is correct, everything works. If the JSON is wrong, nothing works.

### 4. Config Server

Current file:

```text
portable/config-server/server.js
```

Current fixed port:

```text
18788
```

Current config path:

```text
portable/data/.openclaw/openclaw.json
```

Core endpoints:
- `GET /api/config`
- `POST /api/config`

Important details:
- `POST /api/config` overwrites the whole config object sent by the client.
- It deletes deprecated top-level `agent` before writing.
- Static files are served from `portable/config-server/public/`.
- `GET /` serves `portable/config-server/public/index.html`.
- It does not currently serve arbitrary files from `portable/`.

Legacy note:
- The config-server currently contains WeChat/iLink QR login and plugin-install code.
- This is U-Claw/China-specific legacy functionality.
- Do not extend it for SG Claw unless the product decision explicitly includes WeChat.
- For SG Claw, prefer WhatsApp and Telegram.

### 5. HTML Config UI

Current primary browser UI:

```text
portable/config-server/public/index.html
```

Legacy/reference UI:

```text
portable/Config.html
```

Both are plain HTML/CSS/JS with no build step.

Current config-building functions:
- `portable/config-server/public/index.html`: `buildConfig(...)`
- `portable/Config.html`: `buildOpenClawConfig(...)`

If you add a new onboarding page, either reuse the same config shape or refactor config-building into shared JS first. Do not create a third incompatible config format.

## Config Contract

`openclaw.json` is the interface between this wrapper and OpenClaw.

Known working model-provider shape used by current UI:

```json
{
  "gateway": {
    "auth": { "mode": "token", "token": "uclaw" }
  },
  "commands": {
    "native": "auto",
    "nativeSkills": "auto",
    "restart": true,
    "ownerDisplay": "raw"
  },
  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com/v1",
        "apiKey": "USER_API_KEY",
        "api": "openai-completions",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "deepseek-chat",
            "reasoning": false,
            "input": ["text"],
            "cost": { "input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0 },
            "contextWindow": 128000,
            "maxTokens": 8192
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": { "primary": "deepseek/deepseek-chat" }
    }
  },
  "meta": {
    "lastTouchedVersion": "2026.3.13",
    "lastTouchedAt": "ISO_TIMESTAMP"
  }
}
```

Critical rules:
- `models.providers.<provider>.baseUrl` must be present.
- `models.providers.<provider>.api` must be present.
- `models.providers.<provider>.models[]` must include the selected model ID.
- `agents.defaults.model.primary` must match `<provider>/<model-id>`.
- If preserving existing channel config, fetch current config first and merge intentionally before POSTing.

Current channel examples:

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "7123456789:AAF-YOUR-BOT-TOKEN",
      "dmPolicy": "pairing"
    },
    "whatsapp": {
      "enabled": true
    }
  }
}
```

Telegram needs a BotFather token. WhatsApp uses QR/pairing at runtime and should not ask for a password.

## Skills

Current checked-in skills:

```text
portable/skills-cn/*/SKILL.md
```

Current setup behavior:
- `portable/setup.sh` copies `portable/skills-cn/*` into `portable/app/core/node_modules/openclaw/skills/`.
- `install/install.sh` and `install/install.ps1` also embed/write China-oriented skills.



Do not claim SG skills are preinstalled until the directory and setup scripts exist.

## SG Product Rules

Branding:
- User-facing product name: `SG Claw`
- Code/package/path name: `sg-claw`
- Avoid new `U-Claw` copy unless preserving legacy context.

Channels:
- SG default channels should be WhatsApp and Telegram.
- Do not add QQ, Feishu, WeCom, or WeChat Enterprise to SG onboarding unless explicitly requested.



## Distribution Modules

```text
portable/       USB content skeleton plus setup scripts
u-claw-app/     Electron desktop app variant
bootable/       Ventoy/Ubuntu bootable Linux USB module
install/        One-line network install scripts
usb-release/    Release/output-style USB copy
```

These modules are related but not identical. If you change config paths, runtime paths, skills, or branding, check all relevant modules.

## Development Commands

```bash
# Portable development setup
cd portable
bash setup.sh
bash Mac-Start.command

# Electron app
cd u-claw-app
bash setup.sh
npm run dev
npm run build:mac-arm64

# Search for stale China/U-Claw references
rg -n "U-Claw|u-claw|China|中国|QQ|Feishu|WeChat|WeCom|skills-cn|Onboarding.html|skills-sg" .
```

## What Not To Commit

Never commit runtime dependencies, user data, or build artifacts:
- `portable/app/`
- `portable/data/`
- `u-claw-app/node_modules/`
- `u-claw-app/release/`
- `u-claw-app/resources/runtime/`
- `*.dmg`
- `*.exe`
- `*.blockmap`

## Platform Status

Current repo status:
- Mac Apple Silicon: main tested path
- Mac Intel: intended path via `node-mac-x64`
- Windows x64: present but still marked in-development in existing docs
- Linux x64: bootable module under `bootable/`

