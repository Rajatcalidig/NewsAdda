import { Calendar, Clock, Share2, Copy, ArrowLeft, CheckCircle2, Terminal } from "lucide-react";
import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 bg-neutral-950 pb-24 selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* 1. Article Header */}
      <section className="pt-24 pb-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase mb-8">
          <Link href="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
          <span>›</span>
          <span className="hover:text-orange-500 transition-colors cursor-pointer">AI</span>
          <span>›</span>
          <span className="text-orange-500">Multi-Agent Systems</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          Architecting Multi-Agent Systems with LangGraph: A Production Guide
        </h1>
        
        <p className="text-lg sm:text-xl font-normal text-neutral-300 leading-relaxed mb-12 border-l-2 border-neutral-800 pl-6">
          Moving beyond simple linear chains. Learn how to design cyclic computational graphs that enable robust, stateful multi-agent collaboration for enterprise-scale LLM applications.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900 pb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-sm flex items-center justify-center overflow-hidden">
              <div className="text-neutral-600 font-mono text-[10px] text-center leading-tight">Avatar</div>
            </div>
            <div>
              <p className="text-white font-bold text-base">Erik Thorne</p>
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">Senior AI Engineer</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6 font-mono text-xs text-neutral-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar size={14} /> May 14, 2024
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} /> 12 min read
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-sm text-neutral-400 hover:text-orange-500 hover:border-orange-500/50 transition-colors">
                <Share2 size={16} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-sm text-neutral-400 hover:text-orange-500 hover:border-orange-500/50 transition-colors">
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Two-Column Layout */}
      <section className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto relative">
        
        {/* Left Sidebar (Sticky TOC) */}
        <div className="hidden lg:block w-64 shrink-0 relative">
          <div className="sticky top-32">
            <p className="text-neutral-500 font-mono text-xs font-bold tracking-widest uppercase mb-6">
              CONTENTS
            </p>
            <nav className="flex flex-col gap-4 font-mono text-sm">
              <a href="#section-1" className="text-orange-500 transition-colors">01. The Cyclic Shift</a>
              <a href="#section-2" className="text-neutral-400 hover:text-white transition-colors">02. Persistent State Management</a>
              <a href="#section-3" className="text-neutral-400 hover:text-white transition-colors">03. Orchestration Patterns</a>
              <a href="#section-4" className="text-neutral-400 hover:text-white transition-colors">04. Debugging Graphs</a>
            </nav>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="flex-1 max-w-3xl prose prose-invert prose-orange lg:prose-lg">
          
          <div id="section-1" className="scroll-mt-32 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">01. The Cyclic Shift</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Standard RAG pipelines often follow a "Chain" pattern: Input → Retrieval → Generation → Output. While effective for simple queries, this linear structure fails when complex reasoning requires reflection, error correction, or multiple specialized tools. Enter <strong className="text-orange-500">LangGraph</strong>.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-10">
              By modeling the logic as a stateful graph where nodes represent actions and edges represent the control flow, we can introduce cycles. An agent can now "look" at its own output, decide it's insufficient, and loop back to the retrieval phase—a fundamental requirement for production-grade reliability.
            </p>
            
            {/* Image Placeholder */}
            <div className="bg-neutral-900 border border-neutral-800 h-64 sm:h-80 w-full rounded-sm flex items-center justify-center mb-16 relative overflow-hidden">
               <div className="absolute top-4 right-4 bg-neutral-950/80 border border-neutral-800 p-2 rounded-sm text-neutral-500">
                <Terminal size={16} />
              </div>
              <div className="text-neutral-600 font-mono text-sm">[ Graph Architecture Diagram ]</div>
            </div>
          </div>

          <div id="section-2" className="scroll-mt-32 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">02. Persistent State Management</h2>
            <p className="text-neutral-300 leading-relaxed mb-8">
              In a multi-agent system, the "State" is the single source of truth. LangGraph handles this via a TypedDict or a specialized State class.
            </p>

            {/* Code Block */}
            <div className="bg-[#0A0A0A] border border-neutral-800 rounded-sm overflow-hidden mb-10">
              <div className="flex justify-end px-4 py-2 bg-neutral-900 border-b border-neutral-800">
                <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">python</span>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                  <code className="text-neutral-300">
                    <span className="text-orange-400">from</span> typing <span className="text-orange-400">import</span> Annotated, TypedDict<br/>
                    <span className="text-orange-400">from</span> langgraph.graph <span className="text-orange-400">import</span> StateGraph<br/>
                    <br/>
                    <span className="text-orange-400">class</span> <span className="text-amber-200">AgentState</span>(TypedDict):<br/>
                    {'    '}messages: Annotated[<span className="text-blue-400">list</span>, add_messages]<br/>
                    {'    '}next_step: <span className="text-blue-400">str</span><br/>
                    {'    '}is_finished: <span className="text-blue-400">bool</span><br/>
                    <br/>
                    workflow = StateGraph(AgentState)<br/>
                    <span className="text-neutral-600"># Define nodes and edges below...</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* Blockquote */}
            <blockquote className="border-l-4 border-orange-500 pl-6 py-2 my-12 bg-orange-500/5 rounded-r-sm">
              <p className="text-neutral-300 text-lg italic leading-relaxed m-0">
                "The transition from chains to graphs is not just a syntax change; it's a cognitive shift in how we architect machine intelligence. Reliability emerges from error-correction loops, not just better prompts."
              </p>
            </blockquote>
          </div>

          <div id="section-3" className="scroll-mt-32 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">03. Orchestration Patterns</h2>
            
            <ul className="flex flex-col gap-6 list-none p-0 m-0">
              <li className="flex gap-4 items-start">
                <CheckCircle2 className="text-orange-500 shrink-0 mt-1" size={20} />
                <p className="text-neutral-300 leading-relaxed m-0">
                  <strong className="text-white">Supervisor Pattern:</strong> A central LLM acts as the router, delegating tasks to sub-agents and synthesizing results.
                </p>
              </li>
              <li className="flex gap-4 items-start">
                <CheckCircle2 className="text-orange-500 shrink-0 mt-1" size={20} />
                <p className="text-neutral-300 leading-relaxed m-0">
                  <strong className="text-white">Peer-to-Peer Handoff:</strong> Agents pass the state directly to one another based on predefined logic or conditional results.
                </p>
              </li>
              <li className="flex gap-4 items-start">
                <CheckCircle2 className="text-orange-500 shrink-0 mt-1" size={20} />
                <p className="text-neutral-300 leading-relaxed m-0">
                  <strong className="text-white">Hierarchical Teams:</strong> Complex tasks are broken down into sub-graphs, where each sub-graph is managed by its own supervisor.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Footer Actions */}
      <section className="max-w-4xl mx-auto border-t border-neutral-900 mt-16 pt-12 mb-24 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/blog" className="flex items-center gap-3 text-neutral-400 hover:text-orange-500 font-mono text-sm tracking-widest uppercase transition-colors">
          <ArrowLeft size={16} /> Back to all logs
        </Link>
        <div className="flex items-center gap-4">
          <button className="bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-white font-mono font-bold tracking-widest text-sm uppercase px-6 py-3 rounded-sm transition-all">
            Save Article
          </button>
          <button className="bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold tracking-widest text-sm uppercase px-6 py-3 rounded-sm transition-colors">
            Subscribe to Research
          </button>
        </div>
      </section>

      {/* 4. Related Research */}
      <section className="max-w-6xl mx-auto pt-12 border-t border-neutral-900">
        <h2 className="text-3xl font-bold text-white mb-10">Related Research</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Link href="#" className="group block">
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-sm p-6 h-full flex flex-col hover:bg-neutral-900/70 hover:border-neutral-700 transition-all duration-300">
              <div className="bg-neutral-950 border border-neutral-800 h-40 w-full mb-6 rounded-sm flex items-center justify-center">
                <div className="text-neutral-600 font-mono text-xs">[ Network Nodes Image ]</div>
              </div>
              <p className="text-orange-500 font-mono text-[10px] font-bold tracking-widest uppercase mb-3">LLM OPS</p>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-50 transition-colors">
                Optimizing Token Consumption in Stateful Graphs
              </h3>
              <div className="mt-auto pt-4 flex items-center justify-between font-mono text-[10px] text-neutral-500 tracking-widest uppercase border-t border-neutral-800/50">
                <span>May 02, 2024</span>
                <span>8 min read</span>
              </div>
            </div>
          </Link>

          <Link href="#" className="group block">
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-sm p-6 h-full flex flex-col hover:bg-neutral-900/70 hover:border-neutral-700 transition-all duration-300">
              <div className="bg-neutral-950 border border-neutral-800 h-40 w-full mb-6 rounded-sm flex items-center justify-center">
                <div className="text-neutral-600 font-mono text-xs">[ Desktop Monitor Image ]</div>
              </div>
              <p className="text-orange-500 font-mono text-[10px] font-bold tracking-widest uppercase mb-3">ARCHITECTURE</p>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-50 transition-colors">
                Building Scalable Tool-Use Frameworks
              </h3>
              <div className="mt-auto pt-4 flex items-center justify-between font-mono text-[10px] text-neutral-500 tracking-widest uppercase border-t border-neutral-800/50">
                <span>Apr 28, 2024</span>
                <span>15 min read</span>
              </div>
            </div>
          </Link>

          <Link href="#" className="group block">
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-sm p-6 h-full flex flex-col hover:bg-neutral-900/70 hover:border-neutral-700 transition-all duration-300">
              <div className="bg-neutral-950 border border-neutral-800 h-40 w-full mb-6 rounded-sm flex items-center justify-center">
                <div className="text-neutral-600 font-mono text-xs">[ Abstract Flow Image ]</div>
              </div>
              <p className="text-orange-500 font-mono text-[10px] font-bold tracking-widest uppercase mb-3">RESEARCH</p>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-50 transition-colors">
                Comparative Analysis: LangGraph vs. AutoGen
              </h3>
              <div className="mt-auto pt-4 flex items-center justify-between font-mono text-[10px] text-neutral-500 tracking-widest uppercase border-t border-neutral-800/50">
                <span>Apr 15, 2024</span>
                <span>10 min read</span>
              </div>
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
}
