'use client';

import React from 'react';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

interface LearnMoreData {
  title: string;
  subtitle: string;
  content: string;
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

interface LearnMoreClientProps {
  data: LearnMoreData;
  company: CompanyInfo;
}

// Helper function to parse markdown-style text formatting
function parseTextFormatting(text: string): React.JSX.Element[] {
  const parts: React.JSX.Element[] = [];
  let currentText = text;
  let key = 0;

  // Process bold and italic text
  const regex = /(\*\*\*([^*]+)\*\*\*|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(currentText)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(<span key={`text-${key++}`}>{currentText.substring(lastIndex, match.index)}</span>);
    }

    // Add formatted text
    if (match[2]) {
      // Bold + Italic (***text***)
      parts.push(<strong key={`strong-${key++}`} className="font-bold italic">{match[2]}</strong>);
    } else if (match[3]) {
      // Bold (**text**)
      parts.push(<strong key={`strong-${key++}`} className="font-bold">{match[3]}</strong>);
    } else if (match[4]) {
      // Italic (*text*)
      parts.push(<em key={`em-${key++}`} className="italic">{match[4]}</em>);
    }

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < currentText.length) {
    parts.push(<span key={`text-${key++}`}>{currentText.substring(lastIndex)}</span>);
  }

  return parts.length > 0 ? parts : [<span key="text-0">{text}</span>];
}

// Helper function to parse and render markdown content
function parseContent(content: string) {
  const lines = content.split('\n');
  const elements: React.JSX.Element[] = [];
  let currentList: { text: string; subItems: string[] }[] = [];
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${key++}`} className="space-y-4 mb-8">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-rose-600 mr-3 mt-1 flex-shrink-0 text-lg">•</span>
              <div className="flex-1">
                <div className="text-gray-800 leading-relaxed text-base sm:text-lg">
                  {parseTextFormatting(item.text)}
                </div>
                {item.subItems.length > 0 && (
                  <ul className="mt-3 space-y-2 ml-2">
                    {item.subItems.map((subItem, j) => (
                      <li key={j} className="flex items-start">
                        <span className="text-amber-600 mr-3 mt-1 flex-shrink-0">◦</span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">
                          {parseTextFormatting(subItem)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      flushList();
      i++;
      continue;
    }

    // Heading (## or #)
    if (trimmed.startsWith('##')) {
      flushList();
      const headingText = trimmed.replace(/^##\s*/, '').replace(/\*\*/g, '');
      elements.push(
        <h2 key={`h2-${key++}`} className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-rose-700 via-red-800 to-amber-700 bg-clip-text text-transparent mt-12 mb-8 first:mt-0">
          {headingText}
        </h2>
      );
      i++;
      continue;
    }

    // Blockquote (>)
    if (trimmed.startsWith('>')) {
      flushList();
      const quoteText = trimmed.replace(/^>\s*/, '');
      elements.push(
        <blockquote key={`quote-${key++}`} className="border-l-4 border-amber-500 pl-6 py-3 my-6 bg-amber-50/50 rounded-r-lg">
          <p className="text-gray-700 italic leading-relaxed text-base sm:text-lg">
            {parseTextFormatting(quoteText)}
          </p>
        </blockquote>
      );
      i++;
      continue;
    }

    // Horizontal rule (---)
    if (trimmed === '---') {
      flushList();
      elements.push(
        <hr key={`hr-${key++}`} className="my-12 border-t-2 border-rose-300" />
      );
      i++;
      continue;
    }

    // Main bullet point (*)
    if (trimmed.startsWith('*') && !trimmed.startsWith('**')) {
      const bulletText = trimmed.replace(/^\*\s*/, '');
      const subItems: string[] = [];
      
      // Check for sub-bullets
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        const nextTrimmed = nextLine.trim();
        
        // Check if it's a sub-bullet (indented with spaces and starts with *)
        if (nextLine.match(/^\s{2,}\*/) && nextTrimmed.startsWith('*')) {
          subItems.push(nextTrimmed.replace(/^\*\s*/, ''));
          j++;
        } else if (!nextTrimmed) {
          // Empty line, continue
          j++;
        } else {
          break;
        }
      }
      
      currentList.push({ text: bulletText, subItems });
      i = j;
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={`para-${key++}`} className="text-gray-800 leading-relaxed mb-6 text-base sm:text-lg">
        {parseTextFormatting(trimmed)}
      </p>
    );
    i++;
  }

  flushList();
  return elements;
}

export default function LearnMoreClient({ data, company }: LearnMoreClientProps) {
  return (
    <main className="min-h-screen bg-gradient-to-r from-rose-100 via-amber-50 to-rose-100">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-5 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #FF9933 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-20">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-rose-700 via-red-800 to-amber-700 bg-clip-text text-transparent">
              {data.title}
            </h1>
            {data.subtitle && (
              <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2 text-gray-700 mb-8">
                {data.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      {data.content && (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {parseContent(data.content)}
            </div>
          </div>
        </section>
      )}

      {/* Back to Home */}
      <section className="py-10 sm:py-12 px-4 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-rose-700 font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl border-2 border-rose-200 hover:border-rose-400 transition-all duration-300 transform hover:scale-105 active:scale-95"
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
    </main>
  );
}
