"use client";
import { type FC, useState } from "react";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import useRideBookingStore from "../store";
import Modal, { ConfirmRideModal } from "./Modal";

interface CarCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  duration: string;
  passengers: number;
  distance: string;
  inclusions: string[];
  exclusions?: string[];
}

const DEFAULT_EXCLUSIONS = ["Additional usage (if any)", "Toll & Parking"];

const CarCard: FC<CarCardProps> = ({
  id,
  name,
  image,
  price,
  duration,
  passengers,
  distance,
  inclusions,
  exclusions = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inclusions");
  const router = useRouter();
  const { setSelectedCar } = useRideBookingStore();

  const finalExclusions = [...DEFAULT_EXCLUSIONS, ...exclusions];

  const handleProceedToBook = () => {
    // Store the selected car in Zustand
    setSelectedCar({
      id,
      name,
      image,
      price,
      passengers,
      distance,
      duration,
      inclusions,
      exclusions: finalExclusions,
    });

    // Navigate to the booking page
    router.push("/booking");
  };

  return (
    <>
      <div className="rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="flex">
          {/* Left section with image */}
          <div className="w-72 p-4">
            <div className="relative h-40 w-full">
              <Image src={image} alt={name} fill className="object-contain" />
            </div>
          </div>

          {/* Middle section with details and inclusions/exclusions */}
          <div className="flex flex-1 border-l border-r border-gray-100 p-4">
            {/* Car details */}
            <div className="w-1/2 pr-4">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {name}
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">{distance} Kms</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {passengers} Seater
                  </span>
                </div>
              </div>
            </div>

            {/* Inclusions/Exclusions section */}
            <div className="w-1/2 border-l border-gray-100 pl-4">
              {/* Tabs */}
              <div className="flex gap-4 border-b border-gray-200">
                <button
                  className={`pb-2 text-sm font-medium ${
                    activeTab === "inclusions"
                      ? "border-b-2 border-red-500 text-red-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("inclusions")}
                >
                  Inclusions
                </button>
                <button
                  className={`pb-2 text-sm font-medium ${
                    activeTab === "exclusions"
                      ? "border-b-2 border-red-500 text-red-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("exclusions")}
                >
                  Exclusions
                </button>
              </div>

              <div className="mt-4 max-h-32 overflow-y-auto">
                {activeTab === "inclusions" && (
                  <ul className="space-y-2">
                    {inclusions.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-green-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === "exclusions" && (
                  <ul className="space-y-2">
                    {finalExclusions.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-red-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Right section with price and button */}
          <div className="flex w-64 flex-col justify-between p-4">
            <div>
              <p className="text-sm text-gray-500">Basic Rental</p>
              <p className="text-2xl font-bold text-red-500">
                ₹{price.toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full rounded-lg bg-red-500 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
            >
              Select
            </button>
          </div>
        </div>
      </div>

      <ConfirmRideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        image={image}
        price={price}
        duration={duration}
        passengers={passengers}
        distance={distance}
        inclusions={inclusions}
        handleProceedToBook={handleProceedToBook}
      />
    </>
  );
};

export default CarCard;