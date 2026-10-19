import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  return (
    <ProjectForm
      initialData={{
        id: project.id,
        name: project.name,
        slug: project.slug,
        description: project.description,
        content: project.content,
        techStack: project.techStack,
        imageUrl: project.imageUrl,
        githubLink: project.githubLink,
        liveLink: project.liveLink,
      }}
    />
  );
}
