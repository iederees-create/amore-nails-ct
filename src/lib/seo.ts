// Amore Nails & Beauty Lounge - SEO & Structured Schema Data Generators (Phase 1)
// Implements standard LocalBusiness, BeautySalon, Service, Review, and FAQ schemas.

import { Branch, Service, Review, FAQ } from './db';

/**
 * Generates structured JSON-LD for a specific Beauty Salon branch (LocalBusiness/BeautySalon).
 */
export function generateBranchSchema(branch: Branch, staffNames: string[]) {
  // Convert trading hours from Record to Schema format
  const dayMap: Record<string, string> = {
    monday: 'Mo',
    tuesday: 'Tu',
    wednesday: 'We',
    thursday: 'Th',
    friday: 'Fr',
    saturday: 'Sa',
    sunday: 'Su'
  };

  const openingHours = Object.entries(branch.trading_hours)
    .filter(([_, hours]) => hours !== 'Closed')
    .map(([day, hours]) => {
      const dayCode = dayMap[day.toLowerCase()];
      // Format should be like "Mo-Fr 09:00-18:00"
      const cleanHours = hours.replace(/\s+/g, ''); // e.g. "09:00-18:00"
      return `${dayCode} ${cleanHours}`;
    });

  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `https://amorenails.co.za/branches/${branch.slug}`,
    'name': `Amore Nails & Beauty Lounge - ${branch.name}`,
    'description': `Premium beauty services including nails, waxing, lashes, brows and massages at our ${branch.name} branch.`,
    'image': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    'telephone': branch.phone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': branch.address,
      'addressLocality': 'Cape Town',
      'addressCountry': 'ZA'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -33.892, // Placeholder
      'longitude': 18.502
    },
    'url': `https://amorenails.co.za/branches/${branch.slug}`,
    'priceRange': '$$',
    'openingHours': openingHours,
    'employee': staffNames.map(name => ({
      '@type': 'Person',
      'name': name
    })),
    'sameAs': [
      `https://wa.me/${branch.whatsapp}`
    ]
  };
}

/**
 * Generates structured JSON-LD for a single Beauty Service.
 */
export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'BeautyTreatment',
    'name': service.name,
    'description': service.description,
    'provider': {
      '@type': 'BeautySalon',
      'name': 'Amore Nails & Beauty Lounge',
      'url': 'https://amorenails.co.za'
    },
    'offers': {
      '@type': 'Offer',
      'price': service.price_female,
      'priceCurrency': 'ZAR',
      'availability': 'https://schema.org/InStock',
      'url': `https://amorenails.co.za/services`
    }
  };
}

/**
 * Generates structured JSON-LD for a list of reviews (AggregateRating).
 */
export function generateAggregateReviewSchema(reviews: Review[]) {
  if (reviews.length === 0) return null;
  
  const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = (totalRating / reviews.length).toFixed(1);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Amore Nails Services',
    'image': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': averageRating,
      'reviewCount': reviews.length,
      'bestRating': '5',
      'worstRating': '1'
    },
    'review': reviews.map(r => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': r.client_name
      },
      'datePublished': r.created_at.split('T')[0],
      'reviewBody': r.comment,
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': r.rating,
        'bestRating': '5'
      }
    }))
  };
}

/**
 * Generates structured JSON-LD for FAQs.
 */
export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}
