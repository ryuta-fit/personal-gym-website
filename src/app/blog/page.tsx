import { Suspense } from 'react'
import Link from 'next/link'
import { BlogPosts } from '@/components/blog/blog-posts'
import { BlogSidebar } from '@/components/blog/blog-sidebar'
import { Search, Filter } from 'lucide-react'

interface BlogPageProps {
  searchParams: {
    page?: string
    category?: string
    tag?: string
    search?: string
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              フィットネス & 健康ブログ
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              最新のトレーニング情報、栄養学、健康に関する専門知識を
              プロトレーナーがお届けします
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="記事を検索..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={searchParams.search || ''}
                  />
                </div>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Filter className="h-4 w-4 mr-2" />
                  フィルター
                </button>
              </div>
              
              {/* Active Filters */}
              {(searchParams.category || searchParams.tag) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {searchParams.category && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      カテゴリ: {searchParams.category}
                      <Link
                        href="/blog"
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </Link>
                    </span>
                  )}
                  {searchParams.tag && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      タグ: {searchParams.tag}
                      <Link
                        href="/blog"
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </Link>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Blog Posts */}
            <Suspense fallback={<BlogPostsSkeleton />}>
              <BlogPosts
                page={parseInt(searchParams.page || '1')}
                category={searchParams.category}
                tag={searchParams.tag}
                search={searchParams.search}
              />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<BlogSidebarSkeleton />}>
              <BlogSidebar />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function BlogPostsSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BlogSidebarSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )
}