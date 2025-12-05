'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi'; // Icons for mobile menu

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/services' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white shadow-2xl backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="shrink-0 font-bold text-xl sm:text-2xl lg:text-3xl tracking-wider">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
                <span className="text-yellow-300 text-2xl sm:text-3xl">🕉</span>
              </span>
              <span className="group-hover:text-yellow-300 transition-colors hidden sm:inline">Pandit Services</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2 lg:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-4 lg:px-5 py-2 rounded-xl text-base lg:text-lg font-semibold transition-all duration-300 hover:bg-white/20 backdrop-blur-sm group overflow-hidden"
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-xl"></div>
                </Link>
              ))}
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
        <div className="md:hidden bg-gradient-to-br from-orange-600 to-red-700 backdrop-blur-lg border-t border-white/20 animate-fade-in">
          <div className="px-4 pt-3 pb-5 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block hover:bg-white/20 px-5 py-4 rounded-xl text-lg font-semibold backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30 active:scale-95"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}