import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { UserProfile } from '@/components/dashboard/user-profile'
import { RecentBookings } from '@/components/dashboard/recent-bookings'
import { ProgressChart } from '@/components/dashboard/progress-chart'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { UpcomingBookings } from '@/components/dashboard/upcoming-bookings'
import { Calendar, Activity, TrendingUp, Clock } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ダッシュボード
          </h1>
          <p className="text-gray-600 mt-2">
            こんにちは、{session.user?.name || 'お客様'}！今日も頑張りましょう。
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">今月の予約</p>
                <p className="text-2xl font-bold text-gray-900">8回</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">完了セッション</p>
                <p className="text-2xl font-bold text-gray-900">24回</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">体重変化</p>
                <p className="text-2xl font-bold text-gray-900">-3.2kg</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総トレーニング時間</p>
                <p className="text-2xl font-bold text-gray-900">36時間</p>
              </div>
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
              <Suspense fallback={<QuickActionsSkeleton />}>
                <QuickActions />
              </Suspense>
            </div>

            {/* Progress Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                進捗グラフ
              </h2>
              <Suspense fallback={<ProgressChartSkeleton />}>
                <ProgressChart />
              </Suspense>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                最近の予約履歴
              </h2>
              <Suspense fallback={<RecentBookingsSkeleton />}>
                <RecentBookings />
              </Suspense>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* User Profile */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                プロフィール
              </h2>
              <Suspense fallback={<UserProfileSkeleton />}>
                <UserProfile />
              </Suspense>
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                今後の予約
              </h2>
              <Suspense fallback={<UpcomingBookingsSkeleton />}>
                <UpcomingBookings />
              </Suspense>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                今日のTips
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                水分補給は筋トレ前、中、後にしっかりと行いましょう。
                脱水状態では筋肉の収縮力が低下し、
                効果的なトレーニングができません。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickActionsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  )
}

function ProgressChartSkeleton() {
  return <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
}

function RecentBookingsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  )
}

function UserProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
    </div>
  )
}

function UpcomingBookingsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  )
}