'use client';

import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amore-gold/10 text-xs font-semibold text-amore-gold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Our Story
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-amore-charcoal leading-tight">
            Crafting Experiences of <span className="italic font-light text-amore-gold">Elegant Beauty</span>
          </h1>
          <p className="text-sm font-light text-amore-charcoal/70 leading-relaxed">
            Founded in Cape Town by master beauty therapist Chantel Venter, Amore Nails & Beauty Lounge was born out of a desire to create a sanctuary where hygiene and luxury intertwine. We believe beauty is more than a service—it is a personal ritual of self-care and renewal.
          </p>
          <p className="text-sm font-light text-amore-charcoal/70 leading-relaxed">
            With six branches across Cape Town, our salons feature warm cream palettes, soft rose accents, and subtle gold details to put you at ease the moment you step inside. We utilize premium, non-toxic products to ensure the ultimate health of your natural nail bed, skin, lashes, and muscles.
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="p-2 bg-white rounded-2xl shadow-xl border border-amore-border max-w-[90%] transform -rotate-1">
            <img
              src="https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80"
              alt="Amore Nails Salon Owner Chantel"
              className="rounded-xl object-cover aspect-4/5 max-h-[400px]"
            />
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-8 border-t border-amore-border/30 pt-12">
        <h2 className="font-serif text-3xl text-center text-amore-charcoal">
          Our <span className="italic font-light text-amore-gold">Beauty Values</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border p-6 rounded-xl space-y-3 shadow-sm">
            <div className="bg-amore-gold/10 p-2.5 rounded-full w-10 h-10 flex items-center justify-center text-amore-gold shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-amore-charcoal">Uncompromising Hygiene</h3>
            <p className="text-xs text-amore-charcoal/60 leading-relaxed font-light">
              We implement autoclave sterilization for all metal implements, single-use file buffers for manicure sets, and enforce strict, hospital-grade sanitation guidelines.
            </p>
          </div>

          <div className="bg-white border p-6 rounded-xl space-y-3 shadow-sm">
            <div className="bg-amore-gold/10 p-2.5 rounded-full w-10 h-10 flex items-center justify-center text-amore-gold shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-amore-charcoal">Certified Specialists</h3>
            <p className="text-xs text-amore-charcoal/60 leading-relaxed font-light">
              Every therapist in our multi-branch lounges is fully licensed, undergoes regular masterclass training, and specializes in precision technique application.
            </p>
          </div>

          <div className="bg-white border p-6 rounded-xl space-y-3 shadow-sm">
            <div className="bg-amore-gold/10 p-2.5 rounded-full w-10 h-10 flex items-center justify-center text-amore-gold shrink-0">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-amore-charcoal">Client Centered Comfort</h3>
            <p className="text-xs text-amore-charcoal/60 leading-relaxed font-light">
              From heated massage tables to custom pressure preferences, coffee selections, and soft music, your comfort is our highest operational priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
