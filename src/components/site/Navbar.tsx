'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, User, Calendar, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/branches', label: 'Branches' },
    { href: '/about', label: 'About' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amore-gold-light/20 bg-amore-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amore-gold focus:ring-offset-2 rounded-md">
          <span className="font-serif text-2xl font-semibold tracking-wider text-amore-charcoal">
            AMORE
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-amore-gold font-sans font-medium">
            Nails & Beauty
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-amore-charcoal/80 hover:text-amore-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amore-gold rounded px-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/policies"
            className="text-sm font-medium text-amore-charcoal/80 hover:text-amore-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amore-gold rounded px-1"
          >
            FAQs
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/portal"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-amore-gold-light/30 text-amore-charcoal hover:bg-amore-gold hover:text-white transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amore-gold"
          >
            <User className="h-3.5 w-3.5" />
            Client Portal
          </Link>
          <Link
            href="/book"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white border border-amore-gold-light/40 transition-all duration-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amore-gold"
          >
            <Calendar className="h-3.5 w-3.5" />
            Book Now
          </Link>
          <Link
            href="/admin"
            title="Admin Portal"
            className="p-2 text-amore-charcoal/60 hover:text-amore-gold transition-colors focus:outline-none focus:ring-2 focus:ring-amore-gold rounded-md"
          >
            <ShieldCheck className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 md:hidden text-amore-charcoal hover:text-amore-gold focus:outline-none focus:ring-2 focus:ring-amore-gold rounded-md"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-amore-gold-light/10 bg-amore-cream px-4 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-base font-medium text-amore-charcoal border-b border-amore-border/30 hover:text-amore-gold transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/policies"
              onClick={() => setIsOpen(false)}
              className="py-2 text-base font-medium text-amore-charcoal border-b border-amore-border/30 hover:text-amore-gold transition-all duration-200"
            >
              Policies & FAQs
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium border border-amore-gold-light/40 text-amore-charcoal rounded-md hover:bg-amore-gold hover:text-white transition-all"
            >
              <User className="h-4 w-4" />
              Client Portal
            </Link>
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider bg-amore-charcoal text-amore-cream rounded-md border border-amore-gold-light/35 shadow"
            >
              <Calendar className="h-4 w-4" />
              Book Online
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-2 text-xs text-amore-charcoal/60 hover:text-amore-gold transition-all"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
