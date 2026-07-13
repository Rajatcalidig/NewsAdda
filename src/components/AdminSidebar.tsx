'use client';

import { useState } from 'react';
import { LayoutDashboard, FileText, FolderOpen, Mail, Briefcase, FileUp, Settings, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import SidebarLink from "./SidebarLink";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`border-r border-neutral-800 flex flex-col justify-between transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div>
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && <h1 className="text-orange-500 font-bold text-xl tracking-tight truncate">AIEngineer_OS</h1>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>
        
        <div className={`px-4 py-2 ${isCollapsed ? 'items-center' : ''}`}>
          {!isCollapsed && <p className="text-xs font-mono font-bold text-neutral-500 mb-4 px-2 tracking-wider">MAIN SHELL</p>}
          <nav className="flex flex-col gap-1">
            <SidebarLink href="/admin" icon={<LayoutDashboard size={18} />} label={isCollapsed ? "" : "Dashboard"} collapsed={isCollapsed} />
            <SidebarLink href="/admin/posts" icon={<FileText size={18} />} label={isCollapsed ? "" : "Posts"} collapsed={isCollapsed} />
            <SidebarLink href="/admin/projects" icon={<FolderOpen size={18} />} label={isCollapsed ? "" : "Projects"} collapsed={isCollapsed} />
            <SidebarLink href="/admin/messages" icon={<Mail size={18} />} label={isCollapsed ? "" : "Messages"} collapsed={isCollapsed} />
            <SidebarLink href="/admin/jobs" icon={<Briefcase size={18} />} label={isCollapsed ? "" : "Jobs"} collapsed={isCollapsed} />
            <SidebarLink href="/admin/resume" icon={<FileUp size={18} />} label={isCollapsed ? "" : "Resume"} collapsed={isCollapsed} />
          </nav>
        </div>

        <div className={`px-4 py-6 mt-4 ${isCollapsed ? 'items-center' : ''}`}>
          {!isCollapsed && <p className="text-xs font-mono font-bold text-neutral-500 mb-4 px-2 tracking-wider">SYSTEM</p>}
          <nav className="flex flex-col gap-1">
            <SidebarLink href="/admin/settings" icon={<Settings size={18} />} label={isCollapsed ? "" : "Settings"} collapsed={isCollapsed} />
          </nav>
        </div>
      </div>

      <div className={`p-6 border-t border-neutral-800 flex items-center gap-4 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 rounded-sm bg-orange-500 flex items-center justify-center text-neutral-950 font-bold shrink-0">
          RT
        </div>
        {!isCollapsed && (
          <div className="truncate">
            <p className="text-white font-bold text-sm truncate">Rajat T.</p>
            <p className="text-neutral-500 text-xs font-mono truncate">Admin Access</p>
          </div>
        )}
      </div>
    </aside>
  );
}
