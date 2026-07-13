import { prisma } from '@/lib/prisma';
import { Mail, Check, Trash2 } from 'lucide-react';

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Inbox</h2>
          <p className="text-neutral-500 font-mono text-xs mt-1">Incoming communications from portfolio</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden min-h-[500px]">
        {/* Messages List */}
        <div className="w-1/3 border border-neutral-800 rounded-sm bg-neutral-950/50 overflow-y-auto flex flex-col">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 font-mono text-sm m-auto">
              Inbox is empty.
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={msg.id} 
                className={`p-4 border-b border-neutral-800/50 cursor-pointer transition-colors ${
                  index === 0 ? 'bg-neutral-900/80 border-l-2 border-l-orange-500' : 'hover:bg-neutral-900/30 border-l-2 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-bold text-sm ${msg.status === 'UNREAD' ? 'text-white' : 'text-neutral-400'}`}>
                    {msg.name}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mb-2">{msg.email}</p>
                <p className="text-sm text-neutral-400 line-clamp-2">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail View (Mock active state for first message if exists) */}
        <div className="w-2/3 border border-neutral-800 rounded-sm bg-neutral-950/50 p-6 flex flex-col">
          {messages.length > 0 ? (
            <>
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-neutral-800">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{messages[0].name}</h3>
                  <a href={`mailto:${messages[0].email}`} className="text-orange-500 hover:text-orange-400 font-mono text-sm flex items-center gap-2 transition-colors">
                    <Mail size={14} /> {messages[0].email}
                  </a>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-neutral-800 rounded-sm text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors" title="Mark as Read">
                    <Check size={16} />
                  </button>
                  <button className="p-2 border border-neutral-800 rounded-sm text-neutral-400 hover:text-red-500 hover:border-red-500/50 transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="text-neutral-300 leading-relaxed whitespace-pre-wrap flex-1 overflow-y-auto pr-4">
                {messages[0].message}
              </div>
            </>
          ) : (
            <div className="m-auto flex flex-col items-center justify-center text-neutral-500">
              <Mail size={48} className="mb-4 opacity-20" />
              <p className="font-mono text-sm">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
