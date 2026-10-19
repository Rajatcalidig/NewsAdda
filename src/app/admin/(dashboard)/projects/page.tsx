import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProjectsGrid from '@/components/admin/ProjectsGrid';

export const dynamic = 'force-dynamic';

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

      <ProjectsGrid initialProjects={projects} />
    </div>
  );
}
