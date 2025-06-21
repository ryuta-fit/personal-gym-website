'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Booking {
  id: string
  startTime: string
  endTime: string
  status: string
  trainer: {
    name: string
  }
  notes?: string
}

export function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentBookings() {
      try {
        const response = await fetch('/api/bookings')
        if (response.ok) {
          const data = await response.json()
          // Filter for past bookings and take first 5
          const recent = data
            .filter((booking: Booking) => new Date(booking.startTime) < new Date())
            .sort((a: Booking, b: Booking) => 
              new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
            )
            .slice(0, 5)
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
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    )
  }

  // Mock data for demonstration
  const mockBookings: Booking[] = [
    {
      id: '1',
      startTime: '2024-01-20T10:00:00Z',
      endTime: '2024-01-20T11:00:00Z',
      status: 'COMPLETED',
      trainer: { name: '田中 健太' },
      notes: '胸筋中心のトレーニング'
    },
    {
      id: '2',
      startTime: '2024-01-18T14:30:00Z',
      endTime: '2024-01-18T15:30:00Z',
      status: 'COMPLETED',
      trainer: { name: '佐藤 美香' },
      notes: 'HIIT トレーニング'
    },
    {
      id: '3',
      startTime: '2024-01-15T16:00:00Z',
      endTime: '2024-01-15T17:00:00Z',
      status: 'CANCELLED',
      trainer: { name: '山田 雄一' },
      notes: '体調不良のためキャンセル'
    },
    {
      id: '4',
      startTime: '2024-01-13T09:00:00Z',
      endTime: '2024-01-13T10:00:00Z',
      status: 'COMPLETED',
      trainer: { name: '田中 健太' },
      notes: 'スクワット・デッドリフト'
    },
    {
      id: '5',
      startTime: '2024-01-11T11:00:00Z',
      endTime: '2024-01-11T12:00:00Z',
      status: 'COMPLETED',
      trainer: { name: '佐藤 美香' },
      notes: 'ストレッチ・コアトレーニング'
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

  if (displayBookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-sm">まだ予約履歴がありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {displayBookings.map((booking) => (
        <div
          key={booking.id}
          className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(booking.startTime), 'M月d日(E)', { locale: ja })}
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
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Clock className="h-4 w-4 mr-2" />
                {format(new Date(booking.startTime), 'HH:mm')} - 
                {format(new Date(booking.endTime), 'HH:mm')}
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <User className="h-4 w-4 mr-2" />
                {booking.trainer.name}
              </div>
              
              {booking.notes && (
                <p className="text-xs text-gray-500 line-clamp-2 mt-2">
                  {booking.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}