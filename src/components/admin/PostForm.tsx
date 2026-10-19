'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Trash2, Eye, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { createPostAction, updatePostAction, deletePostAction } from '@/app/admin/crud-actions';

interface PostFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    status: string;
    content: string;
  };
}

// Slug generator helper
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

export default function PostForm({ initialData }: PostFormProps) {
  const isEditing = !!initialData;
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(isEditing);
  const [status, setStatus] = useState(initialData?.status || 'PUBLISHED');
  const [content, setContent] = useState(initialData?.content || '');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isSlugManuallyEdited) {
      setSlug(slugify(newTitle));
    }
  };

  const handleSlugChange = (newSlug: string) => {
    setSlug(slugify(newSlug));
    setIsSlugManuallyEdited(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanTitle = title.trim();
    const cleanSlug = slug.trim();
    const cleanContent = content.trim();

    if (!cleanTitle) {
      setErrorMessage('Post title is required.');
      return;
    }
    if (!cleanSlug) {
      setErrorMessage('A URL slug is required.');
      return;
    }
    if (!cleanContent) {
      setErrorMessage('Post content cannot be empty.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', cleanTitle);
    formData.append('slug', cleanSlug);
    formData.append('status', status);
    formData.append('content', cleanContent);

    try {
      if (isEditing && initialData) {
        const res = await updatePostAction(initialData.id, formData);
        if (res && res.error) {
          setErrorMessage(res.error);
          setIsSubmitting(false);
          return;
        }
      } else {
        const res = await createPostAction(formData);
        if (res && res.error) {
          setErrorMessage(res.error);
          setIsSubmitting(false);
          return;
        }
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      // Note: Next.js redirect throws a special internal error. If that happens, navigation already occurred.
      if (err?.digest?.startsWith('NEXT_REDIRECT') || err?.message?.includes('NEXT_REDIRECT')) {
        return;
      }
      setErrorMessage(err.message || 'Failed to save post.');
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;
    setIsDeleting(true);
    setErrorMessage(null);
    try {
      const res = await deletePostAction(initialData.id);
      if (res && res.error) {
        setErrorMessage(res.error);
        setIsDeleting(false);
        return;
      }
      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to delete post.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="p-2 border border-neutral-800 rounded-sm hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-white"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isEditing ? 'Edit Blog Post' : 'Create New Post'}
            </h2>
            <p className="text-neutral-500 font-mono text-xs mt-1">
              {isEditing ? 'Update your technical article' : 'Write and publish a new article for your engineering blog'}
            </p>
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={() => setIsConfirmDeleteOpen(true)}
            className="text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 bg-red-500/10 font-mono text-xs px-3.5 py-2 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 size={14} /> Delete Post
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs rounded-sm flex items-start gap-2.5">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Error saving post</p>
            <p className="mt-0.5 opacity-90">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-8 flex flex-col gap-6">
          {/* Post Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              placeholder="e.g. Scaling Real-Time AI Workflows with Next.js & WebSockets"
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-sans text-base"
            />
          </div>

          {/* Slug input with auto-sync */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="slug" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
                URL Slug *
              </label>
              {!isSlugManuallyEdited ? (
                <span className="text-[10px] font-mono text-orange-400/80 flex items-center gap-1">
                  <Sparkles size={11} /> Auto-generating from title
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsSlugManuallyEdited(false);
                    setSlug(slugify(title));
                  }}
                  className="text-[10px] font-mono text-neutral-500 hover:text-orange-400 transition-colors"
                >
                  Reset to auto-slug
                </button>
              )}
            </div>
            <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-sm overflow-hidden focus-within:border-orange-500/50 transition-colors">
              <span className="px-3 py-3 text-neutral-600 font-mono text-xs bg-neutral-900/50 border-r border-neutral-800 select-none">
                /blog/
              </span>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                required
                placeholder="my-awesome-post"
                className="bg-transparent px-3 py-3 text-white focus:outline-none font-mono text-sm flex-1"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
              Publishing Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm cursor-pointer"
            >
              <option value="PUBLISHED">Published (Visible to all visitors)</option>
              <option value="DRAFT">Draft (Hidden)</option>
            </select>
          </div>

          {/* Content (Markdown) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="content" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
                Article Content (Markdown) *
              </label>
              <span className="text-[10px] font-mono text-neutral-500">
                Supports headings (##), code blocks (```), tables, and quotes
              </span>
            </div>
            <textarea
              id="content"
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Write your article in Markdown...&#10;&#10;## Introduction&#10;In this article we will explore...&#10;&#10;```typescript&#10;const agent = new Agent();&#10;```"
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-4 text-neutral-300 focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm leading-relaxed resize-y"
            ></textarea>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/admin/posts"
            className="text-xs font-mono text-neutral-500 hover:text-white transition-colors"
          >
            ← Cancel and return
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-neutral-950 font-mono font-bold text-sm px-7 py-3 rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/10"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-neutral-950/20 border-t-neutral-950 rounded-full animate-spin"></span>
                Saving Post...
              </>
            ) : (
              <>
                <Save size={18} /> {isEditing ? 'Update Post' : 'Publish Post'}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {isEditing && (
        <ConfirmDeleteModal
          isOpen={isConfirmDeleteOpen}
          title="Delete Blog Post"
          itemName={title}
          message={`Are you sure you want to permanently delete the post "${title}"?`}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setIsConfirmDeleteOpen(false)}
        />
      )}
    </div>
  );
}
