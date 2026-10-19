import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Code2, ExternalLink } from 'lucide-react';

export const revalidate = 60;

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-50 mb-4">
          Projects
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          A collection of my recent work, open-source projects, and experiments.
        </p>
      </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {(!projects || projects.length === 0) ? (
          <p className="text-slate-500 col-span-2 py-8">No projects added yet.</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="group flex flex-col justify-between bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 md:p-8 hover:border-orange-500/50 hover:bg-neutral-900/80 transition-all min-h-[280px]">
              <div>
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-800/50 text-orange-400">
                  <Code2 size={24} />
                </div>
                <h2 className="text-xl font-bold text-neutral-100 group-hover:text-orange-400 transition-colors mb-3">
                  {project.name}
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>
              
              <div>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="text-xs font-mono font-medium px-2.5 py-1 rounded-sm bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {project.liveLink && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
