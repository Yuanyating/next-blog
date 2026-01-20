import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/mdx";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleContent } from "@/components/blog/article-content";
import { ReadingProgressWrapper } from "@/components/blog/reading-progress-wrapper";
import { ViewCounter } from "@/components/blog/view-counter";
import { SocialShare } from "@/components/blog/social-share";
import { Comments } from "@/components/blog/comments";
import { RelatedPosts } from "@/components/blog/related-posts";

/**
 * 生成静态参数
 */
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * 生成元数据
 */
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  return {
    title: `${post.frontmatter.title} - My Blog`,
    description: post.frontmatter.description,
  };
}

/**
 * 文章详情页
 */
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const allPosts = await getAllPosts();

  return (
    <>
      <ReadingProgressWrapper />
      <div className="container mx-auto max-w-5xl px-4 py-16">
        {/* 返回按钮 */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          返回文章列表
        </Link>

        {/* 文章头部 */}
        <header className="mb-12 border-b border-gray-200 pb-8 dark:border-gray-800">
          {/* 分类 */}
          {frontmatter.category && (
            <div className="mb-4">
              <Link
                href={`/blog/category/${frontmatter.category.toLowerCase()}`}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
              >
                {frontmatter.category}
              </Link>
            </div>
          )}

          {/* 标题 */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {frontmatter.title}
          </h1>

          {/* 描述 */}
          {frontmatter.description && (
            <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
              {frontmatter.description}
            </p>
          )}

          {/* 元信息 */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {/* 日期 */}
              <div className="flex items-center gap-2">
                <time dateTime={frontmatter.date}>
                  {format(new Date(frontmatter.date), "yyyy年MM月dd日", {
                    locale: zhCN,
                  })}
                </time>
              </div>

              {/* 作者 */}
              {frontmatter.author && (
                <>
                  <span>·</span>
                  <span>{frontmatter.author}</span>
                </>
              )}

              {/* 浏览量 */}
              <span>·</span>
              <ViewCounter slug={params.slug} />
            </div>

            {/* 分享按钮 */}
            <SocialShare title={frontmatter.title} url={`/blog/${params.slug}`} />
          </div>

          {/* 标签 */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase()}`}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-700"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <ArticleContent content={content} />

        {/* 相关文章推荐 */}
        <RelatedPosts currentPost={post} allPosts={allPosts} />

        {/* 评论区 */}
        <Comments slug={params.slug} />
      </div>
    </>
  );
}
