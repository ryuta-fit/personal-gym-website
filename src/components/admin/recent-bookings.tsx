'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { 
  Calendar, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react'

interface Booking {
  id: string
  startTime: string
  endTime: string
  status: string
  notes?: string
  user: {
    name: string
    email: string
  }
  trainer: {
    name: string
  }
}

export function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all')

  useEffect(() => {
    async function fetchRecentBookings() {
      try {
        const response = await fetch('/api/bookings')
        if (response.ok) {
          const data = await response.json()
          // Sort by creation date and take first 10
          const recent = data
            .sort((a: Booking, b: Booking) => 
              new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
            )
            .slice(0, 10)
          setBookings(recent)
        }
      } catch (error) {
        console.error('Failed to fetch recent bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentBookings()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    )
  }

  // Mock data for demonstration
  const mockBookings: Booking[] = [
    {
      id: '1',
      startTime: '2024-01-25T10:00:00Z',
      endTime: '2024-01-25T11:00:00Z',
      status: 'PENDING',
      user: { name: '田中 太郎', email: 'tanaka@example.com' },
      trainer: { name: '田中 健太' },
      notes: 'ベンチプレス強化希望'
    },
    {
      id: '2',
      startTime: '2024-01-25T14:30:00Z',
      endTime: '2024-01-25T15:30:00Z',
      status: 'CONFIRMED',
      user: { name: '佐藤 花子', email: 'sato@example.com' },
      trainer: { name: '佐藤 美香' },
      notes: 'ダイエット目的'
    },
    {
      id: '3',
      startTime: '2024-01-24T16:00:00Z',
      endTime: '2024-01-24T17:00:00Z',
      status: 'COMPLETED',
      user: { name: '鈴木 次郎', email: 'suzuki@example.com' },
      trainer: { name: '山田 雄一' },
      notes: 'リハビリトレーニング'
    },
    {
      id: '4',
      startTime: '2024-01-24T09:00:00Z',
      endTime: '2024-01-24T10:00:00Z',
      status: 'CANCELLED',
      user: { name: '高橋 美咲', email: 'takahashi@example.com' },
      trainer: { name: '田中 健太' },
      notes: '体調不良のためキャンセル'
    },
    {
      id: '5',
      startTime: '2024-01-23T11:00:00Z',
      endTime: '2024-01-23T12:00:00Z',
      status: 'COMPLETED',
      user: { name: '中村 健', email: 'nakamura@example.com' },
      trainer: { name: '佐藤 美香' },
      notes: 'マラソン向けトレーニング'
    }
  ]

  const displayBookings = bookings.length > 0 ? bookings : mockBookings

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'PENDING':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'CONFIRMED':
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return '完了'
      case 'CANCELLED':
        return 'キャンセル'
      case 'PENDING':
        return '承認待ち'
      case 'CONFIRMED':
        return '確定'
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = filter === 'all' 
    ? displayBookings 
    : displayBookings.filter(booking => booking.status.toLowerCase() === filter)

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'all', label: 'すべて' },
          { key: 'pending', label: '承認待ち' },
          { key: 'confirmed', label: '確定' },
          { key: 'completed', label: '完了' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as 'all' | 'pending' | 'confirmed' | 'completed')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              filter === key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(booking.startTime), 'M月d日(E) HH:mm', { locale: ja })}
                    - {format(new Date(booking.endTime), 'HH:mm')}
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(booking.status)}
                    <span
                      className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}
                    >
                      {getStatusText(booking.status)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <div>
                      <span className="font-medium">{booking.user.name}</span>
                      <div className="text-xs text-gray-500">{booking.user.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span>トレーナー: {booking.trainer.name}</span>
                  </div>
                </div>
                
                {booking.notes && (
                  <p className="text-xs text-gray-500 bg-gray-50 rounded p-2 mb-3">
                    {booking.notes}
                  </p>
                )}
                
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                    <Eye className="h-3 w-3 mr-1" />
                    詳細
                  </button>
                  {booking.status === 'PENDING' && (
                    <>
                      <button className="flex items-center px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        承認
                      </button>
                      <button className="flex items-center px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
                        <XCircle className="h-3 w-3 mr-1" />
                        拒否
                      </button>
                    </>
                  )}
                  <button className="flex items-center px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    <Edit className="h-3 w-3 mr-1" />
                    編集
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">該当する予約がありません</p>
        </div>
      )}

      {/* View All Link */}
      <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          すべての予約を管理 →
        </button>
      </div>
    </div>
  )
}