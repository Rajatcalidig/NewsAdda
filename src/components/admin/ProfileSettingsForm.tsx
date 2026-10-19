'use client';

import { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, MessageCircle, ExternalLink, Globe } from 'lucide-react';
import { saveSettingsAction } from '@/app/admin/crud-actions';
import { useRouter } from 'next/navigation';

interface ProfileSettingsFormProps {
  initialLinkedinUrl: string;
  initialNowStudyingText: string;
  initialWhatsappNumber: string;
}

export default function ProfileSettingsForm({
  initialLinkedinUrl,
  initialNowStudyingText,
  initialWhatsappNumber,
}: ProfileSettingsFormProps) {
  const [linkedinUrl, setLinkedinUrl] = useState(initialLinkedinUrl);
  const [nowStudyingText, setNowStudyingText] = useState(initialNowStudyingText);
  const [whatsappNumber, setWhatsappNumber] = useState(initialWhatsappNumber);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append('linkedinUrl', linkedinUrl.trim());
    formData.append('nowStudyingText', nowStudyingText.trim());
    formData.append('whatsappNumber', whatsappNumber.trim());

    try {
      const res = await saveSettingsAction(formData);
      if (res && (res as any).error) {
        setFeedback({ type: 'error', message: (res as any).error });
        setIsSubmitting(false);
        return;
      }
      setFeedback({ type: 'success', message: 'Settings saved and updated successfully!' });
      router.refresh();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to save settings' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-8 flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Portfolio & Contact Settings</h3>
        <p className="text-neutral-500 font-mono text-xs">Configure your direct links and live indicators</p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-sm border font-mono text-xs flex items-center gap-2.5 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
              : 'bg-red-950/40 border-red-500/30 text-red-400'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* WhatsApp Phone Number */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="whatsappNumber" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2">
              <MessageCircle size={14} className="text-emerald-400" /> WhatsApp Direct Chat Number
            </label>
            {cleanWaNumber && (
              <a
                href={`https://wa.me/${cleanWaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
              >
                Test Link <ExternalLink size={11} />
              </a>
            )}
          </div>
          <input
            type="text"
            id="whatsappNumber"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="e.g. +919876543210 or 919876543210"
            className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
          />
          <p className="text-neutral-500 text-xs">
            Include country code (e.g. +91 for India). Used for the floating WhatsApp button and direct contact clicks.
          </p>
        </div>

        {/* LinkedIn Profile */}
        <div className="flex flex-col gap-2">
          <label htmlFor="linkedinUrl" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
            LinkedIn Profile URL
          </label>
          <input
            type="url"
            id="linkedinUrl"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/rajat-tripathi"
            className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
          />
        </div>

        {/* Now Studying Status */}
        <div className="flex flex-col gap-2">
          <label htmlFor="nowStudyingText" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">
            "Now Studying" Live Status
          </label>
          <input
            type="text"
            id="nowStudyingText"
            value={nowStudyingText}
            onChange={(e) => setNowStudyingText(e.target.value)}
            placeholder="e.g. Multi-Agent Workflows & Distributed Vector Indexes"
            className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
          />
          <p className="text-neutral-500 text-xs">
            Displays in the live status badge on the homepage. Leave empty to hide.
          </p>
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-800">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-neutral-950 font-mono font-bold text-sm px-6 py-3 rounded-sm transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-orange-500/10"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-neutral-950/20 border-t-neutral-950 rounded-full animate-spin"></span>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} /> Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
