import { client } from '../sanity/client';
import { urlFor } from '../sanity/imageUrl';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaChevronDown, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import FloatingActions from '../components/FloatingActions';
import LocationMap from '../components/LocationMap';

// Fetch ALL data
const getData = async () => {
  const query = groq`{
    "company": *[_type == "companyInfo"][0],
    "services": *[_type == "service"] | order(order asc),
    "reviews": *[_type == "review"],
    "gallery": *[_type == "gallery"][0]{images[]},
    "videos": *[_type == "videos"][0]{videos[]},
    "faqs": *[_type == "faq"] | order(order asc)
  }`;
  
  return client.fetch(query, {}, { next: { revalidate: 60 } });
};

export default async function Home() {
  const { company, services, reviews, gallery, videos, faqs } = await getData();

  if (!company) return <div className="text-center mt-20">Loading Data...</div>;

  return (
    <div className="flex flex-col w-full">
      <FloatingActions phone={company.phoneNumber} whatsapp={company.whatsappNumber} />

      {/* --- HERO --- */}
      <section id="home" className="relative min-h-[85vh] sm:h-[90vh] flex items-center justify-center text-center text-white px-6 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950/60 via-red-950/50 to-amber-950/60 z-10"></div>
          
          {/* Image Background - Replace with Video if desired */}
          {company.heroImage && (
            <Image src={urlFor(company.heroImage).url()} alt="Hero" fill className="object-cover" priority />
          )}
          
          {/* VIDEO BACKGROUND OPTION - Uncomment to use video instead of image
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          */}
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent z-20 animate-shimmer bg-[length:200%_100%]"></div>
        </div>
        <div className="relative z-30 max-w-5xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in-up px-6 sm:px-8">
          <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-md rounded-full border border-amber-400/40 mb-2">
            <span className="text-amber-200 text-xs sm:text-sm font-bold tracking-wider">✨ TRADITIONAL VEDIC SERVICES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl leading-tight">
            <span className="block bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">{company.heroTitle}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-amber-50 max-w-3xl mx-auto drop-shadow-lg leading-relaxed font-light px-4 sm:px-6">{company.heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6 px-6 sm:px-0">
            <Link href="#contact" className="group inline-block w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 hover:from-amber-500 hover:via-rose-500 hover:to-red-500 text-white text-sm sm:text-base font-bold rounded-full shadow-2xl shadow-rose-900/50 transform hover:scale-105 transition-all duration-300 animate-glow">
              <span className="flex items-center justify-center gap-2">
                Contact Now
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link href="#services" className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 bg-white/15 backdrop-blur-md hover:bg-amber-50/20 text-white text-sm sm:text-base font-bold rounded-full border-2 border-amber-200/40 hover:border-amber-300/60 shadow-lg transform hover:scale-105 transition-all duration-300">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-rose-50/50 via-white to-amber-50/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10">
          <div className="relative h-[280px] sm:h-[400px] lg:h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group animate-slide-in-left">
             {company.aboutImage && (
                <Image src={urlFor(company.aboutImage).url()} alt="About" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 via-transparent to-transparent"></div>
             {/* Decorative border */}
             <div className="absolute inset-0 border-8 border-white/20 rounded-3xl"></div>
          </div>
          <div className="space-y-4 sm:space-y-6 animate-slide-in-right">
            <div className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-rose-100 via-amber-100 to-rose-100 rounded-full">
              <span className="text-rose-800 text-xs sm:text-sm font-bold tracking-wider">ABOUT US</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-700 via-red-800 to-amber-700 bg-clip-text text-transparent leading-tight">
              Serving with Devotion & Tradition
            </h2>
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-rose-500 via-red-600 to-amber-500 rounded-full"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed whitespace-pre-line font-light">{company.aboutText}</p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
              <div className="bg-gradient-to-br from-white to-rose-50/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-rose-100 hover:shadow-xl hover:border-rose-200 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-red-700 bg-clip-text text-transparent mb-1 sm:mb-2">20+</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="bg-gradient-to-br from-white to-amber-50/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-rose-700 bg-clip-text text-transparent mb-1 sm:mb-2">1000+</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #FF9933 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <div className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-rose-100 via-red-100 to-amber-100 rounded-full mb-3 sm:mb-4">
            <span className="text-rose-800 text-xs sm:text-sm font-bold tracking-wider">OUR OFFERINGS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-700 via-red-800 to-amber-700 bg-clip-text text-transparent mb-3 sm:mb-4">
            Sacred Services
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16 font-light px-6 sm:px-8">
            Experience the divine blessings through our traditional Vedic ceremonies
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services?.slice(0, 6).map((service: any, index: number) => (
              <div 
                key={service._id} 
                className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-rose-100/50 hover:border-rose-200 card-hover overflow-hidden flex flex-col"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Image Section - Reduced to 60% */}
                {service.icon && (
                  <div className="relative w-full aspect-[3/2] bg-gradient-to-br from-rose-50 to-amber-50 flex-shrink-0">
                    <Image 
                      src={urlFor(service.icon).url()} 
                      alt={service.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                
                {/* Content Section - More space for text */}
                <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2.5 sm:mb-3 text-gray-900 group-hover:bg-gradient-to-r group-hover:from-rose-700 group-hover:to-red-700 group-hover:bg-clip-text group-hover:text-transparent transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light line-clamp-4 flex-grow">
                    {service.description}
                  </p>
                  
                  {/* Decorative line */}
                  <div className="mt-3 sm:mt-4 w-0 group-hover:w-full h-1 bg-gradient-to-r from-rose-500 via-red-600 to-amber-500 rounded-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Services Button */}
          {services && services.length > 6 && (
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <Link 
                href="/services" 
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:via-red-500 hover:to-amber-500 text-white text-sm sm:text-base font-bold rounded-full shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <span>View All Services</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* --- GALLERY (Masonry-ish) --- */}
      <section id="gallery" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-amber-50/50 via-rose-50/30 to-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-rose-300/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-300/15 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-rose-100 via-amber-100 to-rose-100 rounded-full mb-3 sm:mb-4">
              <span className="text-rose-800 text-xs sm:text-sm font-bold tracking-wider">MEMORIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-700 via-red-800 to-amber-700 bg-clip-text text-transparent mb-3 sm:mb-4">
              Sacred Moments
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-light px-6 sm:px-8">
              Glimpses of divine ceremonies and blessed occasions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {gallery?.images?.map((item: any, index: number) => (
              <div 
                key={index} 
                className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl aspect-[4/3] card-hover"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-red-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>
                
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  {item.image && (
                    <Image 
                      src={urlFor(item.image).url()} 
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
          
          {/* View All Gallery Button */}
          <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
            <Link 
              href="/gallery" 
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:via-red-500 hover:to-amber-500 text-white text-sm sm:text-base font-bold rounded-full shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span>View All Gallery</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* --- VIDEOS --- */}
      {videos?.videos && videos.videos.length > 0 && (
        <section id="videos" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-rose-50/30 via-amber-50/50 to-white relative overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-amber-300/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-rose-300/15 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 rounded-full mb-3 sm:mb-4">
                <span className="text-amber-800 text-xs sm:text-sm font-bold tracking-wider">WATCH & EXPLORE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-700 via-red-800 to-rose-700 bg-clip-text text-transparent mb-3 sm:mb-4">
                Informative Videos
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-light px-6 sm:px-8">
                Explore our collection of informative and tourism content
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
              {videos.videos.map((video: any, index: number) => {
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
                    style={{animationDelay: `${index * 0.1}s`}}
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
                                <path d="M8 5v14l11-7z"/>
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
        </section>
      )}

      {/* --- REVIEWS --- */}
      <section id="reviews" className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-rose-100 via-red-100 to-amber-100 rounded-full mb-3 sm:mb-4">
              <span className="text-rose-800 text-xs sm:text-sm font-bold tracking-wider">TESTIMONIALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-700 via-red-800 to-amber-700 bg-clip-text text-transparent mb-3 sm:mb-4">
              Blessed Experiences
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-light px-6 sm:px-8">
              Hear what our devotees say about their spiritual journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {reviews?.map((review: any, index: number) => (
              <div 
                key={review._id} 
                className="group bg-gradient-to-br from-white to-rose-50/30 p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-rose-100/50 hover:border-rose-200 card-hover relative overflow-hidden flex flex-col"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Decorative corner accent */}
                <div className="absolute -top-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-rose-200/25 to-amber-200/25 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4 sm:mb-6 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-xl sm:text-2xl transition-all duration-300 ${
                          i < review.rating 
                            ? "text-amber-400 group-hover:scale-110" 
                            : "text-gray-300"
                        }`}
                        style={{transitionDelay: `${i * 0.05}s`}}
                      />
                    ))}
                  </div>
                  
                  {/* Quote mark */}
                  <div className="text-4xl sm:text-5xl lg:text-6xl text-rose-200/60 font-serif leading-none mb-3 sm:mb-4">&ldquo;</div>
                  
                  <p className="text-base sm:text-lg text-gray-700 italic mb-4 sm:mb-6 leading-relaxed font-light relative z-10 flex-grow line-clamp-6">
                    {review.reviewText}
                  </p>
                  
                  {/* Divider */}
                  <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-rose-400 via-red-500 to-amber-400 rounded-full mb-3 sm:mb-4 mx-auto"></div>
                  
                  <p className="font-bold bg-gradient-to-r from-rose-700 to-red-800 bg-clip-text text-transparent text-base sm:text-lg">- {review.clientName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section id="faqs" className="py-24 bg-gradient-to-br from-rose-50/30 via-amber-50/50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/15 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-rose-100 via-amber-100 to-rose-100 rounded-full mb-4">
              <span className="text-rose-800 text-sm font-semibold tracking-wider">COMMON QUESTIONS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-700 via-red-800 to-amber-700 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl font-light">
              Find answers to the most commonly asked questions
            </p>
          </div>
          
          <div className="space-y-5">
            {faqs?.map((faq: any, index: number) => (
              <details 
                key={faq._id} 
                className="group bg-white hover:bg-gradient-to-r hover:from-white hover:to-rose-50/30 p-6 rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-rose-100/50 hover:border-rose-200"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 list-none">
                  <span className="pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-rose-100 to-red-100 rounded-full transition-transform duration-300 group-open:rotate-180 group-open:bg-gradient-to-br group-open:from-rose-500 group-open:to-red-600">
                    <FaChevronDown className="text-rose-600 group-open:text-white transition-colors" />
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-rose-100">
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- LOCATION MAP --- */}
      <LocationMap />

      {/* --- CONTACT & FOOTER --- */}
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
              <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className="space-y-5">
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
    </div>
  );
}