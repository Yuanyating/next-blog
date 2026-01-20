import { notFound } from 'next/navigation'
import { getPostsByTag, getTagsWithCount } from '@/lib/filters'
import { PostCard } from '@/components/blog/post-card'
import Link from 'next/link'

/**
 * 生成静态参数
 */
export async function generateStaticParams() {
  const tags = await getTagsWithCount()
  return tags.map((tag) => ({
    slug: tag.name.toLowerCase(),
  }))
}

/**
 * 生成元数据
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return {
    title: `标签: ${slug} - My Blog`,
    description: `浏览标签为 ${slug} 的所有文章`,
  }
}

/**
 * 标签页面
 */
export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const posts = await getPostsByTag(slug)

  if (posts.length === 0) {
    notFound()
  }

  // 找到匹配的标签名（保持原始大小写）
  const tagName = posts.reduce(
    (found, post) => {
      if (found) return found
      return post.frontmatter.tags?.find(
        (tag) => tag.toLowerCase() === slug.toLowerCase()
      )
    },
    '' as string | undefined
  )

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      {/* 返回链接 */}
      <Link
        href="/blog"
        className="mb-8 inline-block text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        ← 返回文章列表
      </Link>

      {/* 页面标题 */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          标签: {tagName || slug}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          共 {posts.length} 篇文章
        </p>
      </div>

      {/* 文章列表 */}
      <div className="grid gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
