'use client'

import { useState } from 'react'
import { PostCard } from './post-card'
import { SearchInput } from './search-input'
import type { Post } from '@/types/post'

interface BlogListProps {
  posts: Post[]
}

/**
 * 文章列表组件（客户端）
 * 包含搜索功能
 */
export function BlogList({ posts }: BlogListProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts)

  const totalCount = posts.length
  const filteredCount = filteredPosts.length

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      {/* 页面标题 */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">博客文章</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {filteredCount === totalCount
            ? `共 ${totalCount} 篇文章`
            : `找到 ${filteredCount} 篇文章（共 ${totalCount} 篇）`}
        </p>
      </div>

      {/* 搜索框 */}
      <SearchInput posts={posts} onResults={setFilteredPosts} />

      {/* 文章列表 */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            没有找到匹配的文章
          </p>
        </div>
      )}
    </div>
  )
}
