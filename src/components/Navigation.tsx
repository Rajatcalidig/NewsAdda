"use client";

import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/components/ThemeProvider';

// Custom SVG Logo for Rajat Tripathi
const RajatLogo = () => (
  <svg 
    width="38" 
    height="38" 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="group-hover:scale-105 transition-transform duration-300 shrink-0"
    aria-hidden="true"
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

const NAV_LINKS = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <header className="w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="mx-auto flex h-20 sm:h-24 max-w-7xl items-center justify-between px-4 sm:px-8">
          
          {/* Logo */}
          <Link 
            href="/" 
            onClick={closeMenu}
            className="flex items-center gap-3 text-orange-500 font-mono font-bold tracking-wider text-sm sm:text-base uppercase hover:text-orange-400 transition-colors z-50 group focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded-sm"
          >
            <RajatLogo />
            <div className="flex flex-col">
              <span className="text-white tracking-[0.15em] text-sm sm:text-base">RAJAT</span>
              <span className="text-orange-500 text-[10px] sm:text-xs tracking-[0.25em]">TRIPATHI</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center gap-7 lg:gap-8 font-mono text-xs lg:text-sm tracking-widest font-semibold uppercase"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-neutral-400 hover:text-orange-400 transition-colors py-2 focus:outline-none focus:text-orange-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions: Theme Toggle & Contact Button */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle size="md" />
            
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold px-4 py-2.5 rounded-sm bg-orange-500 hover:bg-orange-400 text-neutral-950 transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile Right Container: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-2.5 md:hidden z-50">
            {/* Quick 1-tap Theme Toggle directly on mobile navbar */}
            <ThemeToggle size="sm" />

            <button 
              type="button"
              onClick={toggleMenu}
              className="w-9 h-9 flex items-center justify-center rounded-sm border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-orange-400 hover:border-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={20} className="text-orange-500" /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Drawer */}
      <div 
        id="mobile-navigation"
        className={`md:hidden fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 font-mono text-lg tracking-widest font-bold uppercase mt-4">
          {NAV_LINKS.map((link, idx) => (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={closeMenu} 
              style={{ transitionDelay: `${isOpen ? idx * 50 : 0}ms` }}
              className={`flex items-center justify-between p-3.5 rounded-sm border border-neutral-900 bg-neutral-900/40 text-neutral-300 hover:text-orange-400 hover:border-neutral-800 hover:bg-neutral-900/80 transition-all ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              <span>{link.label}</span>
              <ArrowUpRight size={18} className="text-orange-500/60" />
            </Link>
          ))}
        </nav>

        {/* Mobile Drawer Bottom Section: Theme & Contact & Socials */}
        <div className="flex flex-col gap-5 pt-6 border-t border-neutral-900 mt-6">
          {/* Theme Switcher Banner inside menu */}
          <div className="flex items-center justify-between p-4 bg-neutral-900/60 border border-neutral-800 rounded-sm">
            <div className="flex flex-col">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Appearance</span>
              <span className="text-sm font-bold text-white capitalize">{theme} Mode Active</span>
            </div>
            <ThemeToggle showLabel size="sm" />
          </div>

          {/* Quick CTA */}
          <Link
            href="/#contact"
            onClick={closeMenu}
            className="w-full py-3.5 px-4 rounded-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-mono font-bold tracking-widest text-xs uppercase text-center transition-all shadow-[0_0_20px_rgba(249,115,22,0.25)] flex items-center justify-center gap-2"
          >
            <span>Let's Discuss Opportunities</span>
            <ArrowUpRight size={16} />
          </Link>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-2 text-neutral-400">
            <a 
              href="https://www.linkedin.com/in/rajat-tripathi-603b79108/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 hover:text-orange-400 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 hover:text-orange-400 transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a 
              href="mailto:rajat.tripathi@example.com" 
              aria-label="Email"
              className="p-2 hover:text-orange-400 transition-colors"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
