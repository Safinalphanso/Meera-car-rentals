"use client";
import { useState, ReactNode } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Ticket,
  ArrowUpCircle,
  X,
} from "lucide-react";
import useRideBookingStore from "../../store";

// Type definitions
interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

interface UpgradeOption {
  name: string;
  price: number;
  image: string;
  benefits: string[];
}

// Modal component with proper type annotations
const Modal = ({ children, onClose }: ModalProps): JSX.Element => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Upgrade Your Ride</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

// Constants
const upgradeOptions: UpgradeOption[] = [
  {
    name: "Premium Package",
    price: 1876,
    image: "/premium-package.jpg",
    benefits: ["Leather seats", "WiFi", "Premium sound system"]
  }
];

// Main component
const BookingPage = (): JSX.Element => {
  const [showUpgradeBar, setShowUpgradeBar] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { selectedCar, locations, dates } = useRideBookingStore();

  if (!selectedCar) {
    return <div>No car selected. Please go back and select a car.</div>;
  }

  const baseFare = selectedCar.price;
  const gst = baseFare * 0.05;
  const totalAmount = baseFare + gst;
  const bookingNumber = "TKT";

  const handleBookingConfirmation = async () => {
    const text = `Booking Confirmed!\nCar: ${selectedCar.name}\nPickup: ${locations.pickup}\nDropoff: ${locations.dropoff}\nPickup Date: ${dates.pickupDate}\nPickup Time: ${dates.pickupTime}\nDrop Date: ${dates.dropDate}\nDrop Time: ${dates.dropTime}\nDistance: ${selectedCar.distance} Kms\nDuration: ${selectedCar.duration}\nTotal Amount: ₹${totalAmount.toLocaleString()}`;

    try {
      const response = await fetch(
        `https://api.callmebot.com/whatsapp.php?phone=918010955252&text=${encodeURIComponent(
          text,
        )}&apikey=7911773`,
      );

      if (response.ok) {
        alert("Booking confirmed and details sent successfully!");
      } else {
        alert("Failed to send booking details. Please try again.");
      }
    } catch (error) {
      console.error("Error sending booking details:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "30px 30px",
      }}
      className="min-h-screen bg-gray-50 p-8"
    >
      {showUpgradeModal && (
        <Modal onClose={() => setShowUpgradeModal(false)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {upgradeOptions.map((option, index) => (
              <div
                key={index}
                className="cursor-pointer rounded-xl border p-4 hover:border-red-500"
              >
                <div className="relative mb-4 h-32">
                  <img
                    src={option.image}
                    alt={option.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold">{option.name}</h3>
                <p className="mt-2 font-bold text-red-600">
                  ₹{option.price.toLocaleString()}
                </p>
                <ul className="mt-2 space-y-1">
                  {option.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                      • {benefit}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 w-full rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
                  onClick={() => setShowUpgradeModal(false)}
                >
                  Select Upgrade
                </button>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {showUpgradeBar && (
        <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-red-600 px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            <ArrowUpCircle className="h-5 w-5" />
            <span>
              Why settle for less when you can upgrade your car for just ₹1,876
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
            >
              Upgrade Car
            </button>
            <button
              onClick={() => setShowUpgradeBar(false)}
              className="text-white hover:text-red-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="absolute left-0 top-0 flex h-full w-8 flex-col justify-between py-4">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-gray-100" />
              ))}
            </div>
            <div className="absolute right-0 top-0 flex h-full w-8 flex-col justify-between py-4">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-gray-100" />
              ))}
            </div>

            <div className="bg-gradient-to-r from-red-600 to-red-500 p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Ticket className="h-8 w-8" />
                  <div>
                    <h1 className="text-3xl font-bold">Travel Ticket</h1>
                    <p className="text-red-100">Your journey begins here</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="rounded-lg bg-red-700/30 p-3">
                    <p className="text-sm text-red-100">Booking Number</p>
                    <p className="font-mono text-xl">{bookingNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex gap-8 border-b border-dashed border-red-200 pb-8">
                <div className="relative h-40 w-40 rounded-xl bg-gradient-to-br from-gray-50 to-red-50 p-4 shadow-inner">
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCar.name}
                  </h2>
                  <div className="flex w-fit items-center gap-2 rounded-full bg-red-50 px-4 py-2">
                    <Users className="h-5 w-5 text-red-500" />
                    <span className="font-medium text-red-600">
                      {selectedCar.passengers} Seater
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-red-500 ring-4 ring-red-100" />
                    <h3 className="text-lg font-bold text-gray-800">
                      Pickup Details
                    </h3>
                  </div>
                  <div className="space-y-4 pl-8">
                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                      <MapPin className="mt-1 h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium text-gray-600">Location</p>
                        <p className="text-gray-800">{locations.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                      <Calendar className="mt-1 h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium text-gray-600">Date</p>
                        <p className="text-gray-800">{dates.pickupDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                      <Clock className="mt-1 h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium text-gray-600">Time</p>
                        <p className="text-gray-800">{dates.pickupTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {locations.dropoff && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-red-500 ring-4 ring-red-100" />
                      <h3 className="text-lg font-bold text-gray-800">
                        Drop-off Details
                      </h3>
                    </div>
                    <div className="space-y-4 pl-8">
                      <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                        <MapPin className="mt-1 h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-gray-600">Location</p>
                          <p className="text-gray-800">{locations.dropoff}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                        <Calendar className="mt-1 h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-gray-600">Date</p>
                          <p className="text-gray-800">{dates.dropDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                        <Clock className="mt-1 h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-gray-600">Time</p>
                          <p className="text-gray-800">{dates.dropTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 border-t border-dashed border-red-200 pt-8">
                <h3 className="mb-4 text-lg font-bold text-gray-800">
                  Journey Summary
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-xl bg-gradient-to-br from-red-50 to-gray-50 p-6">
                    <p className="mb-2 text-gray-600">Estimated Distance</p>
                    <p className="text-xl font-bold text-gray-800">
                      {selectedCar.distance} Kms
                    </p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-red-50 to-gray-50 p-6">
                    <p className="mb-2 text-gray-600">Duration</p>
                    <p className="text-xl font-bold text-gray-800">
                      {selectedCar.duration}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-xl bg-white p-8 shadow-xl lg:sticky lg:top-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Price Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <span className="text-gray-600">Base Fare</span>
                <span className="font-medium">
                  ₹{baseFare.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <span className="text-gray-600">GST (5%)</span>
                <span className="font-medium">₹{gst.toLocaleString()}</span>
              </div>

              <div className="mt-6 border-t border-dashed border-red-200 pt-6">
                <div className="flex items-center justify-between rounded-xl bg-red-50 p-6">
                  <span className="text-xl font-bold text-gray-800">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleBookingConfirmation}
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-red-700 hover:to-red-600 hover:shadow-xl"
            >
              Book my Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingPage;