'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { User, Edit, Phone, Mail, Calendar } from 'lucide-react'

export function UserProfile() {
  const { data: session } = useSession()

  if (!session?.user) {
    return <div>プロフィール情報を読み込めませんでした</div>
  }

  // Mock additional user data - in a real app, this would come from the database
  const userProfile = {
    ...session.user,
    phone: '+81-90-1234-5678',
    joinedAt: '2023-10-15',
    membershipType: 'プレミアム',
    goals: ['体重減少', '筋力アップ', '健康維持'],
    currentWeight: '65kg',
    targetWeight: '60kg',
    height: '170cm'
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {userProfile.image ? (
            <Image
              src={userProfile.image}
              alt="プロフィール画像"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <User className="h-10 w-10 text-blue-600" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {userProfile.name || 'ユーザー'}
        </h3>
        <p className="text-sm text-gray-600">{userProfile.membershipType}メンバー</p>
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 text-gray-400 mr-3" />
          <span className="text-gray-600">{userProfile.email}</span>
        </div>
        
        {userProfile.phone && (
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 text-gray-400 mr-3" />
            <span className="text-gray-600">{userProfile.phone}</span>
          </div>
        )}
        
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 text-gray-400 mr-3" />
          <span className="text-gray-600">
            {new Date(userProfile.joinedAt).toLocaleDateString('ja-JP')} 入会
          </span>
        </div>
      </div>

      {/* Body Stats */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">体型データ</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">身長</span>
            <p className="font-medium">{userProfile.height}</p>
          </div>
          <div>
            <span className="text-gray-600">現在の体重</span>
            <p className="font-medium">{userProfile.currentWeight}</p>
          </div>
          <div>
            <span className="text-gray-600">目標体重</span>
            <p className="font-medium text-blue-600">{userProfile.targetWeight}</p>
          </div>
          <div>
            <span className="text-gray-600">BMI</span>
            <p className="font-medium">22.5</p>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">目標</h4>
        <div className="flex flex-wrap gap-2">
          {userProfile.goals.map((goal, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {goal}
            </span>
          ))}
        </div>
      </div>

      {/* Edit Profile Button */}
      <Link
        href="/dashboard/profile"
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
      >
        <Edit className="h-4 w-4 mr-2" />
        プロフィール編集
      </Link>
    </div>
  )
}