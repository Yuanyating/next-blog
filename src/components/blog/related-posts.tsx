import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Post } from "@/types/post";

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
}

/**
 * 相关文章推荐组件
 * 基于分类和标签推荐相关文章
 */
export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  // 获取当前文章的分类和标签
  const { category, tags } = currentPost.frontmatter;

  // 计算相关度分数
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;

      // 分类匹配加分
      if (post.frontmatter.category === category) {
        score += 10;
      }

      // 标签匹配加分
      post.frontmatter.tags?.forEach((tag) => {
        if (tags?.includes(tag)) {
          score += 5;
        }
      });

      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3) // 取前3篇
    .map(({ post }) => post);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
      <h3 className="mb-6 text-2xl font-bold">相关文章</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            {/* 标题 */}
            <h4 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
              {post.frontmatter.title}
            </h4>

            {/* 描述 */}
            <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
              {post.frontmatter.description}
            </p>

            {/* 日期 */}
            <time className="text-xs text-gray-500 dark:text-gray-500">
              {format(new Date(post.frontmatter.date), "yyyy年MM月dd日", {
                locale: zhCN,
              })}
            </time>
          </Link>
        ))}
      </div>
    </div>
  );
}
