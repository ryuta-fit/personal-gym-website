'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Eye, 
  Edit, 
  Plus, 
  Calendar,
  ArrowRight,
  TrendingUp
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  publishedAt?: string
  views?: number
  slug: string
}

export function BlogPostsManagement() {
  const [activeTab, setActiveTab] = useState<'recent' | 'stats'>('recent')

  // Mock data
  const recentPosts: BlogPost[] = [
    {
      id: '1',
      title: '効果的な筋トレの始め方：初心者向けガイド',
      status: 'PUBLISHED',
      publishedAt: '2024-01-20T10:00:00Z',
      views: 1543,
      slug: 'beginner-strength-training-guide'
    },
    {
      id: '2',
      title: 'プロテインの正しい摂取方法とタイミング',
      status: 'PUBLISHED',
      publishedAt: '2024-01-18T14:00:00Z',
      views: 892,
      slug: 'protein-intake-timing'
    },
    {
      id: '3',
      title: '冬のダイエット特集記事',
      status: 'DRAFT',
      slug: 'winter-diet-special'
    },
    {
      id: '4',
      title: 'ストレッチの効果的な取り入れ方',
      status: 'PUBLISHED',
      publishedAt: '2024-01-15T09:00:00Z',
      views: 567,
      slug: 'effective-stretching-methods'
    }
  ]

  const blogStats = {
    totalPosts: 42,
    publishedPosts: 38,
    draftPosts: 4,
    totalViews: 15420,
    avgViews: 406,
    topPost: {
      title: '効果的な筋トレの始め方',
      views: 1543
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800'
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800'
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return '公開済み'
      case 'DRAFT':
        return '下書き'
      case 'ARCHIVED':
        return 'アーカイブ'
      default:
        return status
    }
  }

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('recent')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'recent'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          最近の記事
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'stats'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          統計
        </button>
      </div>

      {activeTab === 'recent' ? (
        <div className="space-y-4">
          {/* Recent Posts */}
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1 mr-3">
                  {post.title}
                </h4>
                <span
                  className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${getStatusColor(post.status)}`}
                >
                  {getStatusText(post.status)}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                {post.publishedAt ? (
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    未公開
                  </div>
                )}
                
                {post.views && (
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {post.views.toLocaleString()} 回閲覧
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  プレビュー
                </Link>
                <Link
                  href={`/admin/blog/edit/${post.id}`}
                  className="flex items-center px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  編集
                </Link>
              </div>
            </div>
          ))}
          
          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/blog/new"
              className="flex items-center justify-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              新規作成
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center justify-center py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              全て管理
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Blog Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">+4 今月</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">{blogStats.totalPosts}</div>
              <div className="text-sm text-blue-700">総記事数</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-xs text-green-600 font-medium">+12%</span>
              </div>
              <div className="text-2xl font-bold text-green-900">{blogStats.totalViews.toLocaleString()}</div>
              <div className="text-sm text-green-700">総閲覧数</div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">公開記事</span>
              <span className="font-semibold text-green-600">{blogStats.publishedPosts}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">下書き</span>
              <span className="font-semibold text-yellow-600">{blogStats.draftPosts}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">平均閲覧数</span>
              <span className="font-semibold">{blogStats.avgViews}</span>
            </div>
          </div>

          {/* Top Performing Post */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <h4 className="text-sm font-medium text-purple-900 mb-2">
              最も人気の記事
            </h4>
            <div className="text-lg font-semibold text-purple-900 mb-1">
              {blogStats.topPost.title}
            </div>
            <div className="flex items-center text-sm text-purple-700">
              <Eye className="h-4 w-4 mr-1" />
              {blogStats.topPost.views.toLocaleString()} 回閲覧
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">閲覧数推移</h4>
            <div className="h-20 bg-gradient-to-r from-green-200 to-green-300 rounded flex items-end justify-between px-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 bg-green-500 rounded-t"
                  style={{ height: `${Math.random() * 60 + 20}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>7日前</span>
              <span>今日</span>
            </div>
          </div>

          {/* View All */}
          <Link
            href="/admin/blog/analytics"
            className="block text-center py-3 text-blue-600 hover:text-blue-700 font-medium text-sm border border-blue-200 rounded-lg hover:border-blue-300 transition-colors"
          >
            詳細な分析を見る
            <ArrowRight className="inline h-4 w-4 ml-1" />
          </Link>
        </div>
      )}
    </div>
  )
}