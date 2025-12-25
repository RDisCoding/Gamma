import groq from 'groq';
import { client } from '../../sanity/client';
import ServicesClient from './ServicesClient';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: any;
}

async function getServices() {
  const query = groq`*[_type == "service"] | order(order asc)`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function ServicesPage() {
  const services: Service[] = await getServices();

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 lg:pb-12 px-5 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 gradient-text">
            Our Services
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light px-2">
            With expertise in Vedic rituals and Jyotish Shaastra, we perform authentic poojas, havans, sanskar karmas, and shraadhs to ensure spiritual harmony, ancestral peace, and divine blessings.
          </p>
        </div>
      </section>

      <ServicesClient initialServices={services} />
    </main>
  );
}
