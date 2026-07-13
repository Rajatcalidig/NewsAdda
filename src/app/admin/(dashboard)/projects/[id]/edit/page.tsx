import { ChevronLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { updateProjectAction } from '../../../../crud-actions';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProjectAction.bind(null, project.id);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-24">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 border border-neutral-800 rounded-sm hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-white">
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Edit Project</h2>
          <p className="text-neutral-500 font-mono text-xs mt-1">Update your portfolio piece</p>
        </div>
      </div>

      <form action={updateProjectWithId} className="flex flex-col gap-6" encType="multipart/form-data">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-8 flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Project Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required
              defaultValue={project.name}
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
              defaultValue={project.slug}
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Description (Short)</label>
            <textarea 
              id="description" 
              name="description" 
              required
              rows={3}
              defaultValue={project.description}
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-4 text-neutral-300 focus:outline-none focus:border-orange-500/50 transition-colors text-sm resize-y"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Case Study Content (Markdown)</label>
            <textarea 
              id="content" 
              name="content" 
              rows={10}
              defaultValue={project.content || ''}
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-4 text-neutral-300 focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm resize-y"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="techStack" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Tech Stack (comma separated)</label>
            <input 
              type="text" 
              id="techStack" 
              name="techStack" 
              required
              defaultValue={project.techStack.join(', ')}
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="imageFile" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Upload Banner Image</label>
              <input 
                type="file" 
                id="imageFile" 
                name="imageFile" 
                accept="image/*"
                className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-mono file:font-bold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="imageUrl" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">OR Image URL (Optional)</label>
              <input 
                type="url" 
                id="imageUrl" 
                name="imageUrl" 
                defaultValue={project.imageUrl || ''}
                placeholder="https://images.unsplash.com/..."
                className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="githubLink" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Github Link (Optional)</label>
              <input 
                type="url" 
                id="githubLink" 
                name="githubLink" 
                defaultValue={project.githubLink || ''}
                className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="liveLink" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Live Link (Optional)</label>
              <input 
                type="url" 
                id="liveLink" 
                name="liveLink" 
                defaultValue={project.liveLink || ''}
                className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
              />
            </div>
          </div>

        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-sm px-6 py-3 rounded-sm transition-colors cursor-pointer flex items-center gap-2">
            <Save size={18} /> Update Project
          </button>
        </div>
      </form>
    </div>
  );
}
