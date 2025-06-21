'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

const subscribeSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
})

type SubscribeFormData = z.infer<typeof subscribeSchema>

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal' | 'sidebar'
  className?: string
}

export function NewsletterSignup({ variant = 'inline', className = '' }: NewsletterSignupProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema)
  })

  const onSubmit = async (data: SubscribeFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        reset()
        setTimeout(() => setIsSuccess(false), 5000) // Reset success state after 5 seconds
      } else {
        setError(result.error || '購読に失敗しました')
      }
    } catch {
      setError('購読に失敗しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-6 ${className}`}>
        <div className="flex items-center mb-3">
          <Mail className="h-5 w-5 mr-2" />
          <h3 className="text-lg font-bold">メールマガジン</h3>
        </div>
        <p className="text-blue-100 text-sm mb-4">
          週1回、厳選したフィットネス情報をお送りします
        </p>
        
        {isSuccess ? (
          <div className="flex items-center text-green-100 bg-green-600 rounded-lg p-3">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">購読ありがとうございます！</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <input
                type="email"
                placeholder="メールアドレス"
                {...register('email')}
                className="w-full px-3 py-2 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-200">{errors.email.message}</p>
              )}
              {error && (
                <p className="mt-1 text-xs text-red-200">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-blue-900 font-semibold py-2 px-4 rounded transition-colors"
            >
              {isLoading ? '登録中...' : '購読する'}
            </button>
          </form>
        )}
      </div>
    )
  }

  if (variant === 'modal') {
    return (
      <div className={`bg-white rounded-lg p-6 ${className}`}>
        <div className="text-center mb-6">
          <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            メールマガジンに登録
          </h3>
          <p className="text-gray-600">
            最新のトレーニング情報やお得なキャンペーン情報をお届けします
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              登録完了！
            </h4>
            <p className="text-gray-600">
              ご登録ありがとうございます。確認メールをお送りしました。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="メールアドレスを入力"
                {...register('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
              {error && (
                <div className="mt-2 flex items-center text-red-600">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {isLoading ? '登録中...' : '登録する'}
            </button>
          </form>
        )}
      </div>
    )
  }

  // Inline variant (default)
  return (
    <div className={`bg-gray-50 rounded-2xl p-8 ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          最新情報をお届け
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          週1回、厳選したフィットネス情報やお得なキャンペーン情報をお送りします。
          登録は無料で、いつでも解除できます。
        </p>
      </div>

      {isSuccess ? (
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            登録完了！
          </h4>
          <p className="text-gray-600">
            ご登録ありがとうございます。確認メールをお送りしました。
          </p>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                {...register('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
              {error && (
                <div className="mt-2 flex items-center text-red-600">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
            >
              {isLoading ? '登録中...' : '登録する'}
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            ご登録いただいたメールアドレスは、メールマガジン配信のみに使用し、
            第三者に提供することはありません。
          </p>
        </div>
      )}
    </div>
  )
}