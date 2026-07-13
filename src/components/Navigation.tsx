"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

// Custom SVG Logo for Rajat Tripathi
const RajatLogo = () => (
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="group-hover:scale-110 transition-transform duration-300"
  >
    {/* Dark background square with slight rotation */}
    <rect x="5" y="5" width="90" height="90" rx="12" fill="#0A0A0A" stroke="#F97316" strokeWidth="3" />
    
    {/* Letter 'R' */}
    <path 
      d="M30 30 V70 M30 30 H50 C60 30 60 45 50 45 H30 M45 45 L58 70" 
      stroke="#FFFFFF" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Letter 'T' */}
    <path 
      d="M45 45 H75 M60 45 V70" 
      stroke="#F97316" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Technical Dots/Nodes */}
    <circle cx="30" cy="30" r="4" fill="#F97316" />
    <circle cx="58" cy="70" r="4" fill="#FFFFFF" />
    <circle cx="60" cy="70" r="4" fill="#F97316" />
  </svg>
);

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="w-full border-b border-neutral-900 bg-neutral-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-4 text-orange-500 font-mono font-bold tracking-wider text-sm sm:text-base uppercase hover:text-orange-400 transition-colors z-50 group">
          <RajatLogo />
          <div className="flex flex-col">
            <span className="text-white tracking-[0.15em]">RAJAT</span>
            <span className="text-orange-500 text-xs tracking-[0.3em]">TRIPATHI</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm tracking-widest font-semibold uppercase">
          <Link href="/#projects" className="text-neutral-400 hover:text-orange-500 transition-colors">
            Projects
          </Link>
          <Link href="/#about" className="text-neutral-400 hover:text-orange-500 transition-colors">
            About
          </Link>
          <Link href="/experience" className="text-neutral-400 hover:text-orange-500 transition-colors">
            Experience
          </Link>
          <Link href="/blog" className="text-neutral-400 hover:text-orange-500 transition-colors">
            Blog
          </Link>
          <Link href="/#contact" className="text-neutral-400 hover:text-orange-500 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-neutral-400 hover:text-white z-50 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center gap-10 font-mono text-xl tracking-widest font-semibold uppercase">
          <Link href="/#projects" onClick={toggleMenu} className="text-neutral-400 hover:text-orange-500 transition-colors">
            Projects
          </Link>
          <Link href="/#about" onClick={toggleMenu} className="text-neutral-400 hover:text-orange-500 transition-colors">
            About
          </Link>
          <Link href="/experience" onClick={toggleMenu} className="text-neutral-400 hover:text-orange-500 transition-colors">
            Experience
          </Link>
          <Link href="/blog" onClick={toggleMenu} className="text-neutral-400 hover:text-orange-500 transition-colors">
            Blog
          </Link>
          <Link href="/#contact" onClick={toggleMenu} className="text-neutral-400 hover:text-orange-500 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
}
