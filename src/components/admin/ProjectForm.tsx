'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Trash2, Sparkles, UploadCloud, AlertCircle, Plus, X } from 'lucide-react';
import Link from 'next/link';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { createProjectAction, updateProjectAction, deleteProjectAction } from '@/app/admin/crud-actions';

interface ProjectFormProps {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    content?: string | null;
    techStack: string[];
    imageUrl?: string | null;
    githubLink?: string | null;
    liveLink?: string | null;
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

const COMMON_TAGS = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 
  'Prisma', 'TailwindCSS', 'Python', 'FastAPI', 'LangChain', 'Docker'
];

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const isEditing = !!initialData;
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(isEditing);
  const [description, setDescription] = useState(initialData?.description || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [techStack, setTechStack] = useState<string[]>(initialData?.techStack || ['Next.js', 'TypeScript']);
  const [tagInput, setTagInput] = useState('');
  
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  
  const [githubLink, setGithubLink] = useState(initialData?.githubLink || '');
  const [liveLink, setLiveLink] = useState(initialData?.liveLink || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNameChange = (newName: string) => {
    setName(newName);
    if (!isSlugManuallyEdited) {
      setSlug(slugify(newName));
    }
  };

  const handleSlugChange = (newSlug: string) => {
    setSlug(slugify(newSlug));
    setIsSlugManuallyEdited(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim();
    if (trimmed && !techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed]);
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setTechStack(techStack.filter(t => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = name.trim();
    const cleanSlug = slug.trim();
    const cleanDesc = description.trim();

    if (!cleanName) {
      setErrorMessage('Project name is required.');
      return;
    }
    if (!cleanSlug) {
      setErrorMessage('A URL slug is required.');
      return;
    }
    if (!cleanDesc) {
      setErrorMessage('A short project description is required.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', cleanName);
    formData.append('slug', cleanSlug);
    formData.append('description', cleanDesc);
    formData.append('content', content.trim());
    formData.append('techStack', techStack.join(', '));
    if (imageFile) {
      formData.append('imageFile', imageFile);
    } else if (imageUrl.trim()) {
      formData.append('imageUrl', imageUrl.trim());
    }
    if (githubLink.trim()) formData.append('githubLink', githubLink.trim());
    if (liveLink.trim()) formData.append('liveLink', liveLink.trim());

    try {
      if (isEditing && initialData) {
        const res = await updateProjectAction(initialData.id, formData);
        if (res && res.error) {
          setErrorMessage(res.error);
          setIsSubmitting(false);
          return;
        }
      } else {
        const res = await createProjectAction(formData);
        if (res && res.error) {
          setErrorMessage(res.error);
          setIsSubmitting(false);
          return;
        }
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      if (err?.digest?.startsWith('NEXT_REDIRECT') || err?.message?.includes('NEXT_REDIRECT')) {
        return;
      }
      setErrorMessage(err.message || 'Failed to save project.');
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;
    setIsDeleting(true);
    setErrorMessage(null);
    try {
      const res = await deleteProjectAction(initialData.id);
      if (res && res.error) {
        setErrorMessage(res.error);
        setIsDeleting(false);
        return;
      }
      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to delete project.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2 border border-neutral-800 rounded-sm hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-white"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isEditing ? 'Edit Project' : 'Create New Project'}
            </h2>
            <p className="text-neutral-500 font-mono text-xs mt-1">
              {isEditing ? 'Update portfolio showcase entry' : 'Showcase your engineering project in your portfolio'}
            </p>
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={() => setIsConfirmDeleteOpen(true)}
            className="text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 bg-red-500/10 font-mono text-xs px-3.5 py-2 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 size={14} /> Delete Project
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs rounded-sm flex items-start gap-2.5">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Error saving project</p>
            <p className="mt-0.5 opacity-90">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-8 flex flex-col gap-6">
          {/* Project Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
              Project Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              placeholder="e.g. My Buddy Mobile App"
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-sans text-base"
            />
          </div>

          {/* URL Slug */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="slug" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
                URL Slug *
              </label>
              {!isSlugManuallyEdited ? (
                <span className="text-[10px] font-mono text-orange-400/80 flex items-center gap-1">
                  <Sparkles size={11} /> Auto-generating from name
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsSlugManuallyEdited(false);
                    setSlug(slugify(name));
                  }}
                  className="text-[10px] font-mono text-neutral-500 hover:text-orange-400 transition-colors"
                >
                  Reset to auto-slug
                </button>
              )}
            </div>
            <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-sm overflow-hidden focus-within:border-orange-500/50 transition-colors">
              <span className="px-3 py-3 text-neutral-600 font-mono text-xs bg-neutral-900/50 border-r border-neutral-800 select-none">
                /projects/
              </span>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                required
                placeholder="my-buddy-mobile-app"
                className="bg-transparent px-3 py-3 text-white focus:outline-none font-mono text-sm flex-1"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
              Short Description (Card Summary) *
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Brief summary of the application, architecture, and problem solved..."
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-neutral-300 focus:outline-none focus:border-orange-500/50 transition-colors text-sm resize-y font-sans"
            ></textarea>
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
              Tech Stack Technologies
            </label>
            <div className="flex flex-wrap gap-2 mb-2 p-3 bg-neutral-950 border border-neutral-800 rounded-sm min-h-[46px] items-center">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-1 rounded-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTag(tech)}
                    className="text-neutral-500 hover:text-red-400"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder={techStack.length === 0 ? "Type tech and hit Enter..." : "Add tech..."}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    addTag(tagInput);
                  }
                }}
                className="bg-transparent text-xs text-white font-mono focus:outline-none flex-1 min-w-[120px] p-1"
              />
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] font-mono text-neutral-500">Suggestions:</span>
              {COMMON_TAGS.filter(t => !techStack.includes(t)).slice(0, 7).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => addTag(t)}
                  className="text-[10px] font-mono bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white px-2 py-0.5 rounded-sm border border-neutral-800 transition-colors"
                >
                  + {t}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload / URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="flex flex-col gap-2">
              <label className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
                Upload Banner Image
              </label>
              <div className="border border-dashed border-neutral-700 hover:border-orange-500/50 rounded-sm p-4 text-center transition-colors bg-neutral-950 flex flex-col items-center justify-center min-h-[110px]">
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="imageFile" className="cursor-pointer flex flex-col items-center gap-2 w-full">
                  <UploadCloud size={24} className="text-neutral-500" />
                  <span className="text-xs font-mono text-neutral-400">
                    {imageFile ? imageFile.name : 'Click to select project banner image'}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="imageUrl" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
                OR Paste Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  if (!imageFile) setImagePreview(e.target.value);
                }}
                placeholder="https://images.unsplash.com/..."
                className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-xs"
              />

              {imagePreview && (
                <div className="mt-2 h-20 w-full rounded-sm border border-neutral-800 overflow-hidden relative bg-neutral-900">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Links: GitHub & Live */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="githubLink" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
                GitHub Repository URL
              </label>
              <input
                type="url"
                id="githubLink"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                placeholder="https://github.com/rajattripathi/..."
                className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="liveLink" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
                Live Demo / Website URL
              </label>
              <input
                type="url"
                id="liveLink"
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
                placeholder="https://mybuddy.calidig.com"
                className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-xs"
              />
            </div>
          </div>

          {/* Case Study Full Content */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="content" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
                Detailed Case Study (Markdown)
              </label>
              <button
                type="button"
                onClick={() => {
                  if (!content.trim()) {
                    setContent(`## Overview\nExplain what this project does and the motivation behind it.\n\n## Architecture & Tech Choices\n- **Next.js & React**: Full stack framework with SSR\n- **PostgreSQL & Prisma**: High performance transactional storage\n\n## Key Challenges & Solutions\nHighlight the most complex engineering hurdles solved.\n\n## Results & Impact\nMetrics, user reception, and performance achievements.`);
                  }
                }}
                className="text-[10px] font-mono text-neutral-500 hover:text-orange-400 transition-colors"
              >
                Insert Starter Template
              </button>
            </div>
            <textarea
              id="content"
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write detailed architecture, problem statement, and technical results in Markdown..."
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-4 text-neutral-300 focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm leading-relaxed resize-y"
            ></textarea>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-neutral-500 hover:text-white transition-colors"
          >
            ← Cancel and return
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-neutral-950 font-mono font-bold text-sm px-7 py-3 rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/10"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-neutral-950/20 border-t-neutral-950 rounded-full animate-spin"></span>
                Saving Project...
              </>
            ) : (
              <>
                <Save size={18} /> {isEditing ? 'Update Project' : 'Publish Project'}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {isEditing && (
        <ConfirmDeleteModal
          isOpen={isConfirmDeleteOpen}
          title="Delete Project"
          itemName={name}
          message={`Are you sure you want to permanently delete the project "${name}"?`}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setIsConfirmDeleteOpen(false)}
        />
      )}
    </div>
  );
}
