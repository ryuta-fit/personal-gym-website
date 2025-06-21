import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { generateBlogPost, generateSlug, blogPromptTemplates } from '@/lib/anthropic'

// Vercel Cronのセキュリティトークン検証
async function validateCronRequest(): Promise<boolean> {
  const headersList = await headers()
  const authHeader = headersList.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  
  if (!cronSecret) {
    console.warn('CRON_SECRET not configured')
    return false
  }
  
  return authHeader === `Bearer ${cronSecret}`
}

export async function GET() {
  try {
    // Cron認証の検証（本番環境で必要）
    if (process.env.NODE_ENV === 'production' && !(await validateCronRequest())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // AI APIキーの確認
    if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI API key not configured (ANTHROPIC_API_KEY or OPENAI_API_KEY)' },
        { status: 500 }
      )
    }

    // 今週の投稿スケジュールを確認
    const startOfWeek = new Date()
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    const existingPostsThisWeek = await prisma.blogPost.count({
      where: {
        publishedAt: {
          gte: startOfWeek
        },
        status: 'PUBLISHED'
      }
    })

    // 週に3記事まで自動生成
    const MAX_POSTS_PER_WEEK = 3
    if (existingPostsThisWeek >= MAX_POSTS_PER_WEEK) {
      return NextResponse.json({
        message: 'Weekly post limit reached',
        postsThisWeek: existingPostsThisWeek
      })
    }

    // カテゴリをローテーション
    const categories = Object.keys(blogPromptTemplates) as Array<keyof typeof blogPromptTemplates>
    const categoryIndex = existingPostsThisWeek % categories.length
    const selectedCategory = categories[categoryIndex]

    // ブログ記事を生成
    const generatedPost = await generateBlogPost(selectedCategory)
    
    // カテゴリをデータベースから取得
    const categoryMap = {
      workout: { name: 'トレーニング', slug: 'training' },
      nutrition: { name: '栄養学', slug: 'nutrition' },
      lifestyle: { name: 'ライフスタイル', slug: 'lifestyle' },
      recovery: { name: 'リカバリー', slug: 'recovery' }
    }

    const dbCategory = await prisma.blogCategory.upsert({
      where: { slug: categoryMap[selectedCategory].slug },
      update: {},
      create: categoryMap[selectedCategory]
    })

    // スラッグを生成（重複チェック付き）
    const slug = generateSlug(generatedPost.title)
    let slugCount = 0
    let finalSlug = slug

    while (await prisma.blogPost.findUnique({ where: { slug: finalSlug } })) {
      slugCount++
      finalSlug = `${slug}-${slugCount}`
    }

    // ブログ記事を保存（自動的に公開）
    const post = await prisma.blogPost.create({
      data: {
        title: generatedPost.title,
        slug: finalSlug,
        content: generatedPost.content,
        excerpt: generatedPost.excerpt,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        categories: {
          connect: { id: dbCategory.id }
        }
      },
      include: {
        categories: true
      }
    })

    // ログ記録
    console.log(`Auto-generated blog post: ${post.title} (${post.id})`)

    return NextResponse.json({
      success: true,
      message: 'Blog post generated and published',
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        category: post.categories[0]?.name
      },
      stats: {
        postsThisWeek: existingPostsThisWeek + 1,
        maxPostsPerWeek: MAX_POSTS_PER_WEEK
      }
    })

  } catch (error) {
    console.error('Cron job error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate blog post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// 手動トリガー用のPOSTエンドポイント（開発用）
export async function POST() {
  try {
    // 開発環境では認証をスキップ
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Manual trigger not allowed in production' },
        { status: 403 }
      )
    }

    // GETメソッドと同じ処理を実行
    return GET()
  } catch {
    return NextResponse.json(
      { error: 'Failed to trigger cron job' },
      { status: 500 }
    )
  }
}