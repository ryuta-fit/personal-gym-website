import Link from 'next/link'
import { Star, Award, Users, ArrowRight } from 'lucide-react'

export function TrainersSection() {
  const trainers = [
    {
      id: 1,
      name: '田中 健太',
      specialties: ['ダイエット', 'ボディメイク', '栄養指導'],
      experience: '8年',
      certifications: ['NESTA-PFT', '健康運動実践指導者'],
      rating: 4.9,
      clients: 150,
      bio: '元プロアスリートの経験を活かし、科学的根拠に基づいたトレーニング指導を行います。',
      image: '/api/placeholder/300/400'
    },
    {
      id: 2,
      name: '佐藤 美香',
      specialties: ['女性向け', '産後ケア', 'ピラティス'],
      experience: '6年',
      certifications: ['ACSM-CPT', 'マタニティフィットネス'],
      rating: 4.8,
      clients: 120,
      bio: '女性特有の体の変化に寄り添いながら、安全で効果的なプログラムを提供します。',
      image: '/api/placeholder/300/400'
    },
    {
      id: 3,
      name: '山田 雄一',
      specialties: ['筋力向上', 'アスリート', 'リハビリ'],
      experience: '10年',
      certifications: ['NSCA-CSCS', '理学療法士'],
      rating: 4.9,
      clients: 200,
      bio: '医療とフィットネスの両面から、安全で確実な結果をお約束します。',
      image: '/api/placeholder/300/400'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            経験豊富なプロトレーナー陣
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            国際資格を持つプロフェッショナルが、
            あなたの目標達成を全力でサポートします
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Trainer Image */}
              <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {trainer.name.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {trainer.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-600">
                      {trainer.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {trainer.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {trainer.bio}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Award className="h-4 w-4 mr-2 text-blue-600" />
                    <span>経験: {trainer.experience}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    <span>指導実績: {trainer.clients}名以上</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    資格・認定
                  </h4>
                  <div className="space-y-1">
                    {trainer.certifications.map((cert, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {cert}
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/trainers/${trainer.id}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
                >
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* All Trainers CTA */}
        <div className="text-center">
          <Link
            href="/trainers"
            className="inline-flex items-center bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            全てのトレーナーを見る
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Trainer Matching Service */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              あなたに最適なトレーナーを見つけます
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              目標、性格、スケジュールなど、様々な要素を考慮して
              あなたにぴったりのトレーナーをマッチングします。
            </p>
            <Link
              href="/trainer-matching"
              className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              トレーナーマッチングを開始
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}