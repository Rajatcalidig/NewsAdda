import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id }
  });

  if (!post) {
    notFound();
  }

  return (
    <PostForm
      initialData={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        status: post.status,
        content: post.content,
      }}
    />
  );
}
