import { NextResponse } from "next/server";

// 简单的内存存储（生产环境应该使用数据库）
const views = new Map<string, number>();

/**
 * GET: 获取文章浏览量
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const count = views.get(slug) || 0;

  return NextResponse.json({ slug, views: count });
}

/**
 * POST: 增加文章浏览量
 */
export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const current = views.get(slug) || 0;
  views.set(slug, current + 1);

  return NextResponse.json({ slug, views: current + 1 });
}
