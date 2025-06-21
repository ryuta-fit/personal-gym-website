import Link from 'next/link'
import { Calendar, MessageCircle, User, BarChart3 } from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      name: '新規予約',
      href: '/booking',
      icon: Calendar,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'セッションを予約'
    },
    {
      name: 'トレーナーに相談',
      href: '/contact',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      description: '質問や相談'
    },
    {
      name: 'プロフィール',
      href: '/dashboard/profile',
      icon: User,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: '設定を変更'
    },
    {
      name: '進捗レポート',
      href: '/dashboard/progress',
      icon: BarChart3,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: '詳細な分析'
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
            <span className="text-sm font-medium">{action.name}</span>
            <span className="text-xs opacity-80 mt-1">{action.description}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}