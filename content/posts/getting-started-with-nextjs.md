---
title: "Next.js 入门指南"
description: "学习如何使用 Next.js 构建现代化的 Web 应用程序"
date: "2025-01-18"
author: "Your Name"
tags: ["Next.js", "React", "Web Development"]
category: "教程"
---

Next.js 是一个强大的 React 框架，它提供了许多开箱即用的功能，帮助你构建快速、SEO 友好的 Web 应用程序。

## 什么是 Next.js？

Next.js 是由 Vercel 开发的 React 框架，它提供了：

- 服务端渲染（SSR）
- 静态站点生成（SSG）
- 增量静态再生成（ISR）
- API 路由
- 自动代码分割
- 图片优化

## 安装 Next.js

使用以下命令创建新的 Next.js 项目：

```bash
npx create-next-app@latest my-app
```

或者使用 pnpm（推荐）：

```bash
pnpm create next-app my-app
```

## 页面路由

在 Next.js 中，每个文件都对应一个路由。例如：

```
app/
├── page.tsx       → /
├── about/
│   └── page.tsx   → /about
└── blog/
    ├── page.tsx   → /blog
    └── [slug]/
        └── page.tsx → /blog/:slug
```

## 数据获取

Next.js 提供了多种数据获取方式：

### 静态生成

```typescript
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

### 动态渲染

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}
```

## 部署

Next.js 可以轻松部署到 Vercel：

```bash
vercel deploy
```

## 总结

Next.js 是构建现代 Web 应用的绝佳选择。开始使用它，你会发现开发效率大大提升！
