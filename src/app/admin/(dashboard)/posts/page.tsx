import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Edit2, Trash2, Plus, ExternalLink } from 'lucide-react';

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

      <div className="border border-neutral-800 rounded-sm overflow-hidden bg-neutral-950/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-900/80 border-b border-neutral-800 font-mono text-xs uppercase tracking-wider text-neutral-400">
              <th className="p-4 font-bold">Title</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-neutral-500 font-mono text-sm">
                  No posts found. Start writing!
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-white font-bold text-sm mb-1">{post.title}</p>
                    <Link href={`/blog/${post.slug}`} target="_blank" className="text-neutral-500 hover:text-orange-500 flex items-center gap-1 text-xs transition-colors">
                      /blog/{post.slug} <ExternalLink size={10} />
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-sm uppercase tracking-wider border ${
                      post.status === 'PUBLISHED' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-400 text-sm font-mono">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/posts/${post.id}/edit`} className="text-neutral-400 hover:text-white transition-colors cursor-pointer"><Edit2 size={16} /></Link>
                      <form action={async () => {
                        'use server';
                        const { deletePostAction } = await import('@/app/admin/crud-actions');
                        await deletePostAction(post.id);
                      }}>
                        <button type="submit" className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"><Trash2 size={16} /></button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
