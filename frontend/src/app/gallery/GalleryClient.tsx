'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '../../sanity/imageUrl';

interface GalleryImage {
  image: any;
  caption?: string;
}

interface Video {
  title: string;
  youtubeUrl: string;
  description?: string;
}

interface GalleryClientProps {
  gallery: { images: GalleryImage[] } | null;
  videos: { videos: Video[] } | null;
}

export default function GalleryClient({ gallery, videos }: GalleryClientProps) {
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
      <section className={`py-5 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-12 sticky z-40 bg-white/95 backdrop-blur-lg shadow-lg border-b border-rose-100 transition-all duration-300 ${
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
    </>
  );
}
