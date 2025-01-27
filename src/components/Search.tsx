import React from "react";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useRideBookingStore from "../store";
import LocationInput from "./LocationInput"; // Assuming LocationInput is in a separate file
import { v4 as uuidv4 } from "uuid"; // For generating UUIDs

const TimeSelect = ({ value, onChange, error, className }) => {
  // Generate time slots in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of ["00", "30"]) {
        const time = `${hour.toString().padStart(2, "0")}:${minute}`;
        const label = `${hour % 12 || 12}:${minute} ${hour < 12 ? "AM" : "PM"}`;
        slots.push({ value: time, label });
      }
    }
    return slots;
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">
        <Clock
          className={`h-4 w-4 ${error ? "text-red-400" : "text-gray-400"}`}
        />
      </div>
      <select
        value={value}
        onChange={onChange}
        className={`w-full appearance-none rounded-lg border bg-white p-2.5 pl-11 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-300" : "border-gray-200"
        } ${className}`}
      >
        <option value="">Select Time</option>
        {generateTimeSlots().map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

const RideBookingForm: React.FC = () => {
  const router = useRouter();

  // Get state and actions from the Zustand store
  const {
    activeTab,
    locations,
    dates,
    errors,
    submitting,
    setErrors,
    setSubmitting,
    setDistance,
    setEta,
    setActiveTab,
    updateLocation,
    setDates,
  } = useRideBookingStore();
  console.log(dates);
  const validateForm = () => {
    const newErrors: Errors = {};

    if (!locations.pickup) {
      newErrors.pickup = "Pickup location is required";
    }

    if (activeTab === "Outstation" && !locations.dropoff) {
      newErrors.dropoff = "Drop-off location is required";
    }

    if (!dates.pickupDate) {
      newErrors.pickupDate = "Pickup date is required";
    }

    if (!dates.pickupTime) {
      newErrors.pickupTime = "Pickup time is required";
    }

    if (activeTab === "Outstation") {
      if (!dates.dropDate) {
        newErrors.dropDate = "Drop-off date is required";
      } else if (dates.dropDate < dates.pickupDate) {
        newErrors.dropDate = "Drop-off date must be after pickup date";
      }

      if (!dates.dropTime) {
        newErrors.dropTime = "Drop-off time is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "Outstation") {
      if (validateForm()) {
        setSubmitting(true);

        try {
          // Extract pickup and dropoff coordinates from suggestions
          const pickupCoords = locations.pickupSuggestion?.geometry?.location;
          const dropoffCoords = locations.dropoffSuggestion?.geometry?.location;

          if (!pickupCoords || !dropoffCoords) {
            throw new Error("Invalid pickup or dropoff coordinates");
          }

          // Prepare the request payload
          const origins = `${pickupCoords.lat},${pickupCoords.lng}`;
          const destinations = `${dropoffCoords.lat},${dropoffCoords.lng}`;

          const response = await fetch(
            `https://api.olamaps.io/routing/v1/distanceMatrix?origins=${origins}&destinations=${destinations}&mode=driving&api_key=CcVwEWToot1QSl3YgwwqrwsFxEdXaAlTZotfvRdy`,
            {
              method: "GET",
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch distance matrix");
          }

          const data = await response.json();

          // Check if the API response is successful
          if (
            data.status === "SUCCESS" &&
            data.rows?.[0]?.elements?.[0]?.status === "OK"
          ) {
            const { distance, duration } = data.rows[0].elements[0];

            // Store distance and ETA in the Zustand store
            setDistance(distance);
            setEta(duration);

            // Navigate to the next page or show a confirmation
            const queryParams = new URLSearchParams({
              type: activeTab,
              pickup: locations.pickup,
              dropoff: locations.dropoff || "",
              pickupDate: dates.pickupDate,
              pickupTime: dates.pickupTime,
              dropDate: dates.dropDate || "",
              dropTime: dates.dropTime || "",
              distance: (parseInt(distance) / 1000).toString(),
              eta: duration.toString(),
            }).toString();
              console.log("The distance is",distance);
            router.push(`/rides?${queryParams}`);
          } else {
            throw new Error("Failed to calculate distance and ETA");
          }
        } catch (error) {
          console.error("Error calculating distance and ETA:", error);
          setErrors({
            ...errors,
            general: "Failed to calculate distance and ETA. Please try again.",
          });
        } finally {
          setSubmitting(false);
        }
      }
    } else {
      const queryParams = new URLSearchParams({
        type: activeTab,
        pickup: locations.pickup,
        dropoff: locations.dropoff || "",
        pickupDate: dates.pickupDate,
        pickupTime: dates.pickupTime,
        dropDate: dates.dropDate || "",
        dropTime: dates.dropTime || "",
      }).toString();

      router.push(`/rides?${queryParams}`);
    }
  };
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-lg">
      <div className="p-6">
        <div className="mb-6 flex flex-wrap gap-24 rounded-lg bg-blue-50 p-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-800">Mumbai</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-800">
              Chauffeur Drive
            </span>
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-red-500" />
            <p className="text-sm text-red-600">
              Please fill in all required fields correctly
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white p-2.5 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="Outstation">Outstation</option>
              <option value="Local Transport">Local Transport</option>
              <option value="Airport">Airport</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          </div>

          <div className="space-y-3">
            <LocationInput
              type="pickup"
              placeholder="Enter pickup location"
              value={locations.pickup}
              onChange={(e) =>
                updateLocation("pickup", e.target.value, e.target.suggestion)
              }
              error={errors.pickup}
            />
            {activeTab === "Outstation" && (
              <LocationInput
                type="dropoff"
                placeholder="Enter drop location"
                value={locations.dropoff}
                onChange={(e) =>
                  updateLocation("dropoff", e.target.value, e.target.suggestion)
                }
                error={errors.dropoff}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">
                <Calendar
                  className={`h-4 w-4 ${errors.pickupDate ? "text-red-400" : "text-gray-400"}`}
                />
              </div>
              <input
                type="date"
                className={`w-full rounded-lg border bg-white p-2.5 pl-11 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.pickupDate ? "border-red-300" : "border-gray-200"
                }`}
                value={dates.pickupDate || ""}
                onChange={(e) => {
                  console.log("pickupDate onChange:", e.target.value); // Debugging
                  const newDates = {
                    ...dates, // Use the current `dates` state
                    pickupDate: e.target.value,
                  };
                  console.log("Calling setDates with:", newDates); // Debugging
                  setDates(newDates); // Pass the new state object
                }}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.pickupDate && (
                <p className="mt-1 text-xs text-red-500">{errors.pickupDate}</p>
              )}
            </div>
            <TimeSelect
              value={dates.pickupTime}
              onChange={(e) => {
                const time = {
                  ...dates,
                  pickupTime: e.target.value,
                };
                setDates(time);
              }}
              error={errors.pickupTime}
            />
          </div>

          {activeTab === "Outstation" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">
                  <Calendar
                    className={`h-4 w-4 ${errors.dropDate ? "text-red-400" : "text-gray-400"}`}
                  />
                </div>
                <input
                  type="date"
                  className={`w-full rounded-lg border bg-white p-2.5 pl-11 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dropDate ? "border-red-300" : "border-gray-200"
                  }`}
                  value={dates.dropDate || ""}
                  onChange={(e) => {
                    const newDates = {
                      ...dates, // Use the current `dates` state
                      dropDate: e.target.value,
                    };
                    setDates(newDates); // Pass the new state object
                  }}
                  min={dates.dropDate || new Date().toISOString().split("T")[0]}
                />
                {errors.dropDate && (
                  <p className="mt-1 text-xs text-red-500">{errors.dropDate}</p>
                )}
              </div>
              <TimeSelect
                value={dates.dropTime}
                onChange={(e) => {
                  const time = {
                    ...dates,
                    dropTime: e.target.value,
                  };
                  setDates(time);
                }}
                error={errors.dropTime}
              />
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className={`relative z-20 w-full rounded-lg py-3 text-sm font-semibold text-white shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              submitting ? "bg-gray-400" : "bg-red-500 hover:bg-black"
            }`}
          >
            {submitting ? "Processing..." : "Book Your Ride"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-500">
          *The time is displayed in Indian Standard Time (IST)
        </p>
      </div>
    </div>
  );
};

export default RideBookingForm;
