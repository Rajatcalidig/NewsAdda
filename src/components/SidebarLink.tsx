'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function SidebarLink({ 
  href, 
  icon, 
  label, 
  collapsed = false,
  badge,
}: { 
  href: string; 
  icon: ReactNode; 
  label: string; 
  collapsed?: boolean;
  badge?: number | string;
}) {
  const pathname = usePathname();
  
  // Strict match for dashboard, prefix match for others
  const isActive = href === '/admin' ? pathname === '/admin' : pathname?.startsWith(href);

  return (
    <Link 
      href={href} 
      className={`flex items-center justify-between px-3 py-2 rounded-sm transition-colors relative ${
        collapsed ? 'justify-center' : ''
      } ${
        isActive ? 'bg-neutral-800 text-orange-500 border border-neutral-700' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
      }`}
      title={collapsed ? label : undefined}
    >
      <div className="flex items-center gap-3">
        {icon}
        {!collapsed && <span className="font-mono text-sm">{label}</span>}
      </div>
      {badge !== undefined && Number(badge) > 0 && (
        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
          collapsed 
            ? 'absolute -top-1 -right-1 bg-orange-500 text-neutral-950 min-w-[16px] h-[16px] flex items-center justify-center p-0'
            : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
        }`}>
          {badge}
        </span>
      )}
    </Link>
  );
}
