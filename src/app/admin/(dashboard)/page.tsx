import { prisma } from '@/lib/prisma';
import { Eye, Send, MousePointerClick, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import WeatherWidget from '@/components/WeatherWidget';

export default async function AdminDashboard() {
  // Fetch stats from DB
  const [totalPosts, totalProjects, totalMessages, totalJobs] = await Promise.all([
    prisma.post.count(),
    prisma.project.count(),
    prisma.message.count(),
    prisma.jobApplication.count(),
  ]);

  const recentPosts = await prisma.post.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col gap-8">
      
      {/* Stats Cards & Weather */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Post Views" 
          value="12,842" 
          trend="+14.2% vs last month" 
          icon={<Eye size={20} className="text-orange-500" />} 
        />
        <StatCard 
          title="Form Submissions" 
          value={totalMessages.toString()} 
          trend="Real-time count" 
          icon={<Send size={20} className="text-orange-500" />} 
        />
        <StatCard 
          title="Jobs Tracked" 
          value={totalJobs.toString()} 
          trend="Active applications" 
          icon={<MousePointerClick size={20} className="text-orange-500" />} 
        />
        <WeatherWidget />
      </div>

      {/* Recent Content Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white tracking-tight">Recent Content</h3>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Filter posts..." 
              className="bg-neutral-900 border border-neutral-800 text-sm text-white rounded-sm px-4 py-2 pl-4 focus:outline-none focus:border-orange-500/50 transition-colors w-64 font-mono"
            />
          </div>
        </div>

        <div className="border border-neutral-800 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900/50 border-b border-neutral-800 font-mono text-xs uppercase tracking-wider text-neutral-400">
                <th className="p-4 font-bold">Post Title</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentPosts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-neutral-500 font-mono text-sm">
                    No posts found. Create your first post!
                  </td>
                </tr>
              ) : (
                recentPosts.map((post) => (
                  <tr key={post.id} className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors group">
                    <td className="p-4">
                      <p className="text-white font-bold text-sm mb-1">{post.title}</p>
                      <p className="text-neutral-500 text-xs">/blog/{post.slug}</p>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-sm uppercase tracking-wider border ${
                        post.status === 'PUBLISHED' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-400 text-sm font-mono">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-neutral-400 hover:text-white"><Edit2 size={16} /></button>
                        <button className="text-neutral-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          <div className="bg-neutral-900/50 p-4 flex items-center justify-between text-neutral-400 font-mono text-xs">
            <span>Showing {recentPosts.length} of {totalPosts} posts</span>
            <div className="flex items-center gap-4">
              <button className="hover:text-white transition-colors"><ChevronLeft size={16} /></button>
              <button className="hover:text-white transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 pt-8 border-t border-neutral-800 flex items-center justify-between text-neutral-600 font-mono text-xs">
        <p>© 2026 AI Engineer Portfolio. Built with Technical Minimalism.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-6 relative overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-neutral-400 font-mono text-xs uppercase tracking-wider">{title}</h4>
        {icon}
      </div>
      <div className="flex items-end gap-4">
        <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
        <span className="text-orange-500 font-mono text-xs mb-1 tracking-wider">{trend}</span>
      </div>
      
      {/* Decorative chart lines matching UI */}
      <div className="absolute bottom-0 right-0 p-4 opacity-50 flex items-end gap-1">
        {[4, 7, 5, 8, 3, 6, 9].map((h, i) => (
          <div key={i} className={`w-1.5 rounded-t-sm ${i === 6 ? 'bg-orange-500' : 'bg-neutral-700'}`} style={{ height: `${h * 4}px` }}></div>
        ))}
      </div>
    </div>
  );
}
