'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Mail, 
  Users, 
  Send, 
  Eye, 
  Plus,
  Calendar,
  ArrowRight
} from 'lucide-react'

export function NewsletterStats() {
  const [activeTab, setActiveTab] = useState<'stats' | 'campaigns'>('stats')

  // Mock data
  const stats = {
    totalSubscribers: 234,
    activeSubscribers: 221,
    unsubscribed: 13,
    thisMonthGrowth: 23,
    avgOpenRate: 68.5,
    avgClickRate: 12.3,
    lastCampaignSent: '2024-01-20',
    totalCampaigns: 8
  }

  const recentCampaigns = [
    {
      id: '1',
      title: '新年のトレーニング特集',
      subject: '2024年、理想の体を手に入れよう！',
      sentAt: '2024-01-20T10:00:00Z',
      status: 'SENT',
      recipients: 221,
      openRate: 72.4,
      clickRate: 15.2
    },
    {
      id: '2',
      title: '冬のダイエット特集',
      subject: '冬太り解消！効果的なトレーニング方法',
      sentAt: '2024-01-15T14:00:00Z',
      status: 'SENT',
      recipients: 218,
      openRate: 65.1,
      clickRate: 11.8
    },
    {
      id: '3',
      title: '新サービス案内',
      subject: 'オンラインコーチング開始のお知らせ',
      scheduledAt: '2024-01-30T10:00:00Z',
      status: 'SCHEDULED',
      recipients: 234
    }
  ]

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
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
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'campaigns'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          キャンペーン
        </button>
      </div>

      {activeTab === 'stats' ? (
        <div className="space-y-6">
          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">+{stats.thisMonthGrowth}</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">{stats.totalSubscribers}</div>
              <div className="text-sm text-blue-700">総購読者数</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Eye className="h-5 w-5 text-green-600" />
                <span className="text-xs text-green-600 font-medium">+2.3%</span>
              </div>
              <div className="text-2xl font-bold text-green-900">{stats.avgOpenRate}%</div>
              <div className="text-sm text-green-700">平均開封率</div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">アクティブ購読者</span>
              <span className="font-semibold">{stats.activeSubscribers}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">配信停止者</span>
              <span className="font-semibold text-red-600">{stats.unsubscribed}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">平均クリック率</span>
              <span className="font-semibold">{stats.avgClickRate}%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">総キャンペーン数</span>
              <span className="font-semibold">{stats.totalCampaigns}</span>
            </div>
          </div>

          {/* Growth Chart Placeholder */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">購読者推移</h4>
            <div className="h-20 bg-gradient-to-r from-blue-200 to-blue-300 rounded flex items-end justify-between px-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 bg-blue-500 rounded-t"
                  style={{ height: `${Math.random() * 60 + 20}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>7日前</span>
              <span>今日</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/newsletter/new"
              className="flex items-center justify-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              新規作成
            </Link>
            <Link
              href="/admin/newsletter"
              className="flex items-center justify-center py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              全て見る
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Recent Campaigns */}
          {recentCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                  {campaign.title}
                </h4>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    campaign.status === 'SENT'
                      ? 'bg-green-100 text-green-800'
                      : campaign.status === 'SCHEDULED'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {campaign.status === 'SENT' ? '送信済み' : 
                   campaign.status === 'SCHEDULED' ? '予約済み' : campaign.status}
                </span>
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-1">
                {campaign.subject}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  {campaign.status === 'SENT' ? (
                    <>
                      <Send className="h-3 w-3 mr-1" />
                      {new Date(campaign.sentAt!).toLocaleDateString('ja-JP')}
                    </>
                  ) : (
                    <>
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(campaign.scheduledAt!).toLocaleDateString('ja-JP')}
                    </>
                  )}
                </div>
                <div>
                  {campaign.recipients} 宛
                </div>
              </div>
              
              {campaign.status === 'SENT' && (
                <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {campaign.openRate}%
                    </div>
                    <div className="text-xs text-gray-500">開封率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">
                      {campaign.clickRate}%
                    </div>
                    <div className="text-xs text-gray-500">クリック率</div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* View All */}
          <Link
            href="/admin/newsletter"
            className="block text-center py-3 text-blue-600 hover:text-blue-700 font-medium text-sm border border-blue-200 rounded-lg hover:border-blue-300 transition-colors"
          >
            すべてのキャンペーンを見る
            <ArrowRight className="inline h-4 w-4 ml-1" />
          </Link>
        </div>
      )}
    </div>
  )
}