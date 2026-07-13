"use client";

import { useState } from "react";
import { Send, CheckCircle, XCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-neutral-900/30 border border-neutral-800/80 rounded-sm p-8 sm:p-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-up">
          <CheckCircle size={64} className="text-orange-500 mb-6" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Message Sent!</h3>
          <p className="text-neutral-400 max-w-md">
            Thanks for reaching out. I'll get back to you as soon as possible.
          </p>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-8 text-orange-500 font-mono text-sm uppercase tracking-widest hover:text-orange-400 border-b border-orange-500/30 hover:border-orange-400 pb-1 transition-all"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-neutral-500 font-mono text-xs font-bold tracking-widest uppercase">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-sans"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-neutral-500 font-mono text-xs font-bold tracking-widest uppercase">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-sans"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-neutral-500 font-mono text-xs font-bold tracking-widest uppercase">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all font-sans resize-y"
              placeholder="How can we work together?"
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-400 bg-red-950/30 border border-red-900/50 p-4 rounded-sm text-sm">
              <XCircle size={18} />
              <p>{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="self-start bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-neutral-950 font-mono font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3 mt-2"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
            {!status && <Send size={18} />}
          </button>
        </form>
      )}
    </div>
  );
}
