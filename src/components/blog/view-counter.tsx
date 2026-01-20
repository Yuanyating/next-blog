"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  slug: string;
}

/**
 * 浏览量统计组件
 * 显示并统计文章浏览次数
 */
export function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // 增加浏览量
    fetch(`/api/views/${slug}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setViews(data.views);
      })
      .catch(console.error);
  }, [slug]);

  if (views === null) {
    return (
      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
        <Eye className="h-4 w-4" />
        <span>...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
      <Eye className="h-4 w-4" />
      <span>{views} 次阅读</span>
    </div>
  );
}
