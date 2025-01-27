"use client";
import React from "react";
import SearchPage from "../components/Search"
import Link from "next/link";
import { 
  Car, Shield, Clock, Star, 
  MapPin, CreditCard, Users, 
  CheckCircle, Truck, MessageCircle, 
  Search
} from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 pt-20 overflow-hidden">
      {/* Animated Background with More Depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Luxury <span className="text-red-500">Mobility</span>
                <br />Reimagined
              </h1>
              <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                Experience seamless, sophisticated transportation with our premium chauffeur services. 
                Comfort, reliability, and style – elegantly combined in every journey.
              </p>
            </div>

            {/* Unique Selling Points */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: <Shield className="w-6 h-6" />, label: "Safe Journeys" },
                { icon: <CreditCard className="w-6 h-6" />, label: "Transparent Pricing" },
                { icon: <Users className="w-6 h-6" />, label: "Professional Drivers" }
              ].map(({ icon, label }) => (
                <div 
                  key={label} 
                  className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition"
                >
                  <div className="text-red-500">{icon}</div>
                  <span className="text-sm text-white">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex space-x-4">
              <Link 
                href="/services" 
                className="border border-white/30 text-white px-8 py-3.5 rounded-full hover:bg-white/10 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Right Column - Search Form */}
          <div className="relative animate-fadeInRight">
            <div className="backdrop-blur-sm bg-white/10 rounded-3xl border border-white/20 p-1 shadow-2xl">
                {/* Search Component Placeholder */}
                 <SearchPage/>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="container mx-auto px-6 mt-16 z-20 relative">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              icon: <Truck className="w-12 h-12 text-red-500" />, 
              title: "Outstation Trips", 
              description: "Seamless long-distance travel with unparalleled comfort and convenience." 
            },
            { 
              icon: <MapPin className="w-12 h-12 text-red-500" />, 
              title: "Local Transport", 
              description: "Reliable city rides precisely tailored to your unique schedule and needs." 
            },
            { 
              icon: <MessageCircle className="w-12 h-12 text-red-500" />, 
              title: "24/7 Support", 
              description: "Round-the-clock customer support ensuring peace of mind throughout your journey." 
            }
          ].map(({ icon, title, description }) => (
            <div 
              key={title} 
              className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-red-500/30"
            >
              <div className="mb-4 opacity-80">{icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200L48 185.7C96 171.3 192 142.7 288 128.5C384 114.2 480 114.2 576 128.5C672 142.8 768 171.3 864 171.3C960 171.3 1056 142.8 1152 128.5C1248 114.2 1344 114.2 1392 114.2H1440V0H0V200Z"
            fill="white"
            fillOpacity="0.05"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight { 
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        :global(.animate-fadeIn) {
          animation: fadeIn 0.8s ease-out forwards;
        }
        :global(.animate-fadeInRight) {
          animation: fadeInRight 0.8s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;