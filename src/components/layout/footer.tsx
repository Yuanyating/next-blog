import Link from "next/link";

/**
 * 网站底部组件
 * 包含版权信息和链接
 */
export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Copyright */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex space-x-6">
            <Link
              href="/"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
