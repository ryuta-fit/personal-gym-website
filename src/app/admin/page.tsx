import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminStats } from '@/components/admin/admin-stats'
import { RecentBookings as AdminRecentBookings } from '@/components/admin/recent-bookings'
import { NewsletterStats } from '@/components/admin/newsletter-stats'
import { BlogPostsManagement } from '@/components/admin/blog-posts-management'
import { QuickActions as AdminQuickActions } from '@/components/admin/quick-actions'
import { 
  Users, 
  Calendar, 
  Mail, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            管理者ダッシュボード
          </h1>
          <p className="text-gray-600 mt-2">
            システム全体の概要と管理機能
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">登録ユーザー</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">今月の予約</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">メルマガ購読者</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">公開記事</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">今日の予約</h3>
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span>前日比 +3</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">完了セッション</h3>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">8</div>
            <div className="flex items-center text-sm text-gray-600">
              <span>今日実施済み</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">要対応</h3>
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">3</div>
            <div className="flex items-center text-sm text-gray-600">
              <span>承認待ち予約</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                クイックアクション
              </h2>
              <Suspense fallback={<AdminQuickActionsSkeleton />}>
                <AdminQuickActions />
              </Suspense>
            </div>

            {/* Admin Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                詳細統計
              </h2>
              <Suspense fallback={<AdminStatsSkeleton />}>
                <AdminStats />
              </Suspense>
            </div>

            {/* Recent Bookings Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                最近の予約管理
              </h2>
              <Suspense fallback={<AdminRecentBookingsSkeleton />}>
                <AdminRecentBookings />
              </Suspense>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Newsletter Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                メールマガジン
              </h2>
              <Suspense fallback={<NewsletterStatsSkeleton />}>
                <NewsletterStats />
              </Suspense>
            </div>

            {/* Blog Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                ブログ管理
              </h2>
              <Suspense fallback={<BlogPostsManagementSkeleton />}>
                <BlogPostsManagement />
              </Suspense>
            </div>

            {/* System Health */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                システム状態
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">データベース: 正常</span>
                </div>
                <div className="flex items-center text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">メールサービス: 正常</span>
                </div>
                <div className="flex items-center text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">サーバー: 正常</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminQuickActionsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  )
}

function AdminStatsSkeleton() {
  return <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
}

function AdminRecentBookingsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  )
}

function NewsletterStatsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
    </div>
  )
}

function BlogPostsManagementSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  )
}