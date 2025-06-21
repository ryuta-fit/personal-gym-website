import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateBlogPost, generateSlug, blogPromptTemplates } from '@/lib/anthropic'
import { z } from 'zod'

const generatePostSchema = z.object({
  category: z.enum(['workout', 'nutrition', 'lifestyle', 'recovery']),
  topic: z.string().optional(),
  publish: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { category, topic, publish } = generatePostSchema.parse(body)

    // AI APIキーの確認
    if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI API key not configured (ANTHROPIC_API_KEY or OPENAI_API_KEY)' },
        { status: 500 }
      )
    }

    // ブログ記事を生成
    const generatedPost = await generateBlogPost(category, topic)
    
    // カテゴリをデータベースから取得または作成
    const categoryMap = {
      workout: { name: 'トレーニング', slug: 'training' },
      nutrition: { name: '栄養学', slug: 'nutrition' },
      lifestyle: { name: 'ライフスタイル', slug: 'lifestyle' },
      recovery: { name: 'リカバリー', slug: 'recovery' }
    }

    const dbCategory = await prisma.blogCategory.upsert({
      where: { slug: categoryMap[category].slug },
      update: {},
      create: categoryMap[category]
    })

    // スラッグを生成（重複チェック付き）
    let slug = generateSlug(generatedPost.title)
    let slugCount = 0
    let finalSlug = slug

    while (await prisma.blogPost.findUnique({ where: { slug: finalSlug } })) {
      slugCount++
      finalSlug = `${slug}-${slugCount}`
    }

    // ブログ記事を保存
    const post = await prisma.blogPost.create({
      data: {
        title: generatedPost.title,
        slug: finalSlug,
        content: generatedPost.content,
        excerpt: generatedPost.excerpt,
        status: publish ? 'PUBLISHED' : 'DRAFT',
        publishedAt: publish ? new Date() : null,
        categories: {
          connect: { id: dbCategory.id }
        }
      },
      include: {
        categories: true,
        tags: true
      }
    })

    return NextResponse.json({
      message: 'Blog post generated successfully',
      post,
      generatedTopic: generatedPost.topic
    })

  } catch (error) {
    console.error('Error generating blog post:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    )
  }
}

// 利用可能なトピックを取得
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const topics = Object.entries(blogPromptTemplates).map(([category, template]) => ({
      category,
      topics: template.topics
    }))

    return NextResponse.json({ topics })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    )
  }
}