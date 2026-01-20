import Link from "next/link";
import { Home } from "lucide-react";

/**
 * 404 页面
 * 当用户访问不存在的页面时显示
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-gray-200 dark:text-gray-800">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          页面未找到
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          抱歉，您访问的页面不存在。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          <Home className="h-4 w-4" />
          返回首页
        </Link>
      </div>
    </div>
  );
}
