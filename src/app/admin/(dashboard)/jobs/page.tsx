import { prisma } from '@/lib/prisma';
import { Plus, Edit2, Trash2, Building, MapPin } from 'lucide-react';

export default async function JobsPage() {
  const jobs = await prisma.jobApplication.findMany({
    orderBy: { appliedDate: 'desc' }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'INTERVIEWING': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'OFFER': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'REJECTED': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Job Applications</h2>
          <p className="text-neutral-500 font-mono text-xs mt-1">Track your career opportunities</p>
        </div>
        <button 
          className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-sm px-4 py-2 rounded-sm transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Application
        </button>
      </div>

      <div className="border border-neutral-800 rounded-sm overflow-hidden bg-neutral-950/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-900/80 border-b border-neutral-800 font-mono text-xs uppercase tracking-wider text-neutral-400">
              <th className="p-4 font-bold">Company / Role</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Date Applied</th>
              <th className="p-4 font-bold">Notes</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-neutral-500 font-mono text-sm">
                  No applications tracked yet. Keep grinding!
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                        <Building size={18} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm mb-1">{job.company}</p>
                        <p className="text-neutral-400 text-xs font-mono">{job.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-sm uppercase tracking-wider border ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-400 text-sm font-mono">
                    {new Date(job.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4 text-neutral-500 text-sm max-w-xs truncate">
                    {job.notes || '-'}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="text-neutral-400 hover:text-white transition-colors"><Edit2 size={16} /></button>
                      <button className="text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
