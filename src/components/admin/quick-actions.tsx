import Link from 'next/link'
import { 
  Calendar, 
  Users, 
  Mail, 
  Settings, 
  TrendingUp,
  MessageSquare,
  Plus,
  Sparkles
} from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      name: '予約管理',
      href: '/admin/bookings',
      icon: Calendar,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: '予約の確認・編集'
    },
    {
      name: 'ユーザー管理',
      href: '/admin/users',
      icon: Users,
      color: 'bg-green-500 hover:bg-green-600',
      description: '顧客情報管理'
    },
    {
      name: 'ブログ投稿',
      href: '/admin/blog/new',
      icon: Plus,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: '新規記事作成'
    },
    {
      name: 'AIブログ生成',
      href: '/admin/blog/generate',
      icon: Sparkles,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      description: 'AIで記事を自動生成'
    },
    {
      name: 'メルマガ配信',
      href: '/admin/newsletter',
      icon: Mail,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'キャンペーン作成'
    },
    {
      name: 'レポート',
      href: '/admin/reports',
      icon: TrendingUp,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: '詳細分析'
    },
    {
      name: 'お問い合わせ',
      href: '/admin/inquiries',
      icon: MessageSquare,
      color: 'bg-pink-500 hover:bg-pink-600',
      description: '顧客からの連絡'
    },
    {
      name: 'トレーナー管理',
      href: '/admin/trainers',
      icon: Users,
      color: 'bg-teal-500 hover:bg-teal-600',
      description: 'スタッフ管理'
    },
    {
      name: 'システム設定',
      href: '/admin/settings',
      icon: Settings,
      color: 'bg-gray-500 hover:bg-gray-600',
      description: '全般設定'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link
          key={action.name}
          href={action.href}
          className={`${action.color} text-white rounded-lg p-4 transition-colors group`}
        >
          <div className="flex flex-col items-center text-center">
            <action.icon className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium mb-1">{action.name}</span>
            <span className="text-xs opacity-80">{action.description}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}