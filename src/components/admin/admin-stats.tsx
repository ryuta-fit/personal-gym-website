'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign,
  Activity 
} from 'lucide-react'

interface StatCard {
  title: string
  value: string
  change: number
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export function AdminStats() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'revenue'>('overview')

  const overviewStats: StatCard[] = [
    {
      title: '総ユーザー数',
      value: '156',
      change: 12,
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: '今月の新規登録',
      value: '23',
      change: 8,
      changeType: 'positive',
      icon: Users,
      color: 'green'
    },
    {
      title: 'アクティブユーザー',
      value: '89',
      change: -5,
      changeType: 'negative',
      icon: Activity,
      color: 'purple'
    },
    {
      title: '平均利用頻度',
      value: '2.3回/週',
      change: 0.2,
      changeType: 'positive',
      icon: TrendingUp,
      color: 'orange'
    }
  ]

  const bookingStats: StatCard[] = [
    {
      title: '今月の予約数',
      value: '89',
      change: 15,
      changeType: 'positive',
      icon: Calendar,
      color: 'blue'
    },
    {
      title: '完了セッション',
      value: '76',
      change: 12,
      changeType: 'positive',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'キャンセル率',
      value: '8.2%',
      change: -2.1,
      changeType: 'positive',
      icon: TrendingDown,
      color: 'red'
    },
    {
      title: '予約稼働率',
      value: '85.3%',
      change: 3.2,
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple'
    }
  ]

  const revenueStats: StatCard[] = [
    {
      title: '今月の売上',
      value: '¥1,234,000',
      change: 18.5,
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: '平均単価',
      value: '¥13,865',
      change: 2.3,
      changeType: 'positive',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      title: 'LTV',
      value: '¥156,000',
      change: 8.1,
      changeType: 'positive',
      icon: Users,
      color: 'purple'
    },
    {
      title: '解約率',
      value: '3.2%',
      change: -0.8,
      changeType: 'positive',
      icon: TrendingDown,
      color: 'red'
    }
  ]

  const getStatsForTab = () => {
    switch (activeTab) {
      case 'overview':
        return overviewStats
      case 'bookings':
        return bookingStats
      case 'revenue':
        return revenueStats
      default:
        return overviewStats
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getChangeColor = (changeType: 'positive' | 'negative' | 'neutral') => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeIcon = (changeType: 'positive' | 'negative' | 'neutral') => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-4 w-4" />
      case 'negative':
        return <TrendingDown className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          概要
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'bookings'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          予約
        </button>
        <button
          onClick={() => setActiveTab('revenue')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'revenue'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          売上
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getStatsForTab().map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className={`flex items-center text-sm ${getChangeColor(stat.changeType)}`}>
                  {getChangeIcon(stat.changeType)}
                  <span className="ml-1">
                    {stat.change > 0 ? '+' : ''}{stat.change}
                    {typeof stat.change === 'number' && stat.change % 1 !== 0 ? '' : '%'}
                  </span>
                  <span className="ml-1 text-gray-500">前月比</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">今日の予約</h3>
          <div className="text-3xl font-bold mb-1">12</div>
          <p className="text-blue-100 text-sm">6セッション完了</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">今週の売上</h3>
          <div className="text-3xl font-bold mb-1">¥342K</div>
          <p className="text-green-100 text-sm">目標達成率: 85%</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">顧客満足度</h3>
          <div className="text-3xl font-bold mb-1">4.8/5.0</div>
          <p className="text-purple-100 text-sm">42件のレビュー</p>
        </div>
      </div>
    </div>
  )
}