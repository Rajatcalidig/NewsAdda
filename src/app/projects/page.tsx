import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ExternalLink, Code2, MonitorPlay, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Projects | Rajat Tripathi',
  description: 'A complete list of my open-source work and professional projects.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 py-24 bg-neutral-950 min-h-screen">
      
      <div className="mb-12">
        <Link href="/#projects" className="text-neutral-400 hover:text-white font-mono text-sm tracking-widest uppercase transition-colors flex items-center gap-2 mb-8 w-max group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
          All Projects
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl">
          A comprehensive list of my professional work, open-source contributions, and side projects. Built with precision and a focus on AI integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-neutral-800 rounded-sm bg-neutral-900/50">
            <p className="text-neutral-500 font-mono text-sm">No projects currently available.</p>
          </div>
        ) : (
          projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.id} className="group relative block border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900/80 transition-colors rounded-sm overflow-hidden flex flex-col">
              {project.imageUrl ? (
                <div className="h-48 bg-neutral-900 border-b border-neutral-800 overflow-hidden relative">
                  <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-60"></div>
                </div>
              ) : (
                <div className="h-48 bg-neutral-900 border-b border-neutral-800 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 to-transparent group-hover:opacity-20 transition-opacity"></div>
                   <span className="text-neutral-600 font-mono text-xs uppercase tracking-widest relative z-10">No Image Preview</span>
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-white text-xl mb-3">{project.name}</h3>
                <p className="text-neutral-400 text-sm mb-6 flex-1 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] font-mono text-neutral-300 bg-neutral-800 px-2 py-1 rounded-sm border border-neutral-700">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-6 pt-4 border-t border-neutral-800">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider">
                      <MonitorPlay size={16} /> Live
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider">
                      <Code2 size={16} /> Github
                    </a>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
