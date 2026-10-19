import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [unreadCount, recentMessages] = await Promise.all([
      prisma.message.count({
        where: { status: 'UNREAD' },
      }),
      prisma.message.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          message: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      unreadCount,
      recentMessages,
    });
  } catch (error: any) {
    console.error('Failed to fetch admin notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications', unreadCount: 0, recentMessages: [] },
      { status: 500 }
    );
  }
}
