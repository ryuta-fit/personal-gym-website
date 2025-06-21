import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 データベースのシードを開始します...')

  // 管理者ユーザーの作成
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@personalgym.com' },
    update: {},
    create: {
      email: 'admin@personalgym.com',
      name: '管理者',
      password: adminPassword,
      role: 'ADMIN',
      phone: '03-1234-5678',
    },
  })
  console.log('✅ 管理者ユーザーを作成しました:', admin.email)

  // サンプル顧客の作成
  const customerPassword = await bcrypt.hash('customer123', 12)
  const customers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'tanaka@example.com' },
      update: {},
      create: {
        email: 'tanaka@example.com',
        name: '田中 太郎',
        password: customerPassword,
        role: 'CUSTOMER',
        phone: '090-1234-5678',
      },
    }),
    prisma.user.upsert({
      where: { email: 'sato@example.com' },
      update: {},
      create: {
        email: 'sato@example.com',
        name: '佐藤 花子',
        password: customerPassword,
        role: 'CUSTOMER',
        phone: '090-2345-6789',
      },
    }),
    prisma.user.upsert({
      where: { email: 'suzuki@example.com' },
      update: {},
      create: {
        email: 'suzuki@example.com',
        name: '鈴木 次郎',
        password: customerPassword,
        role: 'CUSTOMER',
        phone: '090-3456-7890',
      },
    }),
  ])
  console.log('✅ サンプル顧客を作成しました:', customers.length, '人')

  // トレーナーの作成
  const trainers = await Promise.all([
    prisma.trainer.upsert({
      where: { email: 'tanaka.trainer@personalgym.com' },
      update: {},
      create: {
        name: '田中 健太',
        email: 'tanaka.trainer@personalgym.com',
        phone: '080-1111-2222',
        specialties: JSON.stringify(['ダイエット', 'ボディメイク', '栄養指導']),
        bio: '元プロアスリートの経験を活かし、科学的根拠に基づいたトレーニング指導を行います。初心者から上級者まで、一人ひとりの目標に合わせたプログラムを提供します。',
        isActive: true,
      },
    }),
    prisma.trainer.upsert({
      where: { email: 'sato.trainer@personalgym.com' },
      update: {},
      create: {
        name: '佐藤 美香',
        email: 'sato.trainer@personalgym.com',
        phone: '080-2222-3333',
        specialties: JSON.stringify(['女性向け', '産後ケア', 'ピラティス', 'ヨガ']),
        bio: '女性特有の体の変化に寄り添いながら、安全で効果的なプログラムを提供します。産後の体型戻しやしなやかな筋肉作りが得意です。',
        isActive: true,
      },
    }),
    prisma.trainer.upsert({
      where: { email: 'yamada.trainer@personalgym.com' },
      update: {},
      create: {
        name: '山田 雄一',
        email: 'yamada.trainer@personalgym.com',
        phone: '080-3333-4444',
        specialties: JSON.stringify(['筋力向上', 'アスリート', 'リハビリ', 'パフォーマンス向上']),
        bio: '理学療法士の資格を持つトレーナーです。医療とフィットネスの両面から、安全で確実な結果をお約束します。',
        isActive: true,
      },
    }),
  ])
  console.log('✅ トレーナーを作成しました:', trainers.length, '人')

  // トレーナーの営業時間設定
  const availability = []
  for (const trainer of trainers) {
    // 平日（月〜金）の営業時間
    for (let day = 1; day <= 5; day++) {
      availability.push({
        trainerId: trainer.id,
        dayOfWeek: day,
        startTime: '09:00',
        endTime: '21:00',
        isActive: true,
      })
    }
    // 土日の営業時間
    for (let day = 0; day <= 6; day += 6) {
      availability.push({
        trainerId: trainer.id,
        dayOfWeek: day,
        startTime: '10:00',
        endTime: '18:00',
        isActive: true,
      })
    }
  }

  // トレーナーの営業時間を個別に作成
  for (const avail of availability) {
    await prisma.trainerAvailability.upsert({
      where: {
        trainerId_dayOfWeek: {
          trainerId: avail.trainerId,
          dayOfWeek: avail.dayOfWeek
        }
      },
      update: {},
      create: avail
    })
  }
  console.log('✅ トレーナーの営業時間を設定しました')

  // ブログカテゴリの作成
  const categories = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: 'training' },
      update: {},
      create: {
        name: 'トレーニング',
        slug: 'training',
        description: '効果的なトレーニング方法やテクニックについて',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'nutrition' },
      update: {},
      create: {
        name: '栄養学',
        slug: 'nutrition',
        description: '栄養バランスや食事管理に関する情報',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'diet' },
      update: {},
      create: {
        name: 'ダイエット',
        slug: 'diet',
        description: '健康的なダイエット方法とコツ',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'lifestyle' },
      update: {},
      create: {
        name: 'ライフスタイル',
        slug: 'lifestyle',
        description: '健康的な生活習慣や日常のコツ',
      },
    }),
  ])
  console.log('✅ ブログカテゴリを作成しました:', categories.length, '個')

  // ブログタグの作成
  const tags = await Promise.all([
    prisma.blogTag.upsert({
      where: { slug: 'beginner' },
      update: {},
      create: { name: '初心者', slug: 'beginner' },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'strength-training' },
      update: {},
      create: { name: '筋トレ', slug: 'strength-training' },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'protein' },
      update: {},
      create: { name: 'プロテイン', slug: 'protein' },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'weight-loss' },
      update: {},
      create: { name: '減量', slug: 'weight-loss' },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'home-workout' },
      update: {},
      create: { name: '自宅トレーニング', slug: 'home-workout' },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'nutrition' },
      update: {},
      create: { name: '栄養', slug: 'nutrition' },
    }),
  ])
  console.log('✅ ブログタグを作成しました:', tags.length, '個')

  // サンプルブログ記事の作成
  const blogPosts = [
    {
      title: '効果的な筋トレの始め方：初心者向け完全ガイド',
      slug: 'beginner-strength-training-guide',
      content: `
        <h2>筋トレを始める前に知っておきたいこと</h2>
        <p>筋力トレーニングは、健康的な体づくりの基本です。しかし、正しい知識なしに始めると、効果が出ないばかりか怪我のリスクもあります。</p>
        
        <h3>基本的な筋トレの原則</h3>
        <ol>
          <li><strong>漸進性過負荷の原理</strong>：徐々に負荷を増やしていく</li>
          <li><strong>特異性の原理</strong>：目的に応じたトレーニングを行う</li>
          <li><strong>継続性の原理</strong>：定期的に続けることが重要</li>
        </ol>
        
        <h3>初心者におすすめのエクササイズ</h3>
        <ul>
          <li>スクワット：下半身全体を鍛える</li>
          <li>プッシュアップ：胸、肩、腕を鍛える</li>
          <li>プランク：体幹を強化する</li>
          <li>ランジ：太ももとお尻を鍛える</li>
        </ul>
        
        <p>正しいフォームで行うことが最も重要です。無理をせず、自分のペースで進めていきましょう。</p>
      `,
      excerpt: '筋トレを始めたいけど何から始めればいいかわからない方へ。基本的なフォームから効果的なプログラムまで、プロトレーナーが詳しく解説します。',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-15'),
      categoryIds: [categories.find(c => c.slug === 'training')!.id],
      tagIds: [
        tags.find(t => t.slug === 'beginner')!.id,
        tags.find(t => t.slug === 'strength-training')!.id,
      ],
    },
    {
      title: 'プロテインの正しい摂取方法とタイミング',
      slug: 'protein-intake-timing',
      content: `
        <h2>プロテインとは何か？</h2>
        <p>プロテインは筋肉の材料となるタンパク質を効率的に摂取できるサプリメントです。</p>
        
        <h3>プロテインの種類</h3>
        <ul>
          <li><strong>ホエイプロテイン</strong>：吸収が早く、筋トレ後におすすめ</li>
          <li><strong>カゼインプロテイン</strong>：ゆっくり吸収され、寝る前に最適</li>
          <li><strong>ソイプロテイン</strong>：植物性で、女性やベジタリアンにおすすめ</li>
        </ul>
        
        <h3>摂取タイミング</h3>
        <ol>
          <li><strong>トレーニング後30分以内</strong>：筋肉の回復を促進</li>
          <li><strong>起床後</strong>：夜間の分解を補う</li>
          <li><strong>就寝前</strong>：夜間の筋肉合成をサポート</li>
        </ol>
        
        <p>目安として、体重1kgあたり1.2〜2.0gのタンパク質を1日で摂取することを推奨します。</p>
      `,
      excerpt: 'プロテインはただ飲めばいいというものではありません。効果的な摂取方法とベストなタイミングを栄養学の観点から解説します。',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-12'),
      categoryIds: [categories.find(c => c.slug === 'nutrition')!.id],
      tagIds: [
        tags.find(t => t.slug === 'protein')!.id,
        tags.find(t => t.slug === 'nutrition')!.id,
      ],
    },
    {
      title: 'ダイエット成功のための食事管理術',
      slug: 'diet-meal-management',
      content: `
        <h2>ダイエットの基本原則</h2>
        <p>ダイエットの成功は「消費カロリー > 摂取カロリー」が基本ですが、極端な食事制限は逆効果です。</p>
        
        <h3>健康的なダイエットのポイント</h3>
        <ul>
          <li>バランスの良い栄養摂取</li>
          <li>適度なカロリー制限（1日-300〜-500kcal程度）</li>
          <li>定期的な食事時間</li>
          <li>十分な水分摂取</li>
        </ul>
        
        <h3>おすすめの食材</h3>
        <h4>タンパク質</h4>
        <ul>
          <li>鶏胸肉、魚類、卵、豆腐</li>
        </ul>
        
        <h4>炭水化物</h4>
        <ul>
          <li>玄米、オートミール、さつまいも</li>
        </ul>
        
        <h4>脂質</h4>
        <ul>
          <li>アボカド、ナッツ、オリーブオイル</li>
        </ul>
        
        <p>無理な食事制限よりも、継続できる健康的な食習慣を身につけることが重要です。</p>
      `,
      excerpt: '無理な食事制限をしなくても確実に体重を落とす方法があります。持続可能なダイエットのための食事管理テクニックをご紹介。',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-10'),
      categoryIds: [categories.find(c => c.slug === 'diet')!.id],
      tagIds: [
        tags.find(t => t.slug === 'weight-loss')!.id,
        tags.find(t => t.slug === 'nutrition')!.id,
      ],
    },
    {
      title: '自宅でできる効果的な有酸素運動',
      slug: 'home-cardio-exercises',
      content: `
        <h2>自宅でできる有酸素運動のメリット</h2>
        <p>ジムに行かなくても、自宅で効果的な有酸素運動は十分可能です。</p>
        
        <h3>おすすめの自宅有酸素運動</h3>
        <ol>
          <li><strong>ジャンピングジャック</strong>：全身を使った基本運動</li>
          <li><strong>バーピー</strong>：高強度で短時間で効果的</li>
          <li><strong>マウンテンクライマー</strong>：体幹も同時に鍛えられる</li>
          <li><strong>階段昇降</strong>：日常動作を活用</li>
        </ol>
        
        <h3>HIITトレーニングの取り入れ方</h3>
        <p>高強度インターバルトレーニング（HIIT）は短時間で大きな効果が期待できます。</p>
        
        <h4>基本的なHIITメニュー例</h4>
        <ul>
          <li>20秒間高強度運動</li>
          <li>10秒間休憩</li>
          <li>これを8セット繰り返す（計4分）</li>
        </ul>
        
        <p>週に3〜4回、20〜30分程度から始めて、徐々に時間を延ばしていきましょう。</p>
      `,
      excerpt: 'ジムに行かなくても大丈夫！自宅で簡単にできる有酸素運動とHIITトレーニングで、効率的に脂肪燃焼を促進する方法をご紹介します。',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-08'),
      categoryIds: [categories.find(c => c.slug === 'training')!.id],
      tagIds: [
        tags.find(t => t.slug === 'home-workout')!.id,
        tags.find(t => t.slug === 'weight-loss')!.id,
      ],
    },
  ]

  for (const postData of blogPosts) {
    const post = await prisma.blogPost.upsert({
      where: { slug: postData.slug },
      update: {},
      create: {
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        excerpt: postData.excerpt,
        status: postData.status as any,
        publishedAt: postData.publishedAt,
        categories: {
          connect: postData.categoryIds.map(id => ({ id })),
        },
        tags: {
          connect: postData.tagIds.map(id => ({ id })),
        },
      },
    })
    console.log('✅ ブログ記事を作成しました:', post.title)
  }

  // サンプル予約の作成
  const now = new Date()
  const bookings = [
    {
      userId: customers[0].id,
      trainerId: trainers[0].id,
      startTime: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 明日
      endTime: new Date(now.getTime() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // 明日+1時間
      status: 'CONFIRMED',
      notes: 'ベンチプレスの正しいフォームを学びたいです',
    },
    {
      userId: customers[1].id,
      trainerId: trainers[1].id,
      startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 明後日
      endTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
      status: 'PENDING',
      notes: '産後のダイエットプログラムをお願いします',
    },
    {
      userId: customers[2].id,
      trainerId: trainers[2].id,
      startTime: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 昨日
      endTime: new Date(now.getTime() - 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
      status: 'COMPLETED',
      notes: 'リハビリ目的のトレーニング',
    },
  ]

  for (const bookingData of bookings) {
    await prisma.booking.create({
      data: bookingData,
    })
  }
  console.log('✅ サンプル予約を作成しました:', bookings.length, '件')

  // メールマガジン購読者の作成
  const newsletterSubscribers = [
    'newsletter1@example.com',
    'newsletter2@example.com',
    'newsletter3@example.com',
    'tanaka@example.com', // 既存顧客
    'sato@example.com',   // 既存顧客
  ]

  for (const email of newsletterSubscribers) {
    await prisma.newsletter.upsert({
      where: { email },
      update: {},
      create: {
        email,
        status: 'ACTIVE',
      },
    })
  }
  console.log('✅ メールマガジン購読者を作成しました:', newsletterSubscribers.length, '人')

  // サンプルメールマガジンキャンペーンの作成
  await prisma.newsletterCampaign.create({
    data: {
      title: '新年のトレーニング特集',
      subject: '2024年、理想の体を手に入れよう！新年特別キャンペーン',
      content: `
        <h2>新年明けましておめでとうございます！</h2>
        <p>2024年、新しい年の始まりです。今年こそ理想の体を手に入れませんか？</p>
        
        <h3>新年特別キャンペーン</h3>
        <ul>
          <li>初回体験レッスン無料</li>
          <li>入会金50%OFF</li>
          <li>体組成分析無料</li>
        </ul>
        
        <p>この機会をお見逃しなく！詳しくはお気軽にお問い合わせください。</p>
      `,
      status: 'SENT',
      sentAt: new Date('2024-01-01'),
    },
  })
  console.log('✅ サンプルメールマガジンキャンペーンを作成しました')

  console.log('\n🎉 データベースのシードが完了しました！')
  console.log('\n📊 作成されたデータ:')
  console.log(`- 管理者: 1人 (admin@personalgym.com / admin123)`)
  console.log(`- 顧客: ${customers.length}人 (パスワード: customer123)`)
  console.log(`- トレーナー: ${trainers.length}人`)
  console.log(`- ブログカテゴリ: ${categories.length}個`)
  console.log(`- ブログタグ: ${tags.length}個`)
  console.log(`- ブログ記事: ${blogPosts.length}記事`)
  console.log(`- サンプル予約: ${bookings.length}件`)
  console.log(`- メルマガ購読者: ${newsletterSubscribers.length}人`)
  console.log(`- メルマガキャンペーン: 1件`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ シードエラー:', e)
    await prisma.$disconnect()
    process.exit(1)
  })