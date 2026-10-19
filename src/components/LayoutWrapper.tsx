'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import ChatAssistant from '@/components/ChatAssistant';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navigation />}
      <main className="flex-1">{children}</main>
      {!isAdmin && (
        <footer className="border-t border-neutral-900 mt-20 py-8 text-center font-mono text-sm text-neutral-600 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} ENGINEER_PORTFOLIO. ALL RIGHTS RESERVED.</p>
        </footer>
      )}
      {!isAdmin && <ChatAssistant />}
      {!isAdmin && <WhatsAppFloatingButton />}
    </>
  );
}
