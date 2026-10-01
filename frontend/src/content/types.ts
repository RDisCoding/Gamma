export interface CompanyInfo {
  companyName: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  aboutImage: string | null;
  brochurePdf: string | null;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  timings: string;
  googleMapEmbedUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
}

export interface Review {
  id: string;
  clientName: string;
  reviewText: string;
  rating: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface GalleryImage {
  image: string;
  caption?: string;
}

export interface Video {
  title: string;
  youtubeUrl: string;
  description?: string;
}

export interface LearnMoreContent {
  title: string;
  subtitle: string;
  content: string;
  downloadPdf: string | null;
}
