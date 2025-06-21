import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: '田中 恵子',
      age: 35,
      program: 'ダイエットプログラム',
      rating: 5,
      text: '6ヶ月で12kg減量に成功！無理な食事制限はなく、トレーナーさんが私のペースに合わせて指導してくれたので、楽しく続けることができました。人生が変わりました。',
      result: '-12kg減量',
      period: '6ヶ月',
      beforeAfter: true
    },
    {
      id: 2,
      name: '佐藤 雄太',
      age: 28,
      program: '筋力アップ',
      rating: 5,
      text: '筋トレ初心者でしたが、正しいフォームから丁寧に教えていただき、今では自信を持ってトレーニングできます。体つきも大きく変わり、周りからも驚かれています。',
      result: '筋肉量+8kg',
      period: '8ヶ月',
      beforeAfter: true
    },
    {
      id: 3,
      name: '山田 美咲',
      age: 42,
      program: '健康維持',
      rating: 5,
      text: '運動不足と肩こりに悩んでいましたが、週1回のトレーニングで体の調子が格段に良くなりました。日常生活が楽になり、仕事の集中力も上がりました。',
      result: '体脂肪率-5%',
      period: '1年',
      beforeAfter: false
    },
    {
      id: 4,
      name: '鈴木 直樹',
      age: 50,
      program: 'リハビリ',
      rating: 5,
      text: '腰痛で悩んでいましたが、理学療法士でもあるトレーナーさんの指導で痛みが改善。今では趣味のゴルフも楽しめるようになりました。',
      result: '腰痛改善',
      period: '4ヶ月',
      beforeAfter: false
    },
    {
      id: 5,
      name: '高橋 あかり',
      age: 26,
      program: 'ボディメイク',
      rating: 5,
      text: '結婚式に向けてボディメイクをお願いしました。理想通りのドレス姿になれて大満足！今も体型維持のために継続しています。',
      result: 'ウエスト-8cm',
      period: '3ヶ月',
      beforeAfter: true
    },
    {
      id: 6,
      name: '中村 健',
      age: 38,
      program: 'アスリート向け',
      rating: 5,
      text: 'マラソンのタイム向上のためにお世話になりました。科学的なアプローチで弱点を改善し、自己ベストを20分も更新できました！',
      result: 'タイム20分短縮',
      period: '5ヶ月',
      beforeAfter: false
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            お客様の成功事例
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            実際にご利用いただいたお客様の生の声をご紹介します
          </p>
        </div>

        {/* Featured Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.slice(0, 2).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-100"
            >
              <div className="flex items-center mb-6">
                <Quote className="h-8 w-8 text-blue-600 mr-4" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-gray-800 text-lg leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.name}（{testimonial.age}歳）
                  </div>
                  <div className="text-blue-600 text-sm font-medium">
                    {testimonial.program}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600 text-lg">
                    {testimonial.result}
                  </div>
                  <div className="text-gray-500 text-sm">
                    期間: {testimonial.period}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid of Additional Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.slice(2).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900 text-sm">
                  {testimonial.name}（{testimonial.age}歳）
                </div>
                <div className="text-blue-600 text-xs mb-2">
                  {testimonial.program}
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-medium text-green-600 text-sm">
                    {testimonial.result}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.period}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Statistics */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              驚くべき成功率
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              多くのお客様が目標を達成し、理想の体を手に入れています
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">目標達成率</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">4.9</div>
              <div className="text-gray-600 font-medium">平均満足度</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">89%</div>
              <div className="text-gray-600 font-medium">継続率</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">成功事例</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}