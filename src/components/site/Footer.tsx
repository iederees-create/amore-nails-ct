import Link from 'next/link';
import { Phone, MapPin, Sparkles, AlertCircle } from 'lucide-react';

export default function Footer() {
  const branches = [
    { name: 'The Colosseum', phone: '076 659 8811', slug: 'the-colosseum' },
    { name: 'Century Village', phone: '076 936 8190', slug: 'century-village' },
    { name: 'Brackenfell', phone: '072 468 4241', slug: 'brackenfell' },
    { name: 'Bothasig Square', phone: '060 669 5785', slug: 'bothasig-square' },
    { name: 'Pinelands', phone: '072 748 1021', slug: 'pinelands' },
    { name: 'N1 Value Centre', phone: '082 904 8642', slug: 'n1-value-centre' },
  ];

  return (
    <footer className="w-full border-t border-amore-gold-light/20 bg-amore-charcoal text-amore-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Mission */}
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <span className="font-serif text-3xl font-semibold tracking-wider text-white">AMORE</span>
            <span className="text-[9px] uppercase tracking-widest text-amore-gold-light font-bold">Lounge</span>
          </div>
          <p className="text-xs text-amore-cream/70 leading-relaxed font-light">
            Elegance, comfort, and professional beauty care. Amore Nails & Beauty Lounge offers multi-branch luxury manicures, pedicures, lashes, brows, massage and waxing.
          </p>
          {/* Phase 2 Note */}
          <div className="flex items-start gap-2 bg-white/5 border border-amore-gold-light/20 p-3 rounded-md text-[11px] text-amore-cream/80 leading-normal">
            <AlertCircle className="h-4 w-4 text-amore-gold-light shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-amore-gold-light">Roadmap Update:</span> Phase 2 Android App client portal is currently in design and scheduled for future deployment.
            </div>
          </div>
        </div>

        {/* Branches & Contacts */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="font-serif text-lg text-white border-b border-amore-gold-light/20 pb-2 tracking-wide">
            Our Branches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {branches.map((b) => (
              <div key={b.name} className="flex flex-col gap-0.5 text-xs">
                <Link
                  href={`/branches/${b.slug}`}
                  className="font-medium text-amore-gold-light hover:text-white transition-colors duration-150"
                >
                  {b.name}
                </Link>
                <a
                  href={`tel:${b.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-1.5 text-amore-cream/60 hover:text-amore-gold-light mt-0.5"
                >
                  <Phone className="h-3 w-3 shrink-0" />
                  {b.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links & Legal */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg text-white border-b border-amore-gold-light/20 pb-2 tracking-wide">
            Useful Links
          </h3>
          <ul className="space-y-2 text-xs font-light text-amore-cream/70">
            <li>
              <Link href="/services" className="hover:text-amore-gold-light transition-colors">
                Service Catalogue
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-amore-gold-light transition-colors">
                Lookbook Gallery
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-amore-gold-light transition-colors">
                Customer Reviews
              </Link>
            </li>
            <li>
              <Link href="/policies" className="hover:text-amore-gold-light transition-colors">
                POPIA & Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/policies#cancellation" className="hover:text-amore-gold-light transition-colors">
                Cancellation & Deposit Policy
              </Link>
            </li>
            <li>
              <Link href="/policies#faqs" className="hover:text-amore-gold-light transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-amore-cream/40 font-light">
        <p>© {new Date().getFullYear()} Amore Nails & Beauty Lounge. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">
          POPIA Compliant • Secure Intake Encryption • Powered by Next.js & Supabase
        </p>
      </div>
    </footer>
  );
}
