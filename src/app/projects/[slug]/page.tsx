import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, MonitorPlay, Code2, Calendar } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug: decodeURIComponent(slug) } })
  if (!project) return { title: 'Project Not Found' }
  return { title: `${project.name} | Case Study`, description: project.description }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug: decodeURIComponent(slug) }
  })

  if (!project) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-neutral-950 pb-24">
      {/* Hero Image Section */}
      <div className="w-full h-[40vh] md:h-[60vh] bg-neutral-900 relative overflow-hidden">
        {project.imageUrl && (
          <img 
            src={project.imageUrl} 
            alt={project.name} 
            className="w-full h-full object-cover opacity-60" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-5xl mx-auto flex flex-col justify-end">
          <Link href="/projects" className="text-orange-500 hover:text-orange-400 font-mono text-sm tracking-widest uppercase transition-colors flex items-center gap-2 mb-6 w-max group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> All Projects
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-none">
            {project.name}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 font-light max-w-3xl">
            {project.description}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Main Content Area (Markdown) */}
        <div className="lg:col-span-8 order-2 lg:order-1 prose prose-invert prose-orange max-w-none">
          {project.content ? (
            <ReactMarkdown>{project.content}</ReactMarkdown>
          ) : (
            <div className="p-8 border border-neutral-800 rounded-sm bg-neutral-900/50 text-neutral-500 font-mono text-sm">
              No detailed case study content provided yet.
            </div>
          )}
        </div>

        {/* Sidebar Metadata */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <div className="sticky top-12 border border-neutral-800 rounded-sm bg-neutral-900/30 p-8 flex flex-col gap-8">
            
            <div>
              <p className="text-neutral-500 font-mono text-xs font-bold uppercase tracking-widest mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="bg-neutral-800 text-neutral-300 font-mono text-xs px-3 py-1.5 rounded-sm border border-neutral-700/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-neutral-500 font-mono text-xs font-bold uppercase tracking-widest mb-3">Links</p>
              <div className="flex flex-col gap-3 font-mono text-sm font-bold uppercase">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 flex items-center gap-2 transition-colors border border-orange-500/20 bg-orange-500/5 px-4 py-3 rounded-sm">
                    <MonitorPlay size={16} /> Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white flex items-center gap-2 transition-colors border border-neutral-800 bg-neutral-900 px-4 py-3 rounded-sm">
                    <Code2 size={16} /> Source Code
                  </a>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-800">
               <p className="text-neutral-500 font-mono text-xs flex items-center gap-2">
                 <Calendar size={14} /> Completed {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
               </p>
            </div>

          </div>
        </div>

      </div>
    </article>
  )
}
