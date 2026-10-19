import { Calendar, Building2, ChevronRight, Terminal, Network, Code2, Cpu, Globe2, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Rajat Tripathi",
  description: "8+ Years of Engineering Excellence across production full-stack systems and AI engineering.",
};

export default function ExperiencePage() {
  const experiences = [
    {
      id: 1,
      company: "Calidig Solution",
      role: "Senior Full-Stack & AI Engineer",
      period: "2022 - Present",
      duration: "3+ Years",
      description: "Leading architectural design and engineering for mission-critical web applications. Integrating AI/LLM features into production applications, building resilient RAG pipelines, and deploying high-performance FastAPI and Next.js services. Mentoring developers on cloud architecture and shipping reliable, user-facing software.",
      skills: ["React", "Next.js", "Node.js", "Python", "FastAPI", "Claude API", "PostgreSQL", "Docker"],
      icon: <Network className="w-6 h-6 text-orange-500" />
    },
    {
      id: 2,
      company: "Freelance",
      role: "Freelance Full-Stack Developer",
      period: "2021 - 2022",
      duration: "1 Year",
      description: "Partnered directly with international founders and agencies to deliver custom web platforms and mobile applications end to end. Owned the full lifecycle from system design, frontend development, database schema modeling to production deployment on AWS.",
      skills: ["React", "React Native", "Node.js", "Express", "TypeScript", "MongoDB", "AWS"],
      icon: <Globe2 className="w-6 h-6 text-amber-500" />
    },
    {
      id: 3,
      company: "RB Tech Solution",
      role: "Full-Stack Developer",
      period: "2018 - 2021",
      duration: "3 Years",
      description: "Developed and maintained full-stack web applications, architecting responsive UIs and robust backend APIs. Optimized relational database performance in PostgreSQL, implemented secure authentication workflows, and improved continuous delivery pipelines.",
      skills: ["React", "Angular", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker"],
      icon: <Code2 className="w-6 h-6 text-orange-400" />
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 py-20 min-h-screen">
      {/* Remote Availability Banner */}
      <div className="mb-12 p-4 sm:p-5 rounded-sm bg-neutral-900/60 border border-orange-500/30 flex items-center justify-between gap-4 flex-col sm:flex-row text-center sm:text-left">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-sm bg-orange-500/10 text-orange-400">
            <Sparkles size={18} />
          </span>
          <p className="text-sm font-mono text-neutral-200">
            <span className="text-orange-400 font-bold uppercase tracking-wider">Open to Remote:</span> Full-Stack &amp; AI Engineering roles. Bringing 8+ years of production experience plus hands-on ML and LLM skills.
          </p>
        </div>
        <Link 
          href="/#contact" 
          className="shrink-0 text-xs font-mono font-bold uppercase tracking-widest bg-orange-500 hover:bg-orange-400 text-neutral-950 px-4 py-2 rounded-sm transition-colors"
        >
          Get In Touch
        </Link>
      </div>

      {/* Header Section */}
      <div className="mb-20 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
        <p className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-4 uppercase inline-flex items-center gap-2">
          <Terminal size={16} /> Professional Journey
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          8+ Years of <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
            Engineering Excellence
          </span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto font-mono">
          Proven history of building and scaling production software, mentoring teams, and seamlessly integrating practical AI into user-facing products.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative border-l-2 border-neutral-800 ml-4 sm:ml-8 lg:ml-12 space-y-16 pb-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-8 sm:pl-16 group">
            {/* Timeline Node */}
            <div className="absolute -left-[17px] top-2 h-8 w-8 rounded-full bg-neutral-950 border-2 border-neutral-800 group-hover:border-orange-500 flex items-center justify-center transition-colors duration-500 z-10">
              <div className="h-3 w-3 rounded-full bg-neutral-800 group-hover:bg-orange-500 transition-colors duration-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover:shadow-[0_0_15px_rgba(249,115,22,0.8)]"></div>
            </div>

            {/* Glowing line segment on hover */}
            <div className="absolute -left-[2px] top-10 w-0.5 h-0 bg-gradient-to-b from-orange-500 to-transparent group-hover:h-full transition-all duration-700 ease-out z-0"></div>

            {/* Content Card */}
            <div className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 sm:p-8 hover:bg-neutral-900/80 hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-orange-500/5 relative overflow-hidden">
              
              {/* Decorative gradient blob inside card */}
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-orange-500/5 rounded-full blur-[50px] group-hover:bg-orange-500/10 transition-colors duration-500"></div>

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-neutral-950 rounded-lg border border-neutral-800 text-orange-500">
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-lg text-neutral-300 font-medium flex items-center gap-2 mt-1">
                        <Building2 size={16} className="text-neutral-500" />
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-base leading-relaxed mt-6">
                    {exp.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-neutral-950 text-neutral-300 font-mono text-xs px-3 py-1.5 rounded-sm border border-neutral-800/80 group-hover:border-orange-500/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:gap-2 shrink-0 border-t lg:border-t-0 border-neutral-800 pt-4 lg:pt-0">
                  <div className="flex items-center gap-2 text-orange-500 font-mono text-sm tracking-widest font-semibold uppercase bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
                    <Calendar size={14} /> {exp.period}
                  </div>
                  <div className="text-neutral-500 font-mono text-xs tracking-widest uppercase">
                    {exp.duration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <Link href="/" className="group flex items-center gap-4 text-neutral-400 font-mono font-bold tracking-widest text-sm uppercase hover:text-orange-500 transition-colors">
          <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
