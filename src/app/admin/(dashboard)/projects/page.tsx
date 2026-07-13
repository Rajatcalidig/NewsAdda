import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Edit2, Trash2, Plus, Code2, ExternalLink } from 'lucide-react';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Projects</h2>
          <p className="text-neutral-500 font-mono text-xs mt-1">Manage your portfolio showcase</p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-sm px-4 py-2 rounded-sm transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-neutral-800 rounded-sm bg-neutral-950/50">
            <p className="text-neutral-500 font-mono text-sm mb-4">No projects found in the system.</p>
            <Link href="/admin/projects/new" className="text-orange-500 hover:text-orange-400 font-mono text-xs uppercase tracking-widest border-b border-orange-500/30 hover:border-orange-500 transition-colors">Deploy First Project</Link>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="border border-neutral-800 bg-neutral-950/50 rounded-sm overflow-hidden flex flex-col group">
              {project.imageUrl ? (
                <div className="h-40 bg-neutral-900 border-b border-neutral-800 overflow-hidden relative">
                  <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
                </div>
              ) : (
                <div className="h-40 bg-neutral-900 border-b border-neutral-800 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 to-transparent"></div>
                   <span className="text-neutral-600 font-mono text-xs uppercase tracking-widest relative z-10">No Image</span>
                </div>
              )}
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-white text-lg">{project.name}</h3>
                  <div className="flex gap-2 text-neutral-500 items-center">
                    <Link href={`/admin/projects/${project.id}/edit`} className="hover:text-white transition-colors cursor-pointer"><Edit2 size={14} /></Link>
                    <form action={async () => {
                      'use server';
                      const { deleteProjectAction } = await import('@/app/admin/crud-actions');
                      await deleteProjectAction(project.id);
                    }}>
                      <button type="submit" className="hover:text-red-500 transition-colors cursor-pointer"><Trash2 size={14} /></button>
                    </form>
                  </div>
                </div>
                
                <p className="text-neutral-400 text-sm mb-4 line-clamp-2 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] font-mono text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-neutral-800/50">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono">
                      <Code2 size={14} /> Repo
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono">
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
