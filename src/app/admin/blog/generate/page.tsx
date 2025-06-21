'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Sparkles, 
  ArrowLeft, 
  Loader2, 
  CheckCircle,
  AlertCircle,
  BookOpen,
  Apple,
  Heart,
  RefreshCw
} from 'lucide-react'

interface TopicCategory {
  category: string
  topics: string[]
}

const categoryIcons = {
  workout: BookOpen,
  nutrition: Apple,
  lifestyle: Heart,
  recovery: RefreshCw
}

const categoryLabels = {
  workout: 'トレーニング',
  nutrition: '栄養学',
  lifestyle: 'ライフスタイル',
  recovery: 'リカバリー'
}

export default function GenerateBlogPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [topicCategories, setTopicCategories] = useState<TopicCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('workout')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [customTopic, setCustomTopic] = useState('')
  const [shouldPublish, setShouldPublish] = useState(false)

  useEffect(() => {
    fetchTopics()
  }, [])

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/blog/generate')
      if (response.ok) {
        const data = await response.json()
        setTopicCategories(data.topics)
      }
    } catch (error) {
      console.error('Failed to fetch topics:', error)
    }
  }

  const handleGenerate = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          topic: customTopic || selectedTopic || undefined,
          publish: shouldPublish
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate blog post')
      }

      setSuccess(`ブログ記事「${data.post.title}」が生成されました！`)
      
      // 3秒後に生成された記事の編集ページへリダイレクト
      setTimeout(() => {
        router.push(`/admin/blog/edit/${data.post.id}`)
      }, 2000)

    } catch (error) {
      setError(error instanceof Error ? error.message : '記事の生成に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const currentTopics = topicCategories.find(tc => tc.category === selectedCategory)?.topics || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            ブログ管理に戻る
          </Link>
          
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              AIブログ記事生成
            </h1>
          </div>
          
          <p className="mt-2 text-gray-600">
            AIを使用して高品質なブログ記事を自動生成します
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              カテゴリを選択
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const Icon = categoryIcons[key as keyof typeof categoryIcons]
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCategory(key)
                      setSelectedTopic('')
                      setCustomTopic('')
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCategory === key
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`h-6 w-6 mb-2 mx-auto ${
                      selectedCategory === key ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <div className={`text-sm font-medium ${
                      selectedCategory === key ? 'text-purple-900' : 'text-gray-700'
                    }`}>
                      {label}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Topic Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              トピックを選択（任意）
            </label>
            
            {/* Predefined Topics */}
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              <label className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="topic"
                  value=""
                  checked={!selectedTopic && !customTopic}
                  onChange={() => {
                    setSelectedTopic('')
                    setCustomTopic('')
                  }}
                  className="mr-3"
                />
                <span className="text-sm text-gray-700">ランダムに選択</span>
              </label>
              
              {currentTopics.map((topic, index) => (
                <label key={index} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="topic"
                    value={topic}
                    checked={selectedTopic === topic && !customTopic}
                    onChange={() => {
                      setSelectedTopic(topic)
                      setCustomTopic('')
                    }}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-700">{topic}</span>
                </label>
              ))}
            </div>

            {/* Custom Topic */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カスタムトピック
              </label>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value)
                  setSelectedTopic('')
                }}
                placeholder="独自のトピックを入力..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Publish Option */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="publish"
              checked={shouldPublish}
              onChange={(e) => setShouldPublish(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="publish" className="ml-2 text-sm text-gray-700">
              生成後すぐに公開する
            </label>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700">{success}</span>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  記事を生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  記事を生成
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            AIブログ生成について
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 各カテゴリに最適化されたプロンプトで記事を生成します</li>
            <li>• 生成された記事は編集・カスタマイズ可能です</li>
            <li>• SEO最適化されたスラッグが自動生成されます</li>
            <li>• Claude 3.5 Sonnetを使用して高品質な記事を作成します</li>
          </ul>
        </div>
      </div>
    </div>
  )
}