import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-blue-400">
              PersonalGym
            </div>
            <p className="text-gray-300 text-sm">
              プロのトレーナーによる完全個別指導で、あなたの理想の体を実現します。
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">t</span>
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">クイックリンク</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs" className="text-gray-300 hover:text-white transition-colors">
                  プログラム
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-gray-300 hover:text-white transition-colors">
                  トレーナー
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">サービス</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/personal-training" className="text-gray-300 hover:text-white transition-colors">
                  パーソナルトレーニング
                </Link>
              </li>
              <li>
                <Link href="/services/nutrition" className="text-gray-300 hover:text-white transition-colors">
                  栄養指導
                </Link>
              </li>
              <li>
                <Link href="/services/body-composition" className="text-gray-300 hover:text-white transition-colors">
                  体組成分析
                </Link>
              </li>
              <li>
                <Link href="/services/online-coaching" className="text-gray-300 hover:text-white transition-colors">
                  オンラインコーチング
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">お問い合わせ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  〒100-0001 東京都千代田区千代田1-1-1
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  03-1234-5678
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  info@personalgym.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <div>平日: 6:00 - 23:00</div>
                  <div>土日: 8:00 - 21:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">メールマガジン購読</h3>
              <p className="text-gray-300 text-sm">
                最新のトレーニング情報やお得なキャンペーン情報をお届けします。
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                className="flex-1 md:w-64 px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r-md transition-colors">
                購読
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 PersonalGym. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}