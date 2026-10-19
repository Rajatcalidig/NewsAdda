'use client';

import { useState } from 'react';
import { UploadCloud, FileUp, CheckCircle2, Trash2, Download, ExternalLink, FileText, AlertCircle } from 'lucide-react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { saveResumeAction, deleteResumeAction } from '@/app/admin/crud-actions';
import { useRouter } from 'next/navigation';

interface ResumeManagerProps {
  hasResume: boolean;
  resumeBase64?: string | null;
  updatedAt?: string | null;
}

export default function ResumeManager({
  hasResume: initialHasResume,
  resumeBase64: initialResumeBase64,
  updatedAt: initialUpdatedAt,
}: ResumeManagerProps) {
  const [hasResume, setHasResume] = useState(initialHasResume);
  const [resumeBase64, setResumeBase64] = useState<string | null>(initialResumeBase64 || null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(initialUpdatedAt || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setStatusMsg({ type: 'error', text: 'Please choose a valid .PDF document.' });
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setStatusMsg(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setStatusMsg({ type: 'error', text: 'Please select a PDF resume file first.' });
      return;
    }

    setIsUploading(true);
    setStatusMsg(null);

    const formData = new FormData();
    formData.append('resumeFile', selectedFile);

    try {
      const res = await saveResumeAction(formData);
      if (res && res.error) {
        setStatusMsg({ type: 'error', text: res.error });
        setIsUploading(false);
        return;
      }

      setHasResume(true);
      setUpdatedAt(new Date().toISOString());
      setSelectedFile(null);
      setStatusMsg({ type: 'success', text: 'Resume uploaded and activated successfully!' });
      router.refresh();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Upload failed.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    setIsDeleting(true);
    setStatusMsg(null);
    try {
      await deleteResumeAction();
      setHasResume(false);
      setResumeBase64(null);
      setUpdatedAt(null);
      setIsConfirmDeleteOpen(false);
      setStatusMsg({ type: 'success', text: 'Resume deleted successfully.' });
      router.refresh();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to delete resume.' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Resume Management</h2>
        <p className="text-neutral-500 font-mono text-xs mt-1">
          Upload and manage your master resume for prospective recruiters and clients
        </p>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-sm border font-mono text-xs flex items-center gap-2 ${
            statusMsg.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
              : 'bg-red-950/40 border-red-500/30 text-red-400'
          }`}
        >
          {statusMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {statusMsg.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Form */}
        <form
          onSubmit={handleUpload}
          className="border border-neutral-800 rounded-sm bg-neutral-950/50 p-8 flex flex-col items-center justify-center text-center group hover:border-neutral-700 transition-colors"
        >
          <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-5 group-hover:scale-105 transition-transform">
            <UploadCloud size={28} />
          </div>

          <h3 className="text-white font-bold text-base mb-1.5">Upload Latest Resume</h3>
          <p className="text-neutral-500 text-xs mb-6 max-w-xs font-sans">
            Drop your updated PDF here. It will immediately replace the public resume across your entire portfolio.
          </p>

          <label className="w-full mb-4 cursor-pointer">
            <div className="border border-dashed border-neutral-700 hover:border-orange-500/50 rounded-sm p-4 text-center transition-colors bg-neutral-900/30">
              <input
                type="file"
                name="resumeFile"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="text-xs font-mono text-neutral-400 block truncate">
                {selectedFile ? (
                  <span className="text-orange-400 font-bold flex items-center justify-center gap-1.5">
                    <FileText size={14} /> {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                ) : (
                  'Click to choose a .PDF file'
                )}
              </span>
            </div>
          </label>

          <button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 font-mono font-bold text-xs px-6 py-3 rounded-sm transition-colors cursor-pointer flex items-center gap-2 w-full justify-center shadow-lg shadow-orange-500/10"
          >
            {isUploading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-neutral-950/20 border-t-neutral-950 rounded-full animate-spin"></span>
                Uploading...
              </>
            ) : (
              <>
                <FileUp size={16} /> Deploy New Resume
              </>
            )}
          </button>

          <p className="text-neutral-600 font-mono text-[10px] mt-4 uppercase tracking-widest">
            Only .PDF files accepted • Stored in PostgreSQL & public/
          </p>
        </form>

        {/* Current Active Resume Status */}
        <div className="border border-neutral-800 rounded-sm bg-neutral-900/50 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <CheckCircle2 size={140} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
                Active Resume Status
              </h4>
              {hasResume && (
                <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-sm">
                  Active
                </span>
              )}
            </div>

            {hasResume ? (
              <div className="flex flex-col gap-4 relative z-10 text-sm">
                <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="truncate">
                    <p className="text-white font-bold font-mono text-xs truncate">Rajat_Resume.pdf</p>
                    <p className="text-neutral-500 text-[11px] font-mono mt-0.5">
                      {updatedAt ? `Updated ${new Date(updatedAt).toLocaleDateString()}` : 'Ready for download'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-500">Public URL:</span>
                    <a
                      href="/Rajat_Resume.pdf"
                      target="_blank"
                      className="text-orange-400 hover:text-orange-300 inline-flex items-center gap-1 transition-colors"
                    >
                      /Rajat_Resume.pdf <ExternalLink size={10} />
                    </a>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-500">Storage Mode:</span>
                    <span className="text-neutral-300">Database Base64 + File Cache</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-500">Recruiter Access:</span>
                    <span className="text-emerald-400">Available across site</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-neutral-500 font-mono text-xs">
                <FileText size={36} className="mb-3 opacity-20" />
                <p>No active resume on file.</p>
                <p className="text-[11px] text-neutral-600 mt-1">Upload your PDF on the left.</p>
              </div>
            )}
          </div>

          {hasResume && (
            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center gap-3 relative z-10">
              <a
                href={resumeBase64 || '/Rajat_Resume.pdf'}
                download="Rajat_Resume.pdf"
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-mono font-bold text-xs px-4 py-2.5 rounded-sm transition-colors text-center cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Download size={14} /> Download PDF
              </a>

              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(true)}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-mono font-bold text-xs px-3.5 py-2.5 rounded-sm transition-colors cursor-pointer inline-flex items-center gap-1.5"
                title="Delete current resume"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        title="Delete Resume"
        itemName="Rajat_Resume.pdf"
        message="Are you sure you want to remove your active resume? Visitors will not be able to download it until you upload a new one."
        isDeleting={isDeleting}
        onConfirm={handleDeleteResume}
        onCancel={() => setIsConfirmDeleteOpen(false)}
      />
    </div>
  );
}
