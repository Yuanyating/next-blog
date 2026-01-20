import { getAllPosts } from "@/lib/mdx";
import { BlogList } from "@/components/blog/blog-list";

export const metadata = {
  title: "博客文章 - My Blog",
  description: "浏览我的所有技术文章和教程",
};

/**
 * 文章列表页
 * 显示所有已发布的文章，支持搜索
 */
export default async function BlogPage() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">博客文章</h1>
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            还没有文章，敬请期待！
          </p>
        </div>
      </div>
    );
  }

  return <BlogList posts={posts} />;
}
