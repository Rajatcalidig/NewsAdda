import { Briefcase, Calendar, Building2, ChevronRight, Terminal, Network, Code2, Cpu } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Experience | Rajat Tripathi",
  description: "8 Years of Engineering Excellence across 3 Companies.",
};

export default function ExperiencePage() {
  const experiences = [
    {
      id: 1,
      company: "TechNova Solutions",
      role: "Senior Full-Stack AI Engineer",
      period: "2021 - Present",
      duration: "3 Years",
      description: "Led the development of enterprise-grade AI applications, integrating LLMs into production workflows. Architected scalable microservices using Next.js, Node.js, and Python. Reduced latency by 40% and improved system reliability. Spearheaded a shift to vector databases for semantic search capabilities.",
      skills: ["Next.js", "Python", "FastAPI", "OpenAI API", "AWS"],
      icon: <Network className="w-6 h-6 text-orange-500" />
    },
    {
      id: 2,
      company: "DataSphere AI",
      role: "Full-Stack Developer",
      period: "2018 - 2021",
      duration: "3 Years",
      description: "Built dynamic web interfaces and optimized backend infrastructure. Managed a team of 4 developers and successfully delivered 10+ major client projects on time. Implemented real-time data streaming and robust CI/CD pipelines, reducing deployment times by 60%.",
      skills: ["React", "Node.js", "Express", "PostgreSQL", "Docker"],
      icon: <Code2 className="w-6 h-6 text-orange-400" />
    },
    {
      id: 3,
      company: "Quantum Web Corp",
      role: "Frontend Engineer",
      period: "2016 - 2018",
      duration: "2 Years",
      description: "Developed responsive and accessible user interfaces for e-commerce platforms. Collaborated with UX designers to translate complex wireframes into high-quality code. Boosted conversion rates by 25% through performance optimization and core web vitals improvements.",
      skills: ["JavaScript", "HTML/CSS", "React", "Redux", "Figma"],
      icon: <Cpu className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 py-20 min-h-screen">
      {/* Header Section */}
      <div className="mb-20 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
        <p className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-4 uppercase inline-flex items-center gap-2">
          <Terminal size={16} /> Professional Journey
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          8 Years of <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
            Engineering Excellence
          </span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto font-mono">
          A track record of building robust systems, leading technical initiatives, and delivering impactful solutions across 3 dynamic companies.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative border-l-2 border-neutral-800 ml-4 sm:ml-8 lg:ml-12 space-y-16 pb-12">
        {experiences.map((exp, index) => (
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
