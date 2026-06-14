'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { db, Branch, Staff, Service } from '@/lib/db';
import { Phone, MapPin, Calendar, Clock, ArrowLeft, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { generateBranchSchema } from '@/lib/seo';

export default function BranchPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [branch, setBranch] = useState<Branch | null>(null);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [popularServices, setPopularServices] = useState<Service[]>([]);

  useEffect(() => {
    if (slug) {
      const b = db.getBranchBySlug(slug);
      if (b) {
        setBranch(b);
        setStaff(db.getStaffByBranch(b.id));
        setPopularServices(db.getServices().filter((s) => s.is_popular));
      }
    }
  }, [slug]);

  if (!branch) {
    return (
      <div className="text-center py-24 bg-amore-cream min-h-screen">
        <p className="text-sm font-light text-amore-charcoal/60">Branch location not found.</p>
        <Link href="/" className="text-xs text-amore-gold underline mt-4 inline-block">
          Return Home
        </Link>
      </div>
    );
  }

  // Generate structured schema JSON-LD
  const schemaMarkup = generateBranchSchema(branch, staff.map((s) => s.name));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Inject SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Header breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-amore-charcoal/60 hover:text-amore-gold transition-colors focus:outline-none"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>
      </div>

      {/* Branch Info Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left column: Main Details */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amore-gold/10 text-xs font-semibold text-amore-gold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Open Lounge
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-amore-charcoal leading-tight">
            Amore Nails & Lounge <br />
            <span className="italic font-light text-amore-gold">{branch.name}</span>
          </h1>

          <div className="space-y-3 bg-white border border-amore-gold-light/20 p-6 rounded-xl shadow-sm">
            <p className="flex items-start gap-2.5 text-xs text-amore-charcoal leading-relaxed font-light">
              <MapPin className="h-4 w-4 text-amore-gold shrink-0 mt-0.5" />
              <span>{branch.address}</span>
            </p>
            <p className="flex items-center gap-2.5 text-xs text-amore-charcoal font-light">
              <Phone className="h-4 w-4 text-amore-gold shrink-0" />
              <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="hover:text-amore-gold hover:underline">
                {branch.phone}
              </a>
            </p>
          </div>

          {/* Booking / CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={`/book?branch=${branch.id}`}
              className="flex-1 text-center py-3.5 text-xs font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded-md transition-all shadow-md focus:outline-none"
            >
              Book At This Branch
            </Link>
            <a
              href={`https://wa.me/${branch.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3.5 text-xs font-bold uppercase tracking-wider border border-amore-charcoal/35 text-amore-charcoal hover:bg-white hover:border-amore-gold rounded-md transition-all flex items-center justify-center gap-2 focus:outline-none"
            >
              <svg className="h-4 w-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.927 9.927 0 0 0 4.808 1.237h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.18-2.92-7.062A9.92 9.92 0 0 0 12.012 2zm5.856 14.152c-.247.696-1.432 1.357-1.964 1.44-.482.075-.997.127-3.13-.75-2.73-1.12-4.46-3.888-4.597-4.072-.137-.184-1.112-1.48-1.112-2.825 0-1.344.706-2.003.955-2.268.248-.266.549-.332.732-.332.183 0 .365.002.525.01.166.007.388-.063.607.462.227.543.778 1.895.846 2.03.069.136.114.294.023.478-.09.184-.137.3-.274.462-.137.162-.288.363-.411.488-.137.137-.282.287-.12.565.162.278.718 1.18 1.54 1.91 1.057.94 1.948 1.23 2.223 1.368.275.137.435.114.595-.068.16-.182.687-.796.87-1.07.183-.272.366-.227.617-.136.252.09 1.597.753 1.872.89.275.136.458.204.526.319.069.115.069.664-.178 1.36z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Right column: Trading Hours Table */}
        <div className="bg-white border border-amore-gold-light/25 p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-amore-charcoal flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-amore-gold" /> Trading Hours
          </h2>
          <div className="border-t border-amore-border/40 divide-y divide-amore-border/30 text-xs">
            {Object.entries(branch.trading_hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between py-2.5 font-light text-amore-charcoal/80">
                <span className="capitalize font-medium">{day}</span>
                <span className={hours === 'Closed' ? 'text-red-500 font-bold' : ''}>{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staff working at this branch */}
      <div className="space-y-6 pt-6 border-t border-amore-border/30">
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl text-amore-charcoal">
            Our <span className="italic font-light text-amore-gold">Branch Therapists</span>
          </h2>
          <p className="text-xs text-amore-charcoal/50 font-light">
            Highly-trained beauty and nail art professionals working at this branch:
          </p>
        </div>

        {staff.length === 0 ? (
          <p className="text-xs text-amore-charcoal/50 italic font-light">
            Therapists listings are being scheduled for this location. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {staff.map((s) => (
              <div key={s.id} className="bg-white border border-amore-gold-light/10 p-5 rounded-xl flex gap-4 items-start shadow-sm">
                <img
                  src={s.image_url}
                  alt={s.name}
                  className="h-16 w-16 rounded-full object-cover border border-amore-gold-light/20 shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-amore-charcoal">{s.name}</h3>
                  <p className="text-[10px] text-amore-gold font-bold uppercase tracking-wider">{s.title}</p>
                  <p className="text-xs text-amore-charcoal/70 leading-relaxed font-light">{s.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Treatments preview */}
      <div className="space-y-6 pt-6 border-t border-amore-border/30">
        <div className="flex justify-between items-end">
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl text-amore-charcoal">
              Available <span className="italic font-light text-amore-gold">Treatments</span>
            </h2>
            <p className="text-xs text-amore-charcoal/50 font-light">
              Explore our standard services available at all branches:
            </p>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold uppercase tracking-wider text-amore-gold hover:text-amore-charcoal transition-colors pb-0.5 border-b border-amore-gold focus:outline-none"
          >
            Full Menu <ArrowRight className="h-3 w-3 inline ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularServices.slice(0, 3).map((s) => (
            <div key={s.id} className="amore-card rounded-xl bg-white p-5 flex flex-col justify-between h-48">
              <div className="space-y-1">
                <h3 className="font-serif text-sm font-bold text-amore-charcoal">{s.name}</h3>
                <p className="text-[11px] text-amore-charcoal/60 leading-normal font-light line-clamp-2">
                  {s.description}
                </p>
              </div>
              <div className="border-t border-amore-border/30 pt-3 flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-amore-gold">R{s.price_female}</span>
                <Link
                  href={`/book?branch=${branch.id}&service=${s.id}`}
                  className="px-3.5 py-1.5 text-[9px] uppercase font-bold tracking-widest bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded transition-all focus:outline-none"
                >
                  Book Slot
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: 'the-colosseum' },
    { slug: 'century-village' },
    { slug: 'brackenfell' },
    { slug: 'bothasig-square' },
    { slug: 'pinelands' },
    { slug: 'n1-value-centre' }
  ];
}
