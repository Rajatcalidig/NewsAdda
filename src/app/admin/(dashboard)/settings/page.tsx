import { LogOut, Monitor, Shield, Key, Save, User } from 'lucide-react';
import { logoutAction } from '../../actions';
import { ThemeSettings } from './ThemeSettings';
import { prisma } from '@/lib/prisma';
import { saveSettingsAction } from '../../crud-actions';

export default async function SettingsPage() {
  const settings = await prisma.setting.findMany();
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value || '';

  const linkedinUrl = getSetting('linkedinUrl');
  const nowStudyingText = getSetting('nowStudyingText');
  const hasResume = !!getSetting('resumeBase64');

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-24">
      
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">System Settings</h2>
        <p className="text-neutral-500 font-mono text-xs mt-1">Configure your portfolio environment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Navigation/Sections Sidebar for Settings */}
        <div className="flex flex-col gap-2">
          <button className="text-left px-4 py-3 rounded-sm bg-neutral-900 border border-neutral-800 text-white font-bold text-sm flex items-center gap-3">
            <Monitor size={16} /> Appearance
          </button>
          <button className="text-left px-4 py-3 rounded-sm text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors font-bold text-sm flex items-center gap-3">
            <User size={16} /> Profile
          </button>
          <button className="text-left px-4 py-3 rounded-sm text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors font-bold text-sm flex items-center gap-3">
            <Shield size={16} /> Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 flex flex-col gap-8">
          
          <ThemeSettings />

          {/* Profile Settings */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-8">
            <h3 className="text-lg font-bold text-white mb-6">Profile & Resume</h3>
            
            <form action={saveSettingsAction} className="flex flex-col gap-6" encType="multipart/form-data">
              <div className="flex flex-col gap-2">
                <label htmlFor="linkedinUrl" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">LinkedIn Profile URL</label>
                <input 
                  type="url" 
                  id="linkedinUrl" 
                  name="linkedinUrl" 
                  defaultValue={linkedinUrl}
                  placeholder="https://linkedin.com/in/..."
                  className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="nowStudyingText" className="text-neutral-400 font-mono text-xs uppercase tracking-wider font-bold">Now Studying Text</label>
                <input 
                  type="text" 
                  id="nowStudyingText" 
                  name="nowStudyingText" 
                  defaultValue={nowStudyingText}
                  placeholder="e.g. LangGraph & Multi-Agent Systems"
                  className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-mono text-sm"
                />
                <p className="text-neutral-500 text-xs mt-1">Leave empty to hide the widget on the homepage.</p>
              </div>

              <div className="flex justify-end mt-4 border-t border-neutral-800 pt-6">
                <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-sm px-6 py-3 rounded-sm transition-colors cursor-pointer flex items-center gap-2">
                  <Save size={18} /> Save Profile
                </button>
              </div>
            </form>
          </div>

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
