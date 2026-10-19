import { prisma } from '@/lib/prisma';
import MessagesManager from '@/components/admin/MessagesManager';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <MessagesManager initialMessages={messages} />;
}
