// Amore Nails & Beauty Lounge - Local Mock Database Provider & Data Layer (Phase 1)
// Reads/Writes from LocalStorage for high-fidelity interactive local previews.
// Easily replaceable with Supabase API client calls.

export interface Branch {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  whatsapp: string;
  trading_hours: Record<string, string>;
  google_maps_url: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

export interface Service {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  price_female: number;
  price_male?: number;
  duration_minutes: number;
  is_popular: boolean;
  image_url: string;
}

export interface ServiceAddon {
  id: string;
  service_id: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
}

export interface Staff {
  id: string;
  branch_id: string;
  name: string;
  title: string;
  bio: string;
  image_url: string;
  email: string;
}

export interface StaffAvailability {
  id: string;
  staff_id: string;
  day_of_week: number; // 0-6
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export interface Booking {
  id: string;
  client_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  branch_id: string;
  staff_id: string; // "any" or specific ID
  booking_date: string; // YYYY-MM-DD
  booking_time: string; // HH:MM
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  total_price: number;
  deposit_paid: number;
  loyalty_points_earned: number;
  loyalty_points_used: number;
  notes?: string;
  created_at: string;
  services: {
    id: string;
    name: string;
    price: number;
    duration: number;
    gender_pricing: 'female' | 'male';
  }[];
  addons: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface IntakeQuestion {
  id: string;
  form_type: 'nails' | 'waxing' | 'lashes_brows' | 'massage';
  question_text: string;
  question_type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  options?: string[];
  is_required: boolean;
  sort_order: number;
}

export interface IntakeResponse {
  id: string;
  booking_id: string;
  question_id: string;
  question_text: string;
  response_text: string;
  inspiration_image_url?: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  image_url: string;
  title: string;
  description: string;
  service_id?: string;
}

export interface Review {
  id: string;
  client_name: string;
  rating: number; // 1-5
  comment: string;
  is_approved: boolean;
  created_at: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount_percentage?: number;
  is_active: boolean;
  banner_text: string;
}

export interface Policy {
  id: string;
  title: string;
  content: string;
  policy_type: 'privacy' | 'cancellation' | 'deposit' | 'late_arrival';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface NotificationRecord {
  id: string;
  client_name: string;
  client_phone: string;
  booking_id: string;
  type: 'email' | 'whatsapp';
  status: 'pending' | 'sent' | 'failed';
  trigger_type: 'confirmation' | 'reminder_24h' | 'reminder_2h' | 'review_request';
  send_time: string;
  message_content: string;
  created_at: string;
}

// --- INITIAL SEED DATA ---

const seedCategories: ServiceCategory[] = [
  { id: 'c1', name: 'Nails', slug: 'nails', description: 'Premium manicures, pedicures, gel overlays, acrylic overlays, nail art, and custom extensions.', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80' },
  { id: 'c2', name: 'Waxing', slug: 'waxing', description: 'Professional full-body face, leg, arm, and body waxing for ladies and gents.', image_url: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80' },
  { id: 'c3', name: 'Massage', slug: 'massage', description: 'Soothing therapeutic massages, including Indian Head, Back & Neck, and Full Body treatments.', image_url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80' },
  { id: 'c4', name: 'Eyelashes & Brows', slug: 'eyelashes-brows', description: 'Stunning lash extensions, brow tinting, removals, fills, and henna brows.', image_url: 'https://images.unsplash.com/photo-1583001809072-7991552b874b?w=800&q=80' }
];

const seedBranches: Branch[] = [
  { id: 'b1', name: 'The Colosseum', slug: 'the-colosseum', address: 'Shop G5, The Colosseum, Century City, Cape Town, 7441', phone: '076 659 8811', whatsapp: '27766598811', trading_hours: { monday: '09:00 - 18:00', tuesday: '09:00 - 18:00', wednesday: '09:00 - 18:00', thursday: '09:00 - 19:00', friday: '09:00 - 19:00', saturday: '09:00 - 17:00', sunday: '09:00 - 15:00' }, google_maps_url: 'https://maps.google.com/?q=The+Colosseum+Century+City' },
  { id: 'b2', name: 'Century Village', slug: 'century-village', address: 'Shop 12, Century Village Shopping Centre, Century City, 7441', phone: '076 936 8190', whatsapp: '27769368190', trading_hours: { monday: '09:00 - 18:00', tuesday: '09:00 - 18:00', wednesday: '09:00 - 18:00', thursday: '09:00 - 19:00', friday: '09:00 - 19:00', saturday: '09:00 - 17:00', sunday: '09:00 - 15:00' }, google_maps_url: 'https://maps.google.com/?q=Century+Village+Century+City' },
  { id: 'b3', name: 'Brackenfell', slug: 'brackenfell', address: 'Shop A4, Brackenfell Shopping Centre, Brackenfell, 7560', phone: '072 468 4241', whatsapp: '27724684241', trading_hours: { monday: '09:00 - 18:00', tuesday: '09:00 - 18:00', wednesday: '09:00 - 18:00', thursday: '09:00 - 18:00', friday: '09:00 - 18:00', saturday: '09:00 - 16:00', sunday: 'Closed' }, google_maps_url: 'https://maps.google.com/?q=Brackenfell+Shopping+Centre' },
  { id: 'b4', name: 'Bothasig Square', slug: 'bothasig-square', address: 'Shop 7, Bothasig Square Mall, Bothasig, 7460', phone: '060 669 5785', whatsapp: '27606695785', trading_hours: { monday: '09:00 - 18:00', tuesday: '09:00 - 18:00', wednesday: '09:00 - 18:00', thursday: '09:00 - 18:00', friday: '09:00 - 19:00', saturday: '09:00 - 16:00', sunday: 'Closed' }, google_maps_url: 'https://maps.google.com/?q=Bothasig+Square' },
  { id: 'b5', name: 'Pinelands', slug: 'pinelands', address: 'Shop 18, Central Square, Pinelands, 7405', phone: '072 748 1021', whatsapp: '27727481021', trading_hours: { monday: '09:00 - 18:00', tuesday: '09:00 - 18:00', wednesday: '09:00 - 18:00', thursday: '09:00 - 18:00', friday: '09:00 - 18:00', saturday: '09:00 - 15:00', sunday: 'Closed' }, google_maps_url: 'https://maps.google.com/?q=Central+Square+Pinelands' },
  { id: 'b6', name: 'N1 Value Centre Branch', slug: 'n1-value-centre', address: 'Shop G14, N1 Value Centre, Goodwood, 7460', phone: '082 904 8642', whatsapp: '27829048642', trading_hours: { monday: '09:00 - 18:00', tuesday: '09:00 - 18:00', wednesday: '09:00 - 18:00', thursday: '09:00 - 18:00', friday: '09:00 - 19:00', saturday: '09:00 - 17:00', sunday: '09:00 - 14:00' }, google_maps_url: 'https://maps.google.com/?q=N1+Value+Centre' }
];

const seedServices: Service[] = [
  // Nails (c1)
  { id: 's11', category_id: 'c1', name: 'Signature Gel Manicure', slug: 'signature-gel-manicure', description: 'Full file, cuticle prep, scrub, massage and professional gel overlay.', price_female: 350, price_male: 380, duration_minutes: 45, is_popular: true, image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80' },
  { id: 's12', category_id: 'c1', name: 'Signature Gel Pedicure', slug: 'signature-gel-pedicure', description: 'Relaxing foot soak, scrub, file, cuticle trim, massage and gel overlay.', price_female: 420, price_male: 450, duration_minutes: 60, is_popular: true, image_url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80' },
  { id: 's13', category_id: 'c1', name: 'Acrylic Full Set Extensions', slug: 'acrylic-full-set-extensions', description: 'Premium tips with overlay of high-quality acrylic, finished in gel polish.', price_female: 480, duration_minutes: 90, is_popular: false, image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' },
  { id: 's14', category_id: 'c1', name: 'Polygel Overlay', slug: 'polygel-overlay', description: 'Hybrid gel-acrylic overlay providing extreme durability and lightweight feel.', price_female: 450, duration_minutes: 75, is_popular: false, image_url: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?w=800&q=80' },
  // Waxing (c2)
  { id: 's21', category_id: 'c2', name: 'Full Leg Wax', slug: 'full-leg-wax', description: 'Entire leg waxing from ankles to upper thighs.', price_female: 240, price_male: 290, duration_minutes: 45, is_popular: true, image_url: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80' },
  { id: 's22', category_id: 'c2', name: 'Brazilian / Hollywood Wax', slug: 'brazilian-hollywood-wax', description: 'Intimate waxing. Choose high-hygiene Brazilian or completely smooth Hollywood.', price_female: 310, duration_minutes: 35, is_popular: true, image_url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80' },
  { id: 's23', category_id: 'c2', name: 'Underarm Wax', slug: 'underarm-wax', description: 'Gentle underarm hair removal.', price_female: 120, price_male: 150, duration_minutes: 15, is_popular: false, image_url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80' },
  { id: 's24', category_id: 'c2', name: 'Eyebrow Thread & Wax', slug: 'eyebrow-thread-wax', description: 'Expert eyebrow shaping using thread, wax, or both.', price_female: 110, price_male: 130, duration_minutes: 20, is_popular: false, image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' },
  // Massage (c3)
  { id: 's31', category_id: 'c3', name: 'Swedish Back & Neck Massage', slug: 'swedish-back-neck-massage', description: 'Targeted muscle tension relief for shoulders, neck, and lower back.', price_female: 390, price_male: 420, duration_minutes: 45, is_popular: true, image_url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80' },
  { id: 's32', category_id: 'c3', name: 'Full Body Aromatherapy Massage', slug: 'full-body-aromatherapy-massage', description: 'Rejuvenating head-to-toe massage using luxury essential oil blends.', price_female: 580, price_male: 620, duration_minutes: 60, is_popular: true, image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80' },
  { id: 's33', category_id: 'c3', name: 'Indian Head Massage', slug: 'indian-head-massage', description: 'Stress-releasing massage targeting pressure points in the face, head, and neck.', price_female: 290, price_male: 310, duration_minutes: 30, is_popular: false, image_url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80' },
  // Lashes & Brows (c4)
  { id: 's41', category_id: 'c4', name: 'Classic Lash Extensions Full Set', slug: 'classic-lash-extensions', description: '1-to-1 individual extension application for a natural, elegant lash boost.', price_female: 550, duration_minutes: 90, is_popular: true, image_url: 'https://images.unsplash.com/photo-1583001809072-7991552b874b?w=800&q=80' },
  { id: 's42', category_id: 'c4', name: 'Hybrid Lash Extensions Full Set', slug: 'hybrid-lash-extensions', description: 'A beautiful blend of classic and volume extension lashes for subtle drama.', price_female: 650, duration_minutes: 105, is_popular: true, image_url: 'https://images.unsplash.com/photo-1583001809072-7991552b874b?w=800&q=80' },
  { id: 's43', category_id: 'c4', name: 'Henna Brows & Shaping', slug: 'henna-brows-shaping', description: 'Stains the skin and colors brow hairs for a filled, structured makeup look.', price_female: 320, duration_minutes: 45, is_popular: false, image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' }
];

const seedAddons: ServiceAddon[] = [
  { id: 'a1', service_id: 's11', name: 'Gel Soak-off', description: 'Safe removal of existing gel product', price: 80, duration_minutes: 20 },
  { id: 'a2', service_id: 's11', name: 'Basic Nail Art', description: 'Dotting, simple lines, glitter accent (per nail)', price: 25, duration_minutes: 10 },
  { id: 'a3', service_id: 's11', name: 'Paraffin Wax Treatment', description: 'Intense hydration therapy for soft hands', price: 120, duration_minutes: 15 },
  { id: 'a4', service_id: 's12', name: 'Gel Soak-off (Pedicure)', description: 'Safe removal of gel toes product', price: 80, duration_minutes: 20 },
  { id: 'a5', service_id: 's41', name: 'Lash Soak-off / Removal', description: 'Gentle adhesive dissolving cream', price: 150, duration_minutes: 30 }
];

const seedStaff: Staff[] = [
  { id: 't1', branch_id: 'b1', name: 'Chantel Venter', title: 'Salon Owner & Master Therapist', bio: 'Chantel has 15+ years of beauty industry experience, specializing in advanced acrylic extensions.', image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', email: 'chantel@amorenails.co.za' },
  { id: 't2', branch_id: 'b1', name: 'Lerato Kumalo', title: 'Senior Lash & Brow Artist', bio: 'Lerato is our go-to specialist for high-definition hybrid extensions and henna brow mappings.', image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', email: 'lerato@amorenails.co.za' },
  { id: 't3', branch_id: 'b2', name: 'Fatima Patel', title: 'Massage & Waxing Expert', bio: 'Fatima focuses on holistic health, delivering deep tissue back massages and quick, painless waxes.', image_url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=80', email: 'fatima@amorenails.co.za' },
  { id: 't4', branch_id: 'b3', name: 'Chloe October', title: 'Nail & Pedicure Technician', bio: 'Chloe creates detailed nail art and handles relaxing paraffin spa pedicures.', image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', email: 'chloe@amorenails.co.za' }
];

const seedIntakeQuestions: IntakeQuestion[] = [
  // Nails
  { id: 'q11', form_type: 'nails', question_text: 'Which service are you receiving today?', question_type: 'select', options: ['Hands (Manicure)', 'Feet (Pedicure)', 'Both'], is_required: true, sort_order: 1 },
  { id: 'q12', form_type: 'nails', question_text: 'What do you currently have on your nails?', question_type: 'select', options: ['Bare/Natural Nails', 'Gel Overlay', 'Acrylic Extensions', 'Polygel', 'Other'], is_required: true, sort_order: 2 },
  { id: 'q13', form_type: 'nails', question_text: 'Do you require a soak-off/removal of your current product?', question_type: 'radio', options: ['Yes, please', 'No, ready for application'], is_required: true, sort_order: 3 },
  { id: 'q14', form_type: 'nails', question_text: 'What is your desired nail shape?', question_type: 'select', options: ['Square', 'Squoval', 'Oval', 'Almond', 'Coffin/Ballerina', 'Stiletto', 'N/A (Pedicure)'], is_required: false, sort_order: 4 },
  { id: 'q15', form_type: 'nails', question_text: 'What is your desired nail length?', question_type: 'select', options: ['Short (Active)', 'Medium', 'Long', 'N/A (Pedicure)'], is_required: false, sort_order: 5 },
  { id: 'q16', form_type: 'nails', question_text: 'Will you require nail art?', question_type: 'radio', options: ['No, solid color/french', 'Yes, basic (glitter/dots)', 'Yes, advanced (handpainted/gemstones)'], is_required: true, sort_order: 6 },
  { id: 'q17', form_type: 'nails', question_text: 'Please list any allergies or sensitivities (e.g. acrylic monomers, UV lamp):', question_type: 'text', is_required: false, sort_order: 7 },
  { id: 'q18', form_type: 'nails', question_text: 'Are any of your nails currently damaged, painful, or lifting?', question_type: 'textarea', is_required: false, sort_order: 8 },
  { id: 'q19', form_type: 'nails', question_text: 'Upload your nail inspiration image if you have one:', question_type: 'file', is_required: false, sort_order: 9 },

  // Waxing
  { id: 'q21', form_type: 'waxing', question_text: 'Is this your first time waxing with us?', question_type: 'radio', options: ['Yes, first time', 'No, returning client'], is_required: true, sort_order: 1 },
  { id: 'q22', form_type: 'waxing', question_text: 'Which area(s) are you planning to wax today?', question_type: 'text', is_required: true, sort_order: 2 },
  { id: 'q23', form_type: 'waxing', question_text: 'Do you have sensitive skin?', question_type: 'radio', options: ['No', 'Mildly sensitive', 'Highly sensitive'], is_required: true, sort_order: 3 },
  { id: 'q24', form_type: 'waxing', question_text: 'Have you had recent chemical peels, exfoliation, or retinol treatments in the last 7 days?', question_type: 'radio', options: ['Yes', 'No'], is_required: true, sort_order: 4 },
  { id: 'q25', form_type: 'waxing', question_text: 'Do you have a therapist gender preference?', question_type: 'select', options: ['No Preference', 'Female Therapist Only', 'Male Therapist Only'], is_required: true, sort_order: 5 },
  { id: 'q26', form_type: 'waxing', question_text: 'Please note any active skin irritations, cuts, sunburns, or lesions on the areas to be waxed:', question_type: 'textarea', is_required: false, sort_order: 6 },
  { id: 'q27', form_type: 'waxing', question_text: 'I consent to the waxing treatment and acknowledge that minor redness is normal.', question_type: 'checkbox', options: ['I consent'], is_required: true, sort_order: 7 },

  // Lashes & Brows
  { id: 'q31', form_type: 'lashes_brows', question_text: 'Is this your first time getting eyelash extensions?', question_type: 'radio', options: ['Yes', 'No, I have had them before'], is_required: true, sort_order: 1 },
  { id: 'q32', form_type: 'lashes_brows', question_text: 'Do you wear contact lenses?', question_type: 'radio', options: ['Yes (I will remove them before session)', 'No'], is_required: true, sort_order: 2 },
  { id: 'q33', form_type: 'lashes_brows', question_text: 'Do you have sensitive eyes or known adhesive/latex allergies?', question_type: 'radio', options: ['Yes', 'No'], is_required: true, sort_order: 3 },
  { id: 'q34', form_type: 'lashes_brows', question_text: 'What is your desired lash extension style?', question_type: 'select', options: ['Natural', 'Cat Eye', 'Doll Eye', 'Wispy/Hybrid', 'Dramatic/Mega Volume', 'Not Sure (Consultation Needed)'], is_required: false, sort_order: 4 },
  { id: 'q35', form_type: 'lashes_brows', question_text: 'When was your last lash fill or application?', question_type: 'text', is_required: false, sort_order: 5 },
  { id: 'q36', form_type: 'lashes_brows', question_text: 'Upload your lash inspiration image if you have one:', question_type: 'file', is_required: false, sort_order: 6 },
  { id: 'q37', form_type: 'lashes_brows', question_text: 'I consent to the application of extensions and lash products near my eyes.', question_type: 'checkbox', options: ['I consent'], is_required: true, sort_order: 7 },

  // Massage
  { id: 'q41', form_type: 'massage', question_text: 'What is your massage pressure preference?', question_type: 'select', options: ['Light (Relaxing)', 'Medium (Standard)', 'Firm (Deep Tissue)'], is_required: true, sort_order: 1 },
  { id: 'q42', form_type: 'massage', question_text: 'Which areas would you like us to focus on? (e.g., shoulders, neck, lower back):', question_type: 'text', is_required: false, sort_order: 2 },
  { id: 'q43', form_type: 'massage', question_text: 'Are there any areas we should completely avoid?', question_type: 'text', is_required: false, sort_order: 3 },
  { id: 'q44', form_type: 'massage', question_text: 'Do you have any recent injuries, chronic pain, or joint issues?', question_type: 'textarea', is_required: false, sort_order: 4 },
  { id: 'q45', form_type: 'massage', question_text: 'Are you currently pregnant or do you have any heart conditions/circulatory disorders?', question_type: 'radio', options: ['No', 'Yes, pregnant (first trimester)', 'Yes, pregnant (second/third trimester)', 'Yes, health conditions (will explain to therapist)'], is_required: true, sort_order: 5 },
  { id: 'q46', form_type: 'massage', question_text: 'I consent to receive massage therapy and agree to communicate my comfort levels during session.', question_type: 'checkbox', options: ['I consent'], is_required: true, sort_order: 6 }
];

const seedGalleryItems: GalleryItem[] = [
  { id: 'g1', category: 'Nails', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', title: 'Nude Blush Overlay', description: 'Clean natural gel overlay on square shape', service_id: 's11' },
  { id: 'g2', category: 'Nails', image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', title: 'Elegant Acrylic extensions', description: 'Stunning long almond shape acrylics in glossy pink', service_id: 's13' },
  { id: 'g3', category: 'Lashes', image_url: 'https://images.unsplash.com/photo-1583001809072-7991552b874b?w=800&q=80', title: 'Volume Lash Extensions', description: 'Full volume extensions for perfect eye framing', service_id: 's42' },
  { id: 'g4', category: 'Brows', image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', title: 'Precision Henna Mapping', description: 'Fully defined brows utilizing organic Henna', service_id: 's43' }
];

const seedReviews: Review[] = [
  { id: 'r1', client_name: 'Sarah Jenkins', rating: 5, comment: 'Excellent service at Century Village! Lerato did my volume lash set and I have received so many compliments!', is_approved: true, created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString() },
  { id: 'r2', client_name: 'Megan Cloete', rating: 5, comment: 'Best manicure in town. The gold accents and the cream-toned decor in the Brackenfell branch make it feel so luxury.', is_approved: true, created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString() },
  { id: 'r3', client_name: 'Bianca de Wet', rating: 4, comment: 'The aromatherapy massage was incredibly relaxing, will definitely be rebooking with Fatima.', is_approved: true, created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString() }
];

const seedPromotions: Promotion[] = [
  { id: 'p1', title: 'Winter Warmup Spa Special', description: 'Get 15% off any aromatherapy massage or spa pedicure this June!', discount_percentage: 15, is_active: true, banner_text: '❄️ Winter Warmup Special: Get 15% off Aromatherapy Massage & Gel Pedicures! Limited Slots available. Book Now.' }
];

const seedPolicies: Policy[] = [
  { id: 'pol1', title: 'POPIA Privacy Notice', policy_type: 'privacy', content: 'We respect your privacy. In accordance with the Protection of Personal Information Act (POPIA) of South Africa, we secure all your booking details, intake form answers, and personal contacts. Your intake forms are encrypted and stored safely. We will never share your medical, cosmetic, or contact details with third parties.' },
  { id: 'pol2', title: 'Cancellation Policy', policy_type: 'cancellation', content: 'We require at least 24 hours notice for any booking cancellations or reschedules. If you cancel within 24 hours of your appointment or fail to show up, a 50% cancellation fee will be charged to your card on file or added to your next booking.' },
  { id: 'pol3', title: 'Deposit Policy', policy_type: 'deposit', content: 'To secure high-value treatments (acrylic full sets, volume lashes, full body massages) or peak holiday times, we require a 50% non-refundable deposit paid online or via EFT within 12 hours of booking.' },
  { id: 'pol4', title: 'Late Arrival Policy', policy_type: 'late_arrival', content: 'Please arrive 10 minutes prior to your scheduled booking. If you are more than 15 minutes late, we may need to shorten your treatment duration to respect the next client\'s schedule, while the full service price will still apply.' }
];

const seedFAQs: FAQ[] = [
  { id: 'faq1', question: 'How do I reschedule my appointment?', answer: 'You can reschedule your appointment by logging into the Client Portal up to 24 hours before your booking. Alternatively, you can click on the rebooking link in your WhatsApp or email confirmation.', category: 'Booking' },
  { id: 'faq2', question: 'Do you do acrylic soak-offs?', answer: 'Yes, we perform safe acrylic removals using professional soaking methods to protect your natural nail bed. Please add the "Gel/Acrylic Soak-off" add-on to your booking so we allocate enough time.', category: 'Nails' },
  { id: 'faq3', question: 'What aftercare is required for lash extensions?', answer: 'Do not wet your lashes for the first 24 hours. Avoid oil-based makeup removers, brush them daily with a clean spoolie, and do not pull or tug them. Fills are recommended every 2-3 weeks.', category: 'Lashes' },
  { id: 'faq4', question: 'Is waxing painful for first-timers?', answer: 'While you may feel brief discomfort, our therapists use premium warm waxes and soothing skin preparation oils that minimize irritation. Pain decreases significantly with regular waxing sessions.', category: 'Waxing' },
  { id: 'faq5', question: 'Which massage pressure is best for muscle knots?', answer: 'We recommend choosing "Firm (Deep Tissue)" pressure for our Swedish Back & Neck Massage if you have active trigger points or muscle knots.', category: 'Massage' }
];

// Seed some initial bookings
const seedBookings: Booking[] = [
  {
    id: 'bkg-1',
    client_id: 'cl-1',
    client_name: 'Jessica Taylor',
    client_email: 'jessica@example.com',
    client_phone: '071 234 5678',
    branch_id: 'b1',
    staff_id: 't1',
    booking_date: new Date().toISOString().split('T')[0],
    booking_time: '10:00',
    status: 'confirmed',
    total_price: 430,
    deposit_paid: 215,
    loyalty_points_earned: 43,
    loyalty_points_used: 0,
    notes: 'Needs soaking off',
    created_at: new Date().toISOString(),
    services: [{ id: 's11', name: 'Signature Gel Manicure', price: 350, duration: 45, gender_pricing: 'female' }],
    addons: [{ id: 'a1', name: 'Gel Soak-off', price: 80 }]
  },
  {
    id: 'bkg-2',
    client_id: 'cl-2',
    client_name: 'Rian du Plessis',
    client_email: 'rian@example.com',
    client_phone: '083 456 7890',
    branch_id: 'b1',
    staff_id: 't3',
    booking_date: new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0],
    booking_time: '14:30',
    status: 'pending',
    total_price: 420,
    deposit_paid: 0,
    loyalty_points_earned: 42,
    loyalty_points_used: 0,
    notes: 'Firm pressure preferred',
    created_at: new Date().toISOString(),
    services: [{ id: 's31', name: 'Swedish Back & Neck Massage', price: 420, duration: 45, gender_pricing: 'male' }],
    addons: []
  }
];

// --- DB CLIENT CLASS ---

class MockDB {
  private getStorageItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    try {
      return JSON.parse(item);
    } catch {
      return defaultValue;
    }
  }

  private setStorageItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Categories
  getCategories(): ServiceCategory[] {
    return this.getStorageItem('amore_categories', seedCategories);
  }

  // Branches
  getBranches(): Branch[] {
    return this.getStorageItem('amore_branches', seedBranches);
  }

  getBranchBySlug(slug: string): Branch | undefined {
    return this.getBranches().find(b => b.slug === slug);
  }

  // Services
  getServices(): Service[] {
    return this.getStorageItem('amore_services', seedServices);
  }

  getServiceBySlug(slug: string): Service | undefined {
    return this.getServices().find(s => s.slug === slug);
  }

  getServicesByCategory(categoryId: string): Service[] {
    return this.getServices().filter(s => s.category_id === categoryId);
  }

  createService(service: Omit<Service, 'id' | 'slug'>): Service {
    const services = this.getServices();
    const slug = service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newService = { ...service, id: 's' + (services.length + 11), slug };
    services.push(newService);
    this.setStorageItem('amore_services', services);
    return newService;
  }

  updateService(id: string, updatedFields: Partial<Service>): Service | null {
    const services = this.getServices();
    const index = services.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    let slug = services[index].slug;
    if (updatedFields.name) {
      slug = updatedFields.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    services[index] = { ...services[index], ...updatedFields, slug };
    this.setStorageItem('amore_services', services);
    return services[index];
  }

  deleteService(id: string): boolean {
    const services = this.getServices();
    const filtered = services.filter(s => s.id !== id);
    if (filtered.length === services.length) return false;
    this.setStorageItem('amore_services', filtered);
    return true;
  }

  // Addons
  getAddons(): ServiceAddon[] {
    return this.getStorageItem('amore_addons', seedAddons);
  }

  getAddonsByService(serviceId: string): ServiceAddon[] {
    return this.getAddons().filter(a => a.service_id === serviceId);
  }

  // Staff
  getStaff(): Staff[] {
    return this.getStorageItem('amore_staff', seedStaff);
  }

  getStaffByBranch(branchId: string): Staff[] {
    return this.getStaff().filter(s => s.branch_id === branchId);
  }

  // Bookings
  getBookings(): Booking[] {
    return this.getStorageItem('amore_bookings', seedBookings);
  }

  getBookingById(id: string): Booking | undefined {
    return this.getBookings().find(b => b.id === id);
  }

  getBookingsByClientEmail(email: string): Booking[] {
    return this.getBookings().filter(b => b.client_email.toLowerCase() === email.toLowerCase());
  }

  createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'status'>): Booking {
    const bookings = this.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: 'bkg-' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      status: 'pending'
    };
    bookings.push(newBooking);
    this.setStorageItem('amore_bookings', bookings);

    // Automatically trigger notification schedule
    this.scheduleNotificationsForBooking(newBooking);

    // Update loyalty points
    this.adjustLoyaltyPoints(newBooking.client_email, newBooking.client_name, newBooking.client_phone, newBooking.loyalty_points_earned - newBooking.loyalty_points_used);

    return newBooking;
  }

  updateBookingStatus(id: string, status: Booking['status']): Booking | null {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    bookings[index].status = status;
    this.setStorageItem('amore_bookings', bookings);
    return bookings[index];
  }

  // Intake Questions & Responses
  getIntakeQuestions(formType?: string): IntakeQuestion[] {
    const questions = this.getStorageItem('amore_intake_questions', seedIntakeQuestions);
    if (formType) {
      return questions.filter(q => q.form_type === formType).sort((a, b) => a.sort_order - b.sort_order);
    }
    return questions;
  }

  getIntakeResponses(): IntakeResponse[] {
    return this.getStorageItem('amore_intake_responses', []);
  }

  saveIntakeResponses(bookingId: string, responses: Omit<IntakeResponse, 'id' | 'booking_id'>[]): void {
    const allResponses = this.getIntakeResponses();
    const newResponses = responses.map(r => ({
      ...r,
      id: 'res-' + Math.random().toString(36).substr(2, 9),
      booking_id: bookingId
    }));
    this.setStorageItem('amore_intake_responses', [...allResponses, ...newResponses]);
  }

  getResponsesForBooking(bookingId: string): IntakeResponse[] {
    return this.getIntakeResponses().filter(r => r.booking_id === bookingId);
  }

  // Reviews
  getReviews(): Review[] {
    return this.getStorageItem('amore_reviews', seedReviews);
  }

  addReview(review: Omit<Review, 'id' | 'is_approved' | 'created_at'>): Review {
    const reviews = this.getReviews();
    const newReview: Review = {
      ...review,
      id: 'r-' + (reviews.length + 1),
      is_approved: true, // Auto-approve in mock for preview
      created_at: new Date().toISOString()
    };
    reviews.push(newReview);
    this.setStorageItem('amore_reviews', reviews);
    return newReview;
  }

  // Promotions
  getPromotions(): Promotion[] {
    return this.getStorageItem('amore_promotions', seedPromotions);
  }

  updatePromotion(id: string, updatedFields: Partial<Promotion>): Promotion | null {
    const promos = this.getPromotions();
    const index = promos.findIndex(p => p.id === id);
    if (index === -1) return null;
    promos[index] = { ...promos[index], ...updatedFields };
    this.setStorageItem('amore_promotions', promos);
    return promos[index];
  }

  // Policies & FAQs
  getPolicies(): Policy[] {
    return this.getStorageItem('amore_policies', seedPolicies);
  }

  getFAQs(): FAQ[] {
    return this.getStorageItem('amore_faqs', seedFAQs);
  }

  // Notifications
  getNotifications(): NotificationRecord[] {
    return this.getStorageItem('amore_notifications', []);
  }

  private scheduleNotificationsForBooking(booking: Booking): void {
    const notifications = this.getNotifications();
    const clientName = booking.client_name;
    const clientPhone = booking.client_phone;
    const bookingId = booking.id;
    const dateStr = booking.booking_date;
    const timeStr = booking.booking_time;

    // 1. Instant Confirmation Notification (WhatsApp & Email)
    const instantWhatsApp: NotificationRecord = {
      id: 'ntf-' + Math.random().toString(36).substr(2, 9),
      client_name: clientName,
      client_phone: clientPhone,
      booking_id: bookingId,
      type: 'whatsapp',
      status: 'sent',
      trigger_type: 'confirmation',
      send_time: new Date().toISOString(),
      message_content: `Hi ${clientName}, your booking at Amore Nails & Beauty Lounge (${booking.services.map(s => s.name).join(', ')}) on ${dateStr} at ${timeStr} is confirmed! Preparation instructions: Please arrive 10 minutes prior with bare nails if soak-off was not prebooked. Rebooking link: http://localhost:3000/portal`,
      created_at: new Date().toISOString()
    };

    // 2. 24-Hour Reminder
    const reminder24h: NotificationRecord = {
      id: 'ntf-' + Math.random().toString(36).substr(2, 9),
      client_name: clientName,
      client_phone: clientPhone,
      booking_id: bookingId,
      type: 'whatsapp',
      status: 'pending',
      trigger_type: 'reminder_24h',
      send_time: new Date(new Date(`${dateStr}T${timeStr}`).getTime() - 24 * 3600 * 1000).toISOString(),
      message_content: `Hi ${clientName}, this is a reminder of your appointment at Amore Nails tomorrow at ${timeStr}. We look forward to pampering you!`,
      created_at: new Date().toISOString()
    };

    // 3. 2-Hour Reminder
    const reminder2h: NotificationRecord = {
      id: 'ntf-' + Math.random().toString(36).substr(2, 9),
      client_name: clientName,
      client_phone: clientPhone,
      booking_id: bookingId,
      type: 'whatsapp',
      status: 'pending',
      trigger_type: 'reminder_2h',
      send_time: new Date(new Date(`${dateStr}T${timeStr}`).getTime() - 2 * 3600 * 1000).toISOString(),
      message_content: `Hi ${clientName}, see you in 2 hours! We are getting your station ready.`,
      created_at: new Date().toISOString()
    };

    // 4. Post-Appointment Review & Aftercare Request (scheduled 3 hours after start)
    const reviewRequest: NotificationRecord = {
      id: 'ntf-' + Math.random().toString(36).substr(2, 9),
      client_name: clientName,
      client_phone: clientPhone,
      booking_id: bookingId,
      type: 'whatsapp',
      status: 'pending',
      trigger_type: 'review_request',
      send_time: new Date(new Date(`${dateStr}T${timeStr}`).getTime() + 3 * 3600 * 1000).toISOString(),
      message_content: `Hi ${clientName}, thank you for visiting Amore Nails today! Here is your aftercare advice: keep nails oiled, avoid harsh chemicals. Please rate your experience: http://localhost:3000/reviews`,
      created_at: new Date().toISOString()
    };

    notifications.push(instantWhatsApp, reminder24h, reminder2h, reviewRequest);
    this.setStorageItem('amore_notifications', notifications);
  }

  // Loyalty points profile management
  getClientLoyaltyPoints(email: string): number {
    const clients = this.getStorageItem('amore_clients_points', {} as Record<string, number>);
    return clients[email.toLowerCase()] || 0;
  }

  adjustLoyaltyPoints(email: string, firstName: string, phone: string, pointsChange: number): number {
    const clients = this.getStorageItem('amore_clients_points', {} as Record<string, number>);
    const currentPoints = clients[email.toLowerCase()] || 0;
    const newPoints = Math.max(0, currentPoints + pointsChange);
    clients[email.toLowerCase()] = newPoints;
    this.setStorageItem('amore_clients_points', clients);
    return newPoints;
  }

  // Gallery Management
  getGallery(): GalleryItem[] {
    return this.getStorageItem('amore_gallery', seedGalleryItems);
  }

  addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const gallery = this.getGallery();
    const newItem = { ...item, id: 'g-' + (gallery.length + 1) };
    gallery.push(newItem);
    this.setStorageItem('amore_gallery', gallery);
    return newItem;
  }

  deleteGalleryItem(id: string): boolean {
    const gallery = this.getGallery();
    const filtered = gallery.filter(g => g.id !== id);
    if (filtered.length === gallery.length) return false;
    this.setStorageItem('amore_gallery', filtered);
    return true;
  }
}

export const db = new MockDB();
export default db;
