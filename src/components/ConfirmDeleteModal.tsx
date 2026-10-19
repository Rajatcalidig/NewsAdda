'use client';

import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title?: string;
  itemName?: string;
  message?: string;
  isDeleting?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  title = 'Confirm Deletion',
  itemName,
  message,
  isDeleting = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isDeleting) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDeleting, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) onCancel();
      }}
    >
      <div 
        className="relative w-full max-w-md bg-neutral-900 border border-red-500/30 rounded-sm shadow-2xl p-6 overflow-hidden animate-scale-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-10 h-10 rounded-sm bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
            <AlertTriangle size={20} />
          </div>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="text-neutral-500 hover:text-white transition-colors disabled:opacity-50"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {message || (
              <>
                Are you sure you want to permanently delete{' '}
                {itemName ? (
                  <span className="font-bold text-white font-mono bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
                    "{itemName}"
                  </span>
                ) : (
                  'this item'
                )}
                ? This action cannot be undone.
              </>
            )}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={14} /> Delete Permanently
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
