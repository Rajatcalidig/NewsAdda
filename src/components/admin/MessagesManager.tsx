'use client';

import { useState } from 'react';
import { Mail, Check, Trash2, MessageCircle, ExternalLink, RefreshCw, Search } from 'lucide-react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { markMessageReadAction, deleteMessageAction } from '@/app/admin/crud-actions';
import { useRouter } from 'next/navigation';

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'UNREAD' | 'READ';
  createdAt: string | Date;
}

export default function MessagesManager({ initialMessages }: { initialMessages: MessageItem[] }) {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialMessages.length > 0 ? initialMessages[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForDelete, setSelectedForDelete] = useState<MessageItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const activeMessage = messages.find((m) => m.id === selectedId) || null;

  const filteredMessages = messages.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  const handleToggleStatus = async (msg: MessageItem) => {
    const nextStatus = msg.status === 'UNREAD' ? 'READ' : 'UNREAD';
    setIsUpdatingStatus(true);
    try {
      await markMessageReadAction(msg.id, nextStatus);
      setMessages((prev) =>
        prev.map((item) => (item.id === msg.id ? { ...item, status: nextStatus } : item))
      );
      router.refresh();
    } catch (e: any) {
      setErrorMsg(e.message || 'Failed to update status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedForDelete) return;
    setIsDeleting(true);
    setErrorMsg(null);
    try {
      const res = await deleteMessageAction(selectedForDelete.id);
      if (res && res.error) {
        setErrorMsg(res.error);
        setIsDeleting(false);
        return;
      }
      const remaining = messages.filter((m) => m.id !== selectedForDelete.id);
      setMessages(remaining);
      if (selectedId === selectedForDelete.id) {
        setSelectedId(remaining.length > 0 ? remaining[0].id : null);
      }
      setSelectedForDelete(null);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete message');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Inbox</h2>
          <p className="text-neutral-500 font-mono text-xs mt-1">
            {messages.length} total • {messages.filter((m) => m.status === 'UNREAD').length} unread
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search sender, email, text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-sm pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-orange-500/50 w-64"
            />
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs rounded-sm">
          {errorMsg}
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden min-h-[550px]">
        {/* Messages List Column */}
        <div className="w-full md:w-5/12 border border-neutral-800 rounded-sm bg-neutral-950/50 overflow-y-auto flex flex-col divide-y divide-neutral-800/60">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 font-mono text-sm m-auto">
              {searchQuery ? 'No messages match your search.' : 'Inbox is empty.'}
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isSelected = msg.id === selectedId;
              const isUnread = msg.status === 'UNREAD';
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedId(msg.id)}
                  className={`p-4 cursor-pointer transition-colors border-l-2 ${
                    isSelected
                      ? 'bg-neutral-900/90 border-l-orange-500'
                      : isUnread
                      ? 'bg-neutral-900/40 hover:bg-neutral-900/60 border-l-orange-500/40'
                      : 'hover:bg-neutral-900/30 border-l-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <div className="flex items-center gap-2">
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" title="Unread" />
                      )}
                      <h4
                        className={`font-bold text-sm truncate max-w-[170px] ${
                          isUnread ? 'text-white' : 'text-neutral-400'
                        }`}
                      >
                        {msg.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 font-mono mb-2 truncate">{msg.email}</p>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Message Detail View */}
        <div className="w-full md:w-7/12 border border-neutral-800 rounded-sm bg-neutral-950/50 p-6 flex flex-col">
          {activeMessage ? (
            <>
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-neutral-800">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-white">{activeMessage.name}</h3>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider border ${
                        activeMessage.status === 'UNREAD'
                          ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                          : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                      }`}
                    >
                      {activeMessage.status}
                    </span>
                  </div>
                  <a
                    href={`mailto:${activeMessage.email}`}
                    className="text-orange-500 hover:text-orange-400 font-mono text-sm inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Mail size={14} /> {activeMessage.email}
                  </a>
                  <p className="text-neutral-500 text-xs font-mono mt-1">
                    Received {new Date(activeMessage.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(activeMessage)}
                    disabled={isUpdatingStatus}
                    className={`p-2 border rounded-sm transition-colors text-xs font-mono flex items-center gap-1.5 cursor-pointer ${
                      activeMessage.status === 'UNREAD'
                        ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-900'
                        : 'border-neutral-800 text-neutral-500 hover:text-white'
                    }`}
                    title={activeMessage.status === 'UNREAD' ? 'Mark as Read' : 'Mark as Unread'}
                  >
                    <Check size={14} />
                    <span className="hidden sm:inline">
                      {activeMessage.status === 'UNREAD' ? 'Mark Read' : 'Mark Unread'}
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedForDelete(activeMessage)}
                    className="p-2 border border-neutral-800 rounded-sm text-neutral-400 hover:text-red-500 hover:border-red-500/50 transition-colors cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="text-neutral-300 leading-relaxed whitespace-pre-wrap flex-1 overflow-y-auto pr-4 text-sm font-sans bg-neutral-900/30 p-4 rounded-sm border border-neutral-900">
                {activeMessage.message}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap gap-3">
                <a
                  href={`mailto:${activeMessage.email}?subject=Re:%20Inquiry%20from%20Portfolio&body=Hi%20${encodeURIComponent(
                    activeMessage.name
                  )},%0D%0A%0D%0AThank%20you%20for%20reaching%20out!`}
                  className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-xs px-4 py-2.5 rounded-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Mail size={14} /> Reply via Email
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Hi ${activeMessage.name}, responding to your inquiry on my portfolio!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs px-4 py-2.5 rounded-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={14} /> Share on WhatsApp
                </a>
              </div>
            </>
          ) : (
            <div className="m-auto flex flex-col items-center justify-center text-neutral-500">
              <Mail size={48} className="mb-4 opacity-20" />
              <p className="font-mono text-sm">Select a message to read details</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={!!selectedForDelete}
        title="Delete Message"
        itemName={selectedForDelete ? `from ${selectedForDelete.name}` : undefined}
        message={
          selectedForDelete
            ? `Are you sure you want to delete this message from ${selectedForDelete.name} (${selectedForDelete.email})?`
            : undefined
        }
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelectedForDelete(null)}
      />
    </div>
  );
}
