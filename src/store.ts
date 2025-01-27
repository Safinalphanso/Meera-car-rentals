import { create } from "zustand";

interface Car {
  id: number;
  name: string;
  image: string;
  price: number;
  passengers: number;
  distance: string;
  duration: string;
  inclusions: string[];
  exclusions: string[];
}

interface RideBookingState {
  activeTab: string;
  locations: {
    pickup: string;
    dropoff: string;
    pickupSuggestion: any;
    dropoffSuggestion: any;
  };
  dates: {
    pickupDate: string;
    pickupTime: string;
    dropDate: string;
    dropTime: string;
  };
  errors: Record<string, string>;
  submitting: boolean;
  distance: number | null;
  eta: number | null;
  selectedCar: Car | null;
  setActiveTab: (activeTab: string) => void;
  setLocations: (locations: any) => void;
  setDates: (dates: any) => void;
  setErrors: (errors: Record<string, string>) => void;
  setSubmitting: (submitting: boolean) => void;
  updateLocation: (type: string, value: string, suggestion: any) => void;
  setDistance: (distance: number) => void;
  setEta: (eta: number) => void;
  setSelectedCar: (car: Car) => void;
}

const useRideBookingStore = create<RideBookingState>((set) => ({
  activeTab: "Outstation",
  locations: {
    pickup: "",
    dropoff: "",
    pickupSuggestion: null,
    dropoffSuggestion: null,
  },
  dates: {
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
  },
  errors: {},
  submitting: false,
  distance: null,
  eta: null,
  selectedCar: null,

  // Actions
  setActiveTab: (activeTab) => set({ activeTab }),
  setLocations: (locations) => set({ locations }),
  setDates: (dates) => set({ dates }),
  setErrors: (errors) => set({ errors }),
  setSubmitting: (submitting) => set({ submitting }),
  updateLocation: (type, value, suggestion) =>
    set((state) => ({
      locations: {
        ...state.locations,
        [type]: value,
        [`${type}Suggestion`]: suggestion,
      },
    })),
  setDistance: (distance) => set({ distance }),
  setEta: (eta) => set({ eta }),
  setSelectedCar: (car) => set({ selectedCar: car }),
}));

export default useRideBookingStore;
