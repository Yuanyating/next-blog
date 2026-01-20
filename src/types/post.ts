/**
 * 文章类型定义
 */

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  coverImage?: string;
}

export interface Post {
  slug: string;
  content: string;
  frontmatter: PostMeta;
}
