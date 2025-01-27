"use client";
import React from "react";
import { Shield, Trophy, Users, ThumbsUp } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 group">
            <span className="inline-block">
              About <span className="text-red-500">Meera Car Rentals</span>
              <div className="h-0.5 w-0 group-hover:w-full bg-red-500 transition-all duration-300"/>
            </span>
          </h1>
            <p className="text-gray-300 text-lg">
              Your trusted partner in premium transportation services since 2010.
              We pride ourselves on reliability, comfort, and exceptional service.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Our Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/cars/logo.png"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
            <div>
            <h2 className="text-3xl font-bold mb-6 group">
                <span className="inline-block">
                  Our Story
                  <div className="h-0.5 w-0 group-hover:w-full bg-red-500 transition-all duration-300"/>
                </span>
              </h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, Meera Car Rentals began with a simple mission: to provide 
                premium transportation services that exceed expectations. What started with 
                a small fleet of luxury vehicles has grown into one of Mumbai's most 
                trusted car rental services.
              </p>
              <p className="text-gray-600">
                Today, we serve thousands of satisfied customers, from business professionals 
                to tourists, offering a wide range of vehicles and services tailored to 
                meet diverse transportation needs.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 group">
            <span className="inline-block">
              Our Core Values
              <div className="h-0.5 w-0 group-hover:w-full bg-red-500 transition-all duration-300"/>
            </span>
          </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <ValueCard
                icon={<Shield className="w-8 h-8" />}
                title="Safety First"
                description="We prioritize your safety with well-maintained vehicles and professional drivers"
              />
              <ValueCard
                icon={<Trophy className="w-8 h-8" />}
                title="Excellence"
                description="Committed to providing outstanding service quality in every journey"
              />
              <ValueCard
                icon={<Users className="w-8 h-8" />}
                title="Customer Focus"
                description="Your satisfaction is our top priority, with 24/7 customer support"
              />
              <ValueCard
                icon={<ThumbsUp className="w-8 h-8" />}
                title="Reliability"
                description="Punctual, professional, and dependable service every time"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-20">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <StatCard number="12+" label="Years Experience" />
              <StatCard number="500+" label="Vehicles" />
              <StatCard number="50k+" label="Happy Customers" />
              <StatCard number="100%" label="Satisfaction Rate" />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};
type ValueCardProps = {
  icon: React.ReactNode; // or specify the exact type if you know it, e.g., JSX.Element
  title: string;
  description: string;
};

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => (
  <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
    <div className="text-red-500 mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div>
    <div className="text-3xl font-bold text-red-500 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const TeamMember = ({ name, position, imageSrc }) => (
  <div className="text-center">
    <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
      <Image
        src={imageSrc}
        alt={name}
        fill
        className="object-cover"
      />
    </div>
    <h3 className="text-xl font-semibold mb-1">{name}</h3>
    <p className="text-gray-600">{position}</p>
  </div>
);

export default AboutPage;