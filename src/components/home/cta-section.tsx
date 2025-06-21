import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Gift } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+Cjwvcmf0dGVybj4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+Cjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            今こそ始めよう！
            <span className="block text-yellow-400 mt-2">
              理想の体づくり
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
            無料体験レッスンで、あなたの可能性を体感してください。
            <span className="block mt-2">プロのトレーナーが、あなたの目標達成をサポートします。</span>
          </p>

          {/* Special Offer */}
          <div className="bg-yellow-400 text-blue-900 rounded-2xl p-6 md:p-8 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Gift className="h-8 w-8 mr-3" />
              <span className="text-2xl md:text-3xl font-bold">特別キャンペーン実施中！</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-green-600 flex-shrink-0" />
                <span className="font-semibold">無料体験レッスン</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-green-600 flex-shrink-0" />
                <span className="font-semibold">体組成分析無料</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-green-600 flex-shrink-0" />
                <span className="font-semibold">入会金50%OFF</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center text-lg">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-semibold">期間限定: 今月末まで</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              href="/booking"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 flex items-center group shadow-lg"
            >
              今すぐ無料体験を予約
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 flex items-center group"
            >
              まずは相談する
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">お電話でのご予約</h3>
              <p className="text-blue-100">03-1234-5678</p>
              <p className="text-blue-200 text-sm">平日 6:00-23:00 / 土日 8:00-21:00</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">メールでのお問い合わせ</h3>
              <p className="text-blue-100">info@personalgym.com</p>
              <p className="text-blue-200 text-sm">24時間受付・当日返信</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">アクセス</h3>
              <p className="text-blue-100">東京都千代田区千代田1-1-1</p>
              <p className="text-blue-200 text-sm">各線東京駅徒歩5分</p>
            </div>
          </div>

          {/* Reassurance */}
          <div className="mt-12 text-center">
            <p className="text-blue-200">
              ※無料体験レッスンは予約制です。お気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}