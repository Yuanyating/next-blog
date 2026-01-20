"use client";

import { useEffect, useState } from "react";

/**
 * 阅读进度条组件
 * 显示文章阅读进度
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;

      const scrollPercentage = (scrollTop / scrollableHeight) * 100;
      setProgress(Math.min(scrollPercentage, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150 ease-out dark:from-blue-400 dark:to-blue-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
