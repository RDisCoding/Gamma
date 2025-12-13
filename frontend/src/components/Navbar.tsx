'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiGlobe } from 'react-icons/hi'; // Icons for mobile menu

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState('Select Language');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar if scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide navbar if scrolling down and past 100px
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false); // Close mobile menu when hiding
        setShowLangMenu(false); // Close language menu when hiding
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showLangMenu && !target.closest('.language-dropdown')) {
        setShowLangMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLangMenu]);

  // Language options
  const languages = [
    { code: 'en', name: 'English', display: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)', display: 'हिन्दी' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', display: 'ગુજરાતી' },
    { code: 'mr', name: 'मराठी (Marathi)', display: 'मराठी' },
    { code: 'ta', name: 'தமிழ் (Tamil)', display: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు (Telugu)', display: 'తెలుగు' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', display: 'ಕನ್ನಡ' },
    { code: 'bn', name: 'বাংলা (Bengali)', display: 'বাংলা' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', display: 'ਪੰਜਾਬੀ' },
    { code: 'ml', name: 'മലയാളം (Malayalam)', display: 'മലയാളം' },
    { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', display: 'ଓଡ଼ିଆ' },
    { code: 'ur', name: 'اردو (Urdu)', display: 'اردو' },
  ];

  const changeLanguage = (langCode: string, displayName: string) => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const googleTranslate = window.google?.translate?.TranslateElement;
      if (googleTranslate) {
        // Find the Google Translate select element
        const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = langCode;
          selectElement.dispatchEvent(new Event('change'));
          setSelectedLang(displayName);
          setShowLangMenu(false);
          
          // Force hide any Google UI that might appear
          setTimeout(() => {
            const frames = document.querySelectorAll('iframe.skiptranslate, .goog-te-banner-frame');
            frames.forEach(frame => {
              (frame as HTMLElement).style.display = 'none';
              (frame as HTMLElement).style.visibility = 'hidden';
            });
            document.body.style.top = '0';
            document.body.style.position = 'static';
          }, 100);
        }
      }
    }
  };

  // Initialize Google Translate (hidden) on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timeout = setTimeout(() => {
        // @ts-ignore
        if (window.google?.translate && !document.querySelector('.goog-te-combo')) {
          // Create a hidden container for Google Translate
          const hiddenDiv = document.createElement('div');
          hiddenDiv.id = 'google_translate_element_hidden';
          hiddenDiv.style.display = 'none';
          document.body.appendChild(hiddenDiv);
          
          // @ts-ignore
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,gu,mr,ta,te,kn,bn,pa,ml,or,ur',
              autoDisplay: false,
            },
            'google_translate_element_hidden'
          );
        }
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, []);

  // Continuously monitor and force-hide Google Translate UI
  useEffect(() => {
    const hideGoogleUI = () => {
      // Hide all iframes
      const frames = document.querySelectorAll('iframe.skiptranslate, iframe[id^="goog-gt-"], .goog-te-banner-frame');
      frames.forEach(frame => {
        (frame as HTMLElement).style.display = 'none';
        (frame as HTMLElement).style.visibility = 'hidden';
        (frame as HTMLElement).style.opacity = '0';
      });
      
      // Reset body positioning
      if (document.body.style.top !== '0px') {
        document.body.style.top = '0';
      }
      if (document.body.style.position !== 'static') {
        document.body.style.position = 'static';
      }
    };

    // Run immediately
    hideGoogleUI();

    // Monitor for changes
    const interval = setInterval(hideGoogleUI, 100);
    
    // Also observe DOM changes
    const observer = new MutationObserver(hideGoogleUI);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 bg-gradient-to-r from-rose-700 via-red-700 to-rose-700 text-white shadow-2xl backdrop-blur-sm transition-transform duration-300 border-b border-rose-500/20 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <div className="shrink-0 font-bold text-base sm:text-xl lg:text-2xl tracking-wide">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
              <span className="bg-gradient-to-br from-yellow-400 to-orange-400 p-1.5 sm:p-2 rounded-lg sm:rounded-xl group-hover:from-yellow-300 group-hover:to-orange-300 transition-all duration-300 shadow-lg">
                <span className="text-orange-900 text-xl sm:text-2xl lg:text-3xl">🕉</span>
              </span>
              <span className="group-hover:text-yellow-300 transition-colors">Pandit Services</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-baseline space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3 lg:px-4 py-2.5 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 hover:bg-white/25 hover:text-yellow-200 backdrop-blur-sm group whitespace-nowrap"
                >
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Language Selector - Desktop */}
            <div className="relative ml-2 language-dropdown">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 lg:px-4 py-2.5 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 hover:bg-white/25 hover:text-yellow-200 whitespace-nowrap"
              >
                <span>{selectedLang}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${showLangMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showLangMenu && (
                <div className="notranslate absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-orange-200 overflow-hidden z-60 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 px-3 py-2 uppercase tracking-wide">Select Language</div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code, lang.display)}
                        className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-gray-800 font-medium text-sm hover:text-orange-600 flex items-center gap-2"
                      >
                        <span className="text-lg flex-shrink-0">{lang.code === 'en' ? '🇬🇧' : '🇮🇳'}</span>
                        <span className="whitespace-nowrap">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white/20 backdrop-blur-sm inline-flex items-center justify-center p-3 rounded-xl hover:bg-white/30 focus:outline-none transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <HiX className="block h-7 w-7 transition-transform duration-300 rotate-90" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-br from-orange-800 to-red-800 backdrop-blur-lg border-t border-white/20 animate-fade-in shadow-2xl">
          <div className="px-3 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block hover:bg-white/25 px-4 py-3.5 rounded-lg text-base font-semibold backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-yellow-300/30 hover:text-yellow-200 active:scale-95 whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            {/* Language Selector - Mobile */}
            <div className="notranslate border-t border-white/20 pt-2 mt-2 language-dropdown">
              <div className="px-4 py-2 text-sm font-semibold text-yellow-200 flex items-center gap-2">
                <span>Select Language</span>
              </div>
              <div className="px-2 pb-2 space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { changeLanguage(lang.code, lang.display); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/20 transition-colors duration-200 text-white font-medium text-sm flex items-center gap-2"
                  >
                    <span className="text-base flex-shrink-0">{lang.code === 'en' ? '🇬🇧' : '🇮🇳'}</span>
                    <span className="whitespace-nowrap">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}