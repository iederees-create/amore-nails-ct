'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db, Branch } from '@/lib/db';
import { Phone, MapPin, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    setBranches(db.getBranches());
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-serif text-4xl sm:text-5xl text-amore-charcoal">
          Our Salon <span className="italic font-light text-amore-gold">Locations</span>
        </h1>
        <div className="h-0.5 w-16 bg-amore-gold mx-auto"></div>
        <p className="text-sm font-light text-amore-charcoal/60 leading-relaxed">
          We operate six beautiful branches around Cape Town. Choose your nearest salon for premium nail art, waxing, lashes, brows and massage services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches.map((b) => (
          <div
            key={b.id}
            className="bg-white border border-amore-gold-light/20 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
          >
            {/* Header banner */}
            <div className="bg-amore-cream/30 p-5 border-b border-amore-border/30 space-y-1 relative">
              <div className="absolute top-4 right-4 text-amore-gold opacity-35 group-hover:opacity-100 transition-opacity">
                <Sparkles className="h-4 w-4" />
              </div>
              <h2 className="font-serif text-xl font-bold text-amore-charcoal group-hover:text-amore-gold transition-colors">
                {b.name}
              </h2>
              <p className="text-[10px] text-amore-gold font-bold uppercase tracking-wider">Amore Beauty Lounge</p>
            </div>

            {/* Info details */}
            <div className="p-5 flex-1 space-y-4">
              <div className="space-y-3 text-xs text-amore-charcoal/70 font-light">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-amore-gold shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-amore-gold shrink-0" />
                  <a href={`tel:${b.phone.replace(/\s+/g, '')}`} className="hover:text-amore-gold hover:underline">
                    {b.phone}
                  </a>
                </div>
              </div>

              {/* Trading hours summary */}
              <div className="bg-amore-cream/10 p-3.5 rounded border border-amore-border/30 space-y-1 text-[11px] font-light">
                <p className="font-bold text-amore-charcoal flex items-center gap-1">
                  <Clock className="h-3 w-3 text-amore-gold" /> Weekdays Opening Hours
                </p>
                <div className="flex justify-between text-amore-charcoal/75 mt-1.5">
                  <span>Monday - Wednesday</span>
                  <span>{b.trading_hours.monday}</span>
                </div>
                <div className="flex justify-between text-amore-charcoal/75">
                  <span>Thursday - Friday</span>
                  <span>{b.trading_hours.friday}</span>
                </div>
                <div className="flex justify-between text-amore-charcoal/75">
                  <span>Saturday</span>
                  <span>{b.trading_hours.saturday}</span>
                </div>
                <div className="flex justify-between text-amore-charcoal/75">
                  <span>Sunday</span>
                  <span className={b.trading_hours.sunday === 'Closed' ? 'text-red-500 font-bold' : ''}>{b.trading_hours.sunday}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-amore-cream/20 p-5 border-t border-amore-border/30 flex gap-2">
              <Link
                href={`/branches/${b.slug}`}
                className="flex-1 text-center py-2.5 text-xs font-bold uppercase tracking-wider border border-amore-charcoal/25 text-amore-charcoal hover:border-amore-gold hover:text-amore-gold rounded transition-all focus:outline-none"
              >
                View Details
              </Link>
              <Link
                href={`/book?branch=${b.id}`}
                className="flex-1 text-center py-2.5 text-xs font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded transition-all focus:outline-none"
              >
                Book Online
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
