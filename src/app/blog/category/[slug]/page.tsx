import { notFound } from 'next/navigation'
import { getPostsByCategory, getCategoriesWithCount } from '@/lib/filters'
import { PostCard } from '@/components/blog/post-card'
import Link from 'next/link'

/**
 * 生成静态参数
 */
export async function generateStaticParams() {
  const categories = await getCategoriesWithCount()
  return categories.map((category) => ({
    slug: category.name.toLowerCase(),
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
    title: `分类: ${slug} - My Blog`,
    description: `浏览 ${slug} 分类下的所有文章`,
  }
}

/**
 * 分类页面
 */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const posts = await getPostsByCategory(slug)

  if (posts.length === 0) {
    notFound()
  }

  const categoryName = posts[0].frontmatter.category || slug

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
          分类: {categoryName}
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
