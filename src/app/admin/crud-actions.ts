'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const status = formData.get('status') as string;

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
    }
  });

  revalidatePath('/admin/posts');
  revalidatePath('/');
  redirect('/admin/posts');
}

export async function createProjectAction(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;
  const techStackString = formData.get('techStack') as string;
  const githubLink = formData.get('githubLink') as string;
  const liveLink = formData.get('liveLink') as string;
  let imageUrl = formData.get('imageUrl') as string;
  const imageFile = formData.get('imageFile') as File | null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = imageFile.type || 'image/jpeg';
    imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
  }

  const techStack = techStackString.split(',').map(s => s.trim()).filter(Boolean);

  await prisma.project.create({
    data: {
      name,
      slug,
      description,
      content: content || null,
      techStack,
      githubLink: githubLink || null,
      liveLink: liveLink || null,
      imageUrl: imageUrl || null,
    }
  });

  revalidatePath('/admin/projects');
  revalidatePath('/');
  revalidatePath('/projects');
  redirect('/admin/projects');
}

export async function updatePostAction(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const status = formData.get('status') as string;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
    }
  });

  revalidatePath('/admin/posts');
  revalidatePath('/');
  redirect('/admin/posts');
}

export async function deletePostAction(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath('/admin/posts');
  revalidatePath('/');
}

export async function updateProjectAction(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;
  const techStackString = formData.get('techStack') as string;
  const githubLink = formData.get('githubLink') as string;
  const liveLink = formData.get('liveLink') as string;
  let imageUrl = formData.get('imageUrl') as string;
  const imageFile = formData.get('imageFile') as File | null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = imageFile.type || 'image/jpeg';
    imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
  }

  const techStack = techStackString.split(',').map(s => s.trim()).filter(Boolean);

  await prisma.project.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      content: content || null,
      techStack,
      githubLink: githubLink || null,
      liveLink: liveLink || null,
      imageUrl: imageUrl || null,
    }
  });

  revalidatePath('/admin/projects');
  revalidatePath('/');
  revalidatePath('/projects');
  redirect('/admin/projects');
}

export async function deleteProjectAction(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath('/admin/projects');
  revalidatePath('/');
  revalidatePath('/projects');
}

export async function saveSettingsAction(formData: FormData) {
  const linkedinUrl = formData.get('linkedinUrl') as string;
  const nowStudyingText = formData.get('nowStudyingText') as string;

  if (linkedinUrl !== null && linkedinUrl !== undefined) {
    await prisma.setting.upsert({
      where: { key: 'linkedinUrl' },
      update: { value: linkedinUrl },
      create: { key: 'linkedinUrl', value: linkedinUrl },
    });
  }

  if (nowStudyingText !== null && nowStudyingText !== undefined) {
    await prisma.setting.upsert({
      where: { key: 'nowStudyingText' },
      update: { value: nowStudyingText },
      create: { key: 'nowStudyingText', value: nowStudyingText },
    });
  }
  
  revalidatePath('/admin/settings');
  revalidatePath('/');
}

export async function saveResumeAction(formData: FormData) {
  const resumeFile = formData.get('resumeFile') as File | null;

  if (resumeFile && resumeFile.size > 0) {
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = resumeFile.type || 'application/pdf';
    const resumeBase64 = `data:${mimeType};base64,${buffer.toString('base64')}`;

    await prisma.setting.upsert({
      where: { key: 'resumeBase64' },
      update: { value: resumeBase64 },
      create: { key: 'resumeBase64', value: resumeBase64 },
    });
  }

  revalidatePath('/admin/resume');
  revalidatePath('/');
}
