'use client';

import { useState } from 'react';
import { 
  Building, 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Info,
  Clock,
  Briefcase
} from 'lucide-react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { createJobAction, updateJobAction, deleteJobAction } from '@/app/admin/crud-actions';
import { useRouter } from 'next/navigation';

export interface JobItem {
  id: string;
  company: string;
  role: string;
  status: 'APPLIED' | 'INTERVIEWING' | 'OFFER' | 'REJECTED';
  appliedDate: string | Date;
  notes: string | null;
}

export default function JobsManager({ initialJobs }: { initialJobs: JobItem[] }) {
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<JobItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'manual' | 'linkedin'>('manual');
  
  // LinkedIn smart paste state
  const [linkedinRawText, setLinkedinRawText] = useState('');
  
  // Form fields
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'APPLIED' as 'APPLIED' | 'INTERVIEWING' | 'OFFER' | 'REJECTED',
    appliedDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const router = useRouter();

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      status: 'APPLIED',
      appliedDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setLinkedinRawText('');
    setEditingJob(null);
    setErrorMsg(null);
    setActiveTab('manual');
  };

  const openAddModal = () => {
    resetForm();
    setIsAddOpen(true);
  };

  const openEditModal = (job: JobItem) => {
    setEditingJob(job);
    setFormData({
      company: job.company,
      role: job.role,
      status: job.status,
      appliedDate: new Date(job.appliedDate).toISOString().split('T')[0],
      notes: job.notes || '',
    });
    setErrorMsg(null);
    setIsAddOpen(true);
  };

  // Smart parser for LinkedIn text
  const parseLinkedInText = () => {
    if (!linkedinRawText.trim()) return;

    const lines = linkedinRawText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    let detectedCompany = '';
    let detectedRole = '';
    let detectedUrl = '';

    // Search for URL if present
    const urlMatch = linkedinRawText.match(/https?:\/\/[^\s]+/i);
    if (urlMatch) {
      detectedUrl = urlMatch[0];
    }

    // Common LinkedIn format 1: "Role at Company"
    const atMatch = linkedinRawText.match(/([A-Za-z0-9\s/]+)\s+(?:at|@)\s+([A-Za-z0-9\s.,&-]+)/i);
    if (atMatch) {
      detectedRole = atMatch[1].trim();
      detectedCompany = atMatch[2].split('\n')[0].trim();
    } else if (lines.length >= 2) {
      // First line often Role, second line Company
      detectedRole = lines[0];
      detectedCompany = lines[1].replace(/·.*$/, '').trim();
    } else if (lines.length === 1) {
      detectedCompany = lines[0];
    }

    setFormData((prev) => ({
      ...prev,
      company: detectedCompany || prev.company,
      role: detectedRole || prev.role,
      notes: detectedUrl
        ? `${prev.notes ? prev.notes + '\n' : ''}Job Link: ${detectedUrl}`
        : prev.notes || 'Imported via LinkedIn Smart Paste',
    }));

    setActiveTab('manual');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.role) {
      setErrorMsg('Company and Role are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const fd = new FormData();
    fd.append('company', formData.company);
    fd.append('role', formData.role);
    fd.append('status', formData.status);
    fd.append('appliedDate', formData.appliedDate);
    fd.append('notes', formData.notes);

    try {
      if (editingJob) {
        const res = await updateJobAction(editingJob.id, fd);
        if (res && res.error) {
          setErrorMsg(res.error);
          setIsSubmitting(false);
          return;
        }
        setJobs((prev) =>
          prev.map((j) =>
            j.id === editingJob.id
              ? {
                  ...j,
                  company: formData.company,
                  role: formData.role,
                  status: formData.status,
                  appliedDate: formData.appliedDate,
                  notes: formData.notes,
                }
              : j
          )
        );
      } else {
        const res = await createJobAction(fd);
        if (res && res.error) {
          setErrorMsg(res.error);
          setIsSubmitting(false);
          return;
        }
        // Optimistic refresh
        router.refresh();
      }

      setIsAddOpen(false);
      resetForm();
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickStatusChange = async (job: JobItem, newStatus: JobItem['status']) => {
    const fd = new FormData();
    fd.append('company', job.company);
    fd.append('role', job.role);
    fd.append('status', newStatus);
    fd.append('appliedDate', new Date(job.appliedDate).toISOString().split('T')[0]);
    fd.append('notes', job.notes || '');

    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, status: newStatus } : j))
    );

    try {
      await updateJobAction(job.id, fd);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedForDelete) return;
    setIsDeleting(true);
    setErrorMsg(null);
    try {
      const res = await deleteJobAction(selectedForDelete.id);
      if (res && res.error) {
        setErrorMsg(res.error);
        setIsDeleting(false);
        return;
      }
      setJobs((prev) => prev.filter((j) => j.id !== selectedForDelete.id));
      setSelectedForDelete(null);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete application');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: JobItem['status']) => {
    switch (status) {
      case 'APPLIED':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'INTERVIEWING':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'OFFER':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'REJECTED':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  // Metrics
  const totalCount = jobs.length;
  const interviewingCount = jobs.filter((j) => j.status === 'INTERVIEWING').length;
  const offerCount = jobs.filter((j) => j.status === 'OFFER').length;
  const appliedCount = jobs.filter((j) => j.status === 'APPLIED').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Job Applications</h2>
          <p className="text-neutral-500 font-mono text-xs mt-1">
            Track and manage your developer job search pipeline
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-sm px-4 py-2.5 rounded-sm transition-colors flex items-center gap-2 self-start cursor-pointer shadow-lg shadow-orange-500/10"
        >
          <Plus size={16} /> Add Application
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-sm">
          <p className="text-neutral-500 font-mono text-[11px] uppercase tracking-wider mb-1">
            Total Tracked
          </p>
          <p className="text-2xl font-bold text-white font-mono">{totalCount}</p>
        </div>
        <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-sm">
          <p className="text-blue-400 font-mono text-[11px] uppercase tracking-wider mb-1">
            Applied
          </p>
          <p className="text-2xl font-bold text-blue-400 font-mono">{appliedCount}</p>
        </div>
        <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-sm">
          <p className="text-amber-400 font-mono text-[11px] uppercase tracking-wider mb-1">
            Interviewing
          </p>
          <p className="text-2xl font-bold text-amber-400 font-mono">{interviewingCount}</p>
        </div>
        <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-sm">
          <p className="text-emerald-400 font-mono text-[11px] uppercase tracking-wider mb-1">
            Offers
          </p>
          <p className="text-2xl font-bold text-emerald-400 font-mono">{offerCount}</p>
        </div>
      </div>

      {/* Table */}
      <div className="border border-neutral-800 rounded-sm overflow-hidden bg-neutral-950/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-900/80 border-b border-neutral-800 font-mono text-xs uppercase tracking-wider text-neutral-400">
              <th className="p-4 font-bold">Company / Role</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Applied Date</th>
              <th className="p-4 font-bold">Notes</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-neutral-500 font-mono text-sm">
                  No applications tracked yet. Click "Add Application" above to track your first job!
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 shrink-0">
                        <Building size={18} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm mb-0.5">{job.company}</p>
                        <p className="text-neutral-400 text-xs font-mono">{job.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <select
                      value={job.status}
                      onChange={(e) =>
                        handleQuickStatusChange(job, e.target.value as JobItem['status'])
                      }
                      className={`text-[10px] font-mono font-bold px-2 py-1 rounded-sm uppercase tracking-wider border cursor-pointer bg-neutral-950 focus:outline-none ${getStatusBadge(
                        job.status
                      )}`}
                    >
                      <option value="APPLIED">Applied</option>
                      <option value="INTERVIEWING">Interviewing</option>
                      <option value="OFFER">Offer</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                  <td className="p-4 text-neutral-400 text-sm font-mono">
                    {new Date(job.appliedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="p-4 text-neutral-400 text-xs max-w-xs truncate font-sans">
                    {job.notes || <span className="text-neutral-600 font-mono">-</span>}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(job)}
                        className="text-neutral-400 hover:text-white transition-colors p-1.5 cursor-pointer"
                        title="Edit application"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setSelectedForDelete(job)}
                        className="text-neutral-400 hover:text-red-500 transition-colors p-1.5 cursor-pointer"
                        title="Delete application"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-sm shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Briefcase size={18} className="text-orange-500" />
                {editingJob ? 'Edit Application' : 'Add Job Application'}
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs for Add mode */}
            {!editingJob && (
              <div className="flex border-b border-neutral-800 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('manual')}
                  className={`pb-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold transition-colors border-b-2 ${
                    activeTab === 'manual'
                      ? 'border-orange-500 text-orange-400'
                      : 'border-transparent text-neutral-500 hover:text-white'
                  }`}
                >
                  Manual Form
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('linkedin')}
                  className={`pb-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'linkedin'
                      ? 'border-orange-500 text-orange-400'
                      : 'border-transparent text-neutral-500 hover:text-white'
                  }`}
                >
                  <Sparkles size={13} /> LinkedIn Smart Paste
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs rounded-sm mb-4">
                {errorMsg}
              </div>
            )}

            {activeTab === 'linkedin' && !editingJob ? (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Copy-paste text from a LinkedIn job post (or snippet with company/role). Our parser will automatically extract the company and job title for you!
                </p>
                <textarea
                  rows={6}
                  value={linkedinRawText}
                  onChange={(e) => setLinkedinRawText(e.target.value)}
                  placeholder="Paste LinkedIn job snippet here... e.g.&#10;Full Stack Developer at Calidig IT Solutions&#10;https://www.linkedin.com/jobs/view/..."
                  className="bg-neutral-950 border border-neutral-800 rounded-sm p-3 text-xs text-neutral-300 font-mono focus:outline-none focus:border-orange-500/50 resize-none"
                />
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={parseLinkedInText}
                    disabled={!linkedinRawText.trim()}
                    className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-neutral-950 font-mono font-bold text-xs px-4 py-2.5 rounded-sm transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles size={14} /> Parse & Autofill
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Google, Calidig, Stripe"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                      Role / Position *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Frontend Engineer"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as JobItem['status'],
                        })
                      }
                      className="bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-orange-500/50"
                    >
                      <option value="APPLIED">Applied</option>
                      <option value="INTERVIEWING">Interviewing</option>
                      <option value="OFFER">Offer</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                      Applied Date
                    </label>
                    <input
                      type="date"
                      value={formData.appliedDate}
                      onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                      className="bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-orange-500/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                    Notes / Link / Referral (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Salary expectation, recruiter contact, or job post URL..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="bg-neutral-950 border border-neutral-800 rounded-sm p-3 text-sm text-neutral-300 font-sans focus:outline-none focus:border-orange-500/50 resize-y"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-neutral-950 font-mono font-bold text-xs px-5 py-2.5 rounded-sm transition-colors cursor-pointer"
                  >
                    {isSubmitting ? 'Saving...' : editingJob ? 'Update Application' : 'Save Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!selectedForDelete}
        title="Delete Job Application"
        itemName={selectedForDelete ? `${selectedForDelete.role} at ${selectedForDelete.company}` : undefined}
        message={
          selectedForDelete
            ? `Are you sure you want to remove ${selectedForDelete.role} at ${selectedForDelete.company} from your tracker?`
            : undefined
        }
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelectedForDelete(null)}
      />
    </div>
  );
}
