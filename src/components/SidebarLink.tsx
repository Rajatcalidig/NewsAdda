'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function SidebarLink({ href, icon, label, collapsed = false }: { href: string; icon: ReactNode; label: string; collapsed?: boolean }) {
  const pathname = usePathname();
  
  // Strict match for dashboard, prefix match for others
  const isActive = href === '/admin' ? pathname === '/admin' : pathname?.startsWith(href);

  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-colors ${collapsed ? 'justify-center' : ''} ${
        isActive ? 'bg-neutral-800 text-orange-500 border border-neutral-700' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
      }`}
      title={collapsed ? label : undefined}
    >
      {icon}
      {!collapsed && <span className="font-mono text-sm">{label}</span>}
    </Link>
  );
}
