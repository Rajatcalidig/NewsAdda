import Link from "next/link";
import Image from "next/image";
import { Terminal, Code2, ExternalLink, MonitorPlay, ChevronRight, Layout, Database, BrainCircuit, Cloud } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, 
  SiNodedotjs, SiExpress, SiPython, SiFastapi, SiPostgresql, SiRedis,
  SiOpenai, SiDocker, SiVercel, SiGithubactions
} from "react-icons/si";
import { FaAws, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function Home() {
  const projects = await prisma.project.findMany({
    take: 2,
    orderBy: { createdAt: 'desc' }
  });

  const settings = await prisma.setting.findMany();
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value || '';

  const linkedinUrl = getSetting('linkedinUrl') || 'https://www.linkedin.com/in/rajat-tripathi-603b79108/';
  const resumeBase64 = getSetting('resumeBase64');
  const nowStudyingText = getSetting('nowStudyingText');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 bg-neutral-950 pb-8">
      
      {/* 1. Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between min-h-[70vh] py-20 gap-12">
        <div className="flex flex-col justify-center max-w-2xl flex-1">
          <p className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-6 uppercase">
            AVAILABLE FOR IMPACT
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Senior Full-Stack AI Engineer
          </h1>
          <p className="text-lg sm:text-xl font-normal text-neutral-300 leading-relaxed mb-12">
            Building practical engineering solutions for real-world AI impact. Specializing in bridging the gap between LLM research and production-grade applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="#projects" className="w-full sm:w-auto bg-gradient-to-r from-orange-400 to-amber-600 hover:from-orange-500 hover:to-amber-700 text-neutral-950 font-mono font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-all text-center">
              View Projects
            </Link>
            {resumeBase64 && (
              <a href={resumeBase64} download="Resume.pdf" className="w-full sm:w-auto bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-white font-mono font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-all text-center">
                Download Resume
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-blue-600/10 border border-blue-600/30 hover:border-blue-600/60 text-blue-400 font-mono font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-all text-center">
                LinkedIn Profile
              </a>
            )}
          </div>
          
          {/* Now Studying Widget */}
          {nowStudyingText && (
            <div className="mt-12 inline-flex items-center gap-3 bg-neutral-900/50 border border-neutral-800 rounded-full py-2 px-4 shadow-[0_0_15px_rgba(34,197,94,0.1)] self-start group cursor-default hover:bg-neutral-900 hover:border-neutral-700 transition-all">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-mono text-neutral-300">
                <span className="text-green-500 font-bold uppercase tracking-wider text-xs mr-2">Now Studying:</span> 
                {nowStudyingText}
              </span>
            </div>
          )}
          
        </div>
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative flex justify-center lg:justify-end">
          <div className="relative w-full aspect-square max-w-[500px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <Image 
              src="/hero.png" 
              alt="AI Engineering Concepts" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              priority 
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>
      </section>

      <hr className="border-neutral-900 mb-20" />

      {/* 2. Featured Projects */}
      <section id="projects" className="py-12 mb-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-orange-500 pb-2">
            Featured Projects
          </h2>
          <Link href="/projects" className="text-orange-500 hover:text-orange-400 font-mono text-sm tracking-widest uppercase transition-colors flex items-center gap-2 group">
            View All Projects <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 2).map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.id} className="group relative block bg-neutral-900/50 border border-neutral-800 rounded-sm overflow-hidden flex flex-col hover:border-neutral-700 transition-colors">
              <div className="h-64 sm:h-72 w-full relative overflow-hidden bg-neutral-950">
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950/60 backdrop-blur-sm">
                  <span className="text-orange-500 font-mono font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <MonitorPlay size={16} /> Explore
                  </span>
                </div>
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-100" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600 font-mono text-sm">[ Project Image Placeholder ]</div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span key={tech} className="bg-neutral-800 text-neutral-300 font-mono text-xs px-2 py-1 rounded-sm border border-neutral-700/50">{tech}</span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="bg-neutral-800 text-neutral-500 font-mono text-xs px-2 py-1 rounded-sm border border-neutral-700/50">+{project.techStack.length - 3}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {projects.length > 2 && (
          <div className="mt-12 flex justify-center">
            <Link href="/projects" className="group flex items-center gap-4 text-orange-500 font-mono font-bold tracking-widest text-sm uppercase hover:text-orange-400 transition-colors">
              VIEW ALL PROJECTS <MonitorPlay size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </section>

      <hr className="border-neutral-900 mb-20" />

      {/* 3. Tech Stack Section */}
      <section className="py-12 mb-20">
        <h2 className="text-3xl font-bold text-white mb-12 inline-block border-b-4 border-orange-500 pb-2">
          Tech Stack
        </h2>
        
        <div className="flex flex-col gap-12">
          
          {/* Category: Frontend */}
          <div>
            <h3 className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-6 flex items-center gap-2 uppercase">
              <Layout size={18} /> FRONTEND
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'React', exp: '8y', icon: SiReact, color: 'text-sky-400' },
                { name: 'Next.js', exp: '8y', icon: SiNextdotjs, color: 'text-white' },
                { name: 'TypeScript', exp: '6y', icon: SiTypescript, color: 'text-blue-500' },
                { name: 'Tailwind CSS', exp: '4y', icon: SiTailwindcss, color: 'text-sky-400' },
                { name: 'Framer', exp: '3y', icon: SiFramer, color: 'text-pink-500' },
              ].map(skill => (
                <div key={skill.name} className="flex items-center gap-4 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-sm px-6 py-4 group cursor-default">
                  <skill.icon className={`text-3xl ${skill.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm sm:text-base">{skill.name}</span>
                    <span className="text-orange-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase">{skill.exp} {skill.exp !== 'Exp' && 'EXP.'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category: Backend */}
          <div>
            <h3 className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-6 flex items-center gap-2 uppercase">
              <Database size={18} /> BACKEND
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Node.js', exp: '6y', icon: SiNodedotjs, color: 'text-green-500' },
                { name: 'Express', exp: '6y', icon: SiExpress, color: 'text-neutral-300' },
                { name: 'Python', exp: '4y', icon: SiPython, color: 'text-yellow-400' },
                { name: 'FastAPI', exp: '4y', icon: SiFastapi, color: 'text-teal-500' },
                { name: 'PostgreSQL', exp: '5y', icon: SiPostgresql, color: 'text-blue-400' },
                { name: 'Redis', exp: '3y', icon: SiRedis, color: 'text-red-500' },
              ].map(skill => (
                <div key={skill.name} className="flex items-center gap-4 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-sm px-6 py-4 group cursor-default">
                  <skill.icon className={`text-3xl ${skill.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm sm:text-base">{skill.name}</span>
                    <span className="text-orange-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase">{skill.exp} {skill.exp !== 'Exp' && 'EXP.'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category: AI / ML */}
          <div>
            <h3 className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-6 flex items-center gap-2 uppercase">
              <BrainCircuit size={18} /> AI / ML
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'OpenAI API', exp: 'Exp', icon: SiOpenai, color: 'text-white' },
                { name: 'LangGraph', exp: 'Exp', icon: BrainCircuit, color: 'text-orange-400' },
                { name: 'Vector DBs', exp: 'Exp', icon: Database, color: 'text-blue-400' },
              ].map(skill => (
                <div key={skill.name} className="flex items-center gap-4 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-sm px-6 py-4 group cursor-default">
                  <skill.icon className={`text-3xl ${skill.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm sm:text-base">{skill.name}</span>
                    <span className="text-orange-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase">{skill.exp} {skill.exp !== 'Exp' && 'EXP.'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category: Infrastructure */}
          <div>
            <h3 className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-6 flex items-center gap-2 uppercase">
              <Cloud size={18} /> INFRASTRUCTURE
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'AWS', exp: '5y', icon: FaAws, color: 'text-orange-400' },
                { name: 'Vercel', exp: '5y', icon: SiVercel, color: 'text-white' },
                { name: 'Docker', exp: '4y', icon: SiDocker, color: 'text-blue-500' },
                { name: 'GitHub Actions', exp: '4y', icon: SiGithubactions, color: 'text-blue-400' },
              ].map(skill => (
                <div key={skill.name} className="flex items-center gap-4 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-sm px-6 py-4 group cursor-default">
                  <skill.icon className={`text-3xl ${skill.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm sm:text-base">{skill.name}</span>
                    <span className="text-orange-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase">{skill.exp} {skill.exp !== 'Exp' && 'EXP.'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="border-neutral-900 mb-20" />

      {/* 4. About & Work History Container */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20" id="about">
        
        {/* About Me */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-12 inline-block border-b-4 border-orange-500 pb-2">
            About Me
          </h2>
          <div className="text-neutral-300 text-lg leading-relaxed flex flex-col gap-6 mb-12">
            <p>
              I spent 8 years mastering front-end architecture and user experience before diving deep into the world of Artificial Intelligence.
            </p>
            <p>
              This foundation allows me to build AI products that aren't just powerful under the hood, but actually usable and delightful for end-users. I believe the future of AI isn't just better models, but better interfaces that make those models accessible to everyone.
            </p>
          </div>
          
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-orange-500/10 border border-orange-500/30 -translate-x-4 -translate-y-4 rounded-sm -z-10"></div>
            <div className="bg-neutral-900 border border-neutral-800 w-64 h-80 sm:w-80 sm:h-96 flex items-center justify-center rounded-sm overflow-hidden relative">
              <Image src="/profile.jpg" alt="Rajat Tripathi" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 right-4 bg-neutral-950 border border-orange-500/50 text-orange-500 font-mono font-bold tracking-widest text-xs sm:text-sm uppercase px-4 py-3 rounded-sm shadow-xl">
                8+ YEARS EXP.
              </div>
            </div>
          </div>
        </div>

        {/* Work History */}
        <div className="flex-1" id="experience">
           <h2 className="text-3xl font-bold text-white mb-12 inline-block border-b-4 border-orange-500 pb-2">
            Work History
          </h2>
          
          <div className="flex flex-col gap-12 relative">
            {/* Vertical Line */}
            <div className="absolute left-1.5 top-2 bottom-0 w-px bg-neutral-800 -z-10"></div>

            {/* Job 1 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-3 h-3 bg-neutral-950 border-2 border-orange-500 rounded-full"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white">Senior AI Solutions Engineer</h3>
                <span className="bg-neutral-800/80 text-neutral-400 font-mono text-xs px-3 py-1.5 rounded-sm uppercase tracking-wider whitespace-nowrap self-start sm:self-auto border border-neutral-700/50">2022 - PRESENT</span>
              </div>
              <p className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-6 uppercase">TechNova Systems</p>
              
              <ul className="flex flex-col gap-4 text-neutral-300">
                <li className="flex gap-3">
                  <ChevronRight size={20} className="text-neutral-600 shrink-0 mt-0.5" />
                  <span>Leading a team of 4 to integrate RAG-based systems into legacy enterprise software.</span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight size={20} className="text-neutral-600 shrink-0 mt-0.5" />
                  <span>Reduced customer support latency by 60% through custom-tuned Claude deployments.</span>
                </li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-3 h-3 bg-neutral-950 border-2 border-neutral-600 rounded-full"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white">Full-Stack Lead</h3>
                <span className="bg-neutral-800/80 text-neutral-400 font-mono text-xs px-3 py-1.5 rounded-sm uppercase tracking-wider whitespace-nowrap self-start sm:self-auto border border-neutral-700/50">2019 - 2022</span>
              </div>
              <p className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-6 uppercase">Quantify Labs</p>
              
              <ul className="flex flex-col gap-4 text-neutral-300">
                <li className="flex gap-3">
                  <ChevronRight size={20} className="text-neutral-600 shrink-0 mt-0.5" />
                  <span>Architected a multi-tenant SaaS dashboard handling 1M+ monthly events using Next.js.</span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight size={20} className="text-neutral-600 shrink-0 mt-0.5" />
                  <span>Mentored junior developers and established modern CI/CD practices.</span>
                </li>
              </ul>
            </div>

            {/* Job 3 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-3 h-3 bg-neutral-950 border-2 border-neutral-600 rounded-full"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white">Front-End Developer</h3>
                <span className="bg-neutral-800/80 text-neutral-400 font-mono text-xs px-3 py-1.5 rounded-sm uppercase tracking-wider whitespace-nowrap self-start sm:self-auto border border-neutral-700/50">2016 - 2019</span>
              </div>
              <p className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-6 uppercase">Streamline Creative</p>
              
              <ul className="flex flex-col gap-4 text-neutral-300">
                <li className="flex gap-3">
                  <ChevronRight size={20} className="text-neutral-600 shrink-0 mt-0.5" />
                  <span>Delivered 20+ responsive web applications for Fortune 500 clients.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <hr className="border-neutral-900 mb-20" />

      {/* Resume Section */}
      {resumeBase64 && (
        <section className="py-12 mb-8">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-12 text-center flex flex-col items-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Want to see the full picture?</h2>
            <p className="text-neutral-400 mb-8 leading-relaxed">
              Download my complete resume for a detailed breakdown of my experience, education, and technical skills.
            </p>
            <a 
              href={resumeBase64} 
              download="Rajat_Resume.pdf" 
              className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold tracking-widest text-sm uppercase px-12 py-4 rounded-sm transition-all"
            >
              Download Resume (PDF)
            </a>
          </div>
        </section>
      )}

      {/* 5. Contact Section */}
      <section id="contact" className="py-12 mb-4 scroll-mt-24">
        <h2 className="text-3xl font-bold text-white mb-12 inline-block border-b-4 border-orange-500 pb-2">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              I'm currently open for new opportunities and consulting work. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="flex flex-col gap-6 font-mono text-sm">
              <a href="mailto:rajattripathi409@gmail.com?subject=Urgent Inquiry" className="flex items-center gap-4 text-neutral-400 hover:text-orange-500 transition-colors group">
                <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                  <FaEnvelope size={18} />
                </div>
                rajattripathi409@gmail.com
              </a>
              <a href="https://github.com/rajattripathi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-neutral-400 hover:text-orange-500 transition-colors group">
                <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                  <FaGithub size={18} />
                </div>
                github.com/rajattripathi
              </a>
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-neutral-400 hover:text-orange-500 transition-colors group">
                  <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                    <FaLinkedin size={18} />
                  </div>
                  LinkedIn Profile
                </a>
              )}
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-orange-500/5 border border-orange-500/20 translate-x-4 translate-y-4 rounded-sm -z-10"></div>
             <ContactForm />
          </div>
        </div>
      </section>

    </div>
  );
}
