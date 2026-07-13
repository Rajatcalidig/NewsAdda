import { Calendar, Clock, Terminal } from "lucide-react";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Engineering Logs | Rajat Tripathi",
  description: "Technical deep dives into building multi-agent systems and scaling LLM infrastructure.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { q?: string; tag?: string };
}) {
  const query = searchParams?.q || "";
  const tag = searchParams?.tag || "";

  const whereClause: any = {
    status: 'PUBLISHED',
  };

  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { content: { contains: query, mode: 'insensitive' } },
    ];
  } else if (tag) {
    whereClause.OR = [
      { title: { contains: tag, mode: 'insensitive' } },
      { content: { contains: tag, mode: 'insensitive' } },
    ];
  }

  const posts = await prisma.post.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 bg-neutral-950 pb-24 selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* 1. Header */}
      <section className="pt-24 pb-16 max-w-4xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-8 bg-orange-500/50"></div>
          <p className="text-orange-500 font-mono font-bold tracking-widest text-xs sm:text-sm uppercase">
            ARCHIVE.INDEX
          </p>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6">
          Engineering Logs
        </h1>
        <p className="text-lg sm:text-xl font-normal text-neutral-300 leading-relaxed max-w-2xl">
          Technical deep dives into building multi-agent systems, scaling LLM infrastructure, and the art of shipping production-grade AI applications.
        </p>
      </section>

      {/* 2. Featured Post */}
      <section className="mb-20">
        <Link href="/blog/multi-agent-systems" className="block group">
          <div className="border border-dashed border-neutral-700 rounded-sm p-8 sm:p-12 flex flex-col lg:flex-row gap-12 lg:items-center relative bg-neutral-950 hover:bg-neutral-900/50 transition-colors duration-500">
            
            <div className="flex-1 order-2 lg:order-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex gap-3">
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs px-3 py-1.5 rounded-sm">#Architecture</span>
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs px-3 py-1.5 rounded-sm">#AI</span>
                </div>
                <p className="text-orange-500 font-mono font-bold tracking-widest text-xs uppercase">
                  LOG_048 // FEATURED
                </p>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-orange-50 transition-colors">
                Architecting Multi-Agent Systems with LangGraph: A Production Guide
              </h2>
              
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                An exhaustive exploration of state management, cyclic graphs, and human-in-the-loop patterns for resilient AI agents. This guide covers the transition from simple linear chains to autonomous specialized agents in high-throughput environments.
              </p>

              <div className="flex items-center gap-6 font-mono text-xs text-neutral-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar size={14} /> Oct 24, 2024
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} /> 18 min read
                </div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2 bg-neutral-900 border border-neutral-800 h-64 sm:h-80 lg:h-96 w-full rounded-sm flex items-center justify-center overflow-hidden relative">
              <div className="absolute top-4 right-4 bg-neutral-950/80 border border-neutral-800 p-2 rounded-sm text-neutral-500">
                <Terminal size={16} />
              </div>
              <div className="text-neutral-600 font-mono text-xs sm:text-sm z-10">[ Abstract AI Image Placeholder ]</div>
              {/* Decorative subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800/20 to-transparent"></div>
            </div>
          </div>
        </Link>
      </section>

      {/* 3. Filter Nav */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900 pb-4 mb-12 gap-6">
        <div className="flex flex-wrap items-center gap-8 font-mono text-sm font-bold uppercase">
          <Link href="/blog" className={!tag ? "text-orange-500 border-b-2 border-orange-500 pb-1" : "text-neutral-500 hover:text-neutral-300 transition-colors pb-1"}>All Logs</Link>
          <Link href="/blog?tag=AI" className={tag === 'AI' ? "text-orange-500 border-b-2 border-orange-500 pb-1" : "text-neutral-500 hover:text-neutral-300 transition-colors pb-1"}>#AI</Link>
          <Link href="/blog?tag=React" className={tag === 'React' ? "text-orange-500 border-b-2 border-orange-500 pb-1" : "text-neutral-500 hover:text-neutral-300 transition-colors pb-1"}>#React</Link>
          <Link href="/blog?tag=Architecture" className={tag === 'Architecture' ? "text-orange-500 border-b-2 border-orange-500 pb-1" : "text-neutral-500 hover:text-neutral-300 transition-colors pb-1"}>#Architecture</Link>
        </div>
        <div className="relative">
          <form method="GET" action="/blog">
            <input 
              type="text" 
              name="q"
              defaultValue={query}
              placeholder="Search..." 
              className="bg-transparent border-none text-neutral-400 font-mono text-sm focus:outline-none focus:ring-0 placeholder:text-neutral-700 w-32"
            />
          </form>
        </div>
      </div>

      {/* 4. Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {posts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-neutral-500 font-mono text-sm border border-dashed border-neutral-800 rounded-sm">
            No logs found matching your criteria.
          </div>
        ) : (
          posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-sm p-8 h-full flex flex-col hover:bg-neutral-900/70 hover:border-neutral-700 transition-all duration-300">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-neutral-600 mb-6 uppercase">
                  <span>LOG_{post.id.slice(-4)}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-50 transition-colors line-clamp-3">
                  {post.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-1 line-clamp-4">
                  {post.content.replace(/[#*`>]/g, '').substring(0, 120)}...
                </p>
                <div className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase">
                  {Math.max(1, Math.ceil(post.content.length / 1000))} min read
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* 5. Subscribe Section */}
      <section className="bg-neutral-900/40 border border-neutral-800 rounded-sm p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto relative overflow-hidden">
        {/* Decorative Mail Icon Background */}
        <div className="absolute top-8 right-8 text-neutral-800/30">
          <svg width="120" height="80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl">
          <p className="text-orange-500 font-mono font-bold tracking-widest text-xs sm:text-sm mb-4 uppercase">
            /subscribe
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Subscribe to the source
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-10">
            Receive direct raw engineering logs, architecture diagrams, and system updates once a month. No fluff, just source code and logic.
          </p>

          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="engineer@domain.com" 
              required
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-neutral-600"
            />
            <button 
              type="submit"
              className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-colors text-center whitespace-nowrap"
            >
              SYNC_DATA
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
