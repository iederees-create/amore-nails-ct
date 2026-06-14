'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db, GalleryItem } from '@/lib/db';
import { Camera, Sparkles, Calendar, Heart } from 'lucide-react';

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Nails', 'Lashes', 'Brows'];

  useEffect(() => {
    setGallery(db.getGallery());
  }, []);

  const filteredGallery = selectedFilter === 'All'
    ? gallery
    : gallery.filter((item) => item.category.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-serif text-4xl sm:text-5xl text-amore-charcoal">
          Our Lookbook <span className="italic font-light text-amore-gold">Gallery</span>
        </h1>
        <div className="h-0.5 w-16 bg-amore-gold mx-auto"></div>
        <p className="text-sm font-light text-amore-charcoal/60 leading-relaxed">
          Get inspired by our clients’ beautiful looks. Every image was taken by our therapists in-salon. Click "Book This Look" to schedule a matching appointment instantly.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex justify-center gap-2 border-b border-amore-border pb-4 max-w-md mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all focus:outline-none ${
              selectedFilter === cat
                ? 'bg-amore-charcoal text-white shadow-sm'
                : 'text-amore-charcoal/70 hover:text-amore-charcoal'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredGallery.length === 0 ? (
        <div className="text-center py-24 bg-white border rounded-xl">
          <Camera className="h-8 w-8 text-amore-gold mx-auto mb-2 opacity-50" />
          <p className="text-xs font-light text-amore-charcoal/50">Looks are being added. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="amore-card rounded-xl overflow-hidden bg-white flex flex-col justify-between group"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amore-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-[10px] uppercase tracking-wider text-amore-gold-light bg-white/10 px-2 py-0.5 rounded font-bold backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg text-amore-charcoal font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs text-amore-charcoal/60 leading-relaxed font-light mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-amore-border/30 pt-4 flex items-center justify-between">
                  <span className="text-[10px] text-amore-charcoal/40 font-light flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" /> Client Favorite
                  </span>
                  {item.service_id ? (
                    <Link
                      href={`/book?service=${item.service_id}`}
                      className="px-4 py-2 text-[9px] uppercase font-bold tracking-widest bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded transition-all focus:outline-none flex items-center gap-1.5"
                    >
                      <Calendar className="h-3 w-3" /> Book This Look
                    </Link>
                  ) : (
                    <Link
                      href="/book"
                      className="px-4 py-2 text-[9px] uppercase font-bold tracking-widest bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded transition-all focus:outline-none flex items-center gap-1.5"
                    >
                      <Calendar className="h-3 w-3" /> Book Appointment
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
