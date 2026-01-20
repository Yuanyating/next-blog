'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

/**
 * Giscus 评论组件
 * 基于 GitHub Discussions 的评论系统
 *
 * 环境变量配置：
 * NEXT_PUBLIC_GISCUS_REPO - GitHub 仓库 (username/repo)
 * NEXT_PUBLIC_GISCUS_REPO_ID - 仓库 ID
 * NEXT_PUBLIC_GISCUS_CATEGORY - Discussion 分类
 * NEXT_PUBLIC_GISCUS_CATEGORY_ID - 分类 ID
 */
export function Comments() {
  const { theme, resolvedTheme } = useTheme()
  const currentTheme =
    theme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light'

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Announcements'
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

  // 如果没有配置 Giscus，不显示评论区
  if (!repo || !repoId || !categoryId) {
    return (
      <div className="mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
        <h3 className="mb-6 text-2xl font-bold">评论</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          评论功能尚未配置。请在 .env.local 中配置 Giscus 环境变量。
        </p>
      </div>
    )
  }

  return (
    <div className="mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
      <h3 className="mb-6 text-2xl font-bold">评论</h3>
      <Giscus
        id="comments"
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        term="Welcome to @giscus/widget component!"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={currentTheme}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  )
}
