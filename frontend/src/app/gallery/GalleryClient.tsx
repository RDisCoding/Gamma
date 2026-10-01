'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

interface GalleryImage {
  image: any;
  caption?: string;
}

interface Video {
  title: string;
  youtubeUrl: string;
  description?: string;
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

interface GalleryClientProps {
  gallery: { images: GalleryImage[] } | null;
  videos: { videos: Video[] } | null;
  company: CompanyInfo;
}

export default function GalleryClient({ gallery, videos, company }: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'photos' | 'videos'>('all');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const images = gallery?.images || [];
  const videoList = videos?.videos || [];

  const showPhotos = activeFilter === 'all' || activeFilter === 'photos';
  const showVideos = activeFilter === 'all' || activeFilter === 'videos';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show filter bar if scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide filter bar if scrolling down and past 100px
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Filter Buttons */}
      <section className={`py-4 sm:py-5 lg:py-8 px-4 sm:px-8 lg:px-12 sticky z-40 bg-gradient-to-r from-rose-100 via-amber-50 to-rose-100 backdrop-blur-lg border-b border-rose-100 transition-all duration-300 ${
        isVisible ? 'top-[64px] sm:top-[80px]' : 'top-0'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-rose-200 text-gray-700 hover:border-rose-400 hover:shadow-md'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('photos')}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeFilter === 'photos'
                  ? 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-rose-200 text-gray-700 hover:border-rose-400 hover:shadow-md'
              }`}
            >
              Photos ({images.length})
            </button>
            <button
              onClick={() => setActiveFilter('videos')}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeFilter === 'videos'
                  ? 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-rose-200 text-gray-700 hover:border-rose-400 hover:shadow-md'
              }`}
            >
              Videos ({videoList.length})
            </button>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-8 sm:py-12 lg:py-16 px-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Photos Section */}
          {showPhotos && images.length > 0 && (
            <div className="mb-12">
              {activeFilter === 'all' && (
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-rose-700 via-red-800 to-amber-700 bg-clip-text text-transparent">
                  Photos
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {images.map((item, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl aspect-[4/3] card-hover"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-red-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>

                    <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.caption || 'Gallery Image'}
                          fill
                          className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                        />
                      )}

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <p className="font-semibold text-lg">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos Section */}
          {showVideos && videoList.length > 0 && (
            <div>
              {activeFilter === 'all' && (
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-amber-700 via-red-800 to-rose-700 bg-clip-text text-transparent">
                  Videos
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
                {videoList.map((video, index) => {
                  // Extract YouTube video ID from URL
                  const videoId = video.youtubeUrl?.includes('youtube.com/watch?v=')
                    ? video.youtubeUrl.split('v=')[1]?.split('&')[0]
                    : video.youtubeUrl?.includes('youtu.be/')
                    ? video.youtubeUrl.split('youtu.be/')[1]?.split('?')[0]
                    : null;

                  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

                  return (
                    <a
                      key={index}
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl aspect-video card-hover block"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Gradient border effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-red-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>

                      <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                        {thumbnailUrl ? (
                          <>
                            <Image
                              src={thumbnailUrl}
                              alt={video.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-all duration-700"
                            />

                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-600/90 rounded-full flex items-center justify-center group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                            Invalid YouTube URL
                          </div>
                        )}

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <p className="font-semibold text-lg sm:text-xl mb-1">{video.title}</p>
                          {video.description && (
                            <p className="text-sm text-gray-300 line-clamp-2">{video.description}</p>
                          )}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {((activeFilter === 'photos' && images.length === 0) ||
            (activeFilter === 'videos' && videoList.length === 0) ||
            (activeFilter === 'all' && images.length === 0 && videoList.length === 0)) && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No content available</p>
            </div>
          )}
        </div>
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
