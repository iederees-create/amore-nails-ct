'use client';

import { useEffect, useState } from 'react';
import { db, Policy, FAQ } from '@/lib/db';
import { ShieldCheck, Calendar, Info, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { generateFAQSchema } from '@/lib/seo';

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeFAQIndex, setActiveFAQIndex] = useState<string | null>(null);

  useEffect(() => {
    setPolicies(db.getPolicies());
    setFaqs(db.getFAQs());
  }, []);

  const toggleFAQ = (id: string) => {
    setActiveFAQIndex(prev => (prev === id ? null : id));
  };

  const schemaMarkup = generateFAQSchema(faqs);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-serif text-4xl sm:text-5xl text-amore-charcoal">
          Salon Policies & <span className="italic font-light text-amore-gold">FAQs</span>
        </h1>
        <div className="h-0.5 w-16 bg-amore-gold mx-auto"></div>
        <p className="text-sm font-light text-amore-charcoal/60 leading-relaxed">
          Please review our salon rules, booking terms, and South African POPI Act compliance notices below, or find answers to common beauty questions.
        </p>
      </div>

      {/* Policies Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side: POPIA and Privacy */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-amore-charcoal flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-amore-gold" /> Compliance & Privacy
          </h2>
          
          {policies.filter(p => p.policy_type === 'privacy').map(pol => (
            <div key={pol.id} className="bg-white border-l-4 border-amore-gold border-t border-b border-r border-amore-gold-light/10 p-6 rounded-r-xl shadow-sm space-y-3">
              <h3 className="font-serif text-lg font-bold text-amore-charcoal">{pol.title}</h3>
              <p className="text-xs text-amore-charcoal/70 leading-relaxed font-light">
                {pol.content}
              </p>
            </div>
          ))}

          {/* Late Arrival Policy */}
          {policies.filter(p => p.policy_type === 'late_arrival').map(pol => (
            <div key={pol.id} className="bg-white border-l-4 border-amore-gold border-t border-b border-r border-amore-gold-light/10 p-6 rounded-r-xl shadow-sm space-y-3">
              <h3 className="font-serif text-lg font-bold text-amore-charcoal">{pol.title}</h3>
              <p className="text-xs text-amore-charcoal/70 leading-relaxed font-light">
                {pol.content}
              </p>
            </div>
          ))}
        </div>

        {/* Right Side: Cancellations and Deposits */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-amore-charcoal flex items-center gap-2">
            <Calendar className="h-6 w-6 text-amore-gold" /> Cancellations & Deposits
          </h2>

          {/* Cancellation */}
          {policies.filter(p => p.policy_type === 'cancellation').map(pol => (
            <div key={pol.id} className="bg-white border-l-4 border-amore-gold border-t border-b border-r border-amore-gold-light/10 p-6 rounded-r-xl shadow-sm space-y-3">
              <h3 className="font-serif text-lg font-bold text-amore-charcoal">{pol.title}</h3>
              <p className="text-xs text-amore-charcoal/70 leading-relaxed font-light">
                {pol.content}
              </p>
            </div>
          ))}

          {/* Deposit */}
          {policies.filter(p => p.policy_type === 'deposit').map(pol => (
            <div key={pol.id} className="bg-white border-l-4 border-amore-gold border-t border-b border-r border-amore-gold-light/10 p-6 rounded-r-xl shadow-sm space-y-3">
              <h3 className="font-serif text-lg font-bold text-amore-charcoal">{pol.title}</h3>
              <p className="text-xs text-amore-charcoal/70 leading-relaxed font-light">
                {pol.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div id="faqs" className="space-y-8 border-t border-amore-border/30 pt-12">
        <h2 className="font-serif text-3xl text-center text-amore-charcoal">
          Frequently Asked <span className="italic font-light text-amore-gold">Questions</span>
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => {
            const isActive = activeFAQIndex === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-amore-gold-light/10 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-amore-cream/15 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-amore-gold shrink-0" />
                    <span className="text-xs font-bold text-amore-charcoal">{faq.question}</span>
                  </div>
                  {isActive ? (
                    <ChevronUp className="h-4 w-4 text-amore-gold shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-amore-gold shrink-0" />
                  )}
                </button>

                {isActive && (
                  <div className="px-5 pb-5 pt-1 border-t border-amore-border/10">
                    <p className="text-xs text-amore-charcoal/70 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
