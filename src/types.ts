export interface Location {
  pickup: string;
  dropoff: string;
  pickupSuggestion: any | null; // Replace `any` with the actual type of the suggestion object
  dropoffSuggestion: any | null; // Replace `any` with the actual type of the suggestion object
}

export interface Dates {
  pickupDate: string;
  pickupTime: string;
  dropDate: string;
  dropTime: string;
}

export interface Errors {
  pickup?: string;
  dropoff?: string;
  pickupDate?: string;
  pickupTime?: string;
  dropDate?: string;
  dropTime?: string;
}

export interface RideBookingState {
  activeTab: string;
  locations: Location;
  dates: Dates;
  errors: Errors;
  submitting: boolean;
  setActiveTab: (activeTab: string) => void;
  setLocations: (locations: Location) => void;
  setDates: (dates: Dates) => void;
  setErrors: (errors: Errors) => void;
  setSubmitting: (submitting: boolean) => void;
  updateLocation: (
    type: keyof Location,
    value: string,
    suggestion: any,
  ) => void; // Replace `any` with the actual type of the suggestion object
  distance: number | null;
  eta: number | null;
  setDistance: (distance: number | null) => void;
  setEta: (eta: number | null) => void;
}
