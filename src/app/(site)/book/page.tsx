import { Suspense } from 'react';
import BookingWizard from '@/components/site/BookingWizard';

export default function BookPage() {
  return (
    <div className="bg-amore-cream min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="mx-auto max-w-3xl bg-white border border-amore-border rounded-xl shadow-lg p-12 text-center my-12 animate-pulse">
          <p className="text-sm font-light text-amore-charcoal/50">
            Initializing secure booking engine...
          </p>
        </div>
      }>
        <BookingWizard />
      </Suspense>
    </div>
  );
}
