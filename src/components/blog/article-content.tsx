import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { TableOfContents } from "./table-of-contents";
// import "highlight.js/styles/github-dark.css";

interface ArticleContentProps {
  content: string;
}

/**
 * 文章内容组件
 * 包含 MDX 渲染和目录
 */
export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <>
      {/* 阅读进度条将在客户端组件中添加 */}

      <div className="grid gap-8 lg:grid-cols-[1fr_200px]">
        {/* 文章内容 */}
        <article className="prose prose-gray max-w-none dark:prose-invert">
          <div className="prose-content">
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, rehypeHighlight],
                },
              }}
            />
          </div>
        </article>

        {/* 目录 */}
        <aside>
          <TableOfContents />
        </aside>
      </div>
    </>
  );
}
