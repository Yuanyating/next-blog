import { getAllPosts } from "./mdx";
import type { Post } from "@/types/post";

/**
 * 根据分类获取文章
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(
    (post) => post.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * 根据标签获取文章
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) =>
    post.frontmatter.tags?.some(
      (t) => t.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * 获取所有分类及其文章数量
 */
export async function getCategoriesWithCount(): Promise<
  Array<{ name: string; count: number }>
> {
  const posts = await getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const category = post.frontmatter.category;
    if (category) {
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    }
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * 获取所有标签及其文章数量
 */
export async function getTagsWithCount(): Promise<
  Array<{ name: string; count: number }>
> {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
