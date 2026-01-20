'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import type { Post } from '@/types/post'

interface PostCardProps {
  post: Post
}

/**
 * 文章卡片组件
 * 显示文章标题、描述、日期和标签
 */
export function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter } = post

  return (
    <article className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* 标题链接 */}
      <Link href={`/blog/${slug}`} className="block">
        {/* 标题 */}
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {frontmatter.title}
        </h2>

        {/* 描述 */}
        <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
          {frontmatter.description}
        </p>
      </Link>

      {/* 元信息 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        {/* 日期 */}
        <time dateTime={frontmatter.date}>
          {format(new Date(frontmatter.date), 'yyyy年MM月dd日', {
            locale: zhCN,
          })}
        </time>

        {/* 分类 */}
        {frontmatter.category && (
          <>
            <span>·</span>
            <Link
              href={`/blog/category/${frontmatter.category.toLowerCase()}`}
              className="rounded bg-gray-100 px-2 py-1 text-xs transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {frontmatter.category}
            </Link>
          </>
        )}

        {/* 作者 */}
        {frontmatter.author && (
          <>
            <span>·</span>
            <span>{frontmatter.author}</span>
          </>
        )}
      </div>

      {/* 标签 */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
