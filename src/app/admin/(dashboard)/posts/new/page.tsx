import { ChevronLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { createPostAction } from '../../../crud-actions';

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-24">
      <div className="flex items-center gap-4">
        <Link href="/admin/posts" className="p-2 border border-neutral-800 rounded-sm hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-white">
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Create New Post</h2>
          <p className="text-neutral-500 font-mono text-xs mt-1">Draft a new article for your blog</p>
        </div>
      </div>

      <form action={createPostAction} className="flex flex-col gap-6">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-8 flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Post Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required
              placeholder="e.g. Building an AI agent with Next.js"
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-sans"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">URL Slug</label>
            <input 
              type="text" 
              id="slug" 
              name="slug" 
              required
              placeholder="e.g. building-ai-agent-nextjs"
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Status</label>
            <select 
              id="status" 
              name="status" 
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
            >
              <option value="DRAFT">Draft (Hidden)</option>
              <option value="PUBLISHED">Published (Public)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Content (Markdown)</label>
            <textarea 
              id="content" 
              name="content" 
              required
              rows={15}
              placeholder="Write your post content here..."
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-4 text-neutral-300 focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm resize-y"
            ></textarea>
          </div>

        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-sm px-6 py-3 rounded-sm transition-colors cursor-pointer flex items-center gap-2">
            <Save size={18} /> Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}
