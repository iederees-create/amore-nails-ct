# Amore Nails & Beauty Lounge
## Digital Platform Pitch Deck (Phase 1 Build)

Prepared for: **Chantel Venter (Founder & Owner)**
Prepared by: **Lead Web Architect & Developer**

---

## 🌸 Executive Summary

Amore Nails & Beauty Lounge is a premier multi-branch beauty destination in Cape Town. To support your scaling operations and reduce manual administrative work for your salon staff, we have designed and built a mobile-first, high-converting custom digital booking platform. 

This platform moves beyond a simple brochure website. It integrates an **11-step interactive Booking Wizard**, a **secure self-service Client Portal**, and an **Admin CMS Dashboard** that allows your staff to manage appointments, update pricing, upload style photos, and track loyalty rewards instantly.

---

## 🎨 Brand Design & Premium Aesthetics

We have developed a luxury, glassmorphic design system tailored specifically to the elegant Amore brand:
*   **Color Palette**: Premium **Amore Cream** backgrounds (`#FAF6F0`), soft **Blush Pink** gradients (`#FFF0F0`), stark **Charcoal Black** text surfaces (`#1C1917`), and striking **Luxury Gold** accents (`#A16207`).
*   **Typography**: Serif heading pairing **Playfair Display** (for that high-end beauty salon feel) and clean, readable **Inter** body text.
*   **Micro-Animations**: Smooth cards transitions, glowing buttons on hover, active state changes, and celebratory confetti upon completing bookings.
*   **Mobile-First Design**: Completely optimized for booking on smartphones, with thumb-accessible buttons, simple touch grids, and responsive views.

---

## 🗺️ Page Directory & Structure

### 1. Homepage (`/`)
*   **Hero Section**: Luxury image backdrop with a primary call-to-action button to book.
*   **Branch Quick-Selector**: Dropdown to view branches immediately.
*   **Promo Banner**: Controlled directly from the Admin CMS. Displays active promotions or discounts site-wide.
*   **Verified Reviews**: Scrolling testimonial cards showcasing past clients' 5-star experiences.

### 2. Services Menu (`/services`)
*   **Dynamic Filtering**: Clients can filter by Category (Nails, Waxing, massage, Lashes), Branch, Price, and Gender-specific pricing ("Hers" vs "His").
*   **Multi-Select Booking Cart**: Clients can select multiple treatments (e.g. signature manicure + paraffin wax + brow shape) and book them in a single reservation session.

### 3. Branches Directory (`/branches` & `/branches/[slug]`)
*   **Branch-Specific Pages**: Custom pages for **The Colosseum, Century Village, Brackenfell, Bothasig Square, Pinelands, and N1 Value Centre**.
*   **Hours & Staff Roster**: Lists specific operational hours, address map links, and the specific therapists working at that location.

### 4. Interactive Lookbook Gallery (`/gallery`)
*   **Inspiration Directory**: Photo grids of nail overlays, acrylic styles, volume lashes, and henna brows.
*   **"Book This Look" Functionality**: One-click action on any gallery photo pre-seeds the booking wizard with that exact service, shortening the client's path to booking.

### 5. FAQs & Policies (`/policies`)
*   **POPIA Compliance**: Outlines exactly how we protect and encrypt client medical details and phone numbers.
*   **Deposit & Cancellation**: Explains the 24-hour rescheduling policy and 50% deposit rules for high-value services.

---

## ⚙️ Core Technical Features

### 📅 The 11-Step Booking Wizard
1.  **Branch Selection**: Chooses the desired Cape Town branch.
2.  **Category Selection**: Chooses Nails, Waxing, massage, or Lashes.
3.  **Treatment Selection**: Filters services according to male/female pricing options.
4.  **Add-on Aggregator**: Suggests removals (soak-off) or hydration treatments (paraffin wax).
5.  **Therapist Selector**: Selects a preferred stylist or picks "Any Available" to maximize schedule slots.
6.  **Real-Time Schedule Picker**: Restricts bookings to active working hours and dates (up to 30 days in advance).
7.  **Service-Specific Intake Form**: Dynamically generates questions (e.g., skin sensitivities for waxing, contact lenses for lashes, pressure preference for massage).
8.  **Inspiration Look Upload**: Allows clients to upload photos of nail art they want, saving it as base64 string.
9.  **Contact & Loyalty Redemptions**: Collects customer details, logs loyalty status, and applies points discounts (up to R100 off).
10. **Review & Deposit**: Requires a 50% online deposit for treatments over R450.
11. **Confetti Confirmation**: Outputs a custom reference number and gives exact branch-specific preparation and aftercare advice.

### 🔑 Client Self-Service Member Portal
To minimize phone calls and admin support, clients can log in securely via email to:
*   View upcoming appointments and historical treatments.
*   Check their **Amore Loyalty Club** points balance.
*   **Reschedule or cancel bookings** directly with an interactive calendar input.

### 💼 Master Admin Dashboard & CMS
A central hub for you and your branch managers to control the business:
*   **Bookings Board**: Filter today's and upcoming appointments, change status (Approve, Complete, Cancel), view client intake forms, and see uploaded inspiration images.
*   **Catalog CMS**: Add, edit, or delete services, update female/male pricing, change durations, and toggle "Popular" tags.
*   **Lookbook CMS**: Add new style photos to the gallery and link them to booking actions.
*   **Promo Banner Admin**: Instantly update the text or visibility of the homepage announcement banner.
*   **n8n Webhook Audit Logs**: Trace automatic message status notifications.

---

## 🤖 Marketing & Notification Automation (n8n Integration)

The platform is designed to trigger automated WhatsApp and SMS templates at key milestones:
1.  **Instant Confirmation**: WhatsApp message sent immediately upon booking, containing the booking reference, time, therapist name, deposit receipt, and custom **Pre-Appointment Prep instructions**.
2.  **24-Hour Reminder**: Friendly notification reminding them of their appointment tomorrow.
3.  **2-Hour Alert**: Final reminder with branch address and parking instructions.
4.  **Post-Appointment Review**: Sent 2 hours after completion, inviting the client to leave a review and tracking their earned loyalty points.

---

## 🔒 POPIA & Security Compliance
*   **Client Intake Privacy**: Intake form answers are treated as sensitive medical/personal data.
*   **Audit Trail**: All administrative changes (pricing edits, status changes) are logged in an audit trail table for business security.
