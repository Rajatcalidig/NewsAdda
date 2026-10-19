import Link from "next/link";
import Image from "next/image";
import { 
  ChevronRight, MonitorPlay, Sparkles, CheckCircle2, 
  BookOpen, Award, ArrowUpRight, Code2, Database, BrainCircuit, 
  Layers, Terminal, ExternalLink
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiNodedotjs, SiPython, SiFastapi, SiPostgresql, 
  SiDocker, SiPrisma, SiRedux, SiAngular, SiAnthropic
} from "react-icons/si";
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function Home() {
  const projects = await prisma.project.findMany({
    take: 8,
    orderBy: { updatedAt: 'desc' }
  });

  const settings = await prisma.setting.findMany();
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value || '';

  const linkedinUrl = getSetting('linkedinUrl') || 'https://www.linkedin.com/in/rajat-tripathi-603b79108/';
  const resumeBase64 = getSetting('resumeBase64');
  const nowStudyingText = getSetting('nowStudyingText') || 'Deep Learning & Neural Networks, LangChain & RAG, LLM Application Development';
  const rawWa = getSetting('whatsappNumber') || '+918076595560';
  const whatsappNumber = rawWa.replace(/[^0-9]/g, '') || '918076595560';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 bg-neutral-950 pb-16">
      
      {/* 1. Remote Availability Announcement Banner */}
      <div className="pt-8">
        <div className="p-4 sm:p-5 rounded-sm bg-neutral-900/60 border border-orange-500/30 flex items-center justify-between gap-4 flex-col sm:flex-row shadow-[0_0_20px_rgba(249,115,22,0.06)]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-sm bg-orange-500/10 text-orange-400">
              <Sparkles size={18} />
            </span>
            <p className="text-sm font-mono text-neutral-200">
              <span className="text-orange-400 font-bold uppercase tracking-wider">Open to Remote:</span> Full-Stack and AI Engineering roles. Bringing 8+ years of production experience plus hands-on ML and LLM skills.
            </p>
          </div>
          <Link 
            href="#contact" 
            className="shrink-0 text-xs font-mono font-bold uppercase tracking-widest bg-orange-500 hover:bg-orange-400 text-neutral-950 px-4 py-2 rounded-sm transition-colors"
          >
            Connect Now
          </Link>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between min-h-[65vh] py-16 lg:py-20 gap-12">
        <div className="flex flex-col justify-center max-w-2xl flex-1">
          {/* Eyebrow tag */}
          <p className="text-orange-500 font-mono font-bold tracking-widest text-xs sm:text-sm mb-6 uppercase inline-flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            SENIOR FULL-STACK DEVELOPER · MOVING INTO AI ENGINEERING
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
            Senior Full-Stack Developer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-orange-500">
              Building AI-Powered Products
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl font-normal text-neutral-300 leading-relaxed mb-10">
            8+ years shipping production apps with React, Next.js, and Node.js. I've added Python, FastAPI, and machine learning to my toolkit and now build LLM-powered features: RAG pipelines, AI agents, and intelligent product experiences, end to end.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <Link 
              href="#projects" 
              className="w-full sm:w-auto bg-gradient-to-r from-orange-400 to-amber-600 hover:from-orange-500 hover:to-amber-700 text-neutral-950 font-mono font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-all text-center shadow-lg shadow-orange-500/20"
            >
              View Projects
            </Link>
            {resumeBase64 && (
              <a 
                href={resumeBase64} 
                download="Rajat_Tripathi_Resume.pdf" 
                className="w-full sm:w-auto bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-white font-mono font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-all text-center"
              >
                Download Resume
              </a>
            )}
            {linkedinUrl && (
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto bg-blue-600/10 border border-blue-600/30 hover:border-blue-600/60 text-blue-400 font-mono font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-all text-center flex items-center justify-center gap-2"
              >
                <FaLinkedin size={16} /> LinkedIn Profile
              </a>
            )}
          </div>
          
          {/* Now Studying Status Widget */}
          {nowStudyingText && (
            <div className="inline-flex items-center gap-3 bg-neutral-900/60 border border-neutral-800 rounded-full py-2.5 px-4 shadow-[0_0_15px_rgba(34,197,94,0.1)] self-start group cursor-default hover:border-neutral-700 transition-all">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-mono text-neutral-300">
                <span className="text-green-500 font-bold uppercase tracking-wider text-xs mr-2">Now Studying:</span> 
                {nowStudyingText}
              </span>
            </div>
          )}
        </div>

        {/* Hero Visual / Avatar */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative flex justify-center lg:justify-end">
          <div className="relative w-full aspect-square max-w-[460px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <Image 
              src="/hero.png" 
              alt="Rajat Tripathi AI Engineering" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              priority 
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>
      </section>

      {/* 3. Stats Strip */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-neutral-800/80 bg-neutral-900/40 p-6 rounded-sm">
          <div className="flex flex-col p-4 border-b md:border-b-0 md:border-r border-neutral-800/80">
            <span className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-1">Track Record</span>
            <span className="text-2xl font-bold text-white mb-1">8+ Years</span>
            <span className="text-neutral-400 text-sm">in Software Engineering &amp; Delivery</span>
          </div>
          <div className="flex flex-col p-4 border-b md:border-b-0 md:border-r border-neutral-800/80">
            <span className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-1">Full Stack</span>
            <span className="text-2xl font-bold text-white mb-1">Production Core</span>
            <span className="text-neutral-400 text-sm">React · Next.js · Node.js · FastAPI</span>
          </div>
          <div className="flex flex-col p-4">
            <span className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-1">AI Stack</span>
            <span className="text-2xl font-bold text-white mb-1">Applied AI / ML</span>
            <span className="text-neutral-400 text-sm">Python · ML · LangChain · Claude API</span>
          </div>
        </div>
      </section>

      <hr className="border-neutral-900 mb-20" />

      {/* 4. About Section */}
      <section id="about" className="py-8 mb-20 scroll-mt-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-2 w-8 bg-orange-500 rounded-sm"></span>
              <span className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase">Background &amp; Philosophy</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight">
              Eight Years of Shipping. <span className="text-orange-500">Now Adding AI.</span>
            </h2>

            <div className="text-neutral-300 text-base sm:text-lg leading-relaxed flex flex-col gap-6">
              <p>
                I started in frontend (React, Angular, Next.js) and grew into full-stack development with Node.js, PostgreSQL, and Docker. Over 8 years I've built, shipped, and mentored others on production applications.
              </p>
              <p>
                Recently I've been deliberately upskilling for AI engineering. I completed formal training in Python, data science, core machine learning, and FastAPI, and I apply it by building real products with LLMs, LangChain, and the Claude API. My edge is that I already know how to ship software, so I can take an AI idea from prototype to a reliable, user-facing application.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 pt-4 border-t border-neutral-800/60 font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800 px-3 py-2 rounded-sm">
                <CheckCircle2 size={16} className="text-orange-500" />
                <span>Production-Tested Architecture</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800 px-3 py-2 rounded-sm">
                <CheckCircle2 size={16} className="text-orange-500" />
                <span>Zero Hallucination UX Mindset</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800 px-3 py-2 rounded-sm">
                <CheckCircle2 size={16} className="text-orange-500" />
                <span>End-to-End Delivery Ownership</span>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-orange-500/10 border border-orange-500/30 -translate-x-4 -translate-y-4 rounded-sm -z-10"></div>
            <div className="bg-neutral-900 border border-neutral-800 w-64 h-80 sm:w-80 sm:h-96 flex items-center justify-center rounded-sm overflow-hidden relative">
              <Image 
                src="/profile.jpg" 
                alt="Rajat Tripathi" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                priority 
                className="object-cover opacity-85 hover:opacity-100 transition-opacity duration-500" 
              />
              <div className="absolute bottom-4 right-4 bg-neutral-950/90 backdrop-blur-sm border border-orange-500/50 text-orange-500 font-mono font-bold tracking-widest text-xs sm:text-sm uppercase px-4 py-2.5 rounded-sm shadow-xl">
                8+ YEARS EXP.
              </div>
            </div>
          </div>

        </div>
      </section>

      <hr className="border-neutral-900 mb-20" />

      {/* 5. Skills Section (Two Blocks: Core Engineering & AI/ML) */}
      <section className="py-8 mb-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-2 w-8 bg-orange-500 rounded-sm"></span>
            <span className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase">Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills &amp; Capabilities
          </h2>
          <p className="text-neutral-400 mt-2 font-mono text-sm max-w-2xl">
            Grouped to showcase 8+ years of production engineering alongside dedicated AI specialization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Block 1: Core engineering (expert) */}
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 border-b border-neutral-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-sm bg-neutral-950 border border-neutral-800 text-orange-500">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Core Engineering</h3>
                    <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">Expert · 8+ Years Production</span>
                  </div>
                </div>
                <span className="bg-neutral-800 text-neutral-300 font-mono text-xs px-2.5 py-1 rounded-sm border border-neutral-700/50">
                  Primary Foundation
                </span>
              </div>

              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Enterprise architecture, responsive component design, robust backend systems, and database engineering shipped across production applications.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: 'React', icon: SiReact, color: 'text-sky-400' },
                  { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
                  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-400' },
                  { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
                  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-400' },
                  { name: 'Prisma', icon: SiPrisma, color: 'text-teal-400' },
                  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-sky-400' },
                  { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
                  { name: 'Angular', icon: SiAngular, color: 'text-red-500' },
                  { name: 'Redux / NgRx', icon: SiRedux, color: 'text-purple-400' },
                  { name: 'React Native', icon: SiReact, color: 'text-sky-400' },
                ].map(skill => (
                  <div 
                    key={skill.name} 
                    className="flex items-center gap-2.5 bg-neutral-950 border border-neutral-800 hover:border-orange-500/40 px-3.5 py-2 rounded-sm transition-all group"
                  >
                    <skill.icon className={`text-base ${skill.color}`} />
                    <span className="text-sm text-neutral-200 font-medium group-hover:text-white">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800/80 font-mono text-xs text-neutral-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              Mentoring, CI/CD, microservices &amp; high-concurrency systems
            </div>
          </div>

          {/* Block 2: AI & ML (growing) */}
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 border-b border-neutral-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-sm bg-neutral-950 border border-neutral-800 text-orange-400">
                    <BrainCircuit size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI &amp; Machine Learning</h3>
                    <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">Active Upskilling &amp; Applied AI</span>
                  </div>
                </div>
                <span className="bg-orange-500/10 text-orange-400 font-mono text-xs px-2.5 py-1 rounded-sm border border-orange-500/30">
                  Applied Transition
                </span>
              </div>

              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Applied LLM workflows, retrieval-augmented generation (RAG), agent orchestrations, and high-performance Python microservices powering real-world applications.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: 'Python', icon: SiPython, color: 'text-yellow-400' },
                  { name: 'FastAPI', icon: SiFastapi, color: 'text-teal-400' },
                  { name: 'Claude API', icon: SiAnthropic, color: 'text-orange-400' },
                  { name: 'LangChain', icon: BrainCircuit, color: 'text-orange-400' },
                  { name: 'LangGraph', icon: BrainCircuit, color: 'text-amber-400' },
                  { name: 'RAG Pipelines', icon: Database, color: 'text-blue-400' },
                  { name: 'Data Science', icon: Code2, color: 'text-green-400' },
                  { name: 'Machine Learning', icon: BrainCircuit, color: 'text-purple-400' },
                ].map(skill => (
                  <div 
                    key={skill.name} 
                    className="flex items-center gap-2.5 bg-neutral-950 border border-neutral-800 hover:border-orange-500/40 px-3.5 py-2 rounded-sm transition-all group"
                  >
                    <skill.icon className={`text-base ${skill.color}`} />
                    <span className="text-sm text-neutral-200 font-medium group-hover:text-white">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800/80 font-mono text-xs text-neutral-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Bridging LLM research into production-grade user experiences
            </div>
          </div>

        </div>
      </section>

      <hr className="border-neutral-900 mb-20" />

      {/* 6. Learning & Certifications Section */}
      <section className="py-8 mb-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-2 w-8 bg-orange-500 rounded-sm"></span>
            <span className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase">Structured Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Continuous Learning
          </h2>
          <p className="text-neutral-400 mt-2 font-mono text-sm max-w-2xl">
            Formal coursework and verified certifications accelerating the transition into AI engineering.
          </p>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              area: "Python",
              provider: "Udemy",
              course: "Complete Python Bootcamp & Advanced Python Programming",
              badge: "Verified Completion",
              desc: "Object-oriented programming, concurrency, data structures, and script optimization for engineering pipelines."
            },
            {
              area: "Data Science & Machine Learning",
              provider: "Udemy",
              course: "Data Science & Machine Learning Fundamentals",
              badge: "Verified Completion",
              desc: "NumPy, Pandas, scikit-learn, statistical evaluation metrics, linear regression, and feature engineering."
            },
            {
              area: "FastAPI",
              provider: "Udemy",
              course: "FastAPI - Modern High-Performance Python APIs",
              badge: "Verified Completion",
              desc: "Asynchronous endpoints, Pydantic schemas, dependency injection, and microservices for AI inference."
            }
          ].map((item) => (
            <div key={item.area} className="bg-neutral-900/40 border border-neutral-800 rounded-sm p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-sm border border-orange-500/20">
                    {item.area}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {item.provider}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.course}</h4>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800 font-mono text-xs">
                <span className="text-green-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 size={14} /> {item.badge}
                </span>
                <span className="text-neutral-500">Udemy Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning Banner */}
        <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-sm flex items-start sm:items-center gap-4 flex-col sm:flex-row">
          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-sm text-orange-500 shrink-0">
            <BookOpen size={24} />
          </div>
          <div className="flex-1">
            <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-wider block mb-1">
              Currently Learning &amp; Deepening
            </span>
            <p className="text-neutral-200 text-sm sm:text-base font-medium">
              Deep Learning &amp; Neural Networks, LangChain &amp; RAG, LLM application development.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-neutral-900 mb-20" />

      {/* 7. Featured Projects Section */}
      <section id="projects" className="py-8 mb-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-2 w-8 bg-orange-500 rounded-sm"></span>
              <span className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase">Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Projects: Where Full-Stack Meets AI
            </h2>
          </div>
          <Link 
            href="/projects" 
            className="text-orange-500 hover:text-orange-400 font-mono text-sm tracking-widest uppercase transition-colors flex items-center gap-2 group"
          >
            View All Projects <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link 
              href={`/projects/${project.slug}`} 
              key={project.id} 
              className="group relative block bg-neutral-900/50 border border-neutral-800 rounded-sm overflow-hidden flex flex-col hover:border-neutral-700 transition-colors"
            >
              <div className="h-60 sm:h-64 w-full relative overflow-hidden bg-neutral-950">
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950/70 backdrop-blur-sm">
                  <span className="text-orange-500 font-mono font-bold uppercase tracking-widest text-sm flex items-center gap-2 bg-neutral-900/90 px-4 py-2 rounded-sm border border-orange-500/30">
                    <MonitorPlay size={16} /> Read Case Study
                  </span>
                </div>
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.name} 
                    loading="lazy" 
                    decoding="async" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-100" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600 font-mono text-sm">[ Project Preview ]</div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="bg-neutral-800 text-neutral-300 font-mono text-xs px-2.5 py-1 rounded-sm border border-neutral-700/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Link 
            href="/projects" 
            className="group flex items-center gap-4 text-orange-500 font-mono font-bold tracking-widest text-sm uppercase hover:text-orange-400 transition-colors"
          >
            EXPLORE ALL PROJECTS <MonitorPlay size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <hr className="border-neutral-900 mb-20" />

      {/* 8. Work History & Experience Section */}
      <section className="py-8 mb-20" id="experience">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-2 w-8 bg-orange-500 rounded-sm"></span>
              <span className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase">Career Trajectory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Work History
            </h2>
          </div>
          <Link 
            href="/experience" 
            className="text-orange-500 hover:text-orange-400 font-mono text-sm tracking-widest uppercase transition-colors flex items-center gap-2 group"
          >
            Detailed Timeline <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col gap-10 relative">
          <div className="absolute left-1.5 top-2 bottom-0 w-px bg-neutral-800 -z-10"></div>

          {/* Job 1: Calidig Solution */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-2 w-3 h-3 bg-neutral-950 border-2 border-orange-500 rounded-full"></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">Senior Full-Stack &amp; AI Engineer</h3>
              <span className="bg-neutral-800/80 text-orange-400 font-mono text-xs px-3 py-1.5 rounded-sm uppercase tracking-wider whitespace-nowrap self-start sm:self-auto border border-neutral-700/50">
                2022 – PRESENT
              </span>
            </div>
            <p className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-4 uppercase">
              Calidig Solution
            </p>
            
            <ul className="flex flex-col gap-3 text-neutral-300 text-sm sm:text-base">
              <li className="flex gap-3">
                <ChevronRight size={18} className="text-orange-500 shrink-0 mt-1" />
                <span><strong className="text-white">Integrating AI/LLM features into production applications:</strong> Built reliable RAG pipelines, FastAPI microservices, and stateful multi-turn conversational agents with Claude API.</span>
              </li>
              <li className="flex gap-3">
                <ChevronRight size={18} className="text-neutral-600 shrink-0 mt-1" />
                <span>Architected high-scale web platforms with Next.js, Node.js, and PostgreSQL, focusing on performance, caching, and resilient system design.</span>
              </li>
              <li className="flex gap-3">
                <ChevronRight size={18} className="text-neutral-600 shrink-0 mt-1" />
                <span>Mentored engineering team members on modern full-stack conventions, automated testing, and CI/CD pipelines.</span>
              </li>
            </ul>
          </div>

          {/* Job 2: Freelance */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-2 w-3 h-3 bg-neutral-950 border-2 border-neutral-600 rounded-full"></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">Freelance Full-Stack Developer</h3>
              <span className="bg-neutral-800/80 text-neutral-400 font-mono text-xs px-3 py-1.5 rounded-sm uppercase tracking-wider whitespace-nowrap self-start sm:self-auto border border-neutral-700/50">
                2021 – 2022
              </span>
            </div>
            <p className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-4 uppercase">
              Independent / Global Clients
            </p>
            
            <ul className="flex flex-col gap-3 text-neutral-300 text-sm sm:text-base">
              <li className="flex gap-3">
                <ChevronRight size={18} className="text-neutral-600 shrink-0 mt-1" />
                <span>Delivered full-stack web and mobile products using React, React Native, Node.js, and TypeScript for international startups.</span>
              </li>
              <li className="flex gap-3">
                <ChevronRight size={18} className="text-neutral-600 shrink-0 mt-1" />
                <span>Implemented database modeling, cloud deployments on AWS/Docker, and third-party API integrations from requirement to release.</span>
              </li>
            </ul>
          </div>

          {/* Job 3: RB Tech Solution */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-2 w-3 h-3 bg-neutral-950 border-2 border-neutral-600 rounded-full"></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">Full-Stack Developer</h3>
              <span className="bg-neutral-800/80 text-neutral-400 font-mono text-xs px-3 py-1.5 rounded-sm uppercase tracking-wider whitespace-nowrap self-start sm:self-auto border border-neutral-700/50">
                2018 – 2021
              </span>
            </div>
            <p className="text-orange-500 font-mono font-bold tracking-widest text-sm mb-4 uppercase">
              RB Tech Solution
            </p>
            
            <ul className="flex flex-col gap-3 text-neutral-300 text-sm sm:text-base">
              <li className="flex gap-3">
                <ChevronRight size={18} className="text-neutral-600 shrink-0 mt-1" />
                <span>Developed responsive single-page applications and dashboards with React, Angular, and TypeScript.</span>
              </li>
              <li className="flex gap-3">
                <ChevronRight size={18} className="text-neutral-600 shrink-0 mt-1" />
                <span>Built robust Node.js backend services and optimized complex PostgreSQL queries for high-throughput enterprise systems.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      <hr className="border-neutral-900 mb-20" />

      {/* 9. Contact Section */}
      <section id="contact" className="py-8 mb-4 scroll-mt-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-2 w-8 bg-orange-500 rounded-sm"></span>
            <span className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase">Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's build something useful.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="p-5 mb-8 rounded-sm bg-neutral-900/60 border border-orange-500/30">
              <p className="text-orange-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
                Availability
              </p>
              <p className="text-neutral-200 text-base leading-relaxed">
                Open to remote Full-Stack and AI Engineering roles. I bring 8 years of production experience plus hands-on ML and LLM skills.
              </p>
            </div>

            <p className="text-neutral-300 text-base leading-relaxed mb-8">
              Whether you're looking to build an AI-powered product, need senior full-stack execution, or want to discuss collaborating, let's talk!
            </p>

            <div className="flex flex-col gap-5 font-mono text-sm">
              <a 
                href="mailto:rajattripathi409@gmail.com?subject=Opportunity%20Inquiry" 
                className="flex items-center gap-4 text-neutral-300 hover:text-orange-500 transition-colors group"
              >
                <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                  <FaEnvelope size={18} />
                </div>
                rajattripathi409@gmail.com
              </a>
              <a 
                href="https://github.com/rajattripathi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 text-neutral-300 hover:text-orange-500 transition-colors group"
              >
                <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                  <FaGithub size={18} />
                </div>
                github.com/rajattripathi
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Hi%20Rajat,%20I%20am%20reaching%20out%20from%20your%20portfolio!`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 text-neutral-300 hover:text-emerald-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors text-emerald-400">
                  <FaWhatsapp size={18} />
                </div>
                Direct WhatsApp Chat
              </a>
              {linkedinUrl && (
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-neutral-300 hover:text-orange-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                    <FaLinkedin size={18} />
                  </div>
                  linkedin.com/in/rajat-tripathi-603b79108
                </a>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/5 border border-orange-500/20 translate-x-3 translate-y-3 rounded-sm -z-10"></div>
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  );
}
