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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-neutral-950 font-mono font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
              {status !== "loading" && <Send size={18} />}
            </button>

            <a
              href="https://wa.me/918076595560?text=Hi%20Rajat,%20I%20am%20reaching%20out%20from%20your%20portfolio!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold tracking-wider text-xs uppercase px-6 py-4 rounded-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              Direct WhatsApp Chat
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
