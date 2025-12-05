'use client';

import { FaWhatsapp, FaPhone, FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface Props {
  phone: string;
  whatsapp: string;
}

export default function FloatingActions({ phone, whatsapp }: Props) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      {/* Back to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="group bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 rounded-full shadow-2xl hover:shadow-gray-800/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 animate-fade-in"
          aria-label="Back to Top"
        >
          <FaArrowUp className="text-xl group-hover:animate-bounce" />
        </button>
      )}

      {/* WhatsApp */}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 animate-float"
          aria-label="Chat on WhatsApp"
        >
          <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <FaWhatsapp className="text-2xl relative z-10" />
        </a>
      )}

      {/* Phone */}
      {phone && (
        <a
          href={`tel:${phone}`}
          className="group relative bg-gradient-to-br from-orange-600 to-red-700 text-white p-4 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 animate-glow"
          aria-label="Call Us"
        >
          <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <FaPhone className="text-xl relative z-10 group-hover:rotate-12 transition-transform" />
        </a>
      )}
    </div>
  );
}
