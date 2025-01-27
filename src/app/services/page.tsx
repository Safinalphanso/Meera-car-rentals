"use client";
import React from "react";
import Image from "next/image";
import { Car, Plane, Building, Calendar, Star, Clock, Shield } from "lucide-react";

const ServicesPage = () => {
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
              From airport transfers to multi-day rentals, we offer comprehensive
              transportation solutions tailored to your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Primary Services */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <ServiceCard
              icon={<Car className="w-8 h-8" />}
              title="Local Transport"
              description="Reliable transportation for your daily commute or local travel needs"
              features={[
                "Hourly rentals available",
                "Professional chauffeurs",
                "Well-maintained vehicles",
                "Flexible booking options"
              ]}
            />
            <ServiceCard
              icon={<Plane className="w-8 h-8" />}
              title="Airport Transfer"
              description="Comfortable and punctual airport pickup and drop-off services"
              features={[
                "Flight tracking",
                "Meet & greet service",
                "24/7 availability",
                "Fixed competitive rates"
              ]}
            />
            <ServiceCard
              icon={<Building className="w-8 h-8" />}
              title="Outstation Travel"
              description="Long-distance travel solutions for your journey beyond city limits"
              features={[
                "Multi-day packages",
                "Experienced drivers",
                "Comfortable vehicles",
                "Custom itineraries"
              ]}
            />
          </div>

          {/* Fleet Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Fleet</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <CarCard
                name="Economy Sedan"
                image="/cars/logo1.png"
                features={["4 Passengers", "2 Luggage", "Air Conditioned"]}
                price="Starting from ₹1500/day"
              />
              <CarCard
                name="Premium SUV"
                image="/cars/logo1.png"
                features={["6 Passengers", "3 Luggage", "Premium Interior"]}
                price="Starting from ₹2500/day"
              />
              <CarCard
                name="Luxury Sedan"
                image="/cars/logo1.png"
                features={["4 Passengers", "2 Luggage", "Premium Service"]}
                price="Starting from ₹3500/day"
              />
            </div>
          </div>

          {/* Additional Services
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<Calendar className="w-6 h-6" />}
                title="Corporate Travel"
                description="Specialized services for business travelers with corporate billing options"
              />
              <FeatureCard
                icon={<Star className="w-6 h-6" />}
                title="Event Transportation"
                description="Reliable transportation for weddings, parties, and special occasions"
              />
            </div>
          </div> */}

          {/* Why Choose Us */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <BenefitCard
                icon={<Clock className="w-6 h-6" />}
                title="24/7 Service"
                description="Round-the-clock support and service availability"
              />
              <BenefitCard
                icon={<Star className="w-6 h-6" />}
                title="Premium Fleet"
                description="Well-maintained vehicles from top manufacturers"
              />
              <BenefitCard
                icon={<Shield className="w-6 h-6" />}
                title="Safe Travel"
                description="Licensed drivers and comprehensive insurance coverage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, features }) => (
  <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
    <div className="text-red-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-600">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const CarCard = ({ name, image, features, price }) => (
  <div className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
    <div className="relative h-48">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-3">{name}</h3>
      <ul className="space-y-2 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
            {feature}
          </li>
        ))}
      </ul>
      <p className="text-red-500 font-semibold">{price}</p>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
    <div className="text-red-500">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const BenefitCard = ({ icon, title, description }) => (
  <div className="text-center p-6">
    <div className="text-red-500 mb-4 flex justify-center">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default ServicesPage;