"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed w-full z-50 transition-all duration-300 
        ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white py-4'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/cars/logo.png"
                alt="Meera Car Rentals"
                fill
                className="object-contain transform group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                MEERA
                <span className="text-red-500 ml-1 sm:ml-2">CAR RENTALS</span>
              </h1>
              <div className="h-0.5 w-0 group-hover:w-full bg-red-500 transition-all duration-300"/>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="tel:8109552520" className="contact-item text-xs sm:text-sm">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>80109 55252</span>
            </Link>
            <div className="h-4 w-px bg-gray-300"/>
            <div className="contact-item text-xs sm:text-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Borivali West</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`
            fixed inset-0 bg-white z-50 transition-transform duration-300 
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            md:hidden
          `}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="relative w-10 h-10">
                  <Image
                    src="/cars/logo.png"
                    alt="Meera Car Rentals"
                    fill
                    className="object-contain"
                  />
                </div>
                <h1 className="text-xl font-bold">
                  MEERA <span className="text-red-500">CAR RENTALS</span>
                </h1>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow px-6 py-8 space-y-6">
              <h2 className="text-lg font-semibold text-gray-600 mb-4">Menu</h2>
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Contact" }
              ].map(({ href, label }) => (
                <Link 
                  key={href}
                  href={href}
                  className="block text-2xl font-medium text-gray-800 hover:text-red-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-600">Contact Us</h2>
              <div className="space-y-3">
                <Link href="tel:8109552520" className="flex items-center space-x-3 text-gray-700 hover:text-red-500">
                  <Phone className="w-5 h-5" />
                  <span>80109 55252</span>
                </Link>
                <Link href="mailto:carrental@gmail.com" className="flex items-center space-x-3 text-gray-700 hover:text-red-500">
                  <Mail className="w-5 h-5" />
                  <span>carrental@gmail.com</span>
                </Link>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="w-5 h-5" />
                  <span>Borivali West</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;