-- Amore Nails & Beauty Lounge - Complete Database Seed Data (Phase 1)

-- 1. Insert Service Categories
INSERT INTO service_categories (id, name, slug, description, image_url) VALUES
('c1111111-1111-1111-1111-111111111111', 'Nails', 'nails', 'Premium manicures, pedicures, gel overlays, acrylic overlays, nail art, and custom extensions.', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80'),
('c2222222-2222-2222-2222-222222222222', 'Waxing', 'waxing', 'Professional full-body face, leg, arm, and body waxing for ladies and gents.', 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80'),
('c3333333-3333-3333-3333-333333333333', 'Massage', 'massage', 'Soothing therapeutic massages, including Indian Head, Back & Neck, and Full Body treatments.', 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80'),
('c4444444-4444-4444-4444-444444444444', 'Eyelashes & Brows', 'eyelashes-brows', 'Stunning lash extensions, brow tinting, removals, fills, and henna brows.', 'https://images.unsplash.com/photo-1583001809072-7991552b874b?w=800&q=80');

-- 2. Insert Branches
INSERT INTO branches (id, name, slug, address, phone, whatsapp, trading_hours, google_maps_url) VALUES
('b1111111-1111-1111-1111-111111111111', 'The Colosseum', 'the-colosseum', 'Shop G5, The Colosseum, Century City, Cape Town, 7441', '076 659 8811', '27766598811', '{"monday": "09:00 - 18:00", "tuesday": "09:00 - 18:00", "wednesday": "09:00 - 18:00", "thursday": "09:00 - 19:00", "friday": "09:00 - 19:00", "saturday": "09:00 - 17:00", "sunday": "09:00 - 15:00"}', 'https://maps.google.com/?q=The+Colosseum+Century+City'),
('b2222222-2222-2222-2222-222222222222', 'Century Village', 'century-village', 'Shop 12, Century Village Shopping Centre, Century City, 7441', '076 936 8190', '27769368190', '{"monday": "09:00 - 18:00", "tuesday": "09:00 - 18:00", "wednesday": "09:00 - 18:00", "thursday": "09:00 - 19:00", "friday": "09:00 - 19:00", "saturday": "09:00 - 17:00", "sunday": "09:00 - 15:00"}', 'https://maps.google.com/?q=Century+Village+Century+City'),
('b3333333-3333-3333-3333-333333333333', 'Brackenfell', 'brackenfell', 'Shop A4, Brackenfell Shopping Centre, Brackenfell, 7560', '072 468 4241', '27724684241', '{"monday": "09:00 - 18:00", "tuesday": "09:00 - 18:00", "wednesday": "09:00 - 18:00", "thursday": "09:00 - 18:00", "friday": "09:00 - 18:00", "saturday": "09:00 - 16:00", "sunday": "Closed"}', 'https://maps.google.com/?q=Brackenfell+Shopping+Centre'),
('b4444444-4444-4444-4444-444444444444', 'Bothasig Square', 'bothasig-square', 'Shop 7, Bothasig Square Mall, Bothasig, 7460', '060 669 5785', '27606695785', '{"monday": "09:00 - 18:00", "tuesday": "09:00 - 18:00", "wednesday": "09:00 - 18:00", "thursday": "09:00 - 18:00", "friday": "09:00 - 19:00", "saturday": "09:00 - 16:00", "sunday": "Closed"}', 'https://maps.google.com/?q=Bothasig+Square'),
('b5555555-5555-5555-5555-555555555555', 'Pinelands', 'pinelands', 'Shop 18, Central Square, Pinelands, 7405', '072 748 1021', '27727481021', '{"monday": "09:00 - 18:00", "tuesday": "09:00 - 18:00", "wednesday": "09:00 - 18:00", "thursday": "09:00 - 18:00", "friday": "09:00 - 18:00", "saturday": "09:00 - 15:00", "sunday": "Closed"}', 'https://maps.google.com/?q=Central+Square+Pinelands'),
('b6666666-6666-6666-6666-666666666666', 'N1 Value Centre Branch', 'n1-value-centre', 'Shop G14, N1 Value Centre, Goodwood, 7460', '082 904 8642', '27829048642', '{"monday": "09:00 - 18:00", "tuesday": "09:00 - 18:00", "wednesday": "09:00 - 18:00", "thursday": "09:00 - 18:00", "friday": "09:00 - 19:00", "saturday": "09:00 - 17:00", "sunday": "09:00 - 14:00"}', 'https://maps.google.com/?q=N1+Value+Centre');

-- 3. Insert Services
-- Nails
INSERT INTO services (id, category_id, name, slug, description, price_female, price_male, duration_minutes, is_popular, image_url) VALUES
('s1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'Signature Gel Manicure', 'signature-gel-manicure', 'Full file, cuticle prep, scrub, massage and professional gel overlay.', 350.00, 380.00, 45, true, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80'),
('s1111112-1112-1112-1112-111111111112', 'c1111111-1111-1111-1111-111111111111', 'Signature Gel Pedicure', 'signature-gel-pedicure', 'Relaxing foot soak, scrub, file, cuticle trim, massage and gel overlay.', 420.00, 450.00, 60, true, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80'),
('s1111113-1113-1113-1113-111111111113', 'c1111111-1111-1111-1111-111111111111', 'Acrylic Full Set Extensions', 'acrylic-full-set-extensions', 'Premium tips with overlay of high-quality acrylic, finished in gel polish.', 480.00, NULL, 90, false, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80'),
('s1111114-1114-1114-1114-111111111114', 'c1111111-1111-1111-1111-111111111111', 'Polygel Overlay', 'polygel-overlay', 'Hybird gel-acrylic overlay providing extreme durability and lightweight feel.', 450.00, NULL, 75, false, 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?w=800&q=80');

-- Waxing
INSERT INTO services (id, category_id, name, slug, description, price_female, price_male, duration_minutes, is_popular, image_url) VALUES
('s2222221-2221-2221-2221-222222222221', 'c2222222-2222-2222-2222-222222222222', 'Full Leg Wax', 'full-leg-wax', 'Entire leg waxing from ankles to upper thighs.', 240.00, 290.00, 45, true, 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80'),
('s2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 'Brazilian / Hollywood Wax', 'brazilian-hollywood-wax', 'Intimate waxing. Choose high-hygiene Brazilian or completely smooth Hollywood.', 310.00, NULL, 35, true, 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80'),
('s2222223-2223-2223-2223-222222222223', 'c2222222-2222-2222-2222-222222222222', 'Underarm Wax', 'underarm-wax', 'Gentle underarm hair removal.', 120.00, 150.00, 15, false, 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80'),
('s2222224-2224-2224-2224-222222222224', 'c2222222-2222-2222-2222-222222222222', 'Eyebrow Thread & Wax', 'eyebrow-thread-wax', 'Expert eyebrow shaping using thread, wax, or both.', 110.00, 130.00, 20, false, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80');

-- Massage
INSERT INTO services (id, category_id, name, slug, description, price_female, price_male, duration_minutes, is_popular, image_url) VALUES
('s3333331-3331-3331-3331-333333333331', 'c3333333-3333-3333-3333-333333333333', 'Swedish Back & Neck Massage', 'swedish-back-neck-massage', 'Targeted muscle tension relief for shoulders, neck, and lower back.', 390.00, 420.00, 45, true, 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80'),
('s3333332-3332-3332-3332-333333333332', 'c3333333-3333-3333-3333-333333333333', 'Full Body Aromatherapy Massage', 'full-body-aromatherapy-massage', 'Rejuvenating head-to-toe massage using luxury essential oil blends.', 580.00, 620.00, 60, true, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'),
('s3333333-3333-3333-3333-333333333333', 'c3333333-3333-3333-3333-333333333333', 'Indian Head Massage', 'indian-head-massage', 'Stress-releasing massage targeting pressure points in the face, head, and neck.', 290.00, 310.00, 30, false, 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80');

-- Lashes & Brows
INSERT INTO services (id, category_id, name, slug, description, price_female, price_male, duration_minutes, is_popular, image_url) VALUES
('s4444441-4441-4441-4441-444444444441', 'c4444444-4444-4444-4444-444444444444', 'Classic Lash Extensions Full Set', 'classic-lash-extensions', '1-to-1 individual extension application for a natural, elegant lash boost.', 550.00, NULL, 90, true, 'https://images.unsplash.com/photo-1583001809072-7991552b874b?w=800&q=80'),
('s4444442-4442-4442-4442-444444444442', 'c4444444-4444-4444-4444-444444444444', 'Hybrid Lash Extensions Full Set', 'hybrid-lash-extensions', 'A beautiful blend of classic and volume extension lashes for subtle drama.', 650.00, NULL, 105, true, 'https://images.unsplash.com/photo-1583001809072-7991552b874b?w=800&q=80'),
('s4444443-4443-4443-4443-444444444443', 'c4444444-4444-4444-4444-444444444444', 'Henna Brows & Shaping', 'henna-brows-shaping', 'Stains the skin and colors brow hairs for a filled, structured makeup look.', 320.00, NULL, 45, false, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80');

-- 4. Insert Service Add-ons
INSERT INTO service_addons (id, service_id, name, description, price, duration_minutes) VALUES
-- Nails addons
('a1111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', 'Gel Soak-off', 'Safe removal of existing gel product', 80.00, 20),
('a1111112-1112-1112-1112-111111111112', 's1111111-1111-1111-1111-111111111111', 'Basic Nail Art', 'Dotting, simple lines, glitter accent (per nail)', 25.00, 10),
('a1111113-1113-1113-1113-111111111113', 's1111111-1111-1111-1111-111111111111', 'Paraffin Wax Treatment', 'Intense hydration therapy for soft hands', 120.00, 15),
-- Lash addons
('a4444441-4441-4441-4441-444444444441', 's4444441-4441-4441-4441-444444444441', 'Lash Soak-off / Removal', 'Gentle adhesive dissolving cream', 150.00, 30);

-- 5. Insert Users & Staff
INSERT INTO users (id, email, role) VALUES
('u1111111-1111-1111-1111-111111111111', 'chantel@amorenails.co.za', 'admin'),
('u2222222-2222-2222-2222-222222222222', 'lerato@amorenails.co.za', 'staff'),
('u3333333-3333-3333-3333-333333333333', 'fatima@amorenails.co.za', 'staff'),
('u4444444-4444-4444-4444-444444444444', 'chloe@amorenails.co.za', 'staff');

INSERT INTO staff (id, branch_id, user_id, name, title, bio, image_url, email) VALUES
('t1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111111', 'Chantel Venter', 'Salon Owner & Master Therapist', 'Chantel has 15+ years of beauty industry experience, specializing in advanced acrylic extensions.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', 'chantel@amorenails.co.za'),
('t2222222-2222-2222-2222-222222222222', 'b1111111-1111-1111-1111-111111111111', 'u2222222-2222-2222-2222-222222222222', 'Lerato Kumalo', 'Senior Lash & Brow Artist', 'Lerato is our go-to specialist for high-definition hybrid extensions and henna brow mappings.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', 'lerato@amorenails.co.za'),
('t3333333-3333-3333-3333-333333333333', 'b2222222-2222-2222-2222-222222222222', 'u3333333-3333-3333-3333-333333333333', 'Fatima Patel', 'Massage & Waxing Expert', 'Fatima focuses on holistic health, delivering deep tissue back massages and quick, painless waxes.', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=80', 'fatima@amorenails.co.za'),
('t4444444-4444-4444-4444-444444444444', 'b3333333-3333-3333-3333-333333333333', 'u4444444-4444-4444-4444-444444444444', 'Chloe October', 'Nail & Pedicure Technician', 'Chloe creates detailed nail art and handles relaxing paraffin spa pedicures.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', 'chloe@amorenails.co.za');

-- 6. Insert Staff Availability (Mon to Sat schedules)
INSERT INTO staff_availability (staff_id, day_of_week, start_time, end_time, is_active) VALUES
('t1111111-1111-1111-1111-111111111111', 1, '09:00', '17:00', true),
('t1111111-1111-1111-1111-111111111111', 2, '09:00', '17:00', true),
('t1111111-1111-1111-1111-111111111111', 3, '09:00', '17:00', true),
('t1111111-1111-1111-1111-111111111111', 4, '09:00', '17:00', true),
('t1111111-1111-1111-1111-111111111111', 5, '09:00', '17:00', true),
('t2222222-2222-2222-2222-222222222222', 1, '09:00', '18:00', true),
('t2222222-2222-2222-2222-222222222222', 2, '09:00', '18:00', true),
('t2222222-2222-2222-2222-222222222222', 3, '09:00', '18:00', true),
('t2222222-2222-2222-2222-222222222222', 4, '09:00', '18:00', true),
('t2222222-2222-2222-2222-222222222222', 5, '09:00', '18:00', true),
('t3333333-3333-3333-3333-333333333333', 1, '09:00', '18:00', true),
('t3333333-3333-3333-3333-333333333333', 2, '09:00', '18:00', true),
('t3333333-3333-3333-3333-333333333333', 3, '09:00', '18:00', true),
('t3333333-3333-3333-3333-333333333333', 4, '09:00', '18:00', true),
('t3333333-3333-3333-3333-333333333333', 5, '09:00', '18:00', true),
('t4444444-4444-4444-4444-444444444444', 1, '09:00', '18:00', true),
('t4444444-4444-4444-4444-444444444444', 2, '09:00', '18:00', true),
('t4444444-4444-4444-4444-444444444444', 3, '09:00', '18:00', true),
('t4444444-4444-4444-4444-444444444444', 4, '09:00', '18:00', true),
('t4444444-4444-4444-4444-444444444444', 5, '09:00', '18:00', true);

-- 7. Insert Intake Forms & Questions
-- Intake Form: Nails
INSERT INTO intake_forms (id, category_id, form_type) VALUES ('f1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'nails');
INSERT INTO intake_questions (intake_form_id, question_text, question_type, options, is_required, sort_order) VALUES
('f1111111-1111-1111-1111-111111111111', 'Which service are you receiving today?', 'select', '["Hands (Manicure)", "Feet (Pedicure)", "Both"]', true, 1),
('f1111111-1111-1111-1111-111111111111', 'What do you currently have on your nails?', 'select', '["Bare/Natural Nails", "Gel Overlay", "Acrylic Extensions", "Polygel", "Other"]', true, 2),
('f1111111-1111-1111-1111-111111111111', 'Do you require a soak-off/removal of your current product?', 'radio', '["Yes, please", "No, ready for application"]', true, 3),
('f1111111-1111-1111-1111-111111111111', 'What is your desired nail shape?', 'select', '["Square", "Squoval", "Oval", "Almond", "Coffin/Ballerina", "Stiletto", "N/A (Pedicure)"]', false, 4),
('f1111111-1111-1111-1111-111111111111', 'What is your desired nail length?', 'select', '["Short (Active)", "Medium", "Long", "N/A (Pedicure)"]', false, 5),
('f1111111-1111-1111-1111-111111111111', 'Will you require nail art?', 'radio', '["No, solid color/french", "Yes, basic (glitter/dots)", "Yes, advanced (handpainted/gemstones)"]', true, 6),
('f1111111-1111-1111-1111-111111111111', 'Please list any allergies or sensitivities (e.g., acrylic monomers, skin irritations):', 'text', NULL, false, 7),
('f1111111-1111-1111-1111-111111111111', 'Are any of your nails currently damaged, painful, or lifting?', 'textarea', NULL, false, 8);

-- Intake Form: Waxing
INSERT INTO intake_forms (id, category_id, form_type) VALUES ('f2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 'waxing');
INSERT INTO intake_questions (intake_form_id, question_text, question_type, options, is_required, sort_order) VALUES
('f2222222-2222-2222-2222-222222222222', 'Is this your first time waxing with us?', 'radio', '["Yes, first time", "No, returning client"]', true, 1),
('f2222222-2222-2222-2222-222222222222', 'Which area(s) are you planning to wax today?', 'text', NULL, true, 2),
('f2222222-2222-2222-2222-222222222222', 'Do you have sensitive skin?', 'radio', '["No", "Mildly sensitive", "Highly sensitive"]', true, 3),
('f2222222-2222-2222-2222-222222222222', 'Have you had recent chemical peels, exfoliation, or retinol treatments in the last 7 days?', 'radio', '["Yes", "No"]', true, 4),
('f2222222-2222-2222-2222-222222222222', 'Do you have a therapist gender preference?', 'select', '["No Preference", "Female Therapist Only", "Male Therapist Only"]', true, 5),
('f2222222-2222-2222-2222-222222222222', 'Please note any active skin irritations, cuts, sunburns, or lesions on the areas to be waxed:', 'textarea', NULL, false, 6),
('f2222222-2222-2222-2222-222222222222', 'I consent to the waxing treatment and acknowledge that minor redness is normal.', 'checkbox', '["I consent"]', true, 7);

-- Intake Form: Lashes & Brows
INSERT INTO intake_forms (id, category_id, form_type) VALUES ('f3333333-3333-3333-3333-333333333333', 'c4444444-4444-4444-4444-444444444444', 'lashes_brows');
INSERT INTO intake_questions (intake_form_id, question_text, question_type, options, is_required, sort_order) VALUES
('f3333333-3333-3333-3333-333333333333', 'Is this your first time getting eyelash extensions?', 'radio', '["Yes", "No, I have had them before"]', true, 1),
('f3333333-3333-3333-3333-333333333333', 'Do you wear contact lenses?', 'radio', '["Yes (I will remove them before session)", "No"]', true, 2),
('f3333333-3333-3333-3333-333333333333', 'Do you have sensitive eyes or known adhesive/latex allergies?', 'radio', '["Yes", "No"]', true, 3),
('f3333333-3333-3333-3333-333333333333', 'What is your desired lash extension style?', 'select', '["Natural", "Cat Eye", "Doll Eye", "Wispy/Hybrid", "Dramatic/Mega Volume", "Not Sure (Consultation Needed)"]', false, 4),
('f3333333-3333-3333-3333-333333333333', 'When was your last lash fill or application?', 'text', NULL, false, 5),
('f3333333-3333-3333-3333-333333333333', 'I consent to the application of extensions and lash products near my eyes.', 'checkbox', '["I consent"]', true, 6);

-- Intake Form: Massage
INSERT INTO intake_forms (id, category_id, form_type) VALUES ('f4444444-4444-4444-4444-444444444444', 'c3333333-3333-3333-3333-333333333333', 'massage');
INSERT INTO intake_questions (intake_form_id, question_text, question_type, options, is_required, sort_order) VALUES
('f4444444-4444-4444-4444-444444444444', 'What is your massage pressure preference?', 'select', '["Light (Relaxing)", "Medium (Standard)", "Firm (Deep Tissue)"]', true, 1),
('f4444444-4444-4444-4444-444444444444', 'Which areas would you like us to focus on? (e.g., shoulders, neck, lower back):', 'text', NULL, false, 2),
('f4444444-4444-4444-4444-444444444444', 'Are there any areas we should completely avoid?', 'text', NULL, false, 3),
('f4444444-4444-4444-4444-444444444444', 'Do you have any recent injuries, chronic pain, or joint issues?', 'textarea', NULL, false, 4),
('f4444444-4444-4444-4444-444444444444', 'Are you currently pregnant or do you have any heart conditions/circulatory disorders?', 'radio', '["No", "Yes, pregnant (first trimester)", "Yes, pregnant (second/third trimester)", "Yes, health conditions (will explain to therapist)"]', true, 5),
('f4444444-4444-4444-4444-444444444444', 'I consent to receive massage therapy and agree to communicate my comfort levels during session.', 'checkbox', '["I consent"]', true, 6);

-- 8. Insert Gallery Items (Seed categories with Book This Look connection)
INSERT INTO gallery_items (category, image_url, title, description, service_id) VALUES
('Nails', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', 'Nude Blush Overlay', 'Clean natural gel overlay on square shape', 's1111111-1111-1111-1111-111111111111'),
('Nails', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', 'Elegant Acrylic extensions', 'Stunning long almond shape acrylics in glossy pink', 's1111113-1113-1113-1113-111111111113'),
('Lashes', 'https://images.unsplash.com/photo-1583001809072-7991552b874b?w=800&q=80', 'Volume lash extensions', 'Full volume extensions for perfect eye framing', 's4444442-4442-4442-4442-444444444442'),
('Brows', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', 'Precision Henna Mapping', 'Fully defined brows utilizing organic Henna', 's4444443-4443-4443-4443-444444444443');

-- 9. Insert Promotions
INSERT INTO promotions (title, description, discount_percentage, start_date, end_date, is_active, banner_text) VALUES
('Winter Warmup Spa Special', 'Get 15% off any aromatherapy massage or spa pedicure this June!', 15.00, '2026-06-01', '2026-06-30', true, '❄️ Winter Warmup Special: Get 15% off Aromatherapy Massage & Gel Pedicures! Limited Slots available. Book Now.');

-- 10. Insert Policies
INSERT INTO policies (title, content, policy_type) VALUES
('POPIA Privacy Notice', 'We respect your privacy. In accordance with the Protection of Personal Information Act (POPIA), we secure your booking details, intake form answers, and personal contacts. Your intake forms are encrypted and stored safely. We will never share your medical, cosmetic, or contact details with third parties.', 'privacy'),
('Cancellation Policy', 'We require at least 24 hours notice for any booking cancellations or reschedules. If you cancel within 24 hours of your appointment or fail to show up, a 50% cancellation fee will be charged to your card on file or added to your next booking.', 'cancellation'),
('Deposit Policy', 'To secure high-value treatments (acrylic full sets, volume lashes, full body massages) or peak holiday times, we require a 50% non-refundable deposit paid online or via EFT within 12 hours of booking.', 'deposit'),
('Late Arrival Policy', 'Please arrive 10 minutes prior to your booking. If you are more than 15 minutes late, we may need to shorten your treatment duration to respect the next client''s schedule, while the full service price will still apply.', 'late_arrival');

-- 11. Insert FAQs
INSERT INTO faqs (question, answer, category) VALUES
('How do I reschedule my appointment?', 'You can reschedule your appointment by logging into the Client Portal up to 24 hours before your booking. Alternatively, you can click on the rebooking link in your WhatsApp or email confirmation.', 'Booking'),
('Do you do acrylic soak-offs?', 'Yes, we perform safe acrylic removals using professional soaking methods to protect your natural nail bed. Please add the "Gel/Acrylic Soak-off" add-on to your booking so we allocate enough time.', 'Nails'),
('What aftercare is required for lash extensions?', 'Do not wet your lashes for the first 24 hours. Avoid oil-based makeup removers, brush them daily with a clean spoolie, and do not pull or tug them. Fills are recommended every 2-3 weeks.', 'Lashes'),
('Is waxing painful for first-timers?', 'While you may feel brief discomfort, our therapists use premium warm waxes and soothing skin preparation oils that minimize irritation. Pain decreases significantly with regular waxing sessions.', 'Waxing'),
('Which massage pressure is best for muscle knots?', 'We recommend choosing "Firm (Deep Tissue)" pressure for our Swedish Back & Neck Massage if you have active trigger points or muscle knots.', 'Massage');

-- 12. Insert some seed reviews
INSERT INTO reviews (rating, comment, is_approved) VALUES
(5, 'Excellent service at Century Village! Lerato did my volume lash set and I have received so many compliments!', true),
(5, 'Best manicure in town. The gold accents in the salon make it feel so luxurious.', true),
(4, 'The Back & Neck massage was incredibly relaxing, will definitely be rebooking with Fatima.', true);
