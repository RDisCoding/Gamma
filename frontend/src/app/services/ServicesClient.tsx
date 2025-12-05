'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { urlFor } from '../../sanity/imageUrl';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: any;
}

interface ServicesClientProps {
  initialServices: Service[];
}

export default function ServicesClient({ initialServices }: ServicesClientProps) {
  const [services] = useState<Service[]>(initialServices);
  const [filteredServices, setFilteredServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      {/* Search Bar */}
      <section className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-lg shadow-lg border-b border-orange-100">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-5 flex items-center pointer-events-none">
              <FaSearch className="text-orange-500 text-lg sm:text-xl" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-10 sm:pl-14 pr-10 sm:pr-14 py-3 sm:py-4 lg:py-5 text-base sm:text-lg border-2 border-orange-200 rounded-xl sm:rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 outline-none transition-all bg-white shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-5 flex items-center text-gray-400 hover:text-orange-600 transition-colors active:scale-90"
              >
                <FaTimes className="text-lg sm:text-xl" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 text-center">
              Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <div className="text-5xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No services found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">Try adjusting your search query</p>
              <button
                onClick={clearSearch}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-full hover:shadow-lg transition-all active:scale-95"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredServices.map((service: Service, index: number) => (
                <div
                  key={service._id}
                  className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100/50 card-hover overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${(index % 12) * 0.05}s` }}
                >
                  {/* Large Image Section */}
                  {service.icon && (
                    <div className="relative w-full aspect-square bg-gradient-to-br from-orange-50 to-amber-50">
                      <Image
                        src={urlFor(service.icon).url()}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-4 sm:p-5 lg:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-orange-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">{service.description}</p>

                    {/* Decorative line */}
                    <div className="mt-3 sm:mt-4 w-0 group-hover:w-full h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 sm:py-10 lg:py-12 px-4 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-700 font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </Link>
      </section>
    </>
  );
}
