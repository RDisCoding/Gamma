import type { Review } from './types';

/*
 * Testimonials from families. Origin and publishing permission confirmed by the
 * owner (14 Oct 2026). Only entries with `verified: true` are shown.
 */
export const reviews: Review[] = [
  {
    id: 'bharatbhai-patel',
    clientName: 'Bharatbhai Patel',
    reviewText:
      "Absolutely wonderful experience! We traveled from Mumbai for my father's Matrugaya rituals at Sidhpur. Everything was handled with utmost care and devotion. The priests are knowledgeable and performed every ritual according to ancient traditions. Highly grateful!",
    source: 'Shared with the purohits; published with permission',
    verified: true,
  },
  {
    id: 'khushalbhai-patel',
    clientName: 'Khushalbhai Patel',
    reviewText:
      "We had the privilege of performing our mother's Shradh ceremony with Pandit Ji's guidance. His deep knowledge of Vedic rituals and compassionate approach during this emotional time meant a lot to our family. The arrangements were perfect and spiritually enriching.",
    source: 'Shared with the purohits; published with permission',
    verified: true,
  },
  {
    id: 'ketanbhai-thekdi',
    clientName: 'Ketanbhai Thekdi',
    reviewText:
      "Cannot express enough gratitude for the beautiful way our family's annual Shradh ceremony was conducted. The attention to detail and sincere devotion of the pandits made this truly memorable. They guided us patiently through every step. Blessed to have found such genuine service.",
    source: 'Shared with the purohits; published with permission',
    verified: true,
  },
];

export const publishedReviews = reviews.filter((r) => r.verified);
