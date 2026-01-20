# 部署指南

本指南将帮助你将博客部署到生产环境。

## 部署前准备

### 1. 配置环境变量

复制环境变量示例文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，配置以下变量：

```bash
# 网站配置
NEXT_PUBLIC_SITE_URL=https://yourdomain.com        # 你的网站域名
NEXT_PUBLIC_SITE_NAME=My Blog                      # 网站名称

# Giscus 评论系统（可选）
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id

# Google Analytics（可选）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. 更新项目信息

编辑以下文件，替换为你的信息：

**`src/app/layout.tsx`**:
```typescript
export const metadata: Metadata = {
  title: {
    default: "你的网站名称",
    template: "%s | 你的网站名称",
  },
  description: "你的网站描述",
  authors: [{ name: "你的名字" }],
  creator: "你的名字",
  // ...
};
```

**`src/components/layout/footer.tsx`**:
```typescript
<p className="text-sm text-gray-600 dark:text-gray-400">
  © {new Date().getFullYear()} 你的名字. All rights reserved.
</p>
```

**`src/app/about/page.tsx`**:
- 更新个人简介
- 更新技能栈
- 更新联系方式

### 3. 更新 README

编辑 `README.md`，添加你的项目信息。

---

## 部署到 Vercel（推荐）

Vercel 是 Next.js 的官方部署平台，配置简单，性能优秀。

### 步骤 1: 推送代码到 GitHub

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin https://github.com/your-username/your-repo.git

# 推送到 GitHub
git push -u origin main
```

### 步骤 2: 在 Vercel 导入项目

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 选择你的仓库
5. Vercel 会自动检测 Next.js 项目

### 步骤 3: 配置环境变量

在 Vercel 项目设置中添加环境变量：

1. 进入项目 Settings → Environment Variables
2. 添加以下变量：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.vercel.app`（或你的自定义域名） |
| `NEXT_PUBLIC_SITE_NAME` | `My Blog` |
| `NEXT_PUBLIC_GISCUS_REPO` | `your-username/your-repo` |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | `your-repo-id` |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | `Announcements` |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | `your-category-id` |

### 步骤 4: 部署

点击 "Deploy" 按钮，Vercel 会自动：
- 安装依赖（使用 `pnpm install`）
- 构建项目（使用 `pnpm build`）
- 部署到 CDN

部署完成后，你会得到一个 `.vercel.app` 域名。

### 步骤 5: 配置自定义域名（可选）

1. 在 Vercel 项目设置中，点击 "Domains"
2. 添加你的域名
3. 根据提示配置 DNS 记录

---

## 部署到 Netlify

### 步骤 1: 准备配置文件

创建 `netlify.toml`：

```toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 步骤 2: 在 Netlify 导入项目

1. 访问 https://netlify.com
2. 点击 "Add new site" → "Import an existing project"
3. 连接 GitHub 并选择你的仓库

### 步骤 3: 配置构建设置

- **Build command**: `pnpm build`
- **Publish directory**: `.next`

### 步骤 4: 配置环境变量

在 Site settings → Environment variables 中添加环境变量（同 Vercel）。

### 步骤 5: 部署

点击 "Deploy site"。

---

## 部署到自己的服务器

### 使用 Docker

创建 `Dockerfile`：

```dockerfile
FROM node:20-alpine AS base

# 安装 pnpm
RUN npm install -g pnpm

# 依赖
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 构建
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# 运行
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

在 `next.config.ts` 中启用 standalone 输出：

```typescript
const nextConfig = {
  output: 'standalone',
};
```

构建并运行：

```bash
docker build -t my-blog .
docker run -p 3000:3000 my-blog
```

---

## 部署后检查清单

部署完成后，检查以下内容：

- [ ] 网站可以正常访问
- [ ] 所有页面路由正常
- [ ] 主题切换功能正常
- [ ] 文章搜索功能正常
- [ ] 代码语法高亮正常
- [ ] Giscus 评论系统正常（如果配置）
- [ ] sitemap.xml 可以访问 (`/sitemap.xml`)
- [ ] robots.txt 可以访问 (`/robots.txt`)
- [ ] 检查控制台是否有错误
- [ ] 使用 Lighthouse 检查性能

---

## 常见问题

### Q: 部署后环境变量不生效？

**A**:
- 确保 Vercel/Netlify 中配置了环境变量
- 环境变量名称必须以 `NEXT_PUBLIC_` 开头
- 重新部署项目

### Q: 图片无法显示？

**A**:
- 检查 `next.config.ts` 中的图片域名配置
- 确保图片 URL 在 `images.remotePatterns` 中

### Q: 构建失败？

**A**:
- 检查依赖是否正确安装
- 确保使用 `pnpm` 而不是 `npm`
- 查看构建日志中的错误信息

### Q: 如何查看部署日志？

**A**:
- **Vercel**: 项目页面 → Deployments → 点击具体的部署 → View Logs
- **Netlify**: Deploys 页面 → 点击具体的部署 → Click to view

---

## 性能优化建议

部署后，可以进一步优化性能：

1. **启用 CDN** - Vercel/Netlify 自动提供
2. **配置缓存** - 在 `vercel.json` 中配置缓存策略
3. **图片优化** - 使用 `next/image` 组件
4. **代码分割** - Next.js 自动处理
5. **启用压缩** - 在 `next.config.ts` 中启用

---

## 更新部署

当需要更新博客时：

```bash
# 1. 修改内容
git add .
git commit -m "Update content"
git push
```

Vercel/Netlify 会自动检测到推送并重新部署。

---

## 参考链接

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Netlify 文档](https://docs.netlify.com/)
- [Giscus 配置指南](./GISCUS_SETUP.md)
