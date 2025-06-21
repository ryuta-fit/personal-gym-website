import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar, ArrowRight, Eye } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featuredImage: string | null
  publishedAt: string | null
  categories: Array<{
    id: string
    name: string
    slug: string
  }>
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
}

interface BlogPostsProps {
  page: number
  category?: string
  tag?: string
  search?: string
}

export async function BlogPosts({ page, category, tag, search }: BlogPostsProps) {
  // In a real app, this would fetch from your API
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: '効果的な筋トレの始め方：初心者向け完全ガイド',
      slug: 'beginner-strength-training-guide',
      excerpt: '筋トレを始めたいけど何から始めればいいかわからない方へ。基本的なフォームから効果的なプログラムまで、プロトレーナーが詳しく解説します。',
      featuredImage: '/api/placeholder/400/250',
      publishedAt: '2024-01-15T10:00:00Z',
      categories: [
        { id: '1', name: 'トレーニング', slug: 'training' }
      ],
      tags: [
        { id: '1', name: '初心者', slug: 'beginner' },
        { id: '2', name: '筋トレ', slug: 'strength-training' }
      ]
    },
    {
      id: '2',
      title: 'プロテインの正しい摂取方法とタイミング',
      slug: 'protein-intake-timing',
      excerpt: 'プロテインはただ飲めばいいというものではありません。効果的な摂取方法とベストなタイミングを栄養学の観点から解説します。',
      featuredImage: '/api/placeholder/400/250',
      publishedAt: '2024-01-12T14:30:00Z',
      categories: [
        { id: '2', name: '栄養学', slug: 'nutrition' }
      ],
      tags: [
        { id: '3', name: 'プロテイン', slug: 'protein' },
        { id: '4', name: 'サプリメント', slug: 'supplements' }
      ]
    },
    {
      id: '3',
      title: 'ダイエット成功のための食事管理術',
      slug: 'diet-meal-management',
      excerpt: '無理な食事制限をしなくても確実に体重を落とす方法があります。持続可能なダイエットのための食事管理テクニックをご紹介。',
      featuredImage: '/api/placeholder/400/250',
      publishedAt: '2024-01-10T09:15:00Z',
      categories: [
        { id: '3', name: 'ダイエット', slug: 'diet' }
      ],
      tags: [
        { id: '5', name: '食事管理', slug: 'meal-management' },
        { id: '6', name: '減量', slug: 'weight-loss' }
      ]
    }
  ]

  const posts = mockPosts
  const pagination = {
    page: 1,
    pages: 1,
    total: posts.length
  }

  return (
    <div>
      {/* Featured Post */}
      {page === 1 && posts.length > 0 && (
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Featured</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium mr-3">
                    注目記事
                  </span>
                  <Calendar className="h-4 w-4 mr-1" />
                  {posts[0].publishedAt && format(new Date(posts[0].publishedAt), 'yyyy年M月d日', { locale: ja })}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {posts[0].title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {posts[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {posts[0].categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.slug}`}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                  {posts[0].tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog?tag=${tag.slug}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/blog/${posts[0].slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                >
                  続きを読む
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {posts.slice(page === 1 ? 1 : 0).map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-lg">Image</span>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="h-4 w-4 mr-1" />
                {post.publishedAt && format(new Date(post.publishedAt), 'yyyy年M月d日', { locale: ja })}
                <span className="mx-2">•</span>
                <Eye className="h-4 w-4 mr-1" />
                <span>1,234回</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog?category=${category.slug}`}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
                {post.tags.slice(0, 2).map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
              
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group"
              >
                続きを読む
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center">
          <nav className="flex items-center space-x-2">
            {[...Array(pagination.pages)].map((_, i) => {
              const pageNum = i + 1
              const isActive = pageNum === pagination.page
              
              return (
                <Link
                  key={pageNum}
                  href={`/blog?page=${pageNum}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}${search ? `&search=${search}` : ''}`}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {pageNum}
                </Link>
              )
            })}
          </nav>
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            記事が見つかりませんでした
          </h3>
          <p className="text-gray-600">
            検索条件を変更して再度お試しください。
          </p>
        </div>
      )}
    </div>
  )
}