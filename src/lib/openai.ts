import { OpenAI } from 'openai'

// OpenAI クライアントの初期化
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// ブログ記事生成のためのプロンプトテンプレート
export const blogPromptTemplates = {
  workout: {
    system: `あなたは経験豊富なパーソナルトレーナーであり、フィットネスブログの執筆者です。
読者に役立つ、実践的で科学的根拠に基づいた記事を書いてください。
記事は以下の構成で作成してください：
1. 導入（読者の興味を引く）
2. 基本的な理論や背景
3. 具体的な方法や手順
4. 注意点やコツ
5. まとめ

HTMLタグを使用してフォーマットしてください。`,
    topics: [
      '初心者向けの効果的な筋トレメニュー',
      'HIIT（高強度インターバルトレーニング）の効果と方法',
      '自宅でできる全身トレーニング',
      'ダンベルを使った上半身強化トレーニング',
      '体幹を鍛えるプランクバリエーション',
      '下半身強化のためのスクワット完全ガイド',
      '有酸素運動と筋トレの効果的な組み合わせ方',
      'トレーニング前後のストレッチの重要性',
      '筋肉痛の正しい対処法と回復方法',
      'トレーニングのマンネリを防ぐ方法'
    ]
  },
  nutrition: {
    system: `あなたは栄養学の専門家であり、フィットネス栄養に精通したブログライターです。
科学的根拠に基づいた、実践的な栄養情報を提供してください。
記事は以下の構成で作成してください：
1. 導入（なぜこの栄養知識が重要か）
2. 基本的な栄養学の説明
3. 具体的な食事例やレシピ
4. よくある誤解や注意点
5. 実践のためのアドバイス

HTMLタグを使用してフォーマットしてください。`,
    topics: [
      'プロテインの効果的な摂取タイミングと量',
      '筋トレ効果を高める食事メニュー',
      'ダイエット中の栄養バランスの保ち方',
      '運動前後の最適な食事とは',
      'サプリメントの選び方と活用法',
      '水分補給の重要性と適切な摂取量',
      '炭水化物の正しい摂り方',
      '良質な脂質の選び方と摂取方法',
      'ビタミン・ミネラルの重要性',
      '間食の上手な活用法'
    ]
  },
  lifestyle: {
    system: `あなたは健康的なライフスタイルを提案するウェルネスコーチです。
運動と日常生活を結びつけた、実践しやすいアドバイスを提供してください。
記事は以下の構成で作成してください：
1. 導入（ライフスタイルの重要性）
2. 現状の問題点や課題
3. 改善のための具体的な方法
4. 継続のためのコツ
5. 長期的な効果とまとめ

HTMLタグを使用してフォーマットしてください。`,
    topics: [
      '睡眠の質を高めて運動効果を最大化する方法',
      'ストレス解消のための運動習慣',
      '忙しい人のための時短トレーニング',
      'デスクワーカーのための姿勢改善エクササイズ',
      '朝活トレーニングのメリットと始め方',
      '運動習慣を身につける心理学的アプローチ',
      '季節に合わせたトレーニング方法',
      '家族で楽しめるフィットネス活動',
      'モチベーションを維持する方法',
      '運動と仕事の両立のコツ'
    ]
  },
  recovery: {
    system: `あなたはスポーツ医学とリカバリーの専門家です。
怪我の予防と回復、パフォーマンス向上のための記事を書いてください。
記事は以下の構成で作成してください：
1. 導入（リカバリーの重要性）
2. 科学的な背景説明
3. 具体的なリカバリー方法
4. 実践時の注意点
5. 継続的な取り組みへのアドバイス

HTMLタグを使用してフォーマットしてください。`,
    topics: [
      'アクティブリカバリーの効果的な方法',
      'フォームローラーを使った筋膜リリース',
      'アイシングとヒートセラピーの使い分け',
      'マッサージガンの効果的な使い方',
      'ヨガとピラティスでリカバリー',
      '適切な休息日の過ごし方',
      'オーバートレーニングの兆候と対策',
      'ストレッチングの種類と効果',
      'サウナと水風呂の活用法',
      '睡眠とリカバリーの関係性'
    ]
  }
}

// ブログ記事を生成する関数
export async function generateBlogPost(category: keyof typeof blogPromptTemplates, topic?: string) {
  const template = blogPromptTemplates[category]
  const selectedTopic = topic || template.topics[Math.floor(Math.random() * template.topics.length)]
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: template.system
        },
        {
          role: "user",
          content: `「${selectedTopic}」というテーマで、1500〜2000文字程度の記事を書いてください。`
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    })

    const content = completion.choices[0].message.content || ''
    
    // タイトルと本文を抽出
    const titleMatch = content.match(/<h1>(.*?)<\/h1>/)
    const title = titleMatch ? titleMatch[1] : selectedTopic
    const excerpt = content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
    
    return {
      title,
      content,
      excerpt,
      topic: selectedTopic,
      category
    }
  } catch (error) {
    console.error('Error generating blog post:', error)
    throw error
  }
}

// SEO最適化されたスラッグを生成
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 特殊文字を削除
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/-+/g, '-') // 複数のハイフンを1つに
    .trim()
    .substring(0, 60) // 長さ制限
}