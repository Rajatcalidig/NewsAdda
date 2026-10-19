'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit2, Trash2, Code2, ExternalLink } from 'lucide-react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { deleteProjectAction } from '@/app/admin/crud-actions';
import { useRouter } from 'next/navigation';

interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  githubLink: string | null;
  liveLink: string | null;
  createdAt: string | Date;
}

export default function ProjectsGrid({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteConfirm = async () => {
    if (!selectedProject) return;
    setIsDeleting(true);
    setErrorMsg(null);
    try {
      const res = await deleteProjectAction(selectedProject.id);
      if (res && res.error) {
        setErrorMsg(res.error);
        setIsDeleting(false);
        return;
      }
      setProjects(prev => prev.filter(p => p.id !== selectedProject.id));
      setSelectedProject(null);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete project');
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-neutral-800 rounded-sm bg-neutral-950/50">
            <p className="text-neutral-500 font-mono text-sm mb-4">No projects found in the system.</p>
            <Link 
              href="/admin/projects/new" 
              className="text-orange-500 hover:text-orange-400 font-mono text-xs uppercase tracking-widest border-b border-orange-500/30 hover:border-orange-500 transition-colors"
            >
              Deploy First Project
            </Link>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="border border-neutral-800 bg-neutral-950/50 rounded-sm overflow-hidden flex flex-col group hover:border-neutral-700 transition-colors">
              {project.imageUrl ? (
                <div className="h-44 bg-neutral-900 border-b border-neutral-800 overflow-hidden relative">
                  <img 
                    src={project.imageUrl} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
                </div>
              ) : (
                <div className="h-44 bg-neutral-900 border-b border-neutral-800 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 to-transparent"></div>
                  <span className="text-neutral-600 font-mono text-xs uppercase tracking-widest relative z-10">No Image</span>
                </div>
              )}
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-bold text-white text-lg leading-tight">{project.name}</h3>
                  <div className="flex gap-2 text-neutral-500 items-center shrink-0">
                    <Link 
                      href={`/admin/projects/${project.id}/edit`} 
                      className="hover:text-white transition-colors cursor-pointer p-1"
                      title="Edit project"
                    >
                      <Edit2 size={15} />
                    </Link>
                    <button 
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="hover:text-red-500 transition-colors cursor-pointer p-1"
                      title="Delete project"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                
                <p className="text-neutral-400 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] font-mono text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/60 mt-auto">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
                    >
                      <Code2 size={14} /> Repo
                    </a>
                  )}
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={!!selectedProject}
        title="Delete Project"
        itemName={selectedProject?.name}
        message={selectedProject ? `Are you sure you want to permanently delete the project "${selectedProject.name}"? This cannot be undone.` : undefined}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelectedProject(null)}
      />
    </>
  );
}
