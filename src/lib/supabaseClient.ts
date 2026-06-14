// Amore Nails & Beauty Lounge - Production Supabase API Client (Phase 1)
// Connects to Supabase Database, Auth, and Storage buckets.
// Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Fallback warning in development
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.warn(
      'Supabase URL or Anon Key is missing. The website is currently operating in high-fidelity LOCAL MOCK MODE (src/lib/db.ts).'
    );
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * PRODUCTION TRANSLATION HELPERS (How to switch from Mock to Supabase):
 * 
 * 1. Bookings Insertion:
 *    await supabase.from('bookings').insert([bookingData]);
 * 
 * 2. Inspiration Image Upload (Supabase Storage):
 *    const { data, error } = await supabase.storage
 *      .from('inspiration-images')
 *      .upload(`booking-${bookingId}/${fileName}`, fileBody);
 *    const publicUrl = supabase.storage.from('inspiration-images').getPublicUrl(data.path).data.publicUrl;
 * 
 * 3. Fetching Services with Category:
 *    const { data } = await supabase.from('services').select('*, service_categories(*)');
 */
