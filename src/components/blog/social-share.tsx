"use client";

import { Twitter, Link2, Mail } from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
  title: string;
  url: string;
}

/**
 * 社交分享组件
 * 支持分享到 Twitter、复制链接、邮件分享
 */
export function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.origin + url : url;

  // 复制链接
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // 分享到 Twitter
  const shareToTwitter = () => {
    const text = encodeURIComponent(`${title} ${shareUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  // 邮件分享
  const shareByEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${title}\n\n${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        分享：
      </span>

      {/* Twitter */}
      <button
        onClick={shareToTwitter}
        className="rounded-lg border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </button>

      {/* 复制链接 */}
      <button
        onClick={copyToClipboard}
        className="rounded-lg border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        aria-label="Copy link"
      >
        <Link2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </button>

      {/* 邮件分享 */}
      <button
        onClick={shareByEmail}
        className="rounded-lg border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        aria-label="Share by email"
      >
        <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </button>

      {/* 复制成功提示 */}
      {copied && (
        <span className="text-sm text-green-600 dark:text-green-400">
          已复制！
        </span>
      )}
    </div>
  );
}
