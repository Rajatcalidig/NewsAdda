'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';

// ==========================================
// POST ACTIONS
// ==========================================

export async function createPostAction(formData: FormData) {
  const title = (formData.get('title') as string)?.trim();
  const slug = (formData.get('slug') as string)?.trim().toLowerCase();
  const content = (formData.get('content') as string)?.trim();
  const status = formData.get('status') as string;

  if (!title || !slug || !content) {
    return { error: 'Title, URL slug, and content are required.' };
  }

  // Check slug uniqueness
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return { error: `A post with slug "${slug}" already exists. Please choose a unique slug.` };
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
    }
  });

  revalidatePath('/admin/posts');
  revalidatePath('/blog');
  revalidatePath('/');
  redirect('/admin/posts');
}

export async function updatePostAction(id: string, formData: FormData) {
  const title = (formData.get('title') as string)?.trim();
  const slug = (formData.get('slug') as string)?.trim().toLowerCase();
  const content = (formData.get('content') as string)?.trim();
  const status = formData.get('status') as string;

  if (!title || !slug || !content) {
    return { error: 'Title, slug, and content are required.' };
  }

  // Check slug collision with other post
  const existing = await prisma.post.findFirst({
    where: {
      slug,
      NOT: { id },
    },
  });
  if (existing) {
    return { error: `Slug "${slug}" is already used by another post.` };
  }

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
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  revalidatePath('/');
  redirect('/admin/posts');
}

export async function deletePostAction(id: string) {
  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath('/admin/posts');
    revalidatePath('/blog');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('deletePostAction error:', error);
    return { error: error.message || 'Failed to delete post' };
  }
}

// ==========================================
// PROJECT ACTIONS
// ==========================================

export async function createProjectAction(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const slug = (formData.get('slug') as string)?.trim().toLowerCase();
  const description = (formData.get('description') as string)?.trim();
  const content = (formData.get('content') as string)?.trim();
  const techStackString = (formData.get('techStack') as string)?.trim();
  const githubLink = (formData.get('githubLink') as string)?.trim();
  const liveLink = (formData.get('liveLink') as string)?.trim();
  let imageUrl = (formData.get('imageUrl') as string)?.trim();
  const imageFile = formData.get('imageFile') as File | null;

  if (!name || !slug || !description) {
    return { error: 'Project name, slug, and description are required.' };
  }

  // Check slug uniqueness
  const existing = await prisma.project.findUnique({ where: { slug } });
  if (existing) {
    return { error: `A project with slug "${slug}" already exists. Please choose a unique slug.` };
  }

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = imageFile.type || 'image/jpeg';
    imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
  }

  const techStack = techStackString
    ? techStackString.split(',').map(s => s.trim()).filter(Boolean)
    : [];

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
  revalidatePath('/projects');
  revalidatePath('/');
  redirect('/admin/projects');
}

export async function updateProjectAction(id: string, formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const slug = (formData.get('slug') as string)?.trim().toLowerCase();
  const description = (formData.get('description') as string)?.trim();
  const content = (formData.get('content') as string)?.trim();
  const techStackString = (formData.get('techStack') as string)?.trim();
  const githubLink = (formData.get('githubLink') as string)?.trim();
  const liveLink = (formData.get('liveLink') as string)?.trim();
  let imageUrl = (formData.get('imageUrl') as string)?.trim();
  const imageFile = formData.get('imageFile') as File | null;

  if (!name || !slug || !description) {
    return { error: 'Project name, slug, and description are required.' };
  }

  const existing = await prisma.project.findFirst({
    where: {
      slug,
      NOT: { id },
    },
  });
  if (existing) {
    return { error: `Slug "${slug}" is already in use by another project.` };
  }

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = imageFile.type || 'image/jpeg';
    imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
  }

  const techStack = techStackString
    ? techStackString.split(',').map(s => s.trim()).filter(Boolean)
    : [];

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
      ...(imageUrl ? { imageUrl } : {}),
    }
  });

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath(`/projects/${slug}`);
  revalidatePath('/');
  redirect('/admin/projects');
}

export async function deleteProjectAction(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('deleteProjectAction error:', error);
    return { error: error.message || 'Failed to delete project' };
  }
}

// ==========================================
// MESSAGE ACTIONS
// ==========================================

export async function markMessageReadAction(id: string, status: 'READ' | 'UNREAD' = 'READ') {
  try {
    await prisma.message.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('markMessageReadAction error:', error);
    return { error: error.message };
  }
}

export async function deleteMessageAction(id: string) {
  try {
    await prisma.message.delete({ where: { id } });
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('deleteMessageAction error:', error);
    return { error: error.message };
  }
}

// ==========================================
// JOB APPLICATION ACTIONS
// ==========================================

export async function createJobAction(formData: FormData) {
  const company = (formData.get('company') as string)?.trim();
  const role = (formData.get('role') as string)?.trim();
  const status = (formData.get('status') as string) || 'APPLIED';
  const appliedDateStr = formData.get('appliedDate') as string;
  const notes = (formData.get('notes') as string)?.trim();

  if (!company || !role) {
    return { error: 'Company and Role are required.' };
  }

  const validStatuses = ['APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED'] as const;
  const jobStatus = validStatuses.includes(status as any) ? (status as any) : 'APPLIED';

  await prisma.jobApplication.create({
    data: {
      company,
      role,
      status: jobStatus,
      appliedDate: appliedDateStr ? new Date(appliedDateStr) : new Date(),
      notes: notes || null,
    },
  });

  revalidatePath('/admin/jobs');
  revalidatePath('/admin');
  return { success: true };
}

export async function updateJobAction(id: string, formData: FormData) {
  const company = (formData.get('company') as string)?.trim();
  const role = (formData.get('role') as string)?.trim();
  const status = (formData.get('status') as string) || 'APPLIED';
  const appliedDateStr = formData.get('appliedDate') as string;
  const notes = (formData.get('notes') as string)?.trim();

  if (!company || !role) {
    return { error: 'Company and Role are required.' };
  }

  const validStatuses = ['APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED'] as const;
  const jobStatus = validStatuses.includes(status as any) ? (status as any) : 'APPLIED';

  await prisma.jobApplication.update({
    where: { id },
    data: {
      company,
      role,
      status: jobStatus,
      appliedDate: appliedDateStr ? new Date(appliedDateStr) : new Date(),
      notes: notes || null,
    },
  });

  revalidatePath('/admin/jobs');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteJobAction(id: string) {
  try {
    await prisma.jobApplication.delete({ where: { id } });
    revalidatePath('/admin/jobs');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('deleteJobAction error:', error);
    return { error: error.message };
  }
}

// ==========================================
// SETTINGS & RESUME ACTIONS
// ==========================================

export async function saveSettingsAction(formData: FormData) {
  const linkedinUrl = formData.get('linkedinUrl') as string;
  const nowStudyingText = formData.get('nowStudyingText') as string;
  const whatsappNumber = formData.get('whatsappNumber') as string;

  if (linkedinUrl !== null && linkedinUrl !== undefined) {
    await prisma.setting.upsert({
      where: { key: 'linkedinUrl' },
      update: { value: linkedinUrl.trim() },
      create: { key: 'linkedinUrl', value: linkedinUrl.trim() },
    });
  }

  if (nowStudyingText !== null && nowStudyingText !== undefined) {
    await prisma.setting.upsert({
      where: { key: 'nowStudyingText' },
      update: { value: nowStudyingText.trim() },
      create: { key: 'nowStudyingText', value: nowStudyingText.trim() },
    });
  }

  if (whatsappNumber !== null && whatsappNumber !== undefined) {
    await prisma.setting.upsert({
      where: { key: 'whatsappNumber' },
      update: { value: whatsappNumber.trim() },
      create: { key: 'whatsappNumber', value: whatsappNumber.trim() },
    });
  }

  revalidatePath('/admin/settings');
  revalidatePath('/');
  return { success: true };
}

export async function saveResumeAction(formData: FormData) {
  const resumeFile = formData.get('resumeFile') as File | null;

  if (!resumeFile || resumeFile.size === 0) {
    return { error: 'Please select a valid PDF file to upload.' };
  }

  const bytes = await resumeFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const mimeType = resumeFile.type || 'application/pdf';
  const resumeBase64 = `data:${mimeType};base64,${buffer.toString('base64')}`;

  // Store in database Setting table
  await prisma.setting.upsert({
    where: { key: 'resumeBase64' },
    update: { value: resumeBase64 },
    create: { key: 'resumeBase64', value: resumeBase64 },
  });

  // Store updated timestamp
  await prisma.setting.upsert({
    where: { key: 'resumeUpdatedAt' },
    update: { value: new Date().toISOString() },
    create: { key: 'resumeUpdatedAt', value: new Date().toISOString() },
  });

  // Also write to public folder for direct static downloading
  try {
    const publicPath = path.join(process.cwd(), 'public', 'Rajat_Resume.pdf');
    fs.writeFileSync(publicPath, buffer);
  } catch (fsErr) {
    console.warn('Could not write public/Rajat_Resume.pdf:', fsErr);
  }

  revalidatePath('/admin/resume');
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function deleteResumeAction() {
  await prisma.setting.deleteMany({
    where: {
      key: { in: ['resumeBase64', 'resumeUpdatedAt'] }
    }
  });

  try {
    const publicPath = path.join(process.cwd(), 'public', 'Rajat_Resume.pdf');
    if (fs.existsSync(publicPath)) {
      fs.unlinkSync(publicPath);
    }
  } catch (e) {}

  revalidatePath('/admin/resume');
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}
