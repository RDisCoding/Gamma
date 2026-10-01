import ServicesClient from './ServicesClient';
import { company } from '../../content/company';
import { services } from '../../content/services';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-rose-100 via-amber-50 to-rose-100">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-rose-700 via-red-800 to-amber-700 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-6">
            With expertise in Vedic rituals and Jyotish Shaastra, we perform authentic poojas, havans, sanskar karmas, and shraadhs to ensure spiritual harmony, ancestral peace, and divine blessings.
          </p>
        </div>
      </section>

      <ServicesClient initialServices={services} company={company} />
    </main>
  );
}
