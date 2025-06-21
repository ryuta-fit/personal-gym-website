import Link from 'next/link'
import { TrendingUp, Calendar, Tag } from 'lucide-react'

export async function BlogSidebar() {
  // In a real app, this would fetch from your API
  const popularPosts = [
    {
      id: '1',
      title: '効果的な筋トレの始め方',
      slug: 'beginner-strength-training-guide',
      views: 15420
    },
    {
      id: '2',
      title: 'プロテインの正しい摂取方法',
      slug: 'protein-intake-timing',
      views: 12350
    },
    {
      id: '3',
      title: 'ダイエット成功のための食事管理術',
      slug: 'diet-meal-management',
      views: 11200
    },
    {
      id: '4',
      title: '自宅でできる有酸素運動',
      slug: 'home-cardio-exercises',
      views: 9800
    },
    {
      id: '5',
      title: '睡眠と筋肉回復の関係',
      slug: 'sleep-muscle-recovery',
      views: 8900
    }
  ]

  const categories = [
    { id: '1', name: 'トレーニング', slug: 'training', count: 24 },
    { id: '2', name: '栄養学', slug: 'nutrition', count: 18 },
    { id: '3', name: 'ダイエット', slug: 'diet', count: 15 },
    { id: '4', name: 'ボディメイク', slug: 'bodybuilding', count: 12 },
    { id: '5', name: 'ライフスタイル', slug: 'lifestyle', count: 9 },
    { id: '6', name: 'サプリメント', slug: 'supplements', count: 7 }
  ]

  const popularTags = [
    { id: '1', name: '初心者', slug: 'beginner', count: 20 },
    { id: '2', name: '筋トレ', slug: 'strength-training', count: 18 },
    { id: '3', name: 'プロテイン', slug: 'protein', count: 15 },
    { id: '4', name: '食事管理', slug: 'meal-management', count: 12 },
    { id: '5', name: '減量', slug: 'weight-loss', count: 11 },
    { id: '6', name: '有酸素運動', slug: 'cardio', count: 9 },
    { id: '7', name: '自宅トレーニング', slug: 'home-workout', count: 8 },
    { id: '8', name: '睡眠', slug: 'sleep', count: 6 }
  ]

  const recentPosts = [
    {
      id: '1',
      title: '冬のトレーニングで注意すべきポイント',
      slug: 'winter-training-tips',
      publishedAt: '2024-01-20'
    },
    {
      id: '2',
      title: '新年の目標設定とモチベーション維持',
      slug: 'new-year-goals-motivation',
      publishedAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'ストレッチの効果的な取り入れ方',
      slug: 'effective-stretching-methods',
      publishedAt: '2024-01-16'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-6">
        <h3 className="text-lg font-bold mb-3">
          最新情報をお届け
        </h3>
        <p className="text-blue-100 text-sm mb-4">
          週1回、厳選したフィットネス情報をお送りします
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full px-3 py-2 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-2 px-4 rounded transition-colors">
            購読する
          </button>
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">人気記事</h3>
        </div>
        <div className="space-y-3">
          {popularPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 text-xs font-bold rounded-full flex items-center justify-center mr-3 mt-1">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {post.views.toLocaleString()}回閲覧
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">カテゴリ</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog?category=${category.slug}`}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700 hover:text-blue-600">
                {category.name}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Tag className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">人気タグ</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag.id}
              href={`/blog?tag=${tag.slug}`}
              className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              #{tag.name} ({tag.count})
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 text-green-500 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">最新記事</h3>
        </div>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Archive */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">アーカイブ</h3>
        <div className="space-y-2">
          <Link
            href="/blog?month=2024-01"
            className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700 hover:text-blue-600">2024年1月</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">8</span>
          </Link>
          <Link
            href="/blog?month=2023-12"
            className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700 hover:text-blue-600">2023年12月</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">12</span>
          </Link>
          <Link
            href="/blog?month=2023-11"
            className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700 hover:text-blue-600">2023年11月</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">15</span>
          </Link>
        </div>
      </div>
    </div>
  )
}