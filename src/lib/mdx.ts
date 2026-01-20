import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";

/**
 * 获取所有文章
 */
export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        frontmatter: {
          title: data.title || "",
          description: data.description || "",
          date: data.date || "",
          author: data.author,
          tags: data.tags || [],
          category: data.category,
          coverImage: data.coverImage,
        },
      };
    })
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

  return posts;
}

/**
 * 根据 slug 获取单篇文章
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postsDirectory = path.join(process.cwd(), "content/posts");
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      frontmatter: {
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        author: data.author,
        tags: data.tags || [],
        category: data.category,
        coverImage: data.coverImage,
      },
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * 获取所有文章的 slug（用于静态生成）
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ""));
}

/**
 * 获取所有标签
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet).sort();
}

/**
 * 获取所有分类
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categoriesSet = new Set<string>();

  posts.forEach((post) => {
    if (post.frontmatter.category) {
      categoriesSet.add(post.frontmatter.category);
    }
  });

  return Array.from(categoriesSet).sort();
}
