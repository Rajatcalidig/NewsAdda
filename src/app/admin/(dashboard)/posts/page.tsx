import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import PostsTable from '@/components/admin/PostsTable';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Blog Posts</h2>
          <p className="text-neutral-500 font-mono text-xs mt-1">Manage your technical writing</p>
        </div>
        <Link 
          href="/admin/posts/new"
          className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-sm px-4 py-2 rounded-sm transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      <PostsTable initialPosts={posts} />
    </div>
  );
}
