# 🍎 点击吃苹果

一个适合微信、钉钉扫码打开的 H5 限时点击小游戏：60 秒内点击屏幕上随机出现的苹果，看谁点得最多！

## 游戏规则

- 游戏时间：**60 秒**
- 目标：点击红色的 🍎 苹果得分
- 其他水果（🍌🍊🍇🍓🍒🍍🥝）不得分，但会干扰视线
- 每次点击苹果后，会随机生成更多苹果和其他水果
- 分数越高排名越高，支持排行榜记录

## 使用方式

1. 用手机浏览器、微信或钉钉扫码打开游戏地址
2. 输入昵称，点击"开始挑战"
3. 在 60 秒内尽量多点击 🍎 苹果
4. 游戏结束后查看排行榜

## 在线地址

**https://game.qianjin.xyz**

## 技术栈

- 前端：原生 HTML + CSS + JavaScript
- 后端 API：Next.js (API Routes)
- 数据库：Upstash Redis (排行榜数据存储)
- 部署：Vercel

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
├── index.html          # 游戏主页面
├── api/
│   ├── leaderboard.ts  # 排行榜 API
│   └── submit-score.ts # 提交分数 API
├── .env.local          # 本地环境变量（不在 Git 中）
└── vercel.json         # Vercel 配置
```

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/leaderboard` | GET | 获取排行榜 TOP10 |
| `/api/submit-score` | POST | 提交分数 `{ score, nickname }` |

## 部署说明

项目已配置自动部署到 Vercel，每次 `git push` 会自动触发部署。

### 环境变量

部署时需要在 Vercel 项目设置中配置以下环境变量：

| 变量名 | 说明 |
|--------|------|
| `UPSTASH_URL` | Upstash Redis REST URL |
| `UPSTASH_TOKEN` | Upstash Redis REST Token |

## 游戏截图

```
┌─────────────────────────┐
│ CLICK · EAT · SCORE     │
│ 点击吃苹果         60秒  │
├─────────────────────────┤
│                         │
│      🍎    🍌           │
│           🍇            │
│    🍓         🍊        │
│                         │
├─────────────────────────┤
│ 已吃 0 个               │
└─────────────────────────┘
```

## 后续优化方向

- [ ] 添加音效和连击特效
- [ ] 增加道具系统（如炸弹清除干扰水果）
- [ ] 好友邀请对战模式
- [ ] 皮肤系统