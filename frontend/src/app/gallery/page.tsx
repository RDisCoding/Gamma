import groq from 'groq';
import Link from 'next/link';
import { client } from '../../sanity/client';
import GalleryClient from './GalleryClient';

async function getGalleryData() {
  const query = groq`{
    "gallery": *[_type == "gallery"][0]{images[]},
    "videos": *[_type == "videos"][0]{videos[]}
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

async function getCompanyInfo() {
  const query = groq`*[_type == "companyInfo"][0]`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function GalleryPage() {
  const [{ gallery, videos }, company] = await Promise.all([
    getGalleryData(),
    getCompanyInfo()
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-r from-rose-100 via-amber-50 to-rose-100">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Back to Home Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 text-sm sm:text-base font-semibold text-gray-600 hover:text-rose-700 bg-white hover:bg-rose-50 border-2 border-gray-200 hover:border-rose-300 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-rose-700 via-red-800 to-amber-700 bg-clip-text text-transparent">
            Gallery & Videos
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-6">
            Explore our collection of sacred moments and informative videos
          </p>
        </div>
      </section>

      <GalleryClient gallery={gallery} videos={videos} company={company} />
    </main>
  );
}
