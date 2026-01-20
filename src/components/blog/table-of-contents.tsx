"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * 文章目录组件
 * 自动提取文章中的标题并生成目录
 */
export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // 提取标题
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(".prose-content h2, .prose-content h3")
    );

    const headingData: Heading[] = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: parseInt(elem.tagName.charAt(1)),
    }));

    setHeadings(headingData);
  }, []);

  // 监听滚动，高亮当前章节
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = document.querySelectorAll(
        ".prose-content h2, .prose-content h3"
      );

      let currentHeading = "";
      headingElements.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          currentHeading = heading.id;
        }
      });

      setActiveId(currentHeading);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-20 hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 lg:block">
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
        目录
      </h3>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "line-clamp-2 transition-colors",
              heading.level === 3 && "pl-4",
              activeId === heading.id
                ? "font-medium text-blue-600 dark:text-blue-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            )}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
