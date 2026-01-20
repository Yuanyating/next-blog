import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          欢迎来到我的博客
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          使用 Next.js 14、TypeScript 和 Tailwind CSS 构建的现代化个人博客
        </p>
      </section>

      {/* Features Grid */}
      <section className="mb-16 grid gap-8 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-2 text-xl font-semibold">快速</h3>
          <p className="text-gray-600 dark:text-gray-400">
            基于 Next.js 14 App Router，提供极致的加载速度和用户体验
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-2 text-xl font-semibold">类型安全</h3>
          <p className="text-gray-600 dark:text-gray-400">
            使用 TypeScript 开发，提供完整的类型检查和智能提示
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-2 text-xl font-semibold">响应式</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Tailwind CSS 构建，完美适配各种设备和屏幕尺寸
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          准备好开始阅读了吗？
        </p>
        <Link
          href="/blog"
          className="inline-flex rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          浏览文章
        </Link>
      </section>
    </div>
  );
}
