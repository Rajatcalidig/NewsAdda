'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { deletePostAction } from '@/app/admin/crud-actions';
import { useRouter } from 'next/navigation';

interface PostItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string | Date;
}

export default function PostsTable({ initialPosts }: { initialPosts: PostItem[] }) {
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteConfirm = async () => {
    if (!selectedPost) return;
    setIsDeleting(true);
    setErrorMsg(null);
    try {
      const res = await deletePostAction(selectedPost.id);
      if (res && res.error) {
        setErrorMsg(res.error);
        setIsDeleting(false);
        return;
      }
      setPosts(prev => prev.filter(p => p.id !== selectedPost.id));
      setSelectedPost(null);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {errorMsg && (
        <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs rounded-sm mb-4">
          {errorMsg}
        </div>
      )}

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
                    <Link 
                      href={`/blog/${post.slug}`} 
                      target="_blank" 
                      className="text-neutral-500 hover:text-orange-500 inline-flex items-center gap-1 text-xs transition-colors font-mono"
                    >
                      /blog/{post.slug} <ExternalLink size={11} />
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-sm uppercase tracking-wider border ${
                      post.status === 'PUBLISHED' 
                        ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' 
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-400 text-sm font-mono">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/admin/posts/${post.id}/edit`} 
                        className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                        title="Edit post"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button 
                        type="button"
                        onClick={() => setSelectedPost(post)}
                        className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer p-1"
                        title="Delete post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteModal
        isOpen={!!selectedPost}
        title="Delete Blog Post"
        itemName={selectedPost?.title}
        message={selectedPost ? `Are you sure you want to permanently delete the post "${selectedPost.title}"? This cannot be undone.` : undefined}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelectedPost(null)}
      />
    </>
  );
}
