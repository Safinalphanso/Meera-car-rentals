"use client";
import React, { useEffect, useState } from "react";
import CarCard from "../../components/CarCard";
import { MapPin, Calendar, Clock, ArrowRight, Car } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  calculateOutstationCost,
  calculateLocalCost,
  calculateAirportCost,
} from "../../utils/priceCalculater";

type VehicleType = 'sedan' | 'muv' | 'innova' | 'crysta' | 'hycross' | 'fortuner';
type AirportVehicleType = 'sedan' | 'muv' | 'innova' | 'crysta';
// Define the props interface for CarCard component
interface CarCardProps {
  id: number;
  name: string;
  image: string;
  duration: string;
  passengers: number;
  distance: string;
  vehicleType: VehicleType;
  inclusions: string[];
  exclusions: string[];
  airport: boolean;
  price: number;
}


// Base car data interface without price
interface CarData {
  id: number;
  name: string;
  image: string;
  duration: string;
  passengers: number;
  distance: number;
  vehicleType: VehicleType;
  inclusions: string[];
  exclusions: string[];
  airport: boolean;
}

// Add the BookingDetails interface
interface BookingDetails {
  type: string;
  pickup: string;
  dropoff: string;
  pickupDate: string;
  pickupTime: string;
  dropDate: string;
  dropTime: string;
  distance: string;
  eta: string;
}


const carsData: CarData[] = [
  {
    id: 1,
    name: "Swift Dzire",
    image: "/cars/swift.png",
    duration: "24 Hrs",
    passengers: 4,
    distance: 268,
    vehicleType: "sedan",
    inclusions: ["Fuel charges", "Chauffeur charges"],
    exclusions: [],
    airport: true,
  },
  {
    id: 2,
    name: "Xcent",
    image: "/cars/xcent.png",
    duration: "24 Hrs",
    passengers: 4,
    distance: 268,
    vehicleType: "muv",
    inclusions: ["Fuel charges", "Chauffeur charges"],
    exclusions: [],
    airport: true,
  },
  {
    id: 3,
    name: "Innova",
    image: "/cars/innova1.png",
    duration: "24 Hrs",
    passengers: 6,
    distance: 268,
    vehicleType: "innova",
    inclusions: ["Fuel charges", "Chauffeur charges"],
    exclusions: [],
    airport: true,
  },
  {
    id: 4,
    name: "Innova Crysta",
    image: "/cars/innova.png",
    duration: "24 Hrs",
    passengers: 6,
    distance: 268,
    vehicleType: "crysta",
    inclusions: ["Fuel charges", "Chauffeur charges"],
    exclusions: [],
    airport: true,
  },
  {
    id: 5,
    name: "Innova hycross",
    image: "/cars/hycorss.png",
    duration: "24 Hrs",
    passengers: 6,
    distance: 268,
    vehicleType: "hycross",
    inclusions: ["Fuel charges", "Chauffeur charges"],
    exclusions: [],
    airport: false,
  },
  {
    id: 6,
    name: "Fortuner",
    image: "/cars/fortuner.png",
    duration: "24 Hrs",
    passengers: 6,
    distance: 268,
    vehicleType: "fortuner",
    inclusions: ["Fuel charges", "Chauffeur charges"],
    exclusions: [],
    airport: false,
  },
];

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};


const calculateDaysDifference = (pickupDate: string | null, dropDate: string | null): number => {
  if (!pickupDate || !dropDate) return 1;

  const pickup = new Date(pickupDate);
  const drop = new Date(dropDate);

  const differenceMs = drop.getTime() - pickup.getTime();
  return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
};

const formatTime = (timeStr: string | null): string => {
  if (!timeStr) return "";
  
  const parts = timeStr.split(":");
  if (parts.length !== 2) return "";
  
  const [hoursStr, minutesStr] = parts;
  if (!hoursStr || !minutesStr) return "";
  
  const hours = parseInt(hoursStr, 10);
  if (isNaN(hours)) return "";
  
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  
  return `${hour12}:${minutesStr} ${period}`;
};

const RidesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    type: "",
    pickup: "",
    dropoff: "",
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
    distance: "",
    eta: "",
  });

  const [carsWithPrices, setCarsWithPrices] = useState<CarCardProps[]>([]);

  useEffect(() => {
    const newBookingDetails: BookingDetails = {
      type: searchParams.get("type") ?? "",
      pickup: searchParams.get("pickup") ?? "",
      dropoff: searchParams.get("dropoff") ?? "",
      pickupDate: searchParams.get("pickupDate") ?? "",
      pickupTime: searchParams.get("pickupTime") ?? "",
      dropDate: searchParams.get("dropDate") ?? "",
      dropTime: searchParams.get("dropTime") ?? "",
      distance: searchParams.get("distance") ?? "",
      eta: searchParams.get("eta") ?? "",
    };
    setBookingDetails(newBookingDetails);
  }, [searchParams]);

  
  useEffect(() => {
    if (bookingDetails.type) {
      const days = calculateDaysDifference(
        bookingDetails.pickupDate,
        bookingDetails.dropDate,
      );

      const updatedCars: CarCardProps[] = carsData
        .map((car): CarCardProps => {
          const distance = Number(bookingDetails.distance) || 0;
          let price: number;

          switch (bookingDetails.type) {
            case "Local Transport":
              price = calculateLocalCost(car.vehicleType);
              break;
            case "Airport":
              if (car.airport && isAirportVehicle(car.vehicleType)) {
                price = calculateAirportCost(car.vehicleType);
              } else {
                price = 0;
              }
              break;
            default:
              price = calculateOutstationCost(car.vehicleType, distance, days);
          }

          return {
            ...car,
            distance: distance.toString(),
            price: Math.max(Math.round(price), 0),
          };
        })
        .filter((car) => car.price > 0);

      setCarsWithPrices(updatedCars);
    }
  }, [bookingDetails]);

  // Type guard to check if a vehicle type is valid for airport service
  function isAirportVehicle(vehicleType: VehicleType): vehicleType is AirportVehicleType {
    return ['sedan', 'muv', 'innova', 'crysta'].includes(vehicleType);
  }

  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "30px 30px",
      }}
      className="min-h-screen bg-gray-50 p-8 pt-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-lg bg-white shadow-sm">
          <div className="rounded-t-lg bg-black px-6 py-4">
            <div className="flex items-center gap-3">
              <Car className="h-6 w-6 text-red-500" />
              <h1 className="text-2xl font-semibold text-white">
                Available Cars
              </h1>
            </div>
          </div>

          <div className="px-6 py-3">
            <div className="flex items-center gap-8">
              <div className="flex flex-1 items-center gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="mb-0.5 text-xs text-gray-500">From</p>
                    <p className="font-medium text-gray-900">
                      {bookingDetails.pickup}
                    </p>
                  </div>
                </div>

                {bookingDetails.dropoff && (
                  <>
                    <ArrowRight className="h-4 w-4 text-red-500" />
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="mb-0.5 text-xs text-gray-500">To</p>
                        <p className="font-medium text-gray-900">
                          {bookingDetails.dropoff}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="h-8 w-px bg-gray-200"></div>

              <div className="flex flex-1 items-center gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="mb-0.5 text-xs text-gray-500">Pickup</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(bookingDetails.pickupDate)} •{" "}
                      {formatTime(bookingDetails.pickupTime)}
                    </p>
                  </div>
                </div>

                {bookingDetails.dropDate && (
                  <>
                    <ArrowRight className="h-4 w-4 text-red-500" />
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="mb-0.5 text-xs text-gray-500">Drop</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(bookingDetails.dropDate)} •{" "}
                          {formatTime(bookingDetails.dropTime)}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {carsWithPrices.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RidesPage;