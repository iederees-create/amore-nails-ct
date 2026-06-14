'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { db, ServiceCategory, Service, ServiceAddon, Branch } from '@/lib/db';
import { Clock, Star, Check, CheckSquare, Square, ShoppingBag, Sparkles, Filter } from 'lucide-react';
import { generateServiceSchema } from '@/lib/seo';

export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load static databases
  const categories = db.getCategories();
  const branches = db.getBranches();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');
  const [priceRange, setPriceRange] = useState<number>(700);
  const [popularOnly, setPopularOnly] = useState<boolean>(false);
  const [duration, setDuration] = useState<string>('all'); // 'all', 'short' (<30m), 'medium' (30-60m), 'long' (>60m)

  // Services & Addons loaded state
  const [services, setServices] = useState<Service[]>([]);
  const [addons, setAddons] = useState<ServiceAddon[]>([]);

  // Cart selection state for multi-booking
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    // Read category parameter if present (e.g. from Home category cards)
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const cat = categories.find((c) => c.slug === categoryParam);
      if (cat) {
        setSelectedCategory(cat.id);
      }
    }
    setServices(db.getServices());
    setAddons(db.getAddons());
  }, [searchParams]);

  // Filter Logic
  const filteredServices = services.filter((s) => {
    // 1. Category
    if (selectedCategory !== 'all' && s.category_id !== selectedCategory) return false;

    // 2. Gender pricing availability
    if (selectedGender === 'male' && s.price_male === undefined) return false;

    // 3. Price
    const price = selectedGender === 'male' && s.price_male ? s.price_male : s.price_female;
    if (price > priceRange) return false;

    // 4. Popularity
    if (popularOnly && !s.is_popular) return false;

    // 5. Duration
    if (duration !== 'all') {
      if (duration === 'short' && s.duration_minutes >= 30) return false;
      if (duration === 'medium' && (s.duration_minutes < 30 || s.duration_minutes > 60)) return false;
      if (duration === 'long' && s.duration_minutes <= 60) return false;
    }

    return true;
  });

  // Toggle multi-select
  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  // Build schema markup
  const schemaMarkup = filteredServices.map((s) => generateServiceSchema(s));

  // Handle proceed to book
  const handleProceedToBooking = () => {
    if (selectedServices.length === 0) return;
    const query = new URLSearchParams();
    query.set('services', selectedServices.join(','));
    query.set('gender', selectedGender);
    if (selectedBranch !== 'all') {
      query.set('branch', selectedBranch);
    }
    router.push(`/book?${query.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-amore-charcoal">
          Our <span className="italic font-light text-amore-gold">Treatment Menu</span>
        </h1>
        <div className="h-0.5 w-16 bg-amore-gold mx-auto"></div>
        <p className="text-sm font-light text-amore-charcoal/60 leading-relaxed">
          Select and combine multiple treatments for your session. Toggle filters below to find exactly what you need.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filters Sidebar */}
        <div className="lg:sticky lg:top-24 bg-white border border-amore-gold-light/25 p-6 rounded-xl space-y-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-amore-border pb-3">
            <Filter className="h-4 w-4 text-amore-gold" />
            <h2 className="font-serif text-base font-bold text-amore-charcoal">Filters</h2>
          </div>

          {/* Gender Select */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
              Pricing Options
            </label>
            <div className="grid grid-cols-2 gap-2 bg-amore-cream/30 p-1 rounded-md border border-amore-border">
              <button
                onClick={() => setSelectedGender('female')}
                className={`py-1.5 text-xs font-semibold rounded transition-all ${
                  selectedGender === 'female'
                    ? 'bg-amore-charcoal text-white shadow-sm'
                    : 'text-amore-charcoal/70 hover:text-amore-charcoal'
                }`}
              >
                Hers
              </button>
              <button
                onClick={() => setSelectedGender('male')}
                className={`py-1.5 text-xs font-semibold rounded transition-all ${
                  selectedGender === 'male'
                    ? 'bg-amore-charcoal text-white shadow-sm'
                    : 'text-amore-charcoal/70 hover:text-amore-charcoal'
                }`}
              >
                His Pricing
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="amore-input text-xs"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Branch Filter */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
              Filter by Branch
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="amore-input text-xs"
            >
              <option value="all">Any Branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
              Treatment Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="amore-input text-xs"
            >
              <option value="all">Any Duration</option>
              <option value="short">Quick (&lt; 30 mins)</option>
              <option value="medium">Standard (30 - 60 mins)</option>
              <option value="long">Extended (&gt; 60 mins)</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
              <span>Max Price</span>
              <span className="font-serif text-amore-gold font-bold">R{priceRange}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-amore-gold"
            />
          </div>

          {/* Popular filter */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="popular"
              checked={popularOnly}
              onChange={(e) => setPopularOnly(e.target.checked)}
              className="accent-amore-gold h-4 w-4 rounded border-amore-gold-light/40"
            />
            <label htmlFor="popular" className="text-xs text-amore-charcoal font-medium cursor-pointerSelect">
              Show Bestsellers Only
            </label>
          </div>
        </div>

        {/* Services Grid & Multi-select Checkout */}
        <div className="lg:col-span-3 space-y-6">
          {/* Cart Status Banner */}
          {selectedServices.length > 0 && (
            <div className="flex items-center justify-between bg-amore-blush border border-amore-blush-border/40 p-4 rounded-xl shadow-sm animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-amore-gold text-white p-2 rounded-full shadow-sm">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amore-charcoal">
                    {selectedServices.length} Treatment{selectedServices.length > 1 ? 's' : ''} Selected
                  </p>
                  <p className="text-[10px] text-amore-charcoal/60 font-light">
                    Total: R
                    {selectedServices.reduce((acc, id) => {
                      const s = services.find((srv) => srv.id === id);
                      if (!s) return acc;
                      return acc + (selectedGender === 'male' && s.price_male ? s.price_male : s.price_female);
                    }, 0)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleProceedToBooking}
                className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amore-gold"
              >
                Proceed To Booking
              </button>
            </div>
          )}

          {/* Services Cards */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-white border border-amore-gold-light/10 rounded-xl">
              <p className="text-sm font-light text-amore-charcoal/50">
                No services match your active filter settings. Try adjusting the sliders.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((s) => {
                const isChecked = selectedServices.includes(s.id);
                const price = selectedGender === 'male' && s.price_male ? s.price_male : s.price_female;
                const serviceAddons = addons.filter((a) => a.service_id === s.id);

                return (
                  <div
                    key={s.id}
                    onClick={() => handleToggleService(s.id)}
                    className={`amore-card rounded-xl p-5 bg-white cursor-pointer select-none border-2 flex flex-col justify-between group transition-all duration-300 ${
                      isChecked ? 'border-amore-gold bg-amore-blush/10' : 'border-amore-gold-light/15'
                    }`}
                  >
                    <div>
                      {/* Top Header info */}
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-serif text-lg font-bold text-amore-charcoal group-hover:text-amore-gold transition-colors">
                          {s.name}
                        </h3>
                        <button
                          type="button"
                          className="text-amore-gold/80 group-hover:text-amore-gold"
                        >
                          {isChecked ? (
                            <CheckSquare className="h-5 w-5 fill-amore-gold text-white" />
                          ) : (
                            <Square className="h-5 w-5 text-amore-gold-light" />
                          )}
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-amore-charcoal/70 leading-relaxed font-light mt-2 line-clamp-3">
                        {s.description}
                      </p>

                      {/* Add-ons List if available */}
                      {serviceAddons.length > 0 && (
                        <div className="mt-4 space-y-1 bg-amore-cream/30 p-2.5 rounded border border-amore-border/30">
                          <p className="text-[9px] uppercase tracking-wider text-amore-charcoal/50 font-bold">
                            Available Add-ons:
                          </p>
                          {serviceAddons.map((addon) => (
                            <div key={addon.id} className="flex justify-between items-center text-[10px] font-light text-amore-charcoal/80">
                              <span>• {addon.name} ({addon.duration_minutes}m)</span>
                              <span className="font-semibold text-amore-gold">+R{addon.price}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom controls */}
                    <div className="border-t border-amore-border/40 mt-6 pt-4 flex items-center justify-between">
                      <div className="flex gap-4 text-[10px] text-amore-charcoal/50 font-light">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {s.duration_minutes} Mins
                        </span>
                        {s.is_popular && (
                          <span className="flex items-center gap-0.5 text-amore-gold font-semibold uppercase tracking-wider">
                            <Star className="h-3 w-3 fill-amore-gold" /> Bestseller
                          </span>
                        )}
                      </div>
                      <div className="font-serif text-lg font-bold text-amore-gold">
                        R{price}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
