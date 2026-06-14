'use client';

import { useEffect, useState } from 'react';
import { db, Review } from '@/lib/db';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { generateAggregateReviewSchema } from '@/lib/seo';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [clientName, setClientName] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setReviews(db.getReviews());
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName.trim() === '' || comment.trim() === '') return;

    const newReview = db.addReview({
      client_name: clientName,
      rating,
      comment
    });

    setReviews(prev => [newReview, ...prev]);
    setClientName('');
    setComment('');
    setRating(5);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  // Generate aggregate schema markup
  const schemaMarkup = generateAggregateReviewSchema(reviews);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Schema Injection */}
      {schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      )}

      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-serif text-4xl sm:text-5xl text-amore-charcoal">
          Guest <span className="italic font-light text-amore-gold">Reviews</span>
        </h1>
        <div className="h-0.5 w-16 bg-amore-gold mx-auto"></div>
        <p className="text-sm font-light text-amore-charcoal/60 leading-relaxed">
          We value your feedback. Read reviews from our verified lounge guests or submit your own experience using the form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Write a Review Form */}
        <div className="bg-white border border-amore-gold-light/20 p-6 rounded-xl shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-amore-charcoal">Write a Review</h2>
          
          {submitted && (
            <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-3 rounded-md flex items-center gap-2 text-xs text-[#1ebd59] font-semibold animate-in fade-in duration-300">
              <CheckCircle className="h-4 w-4" />
              <span>Review submitted successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
                Your Name
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Jessica Taylor"
                className="amore-input text-xs"
              />
            </div>

            {/* Star Rating selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold block">
                Rating
              </label>
              <div className="flex gap-1.5 text-amore-gold">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating ? 'fill-amore-gold' : 'text-amore-border'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-amore-charcoal/60 font-semibold">
                Your Feedback
              </label>
              <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your beauty lounge treatment experience..."
                rows={4}
                className="amore-input text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-amore-charcoal hover:bg-amore-gold text-amore-cream hover:text-white rounded-md transition-all focus:outline-none"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border-b border-amore-border pb-3 flex justify-between items-center">
            <h2 className="font-serif text-xl font-bold text-amore-charcoal">Verified Testimonials</h2>
            <span className="text-xs text-amore-charcoal/50 font-light">
              Showing {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-amore-gold-light/10 p-6 rounded-xl shadow-sm space-y-3 animate-in fade-in duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amore-charcoal">{r.client_name}</span>
                  <div className="flex items-center gap-0.5 text-amore-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < r.rating ? 'fill-amore-gold' : 'text-amore-border'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-amore-charcoal/70 leading-relaxed font-light italic">
                  "{r.comment}"
                </p>
                <div className="text-[9px] text-amore-charcoal/40 font-light border-t border-amore-border/30 pt-2 flex justify-between">
                  <span>Verified Guest Visit</span>
                  <span>{new Date(r.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
