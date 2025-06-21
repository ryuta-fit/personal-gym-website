import { Target, Users, Clock, Trophy, Heart, Zap } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Target,
      title: 'オーダーメイドプログラム',
      description: 'あなたの目標・体力レベル・ライフスタイルに合わせた完全個別のトレーニングプログラムを作成します。',
    },
    {
      icon: Users,
      title: '経験豊富なトレーナー',
      description: '国際資格を持つプロトレーナーが、安全で効果的な指導を提供。初心者も安心してトレーニングできます。',
    },
    {
      icon: Clock,
      title: 'フレキシブルなスケジュール',
      description: '早朝6時から深夜23時まで営業。あなたの都合に合わせて予約可能です。',
    },
    {
      icon: Heart,
      title: '栄養サポート',
      description: 'トレーニングだけでなく、栄養面からもサポート。食事指導で理想の体づくりを加速します。',
    },
    {
      icon: Trophy,
      title: '結果にコミット',
      description: '明確な目標設定と定期的な進捗確認で、確実に結果を出します。',
    },
    {
      icon: Zap,
      title: '最新設備',
      description: '最新のトレーニング機器と快適な環境で、効率的なワークアウトを提供します。',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            なぜ私たちが選ばれるのか
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            一人ひとりの目標に合わせた質の高いサービスで、
            あなたの理想の体づくりを全力でサポートします
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">満足度の高いお客様</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">目標達成率</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">10</div>
              <div className="text-gray-600 font-medium">経験豊富なトレーナー</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">3年</div>
              <div className="text-gray-600 font-medium">平均継続期間</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}