# My Blog

一个使用 Next.js 14、TypeScript 和 Tailwind CSS 构建的现代化个人博客系统。

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ 特性

### 核心功能
- 📝 **MDX 支持** - 使用 Markdown + JSX 编写文章
- 🎨 **深色模式** - 支持浅色/深色主题切换
- 🔍 **全文搜索** - 基于 Fuse.js 的客户端模糊搜索
- 📱 **响应式设计** - 完美适配各种设备
- ⚡ **高性能** - 基于 Next.js 14 App Router

### 内容组织
- 🏷️ **分类系统** - 文章分类管理
- 🏷️ **标签系统** - 文章标签筛选
- 📚 **文章目录** - 自动生成目录导航
- 📊 **阅读进度** - 顶部阅读进度条

### 用户体验
- 💬 **评论系统** - 集成 Giscus (GitHub Discussions)
- 👁️ **浏览量统计** - 文章浏览次数统计
- 📤 **社交分享** - Twitter、邮件、复制链接
- 🔗 **相关推荐** - 智能相关文章推荐
- 🎯 **SEO 优化** - 自动生成 sitemap 和 robots.txt

### 技术亮点
- 💻 **代码高亮** - 自动语法高亮
- 🎭 **TypeScript** - 类型安全
- 🎨 **Tailwind CSS** - 原子化样式
- 🚀 **静态生成** - SSG + ISR
- 📦 **代码分割** - 自动优化

## 🚀 快速开始

### 环境要求

- Node.js 18.18+ 或 20.9+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

复制环境变量示例文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=My Blog
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 📁 项目结构

```
blog/
├── content/
│   └── posts/               # MDX 文章目录
├── docs/                    # 文档
│   ├── DEPLOYMENT.md        # 部署指南
│   └── GISCUS_SETUP.md      # Giscus 配置指南
├── public/                  # 静态资源
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── about/           # 关于页面
│   │   ├── blog/            # 博客相关页面
│   │   │   ├── [slug]/     # 文章详情页
│   │   │   ├── category/   # 分类页面
│   │   │   └── tag/        # 标签页面
│   │   ├── api/            # API 路由
│   │   ├── layout.tsx      # 根布局
│   │   ├── page.tsx        # 首页
│   │   └── globals.css     # 全局样式
│   ├── components/          # React 组件
│   │   ├── blog/           # 博客相关组件
│   │   ├── layout/         # 布局组件
│   │   └── theme/          # 主题组件
│   ├── lib/                # 工具函数
│   │   ├── mdx.ts          # MDX 处理
│   │   ├── filters.ts      # 筛选工具
│   │   └── utils.ts        # 通用工具
│   └── types/              # TypeScript 类型
├── .env.example            # 环境变量示例
├── next.config.ts          # Next.js 配置
├── tailwind.config.ts      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目依赖
```

## 📝 添加文章

1. 在 `content/posts/` 目录创建新的 `.md` 或 `.mdx` 文件
2. 添加 frontmatter：

```markdown
---
title: "文章标题"
description: "文章描述"
date: "2025-01-20"
author: "作者名"
tags: ["标签1", "标签2"]
category: "分类名"
---

文章内容...
```

3. 保存文件，Next.js 会自动生成路由

## 🔧 配置

### Giscus 评论系统

详见 [Giscus 配置指南](./docs/GISCUS_SETUP.md)

### 部署配置

详见 [部署指南](./docs/DEPLOYMENT.md)

## 🎨 自定义

### 修改主题颜色

编辑 `src/app/globals.css` 中的 CSS 变量：

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  /* ... */
}
```

### 修改布局组件

- `src/components/layout/header.tsx` - 导航栏
- `src/components/layout/footer.tsx` - 页脚

### 修改网站信息

编辑 `src/app/layout.tsx` 中的 metadata。

## 📊 性能

- Lighthouse 分数: 90+
- 首次内容绘制 (FCP): < 1s
- 最大内容绘制 (LCP): < 2.5s
- 累积布局偏移 (CLS): < 0.1

## 🚀 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

详见 [部署指南](./docs/DEPLOYMENT.md)

### 其他平台

- Netlify
- Docker
- 自建服务器

## 🛠️ 技术栈

- **框架**: [Next.js 14](https://nextjs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/)
- **内容**: [MDX](https://mdxjs.com/)
- **评论**: [Giscus](https://giscus.app/)
- **搜索**: [Fuse.js](https://fusejs.io/)
- **包管理**: [pnpm](https://pnpm.io/)

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

- Email: your.email@example.com
- GitHub: @yourusername
- Twitter: @yourusername

---

Built with ❤️ using Next.js and TypeScript
