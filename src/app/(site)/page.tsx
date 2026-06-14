'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db, ServiceCategory, Service, Branch, Review, Promotion } from '@/lib/db';
import { Sparkles, ArrowRight, Phone, Clock, MapPin, Star, ShieldCheck, Heart } from 'lucide-react';

export default function HomePage() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [popularServices, setPopularServices] = useState<Service[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [promo, setPromo] = useState<Promotion | null>(null);

  useEffect(() => {
    // Load data from mock DB (synchronizes with LocalStorage)
    setCategories(db.getCategories());
    setPopularServices(db.getServices().filter((s) => s.is_popular));
    setBranches(db.getBranches());
    setReviews(db.getReviews().filter((r) => r.is_approved));
    const activePromos = db.getPromotions().filter((p) => p.is_active);
    if (activePromos.length > 0) {
      setPromo(activePromos[0]);
    }
  }, []);

  return (
    <div className="w-full">
      {/* 1. Dynamic Promo Banner (CMS Controlled) */}
      {promo && (
        <div className="w-full bg-amore-gold text-amore-cream px-4 py-2.5 text-center text-xs font-semibold tracking-wider transition-all duration-300">
          <div className="mx-auto max-w-7xl flex items-center justify-center gap-2">
            <span>{promo.banner_text}</span>
            <Link
              href="/book"
              className="underline hover:text-white transition-colors flex items-center gap-1 focus:outline-none"
            >
              Book Now <ArrowRight className="h-3 w-3 inline" />
            </Link>
          </div>
        </div>
      )}

      {/* 2. Premium Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amore-blush via-amore-cream to-amore-cream py-16 sm:py-24 border-b border-amore-border/30">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amore-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amore-blush-border/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 border border-amore-gold-light/20 text-xs font-semibold text-amore-gold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-amore-gold" />
              Luxury Beauty Lounge
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-amore-charcoal">
              Indulge in <span className="italic font-light text-amore-gold">Pure Elegance</span> & Pampering
            </h1>
            
            <p className="max-w-xl text-sm sm:text-base font-light text-amore-charcoal/70 leading-relaxed mx-auto lg:mx-0">
              Amore Nails & Beauty Lounge is Cape Town’s premier multi-branch beauty destination. Step into an oasis of relaxation and let our specialists elevate your look with premium manicures, pedicures, lashes, brow shaping, massage and waxing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/book"
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-widest bg-amore-charcoal text-amore-cream hover:bg-amore-gold hover:text-white border border-amore-gold-light/40 transition-all duration-300 rounded-md shadow-lg flex items-center justify-center gap-2 focus:ring-2 focus:ring-amore-gold focus:outline-none"
              >
                Book An Appointment
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-widest border border-amore-charcoal/30 text-amore-charcoal hover:bg-white hover:border-amore-gold transition-all duration-300 rounded-md flex items-center justify-center gap-2 focus:ring-2 focus:ring-amore-gold focus:outline-none"
              >
                View Service Menu
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-amore-border/50 pt-8 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <p className="font-serif text-2xl font-semibold text-amore-charcoal">6</p>
                <p className="text-[10px] uppercase tracking-wider text-amore-charcoal/60">Branches</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-amore-charcoal">20+</p>
                <p className="text-[10px] uppercase tracking-wider text-amore-charcoal/60">Therapists</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-amore-charcoal">10k+</p>
                <p className="text-[10px] uppercase tracking-wider text-amore-charcoal/60">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Hero Image / Card Preview */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none flex justify-center">
            <div className="relative p-2 bg-white rounded-2xl shadow-2xl border border-amore-gold-light/20 max-w-[90%] sm:max-w-md transform hover:rotate-1 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80"
                alt="Amore Nails Treatment Room"
                className="rounded-xl object-cover aspect-4/3 w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-amore-gold-light/10 flex items-center gap-3 animate-bounce duration-1000">
                <div className="bg-amore-gold/10 p-2 rounded-full text-amore-gold">
                  <Star className="h-5 w-5 fill-amore-gold" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amore-charcoal">Top Rated Lounge</p>
                  <p className="text-[10px] text-amore-charcoal/60">4.9/5 stars from 300+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Service Categories */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-amore-charcoal">
              Explore Our <span className="italic font-light text-amore-gold">Beauty Services</span>
            </h2>
            <div className="h-0.5 w-16 bg-amore-gold mx-auto"></div>
            <p className="text-sm font-light text-amore-charcoal/60 leading-relaxed">
              We specialize in custom pampering experiences. Filter and choose the categories that fits your beauty routine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <div key={c.id} className="amore-card rounded-xl overflow-hidden flex flex-col group h-full">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={c.image_url}
                    alt={c.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amore-charcoal/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 font-serif text-xl text-white">
                    {c.name}
                  </h3>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-amore-charcoal/70 leading-relaxed font-light mb-4 flex-1">
                    {c.description}
                  </p>
                  <Link
                    href={`/services?category=${c.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-amore-gold hover:text-amore-charcoal transition-colors focus:outline-none"
                  >
                    View Treatments <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular Treatments */}
      <section className="py-16 sm:py-24 bg-amore-cream/30 border-t border-b border-amore-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-amore-charcoal">
              Popular <span className="italic font-light text-amore-gold">Salon Bestsellers</span>
            </h2>
            <div className="h-0.5 w-16 bg-amore-gold mx-auto"></div>
            <p className="text-sm font-light text-amore-charcoal/60 leading-relaxed">
              Our most-requested treatments. Hand-picked by our clients for their outstanding result.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularServices.slice(0, 3).map((s) => (
              <div key={s.id} className="amore-card rounded-xl bg-white p-6 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg aspect-16/10">
                    <img
                      src={s.image_url}
                      alt={s.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded text-[11px] font-bold text-amore-gold border border-amore-gold-light/30 uppercase tracking-wider flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amore-gold" /> Popular
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-amore-charcoal font-medium">
                      {s.name}
                    </h3>
                    <p className="text-xs text-amore-charcoal/60 leading-relaxed font-light mt-1.5 line-clamp-2">
                      {s.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-amore-border/40 mt-6 pt-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase tracking-wider text-amore-charcoal/40 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {s.duration_minutes} Mins
                    </div>
                    <div className="font-serif text-lg font-semibold text-amore-gold">
                      R{s.price_female}
                    </div>
                  </div>

                  <Link
                    href={`/book?service=${s.id}`}
                    className="px-4 py-2 text-[10px] uppercase font-bold tracking-widest bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded transition-all focus:outline-none"
                  >
                    Quick Book
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amore-charcoal border-b-2 border-amore-gold pb-1 hover:text-amore-gold transition-colors focus:outline-none"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Branch Selector / Locator */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-amore-charcoal">
              Visit One of Our <span className="italic font-light text-amore-gold">6 Locations</span>
            </h2>
            <div className="h-0.5 w-16 bg-amore-gold mx-auto"></div>
            <p className="text-sm font-light text-amore-charcoal/60 leading-relaxed">
              We operate six beautiful branches around Cape Town. Find your nearest salon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((b) => (
              <div
                key={b.id}
                className="border border-amore-gold-light/20 bg-amore-cream/10 rounded-xl p-6 hover:bg-amore-cream/30 transition-all duration-300 hover:border-amore-gold-light/50 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-lg text-amore-charcoal font-semibold mb-2">
                    {b.name}
                  </h3>
                  <div className="space-y-2 text-xs text-amore-charcoal/70 font-light mb-4">
                    <p className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 text-amore-gold shrink-0 mt-0.5" />
                      <span>{b.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-amore-gold shrink-0" />
                      <span>{b.phone}</span>
                    </p>
                  </div>
                </div>

                <div className="border-t border-amore-border/30 pt-4 flex gap-2">
                  <Link
                    href={`/branches/${b.slug}`}
                    className="flex-1 text-center py-2 text-[10px] uppercase font-bold tracking-wider border border-amore-charcoal/20 hover:border-amore-gold text-amore-charcoal hover:text-amore-gold rounded transition-all focus:outline-none"
                  >
                    View Branch
                  </Link>
                  <Link
                    href={`/book?branch=${b.id}`}
                    className="flex-1 text-center py-2 text-[10px] uppercase font-bold tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded transition-all focus:outline-none"
                  >
                    Book Branch
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-16 sm:py-24 bg-amore-blush/40 border-t border-amore-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-amore-charcoal">
              What Our <span className="italic font-light text-amore-gold">Clients Say</span>
            </h2>
            <div className="h-0.5 w-16 bg-amore-gold mx-auto"></div>
            <p className="text-sm font-light text-amore-charcoal/60 leading-relaxed">
              Read reviews from regular customers who experience our beauty lounge treatments daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white border border-amore-gold-light/10 p-6 rounded-xl shadow-sm space-y-4">
                <div className="flex items-center gap-0.5 text-amore-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < r.rating ? 'fill-amore-gold' : 'text-amore-border'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-amore-charcoal/80 leading-relaxed font-light italic">
                  "{r.comment}"
                </p>
                <div className="border-t border-amore-border/30 pt-3 flex justify-between items-center text-[10px] text-amore-charcoal/50 font-light">
                  <span className="font-medium text-amore-charcoal">{r.client_name}</span>
                  <span>Verified Guest</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded-md transition-all focus:outline-none"
            >
              Write A Review
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
