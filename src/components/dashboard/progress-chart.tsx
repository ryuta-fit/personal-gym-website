'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface ProgressData {
  date: string
  weight: number
  bodyFat: number
  muscle: number
}

export function ProgressChart() {
  const [activeTab, setActiveTab] = useState<'weight' | 'bodyFat' | 'muscle'>('weight')

  // Mock progress data
  const progressData: ProgressData[] = [
    { date: '2023-11-01', weight: 68.2, bodyFat: 18.5, muscle: 32.1 },
    { date: '2023-11-15', weight: 67.8, bodyFat: 18.0, muscle: 32.3 },
    { date: '2023-12-01', weight: 67.1, bodyFat: 17.2, muscle: 32.8 },
    { date: '2023-12-15', weight: 66.5, bodyFat: 16.8, muscle: 33.2 },
    { date: '2024-01-01', weight: 65.9, bodyFat: 16.2, muscle: 33.7 },
    { date: '2024-01-15', weight: 65.0, bodyFat: 15.5, muscle: 34.1 },
  ]

  const getCurrentValue = () => {
    const latest = progressData[progressData.length - 1]
    switch (activeTab) {
      case 'weight':
        return { value: latest.weight, unit: 'kg', label: '体重' }
      case 'bodyFat':
        return { value: latest.bodyFat, unit: '%', label: '体脂肪率' }
      case 'muscle':
        return { value: latest.muscle, unit: 'kg', label: '筋肉量' }
    }
  }

  const getChange = () => {
    const first = progressData[0]
    const latest = progressData[progressData.length - 1]
    
    let change = 0
    switch (activeTab) {
      case 'weight':
        change = latest.weight - first.weight
        break
      case 'bodyFat':
        change = latest.bodyFat - first.bodyFat
        break
      case 'muscle':
        change = latest.muscle - first.muscle
        break
    }
    
    return change
  }

  const currentValue = getCurrentValue()
  const change = getChange()
  const isPositive = change > 0
  const isNegative = change < 0

  // For weight and body fat, negative change is good
  // For muscle, positive change is good
  const isGoodChange = activeTab === 'muscle' ? isPositive : isNegative

  const getMaxValue = () => {
    return Math.max(...progressData.map(d => {
      switch (activeTab) {
        case 'weight': return d.weight
        case 'bodyFat': return d.bodyFat
        case 'muscle': return d.muscle
      }
    }))
  }

  const getMinValue = () => {
    return Math.min(...progressData.map(d => {
      switch (activeTab) {
        case 'weight': return d.weight
        case 'bodyFat': return d.bodyFat
        case 'muscle': return d.muscle
      }
    }))
  }

  const maxValue = getMaxValue()
  const minValue = getMinValue()
  const range = maxValue - minValue

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('weight')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'weight'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          体重
        </button>
        <button
          onClick={() => setActiveTab('bodyFat')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'bodyFat'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          体脂肪率
        </button>
        <button
          onClick={() => setActiveTab('muscle')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'muscle'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          筋肉量
        </button>
      </div>

      {/* Current Value and Change */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            現在の{currentValue.label}
          </h3>
          <div className="flex items-center">
            {change === 0 ? (
              <Minus className="h-4 w-4 text-gray-500 mr-1" />
            ) : isGoodChange ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                change === 0
                  ? 'text-gray-500'
                  : isGoodChange
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {change > 0 ? '+' : ''}{change.toFixed(1)}{currentValue.unit}
            </span>
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">
          {currentValue.value}{currentValue.unit}
        </div>
      </div>

      {/* Simple Chart */}
      <div className="relative h-32 bg-gray-50 rounded-lg p-4">
        <div className="flex items-end justify-between h-full">
          {progressData.map((data, index) => {
            let value = 0
            switch (activeTab) {
              case 'weight':
                value = data.weight
                break
              case 'bodyFat':
                value = data.bodyFat
                break
              case 'muscle':
                value = data.muscle
                break
            }
            
            const height = range > 0 ? ((value - minValue) / range) * 80 + 10 : 50
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-8 bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${height}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">
                  {new Date(data.date).getMonth() + 1}/{new Date(data.date).getDate()}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-gray-900">
            {progressData.length}
          </div>
          <div className="text-sm text-gray-600">記録数</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900">
            {((progressData.length - 1) * 2)}週間
          </div>
          <div className="text-sm text-gray-600">期間</div>
        </div>
        <div>
          <div className={`text-lg font-semibold ${isGoodChange ? 'text-green-600' : 'text-red-600'}`}>
            {isGoodChange ? '改善中' : '要注意'}
          </div>
          <div className="text-sm text-gray-600">傾向</div>
        </div>
      </div>
    </div>
  )
}