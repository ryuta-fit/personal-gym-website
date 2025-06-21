'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'

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

export function UpcomingBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUpcomingBookings() {
      try {
        // In a real app, this would filter for upcoming bookings
        const response = await fetch('/api/bookings')
        if (response.ok) {
          const data = await response.json()
          // Filter for upcoming bookings and take first 3
          const upcoming = data
            .filter((booking: Booking) => new Date(booking.startTime) > new Date())
            .sort((a: Booking, b: Booking) => 
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
            )
            .slice(0, 3)
          setBookings(upcoming)
        }
      } catch (error) {
        console.error('Failed to fetch upcoming bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUpcomingBookings()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
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
      status: 'CONFIRMED',
      trainer: { name: '田中 健太' },
      notes: 'ベンチプレス強化'
    },
    {
      id: '2',
      startTime: '2024-01-27T14:30:00Z',
      endTime: '2024-01-27T15:30:00Z',
      status: 'CONFIRMED',
      trainer: { name: '佐藤 美香' },
      notes: '有酸素運動メイン'
    }
  ]

  const displayBookings = bookings.length > 0 ? bookings : mockBookings

  if (displayBookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-sm">今後の予約はありません</p>
        <Link
          href="/booking"
          className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          新しい予約をする
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {displayBookings.map((booking) => (
        <div
          key={booking.id}
          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(booking.startTime), 'M月d日(E)', { locale: ja })}
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
                <p className="text-xs text-gray-500 line-clamp-1">
                  {booking.notes}
                </p>
              )}
            </div>
            
            <div className="ml-4">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  booking.status === 'CONFIRMED'
                    ? 'bg-green-100 text-green-800'
                    : booking.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {booking.status === 'CONFIRMED' ? '確定' : 
                 booking.status === 'PENDING' ? '承認待ち' : booking.status}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      <Link
        href="/bookings"
        className="block text-center py-3 text-blue-600 hover:text-blue-700 font-medium text-sm border border-blue-200 rounded-lg hover:border-blue-300 transition-colors"
      >
        すべての予約を見る
      </Link>
    </div>
  )
}