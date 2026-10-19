import { LogOut, Monitor, User, Shield } from 'lucide-react';
import { logoutAction } from '../../actions';
import { ThemeSettings } from './ThemeSettings';
import { prisma } from '@/lib/prisma';
import ProfileSettingsForm from '@/components/admin/ProfileSettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await prisma.setting.findMany();
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value || '';

  const linkedinUrl = getSetting('linkedinUrl');
  const nowStudyingText = getSetting('nowStudyingText');
  const whatsappNumber = getSetting('whatsappNumber') || '+918076595560';

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-24">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">System Settings</h2>
        <p className="text-neutral-500 font-mono text-xs mt-1">Configure your portfolio environment, links, and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar for Settings */}
        <div className="flex flex-col gap-2">
          <div className="px-4 py-3 rounded-sm bg-neutral-900 border border-neutral-800 text-white font-bold text-sm flex items-center gap-3">
            <User size={16} className="text-orange-500" /> Profile & Contact
          </div>
          <div className="px-4 py-3 rounded-sm text-neutral-400 font-bold text-sm flex items-center gap-3 bg-neutral-950/40 border border-neutral-900">
            <Monitor size={16} /> Appearance
          </div>
          <div className="px-4 py-3 rounded-sm text-neutral-400 font-bold text-sm flex items-center gap-3 bg-neutral-950/40 border border-neutral-900">
            <Shield size={16} /> Session Security
          </div>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Profile & WhatsApp Settings */}
          <ProfileSettingsForm
            initialLinkedinUrl={linkedinUrl}
            initialNowStudyingText={nowStudyingText}
            initialWhatsappNumber={whatsappNumber}
          />

          {/* Theme Settings */}
          <ThemeSettings />

          {/* Account Danger Zone */}
          <div className="bg-neutral-900/50 border border-red-900/30 rounded-sm p-8">
            <h3 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h3>
            <p className="text-neutral-500 text-sm mb-6">These actions affect your active session and authentication state.</p>
            
            <div className="flex items-center justify-between p-4 border border-red-900/20 bg-red-950/10 rounded-sm">
              <div>
                <h4 className="text-white font-bold text-sm">End Session</h4>
                <p className="text-neutral-500 text-xs mt-1">Log out of the admin console.</p>
              </div>
              <form action={logoutAction}>
                <button type="submit" className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2 cursor-pointer">
                  <LogOut size={14} /> Log Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
