# SG Claw 安装指南

## 你需要什么

- Mac 电脑（Apple Silicon 或 Intel）
- 网络连接
- 一个 AI 模型的 API key（DeepSeek / OpenAI / Gemini 等）
- Telegram bot token（如果要用 Telegram 聊天）

## 第一步：下载项目

打开 Terminal（终端），运行：

```bash
git clone https://github.com/haresh-seenivasagan/sg-claw.git
cd sg-claw/portable
```

## 第二步：放入 Google 凭证（可选）

如果 Haresh 给你发了一个 `google-credentials.json` 文件，放到这里：

```bash
mkdir -p config
# 把 JSON 文件复制到 config/ 目录下，改名为 google-credentials.json
cp ~/Downloads/google-credentials.json config/google-credentials.json
```

## 第三步：安装

```bash
bash setup.sh
```

这一步会自动下载 Node.js 和 OpenClaw，大约需要 2-5 分钟。

## 第四步：启动

```bash
bash Mac-Start.command
```

启动后浏览器会自动打开两个页面：
- **Config Center**（配置中心）— 在这里设置 AI 模型和聊天频道
- **Dashboard**（控制台）— OpenClaw 的主界面

## 第五步：配置 AI 模型

在 Config Center 页面：

1. 选择你的 AI 模型（推荐 DeepSeek，便宜好用）
2. 粘贴你的 API key
3. 点击保存

## 第六步：连接 Telegram（可选）

1. 在 Telegram 搜索 `@BotFather`
2. 发送 `/newbot`，按提示创建一个 bot
3. 复制 bot token（类似 `7123456789:AAF-xxxxx`）
4. 在 Config Center 的聊天频道部分粘贴 token
5. 保存后，用 Telegram 给你的 bot 发消息
6. 第一次发消息会收到一个配对码（类似 `ABC12345`）

## 第七步：批准配对

在 Terminal（保持 Mac-Start 运行的那个窗口不要关），新开一个终端窗口：

```bash
cd sg-claw/portable

export OPENCLAW_HOME="$PWD/data"
export OPENCLAW_STATE_DIR="$PWD/data/.openclaw"
export OPENCLAW_CONFIG_PATH="$PWD/data/.openclaw/openclaw.json"

NODE="$PWD/app/runtime/node-mac-arm64/bin/node"
OPENCLAW="$PWD/app/core/node_modules/openclaw/openclaw.mjs"

"$NODE" "$OPENCLAW" pairing approve telegram 你收到的配对码
```

之后再给 bot 发消息，AI 就会回复了。

## 停止运行

在运行 Mac-Start 的终端窗口按 `Ctrl+C`。

## 常见问题

**Q: 启动时说 "Port 18789 in use"**
A: 正常，它会自动找下一个可用端口。注意终端输出的实际端口号。

**Q: Dashboard 显示 "disconnected (1006)"**
A: 用终端输出的那个 Dashboard URL 打开，确保带有 `#token=uclaw`。

**Q: Telegram bot 不回复**
A: 检查是否已经批准配对码，检查 API key 是否正确。

**Q: Intel Mac 可以用吗？**
A: 可以，setup.sh 会自动下载对应的 Node.js 版本。
