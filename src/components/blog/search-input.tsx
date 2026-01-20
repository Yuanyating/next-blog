"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import type { Post } from "@/types/post";

interface SearchInputProps {
  posts: Post[];
  onResults: (results: Post[]) => void;
}

/**
 * 文章搜索组件
 * 使用 Fuse.js 实现客户端模糊搜索
 */
export function SearchInput({ posts, onResults }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [fuse, setFuse] = useState<Fuse<Post> | null>(null);

  // 初始化 Fuse.js
  useEffect(() => {
    const fuseInstance = new Fuse(posts, {
      keys: [
        { name: "frontmatter.title", weight: 3 },
        { name: "frontmatter.description", weight: 2 },
        { name: "frontmatter.tags", weight: 1.5 },
        { name: "content", weight: 1 },
      ],
      threshold: 0.3,
      includeScore: true,
    });
    setFuse(fuseInstance);
  }, [posts]);

  // 搜索逻辑
  useEffect(() => {
    if (!fuse) return;

    if (query.trim() === "") {
      onResults(posts);
    } else {
      const results = fuse.search(query);
      onResults(results.map((result) => result.item));
    }
  }, [query, fuse, posts, onResults]);

  return (
    <div className="relative mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索文章..."
          className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>
      {query && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {query.trim() === "" ? `共 ${posts.length} 篇文章` : "搜索结果"}
        </p>
      )}
    </div>
  );
}
