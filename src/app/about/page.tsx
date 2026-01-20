export const metadata = {
  title: "关于我 - My Blog",
  description: "了解更多关于我的信息和技能",
};

/**
 * 关于页面
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      {/* 页面标题 */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">关于我</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          热爱技术，享受编程
        </p>
      </div>

      {/* 个人介绍 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">个人简介</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            你好！我是一名热爱技术的开发者，专注于 Web 开发和前端技术。
            这个博客是我记录学习心得、分享技术经验的地方。
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            我相信技术的力量，也相信分享的价值。希望通过这个博客，
            与更多志同道合的朋友交流学习，共同进步。
          </p>
        </div>
      </section>

      {/* 技能 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">技术栈</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 font-semibold">前端开发</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• React / Next.js</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Vue / Nuxt.js</li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 font-semibold">后端开发</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Node.js</li>
              <li>• Python / Django</li>
              <li>• PostgreSQL</li>
              <li>• Redis</li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 font-semibold">工具 & DevOps</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Git / GitHub</li>
              <li>• Docker</li>
              <li>• Vercel / Netlify</li>
              <li>• Linux</li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 font-semibold">其他兴趣</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• 开源贡献</li>
              <li>• 技术写作</li>
              <li>• 系统设计</li>
              <li>• 性能优化</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">联系方式</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            欢迎通过以下方式与我联系：
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>📧 Email: your.email@example.com</li>
            <li>🐙 GitHub: github.com/yourusername</li>
            <li>🐦 Twitter: @yourusername</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
