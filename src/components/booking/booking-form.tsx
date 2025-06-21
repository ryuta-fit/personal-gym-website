'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format, addDays, startOfWeek, addWeeks, isToday, isBefore, startOfDay } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Clock, User, Calendar, MessageSquare, AlertCircle } from 'lucide-react'

const bookingSchema = z.object({
  trainerId: z.string().min(1, 'トレーナーを選択してください'),
  date: z.string().min(1, '日付を選択してください'),
  time: z.string().min(1, '時間を選択してください'),
  duration: z.string().min(1, '時間を選択してください'),
  notes: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface Trainer {
  id: string
  name: string
  email: string
  specialties: string | null
  bio: string | null
  isActive: boolean
}

const timeSlots = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
  '22:00', '22:30'
]

const durations = [
  { value: '60', label: '60分' },
  { value: '90', label: '90分' },
  { value: '120', label: '120分' }
]

export function BookingForm() {
  const { status } = useSession()
  const router = useRouter()
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  })

  const watchedValues = watch()

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/booking')
    }
  }, [status, router])

  // Fetch trainers
  useEffect(() => {
    async function fetchTrainers() {
      try {
        const response = await fetch('/api/trainers?active=true')
        if (response.ok) {
          const data = await response.json()
          setTrainers(data)
        }
      } catch (error) {
        console.error('Failed to fetch trainers:', error)
      }
    }
    fetchTrainers()
  }, [])

  // Fetch booked slots when trainer and date are selected
  useEffect(() => {
    if (watchedValues.trainerId && selectedDate) {
      fetchBookedSlots(watchedValues.trainerId, selectedDate)
    }
  }, [watchedValues.trainerId, selectedDate])

  const fetchBookedSlots = async (trainerId: string, date: string) => {
    try {
      const response = await fetch(`/api/bookings?trainerId=${trainerId}&date=${date}`)
      if (response.ok) {
        const bookings = await response.json()
        const slots = bookings.map((booking: { startTime: string }) => 
          format(new Date(booking.startTime), 'HH:mm')
        )
        setBookedSlots(slots)
      }
    } catch (error) {
      console.error('Failed to fetch booked slots:', error)
    }
  }

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const startTime = new Date(`${data.date}T${data.time}:00`)
      const endTime = new Date(startTime.getTime() + parseInt(data.duration) * 60000)

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainerId: data.trainerId,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          notes: data.notes,
        }),
      })

      if (response.ok) {
        const booking = await response.json()
        router.push(`/booking/confirmation/${booking.id}`)
      } else {
        const errorData = await response.json()
        setError(errorData.error || '予約に失敗しました')
      }
    } catch {
      setError('予約に失敗しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  const getWeekDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      days.push(addDays(currentWeek, i))
    }
    return days
  }

  const handleDateSelect = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    setSelectedDate(dateString)
    setValue('date', dateString)
  }

  const handleTrainerSelect = (trainer: Trainer) => {
    setSelectedTrainer(trainer)
    setValue('trainerId', trainer.id)
  }

  const isTimeSlotAvailable = (time: string) => {
    if (!selectedDate) return false
    
    const slotDate = new Date(`${selectedDate}T${time}:00`)
    const now = new Date()
    
    // Check if slot is in the past
    if (isBefore(slotDate, now)) return false
    
    // Check if slot is already booked
    if (bookedSlots.includes(time)) return false
    
    return true
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center p-8">読み込み中...</div>
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">セッション予約</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}
      </div>

      {/* Step 1: Trainer Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="h-5 w-5 mr-2" />
          1. トレーナーを選択
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedTrainer?.id === trainer.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleTrainerSelect(trainer)}
            >
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">
                    {trainer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{trainer.name}</h4>
                  {trainer.specialties && (
                    <p className="text-sm text-gray-600">
                      {JSON.parse(trainer.specialties).join(', ')}
                    </p>
                  )}
                </div>
              </div>
              {trainer.bio && (
                <p className="text-sm text-gray-600 line-clamp-2">{trainer.bio}</p>
              )}
            </div>
          ))}
        </div>
        
        {errors.trainerId && (
          <p className="mt-2 text-sm text-red-600">{errors.trainerId.message}</p>
        )}
      </div>

      {/* Step 2: Date Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          2. 日付を選択
        </h3>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-medium">
              {format(currentWeek, 'yyyy年M月', { locale: ja })}
            </span>
            <button
              type="button"
              onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {['月', '火', '水', '木', '金', '土', '日'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            
            {getWeekDays().map((date) => {
              const isPast = isBefore(date, startOfDay(new Date()))
              const isSelected = selectedDate === format(date, 'yyyy-MM-dd')
              
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => !isPast && handleDateSelect(date)}
                  disabled={isPast}
                  className={`p-3 text-sm rounded-lg transition-colors ${
                    isPast
                      ? 'text-gray-300 cursor-not-allowed'
                      : isSelected
                      ? 'bg-blue-600 text-white'
                      : isToday(date)
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {format(date, 'd')}
                </button>
              )
            })}
          </div>
        </div>
        
        {errors.date && (
          <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      {/* Step 3: Time and Duration Selection */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            3. 時間と長さを選択
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                セッション時間
              </label>
              <div className="space-y-2">
                {durations.map((duration) => (
                  <label key={duration.value} className="flex items-center">
                    <input
                      type="radio"
                      value={duration.value}
                      {...register('duration')}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{duration.label}</span>
                  </label>
                ))}
              </div>
              {errors.duration && (
                <p className="mt-2 text-sm text-red-600">{errors.duration.message}</p>
              )}
            </div>
            
            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                開始時間
              </label>
              <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                {timeSlots.map((time) => {
                  const isAvailable = isTimeSlotAvailable(time)
                  const isSelected = watchedValues.time === time
                  
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => isAvailable && setValue('time', time)}
                      disabled={!isAvailable}
                      className={`p-2 text-sm rounded border transition-colors ${
                        !isAvailable
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
              {errors.time && (
                <p className="mt-2 text-sm text-red-600">{errors.time.message}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Notes */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          4. 備考（任意）
        </h3>
        
        <textarea
          {...register('notes')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="目標や体調面で気になることがあれば記入してください..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          {isLoading ? '予約中...' : '予約を確定する'}
        </button>
      </div>
    </form>
  )
}