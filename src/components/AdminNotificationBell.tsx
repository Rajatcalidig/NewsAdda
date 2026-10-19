'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Mail, ExternalLink, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface MessagePreview {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'UNREAD' | 'READ';
  createdAt: string;
}

export default function AdminNotificationBell() {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [messages, setMessages] = useState<MessagePreview[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/notifications', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unreadCount || 0);
        setMessages(data.recentMessages || []);
      }
    } catch (err) {
      console.warn('Error polling notifications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Poll every 25 seconds
    const interval = setInterval(fetchNotifications, 25000);

    // Refresh when user returns to window
    const onFocus = () => fetchNotifications();
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-sm text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors focus:outline-none cursor-pointer"
        aria-label="Notifications"
        title="Admin Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-mono font-bold leading-none text-neutral-950 bg-orange-500 rounded-full border border-neutral-950 shadow-sm">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-neutral-900 border border-neutral-800 rounded-sm shadow-2xl z-50 overflow-hidden animate-scale-up">
          {/* Header */}
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-orange-500" />
              <h3 className="text-sm font-bold text-white tracking-tight">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-sm">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button
              onClick={fetchNotifications}
              disabled={isLoading}
              className="text-neutral-500 hover:text-white transition-colors p-1"
              title="Refresh"
            >
              <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>

          {/* Messages list */}
          <div className="max-h-80 overflow-y-auto divide-y divide-neutral-800/60">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-neutral-500 font-mono text-xs">
                No notifications right now.
              </div>
            ) : (
              messages.map((msg) => (
                <Link
                  key={msg.id}
                  href="/admin/messages"
                  onClick={() => setIsOpen(false)}
                  className={`block p-4 transition-colors hover:bg-neutral-800/40 ${
                    msg.status === 'UNREAD' ? 'bg-orange-500/[0.04]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {msg.status === 'UNREAD' && (
                        <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
                      )}
                      <span className="font-bold text-white text-xs truncate max-w-[160px]">
                        {msg.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-mono mb-1 truncate">
                    {msg.email}
                  </p>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    {msg.message}
                  </p>
                </Link>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-neutral-950/80 border-t border-neutral-800 text-center">
            <Link
              href="/admin/messages"
              onClick={() => setIsOpen(false)}
              className="text-xs font-mono font-bold text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-1.5"
            >
              Open Inbox <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
