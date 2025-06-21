import Link from 'next/link'
import { CheckCircle, Clock, ArrowRight } from 'lucide-react'

export function ProgramsSection() {
  const programs = [
    {
      id: 'weight-loss',
      name: 'ダイエットプログラム',
      description: '健康的で持続可能な方法で理想の体重を目指します',
      duration: '2-6ヶ月',
      frequency: '週2-3回',
      price: '月額 ¥48,000〜',
      features: [
        '個別栄養指導',
        '有酸素＆筋力トレーニング',
        '体組成分析',
        '食事管理アプリ',
        '24時間サポート'
      ],
      popular: true
    },
    {
      id: 'muscle-building',
      name: '筋力アップ・ボディメイク',
      description: '筋肉量を増やし、理想のボディラインを作ります',
      duration: '3-12ヶ月',
      frequency: '週2-4回',
      price: '月額 ¥52,000〜',
      features: [
        'ウェイトトレーニング指導',
        'プロテイン指導',
        '姿勢改善',
        'BIG3完全習得',
        '競技サポート'
      ],
      popular: false
    },
    {
      id: 'health-maintenance',
      name: '健康維持・体力向上',
      description: '日常生活の質を向上させ、健康な体を維持します',
      duration: '継続',
      frequency: '週1-2回',
      price: '月額 ¥32,000〜',
      features: [
        '機能改善トレーニング',
        'ストレッチ指導',
        '生活習慣改善',
        '健康相談',
        '定期健康チェック'
      ],
      popular: false
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            あなたに最適なプログラム
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            目標に応じて選べる3つのメインプログラム。
            すべて個別カスタマイズ可能です。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                program.popular
                  ? 'border-yellow-400 transform scale-105'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {program.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold">
                    人気No.1
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {program.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {program.description}
                </p>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {program.price}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-blue-600" />
                  <span>期間: {program.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-blue-600" />
                  <span>頻度: {program.frequency}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {program.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Link
                  href={`/programs/${program.id}`}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group ${
                    program.popular
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-blue-900'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/booking"
                  className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-center block"
                >
                  無料体験を予約
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Program CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            上記以外の目標をお持ちですか？
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            競技パフォーマンス向上、リハビリ、シニア向けプログラムなど、
            どんな目標でもお気軽にご相談ください。完全オーダーメイドでプログラムを作成します。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            カスタムプログラムを相談する
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}