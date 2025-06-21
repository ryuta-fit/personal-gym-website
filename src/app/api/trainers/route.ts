import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('active')

    const where: Record<string, unknown> = {}
    
    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    const trainers = await prisma.trainer.findMany({
      where,
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(trainers)
  } catch (error) {
    console.error('Failed to fetch trainers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trainers' },
      { status: 500 }
    )
  }
}