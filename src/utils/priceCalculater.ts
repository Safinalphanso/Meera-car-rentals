// Define the valid vehicle types
type VehicleType = 'sedan' | 'muv' | 'innova' | 'crysta' | 'hycross' | 'fortuner';

export function calculateOutstationCost(
  vehicleType: VehicleType,
  distance: number,
  days: number,
) {
  const rateCard = {
    sedan: { perKm: 14, chauffeur: 400, nightAllowance: 300 },
    muv: { perKm: 18, chauffeur: 400, nightAllowance: 300 },
    innova: { perKm: 20, chauffeur: 400, nightAllowance: 300 },
    crysta: { perKm: 25, chauffeur: 400, nightAllowance: 300 },
    hycross: { perKm: 35, chauffeur: 400, nightAllowance: 300 },
    fortuner: { perKm: 55, chauffeur: 500, nightAllowance: 400 },
  } as const;

  const gstRate = 0.05;
  const baseKmPerDay = 300;
  const totalDistance = Math.max(distance, (days+1) * baseKmPerDay);
  const costPerKm = rateCard[vehicleType].perKm;
  const chauffeurCost = days * rateCard[vehicleType].chauffeur;
  const nightAllowance = days * rateCard[vehicleType].nightAllowance;

  let totalCost = totalDistance * costPerKm + chauffeurCost + nightAllowance;

  // Add GST
  totalCost += totalCost * gstRate;

  return totalCost;
}

// Update the other functions to use the VehicleType type
type AirportVehicleType = 'sedan' | 'muv' | 'innova' | 'crysta';

export function calculateAirportCost(vehicleType: AirportVehicleType) {
  let hours = 40;
  let distance = 4;
  const rateCard = {
    airport: {
      sedan: {
        packagePrice: 1600,
        includedKm: 40,
        includedHr: 4,
        extraKm: 14,
        extraHr: 140,
      },
      muv: {
        packagePrice: 2000,
        includedKm: 40,
        includedHr: 4,
        extraKm: 18,
        extraHr: 180,
      },
      innova: {
        packagePrice: 2200,
        includedKm: 40,
        includedHr: 4,
        extraKm: 20,
        extraHr: 200,
      },
      crysta: {
        packagePrice: 2500,
        includedKm: 40,
        includedHr: 4,
        extraKm: 25,
        extraHr: 250,
      },
    },
  } as const;

  const gstRate = 0.05;
  const airportPackage = rateCard.airport[vehicleType];
  const extraAirportKm = Math.max(0, distance - airportPackage.includedKm);
  const extraAirportHours = Math.max(0, hours - airportPackage.includedHr);
  let totalCost =
    airportPackage.packagePrice +
    extraAirportKm * airportPackage.extraKm +
    extraAirportHours * airportPackage.extraHr;

  // Add GST
  totalCost += totalCost * gstRate;

  return totalCost;
}

export function calculateLocalCost(vehicleType: VehicleType) {
  let hours = 80;
  let distance = 8;
  const rateCard = {
    local: {
      sedan: {
        packagePrice: 2400,
        includedKm: 80,
        includedHr: 8,
        extraKm: 14,
        extraHr: 140,
      },
      muv: {
        packagePrice: 2800,
        includedKm: 80,
        includedHr: 8,
        extraKm: 18,
        extraHr: 180,
      },
      innova: {
        packagePrice: 3000,
        includedKm: 80,
        includedHr: 8,
        extraKm: 20,
        extraHr: 200,
      },
      crysta: {
        packagePrice: 3500,
        includedKm: 80,
        includedHr: 8,
        extraKm: 25,
        extraHr: 250,
      },
      hycross: {
        packagePrice: 4000,
        includedKm: 80,
        includedHr: 8,
        extraKm: 40,
        extraHr: 400,
      },
      fortuner: {
        packagePrice: 5500,
        includedKm: 80,
        includedHr: 8,
        extraKm: 55,
        extraHr: 555,
      },
    },
  } as const;

  const gstRate = 0.05;
  const localPackage = rateCard.local[vehicleType];
  const extraLocalKm = Math.max(0, distance - localPackage.includedKm);
  const extraLocalHours = Math.max(0, hours - localPackage.includedHr);
  let totalCost =
    localPackage.packagePrice +
    extraLocalKm * localPackage.extraKm +
    extraLocalHours * localPackage.extraHr;

  // Add GST
  totalCost += totalCost * gstRate;

  return totalCost;
}