'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaTimes, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: any;
}

interface CompanyInfo {
  companyName: string;
  phoneNumber: string;
  email: string;
  address: string;
  timings: string;
  googleMapEmbedUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
}

interface ServicesClientProps {
  initialServices: Service[];
  company: CompanyInfo;
}

export default function ServicesClient({ initialServices, company }: ServicesClientProps) {
  const [services] = useState<Service[]>(initialServices);
  const [filteredServices, setFilteredServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show search bar if scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide search bar if scrolling down and past 100px
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      <section className={`py-4 sm:py-5 lg:py-8 px-4 sm:px-8 lg:px-12 sticky z-40 bg-gradient-to-r from-rose-100 via-amber-50 to-rose-100 backdrop-blur-lg border-b border-orange-100 transition-all duration-300 ${
        isVisible ? 'top-[64px] sm:top-[80px]' : 'top-0'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center">
            <div className="absolute left-4 sm:left-5 flex items-center pointer-events-none">
              <FaSearch className="text-orange-500 text-base sm:text-lg lg:text-xl" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-11 sm:pl-14 pr-11 sm:pr-14 py-3 sm:py-4 text-sm sm:text-base lg:text-lg border-2 border-orange-200 rounded-xl sm:rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 outline-none transition-all bg-white shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 sm:right-5 flex items-center text-gray-400 hover:text-orange-600 transition-colors active:scale-90"
              >
                <FaTimes className="text-base sm:text-lg lg:text-xl" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-3 text-xs sm:text-sm text-gray-600 text-center font-medium">
              Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 px-2 sm:px-0">
              {filteredServices.map((service: Service, index: number) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100/50 card-hover overflow-hidden animate-fade-in flex flex-col"
                  style={{ animationDelay: `${(index % 12) * 0.05}s` }}
                >
                  {/* Image Section - Reduced to 60% */}
                  {service.icon && (
                    <div className="relative w-full aspect-[3/2] bg-gradient-to-br from-orange-50 to-amber-50 flex-shrink-0">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Content Section - More space for text */}
                  <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2.5 sm:mb-3 text-gray-900 group-hover:text-orange-700 transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light line-clamp-4 flex-grow">{service.description}</p>

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

      {/* Contact Footer */}
      <footer id="contact" className="bg-gradient-to-br from-gray-900 via-rose-950 to-gray-900 text-white pt-24 pb-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 relative z-10">
          
          {/* Info Column */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <div className="inline-block px-4 py-1 bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-rose-500/20 rounded-full mb-4 backdrop-blur-sm border border-rose-500/30">
                <span className="text-amber-300 text-sm font-semibold tracking-wider">CONTACT US</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 via-amber-400 to-rose-500 bg-clip-text text-transparent mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-400 text-lg sm:text-xl font-light">We are available for offline consultations and bookings.</p>
            </div>
            
            <div className="space-y-6 text-lg">
              <div className="flex items-center space-x-5 group">
                <div className="bg-gradient-to-br from-rose-600 to-red-700 p-4 rounded-2xl shadow-lg group-hover:shadow-rose-500/30 group-hover:scale-110 transition-all duration-300">
                  <FaPhone className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <a href={`tel:${company.phoneNumber}`} className="hover:text-amber-400 font-medium text-white transition-colors">{company.phoneNumber}</a>
                </div>
              </div>

              <div className="flex items-center space-x-5 group">
                <div className="bg-gradient-to-br from-rose-600 to-red-700 p-4 rounded-2xl shadow-lg group-hover:shadow-rose-500/30 group-hover:scale-110 transition-all duration-300">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a href={`mailto:${company.email}`} className="hover:text-amber-400 font-medium text-white transition-colors">{company.email}</a>
                </div>
              </div>

              <div className="flex items-center space-x-5 group">
                <div className="bg-gradient-to-br from-rose-600 to-red-700 p-4 rounded-2xl shadow-lg group-hover:shadow-rose-500/30 group-hover:scale-110 transition-all duration-300">
                  <FaClock className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Timings</p>
                  <p className="font-medium text-white">{company.timings}</p>
                </div>
              </div>

              <div className="flex items-start space-x-5 group">
                <div className="bg-gradient-to-br from-rose-600 to-red-700 p-4 rounded-2xl shadow-lg group-hover:shadow-rose-500/30 group-hover:scale-110 transition-all duration-300">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-medium whitespace-pre-line text-white">{company.address}</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            {(company.facebookUrl || company.instagramUrl || company.twitterUrl || company.linkedinUrl || company.youtubeUrl) && (
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-4">Follow Us</p>
                <div className="flex gap-4">
                  {company.facebookUrl && (
                    <a
                      href={company.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-br from-rose-600 to-red-700 p-3 rounded-xl shadow-lg hover:shadow-rose-500/50 hover:scale-110 transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <FaFacebook className="text-white text-2xl" />
                    </a>
                  )}
                  {company.instagramUrl && (
                    <a
                      href={company.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-br from-rose-600 to-red-700 p-3 rounded-xl shadow-lg hover:shadow-rose-500/50 hover:scale-110 transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="text-white text-2xl" />
                    </a>
                  )}
                  {company.twitterUrl && (
                    <a
                      href={company.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-br from-rose-600 to-red-700 p-3 rounded-xl shadow-lg hover:shadow-rose-500/50 hover:scale-110 transition-all duration-300"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="text-white text-2xl" />
                    </a>
                  )}
                  {company.linkedinUrl && (
                    <a
                      href={company.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-br from-rose-600 to-red-700 p-3 rounded-xl shadow-lg hover:shadow-rose-500/50 hover:scale-110 transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="text-white text-2xl" />
                    </a>
                  )}
                  {company.youtubeUrl && (
                    <a
                      href={company.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-br from-rose-600 to-red-700 p-3 rounded-xl shadow-lg hover:shadow-rose-500/50 hover:scale-110 transition-all duration-300"
                      aria-label="YouTube"
                    >
                      <FaYoutube className="text-white text-2xl" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Form & Map Column */}
          <div className="space-y-8 animate-slide-in-right">
            <div className="bg-gradient-to-br from-white to-orange-50 text-gray-900 p-8 rounded-3xl shadow-2xl border border-orange-100">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text text-transparent">Send an Inquiry</h3>
              <form action="https://formsubmit.co/matrugayatirthboss@gmail.com" method="POST" className="space-y-5">
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_subject" value="New inquiry from Sidhpur Website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style={{display: 'none'}} />
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    name="name" 
                    type="text" 
                    className="w-full p-4 bg-white border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" 
                    placeholder="Name" 
                    required 
                  />
                  <input 
                    name="phone" 
                    type="tel" 
                    className="w-full p-4 bg-white border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" 
                    placeholder="Phone" 
                    required 
                  />
                </div>
                <textarea 
                  name="message" 
                  className="w-full p-4 bg-white border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all h-32 resize-none" 
                  placeholder="Tell us about your requirement..." 
                  required
                ></textarea>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map Embed */}
            {company.googleMapEmbedUrl && (
              <div className="w-full h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 hover:border-orange-500/50 transition-all duration-300">
                <iframe 
                  src={company.googleMapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </div>

        </div>
        <div className="border-t border-orange-900/50 mt-20 pt-8 text-center text-gray-500 relative z-10">
          <p className="font-light">© {new Date().getFullYear()} {company.companyName}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
