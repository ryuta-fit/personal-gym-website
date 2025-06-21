import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createBookingSchema = z.object({
  trainerId: z.string().min(1, 'Trainer is required'),
  startTime: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid start time'),
  endTime: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid end time'),
  notes: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const trainerId = searchParams.get('trainerId')
    const date = searchParams.get('date')
    const status = searchParams.get('status')

    const where: Record<string, unknown> = {}
    
    if (session.user.role === 'CUSTOMER') {
      where.userId = session.user.id
    }
    
    if (trainerId) {
      where.trainerId = trainerId
    }
    
    if (date) {
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)
      
      where.startTime = {
        gte: startOfDay,
        lte: endOfDay
      }
    }
    
    if (status) {
      where.status = status.toUpperCase()
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        trainer: {
          select: {
            id: true,
            name: true,
            email: true,
            specialties: true
          }
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { trainerId, startTime, endTime, notes } = createBookingSchema.parse(body)

    const startDateTime = new Date(startTime)
    const endDateTime = new Date(endTime)

    // Validation: End time must be after start time
    if (endDateTime <= startDateTime) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      )
    }

    // Validation: Booking cannot be in the past
    if (startDateTime < new Date()) {
      return NextResponse.json(
        { error: 'Cannot book sessions in the past' },
        { status: 400 }
      )
    }

    // Check if trainer exists
    const trainer = await prisma.trainer.findUnique({
      where: { id: trainerId }
    })

    if (!trainer || !trainer.isActive) {
      return NextResponse.json(
        { error: 'Trainer not found or inactive' },
        { status: 404 }
      )
    }

    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        trainerId,
        status: {
          in: ['PENDING', 'CONFIRMED']
        },
        OR: [
          {
            startTime: {
              lt: endDateTime
            },
            endTime: {
              gt: startDateTime
            }
          }
        ]
      }
    })

    if (overlappingBooking) {
      return NextResponse.json(
        { error: 'Time slot is already booked' },
        { status: 409 }
      )
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        trainerId,
        startTime: startDateTime,
        endTime: endDateTime,
        notes,
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        trainer: {
          select: {
            id: true,
            name: true,
            email: true,
            specialties: true
          }
        }
      }
    })

    return NextResponse.json(booking)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Failed to create booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}