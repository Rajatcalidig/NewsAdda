import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNotificationBell from "@/components/AdminNotificationBell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-neutral-300 font-sans">
      <AdminSidebar />
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-neutral-800 flex items-center justify-between px-8 bg-neutral-950/60 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white tracking-tight">Admin Console</h2>
          <div className="flex items-center gap-6">
            <AdminNotificationBell />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

// Removed SidebarLink local component
