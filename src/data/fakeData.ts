
export interface FareData {
  id: string;
  company: string;
  route: {
    from: string;
    to: string;
  };
  price: number;
  discount?: number;
  duration: string;
  departureTime: string;
  transportType: 'bus' | 'train' | 'ferry' | 'flight';
  logo: string;
  rating: number;
  amenities: string[];
}

export const popularDestinations = [
  { name: "Enugu", code: "ENU" },
  { name: "Nsukka", code: "NSK" },
  { name: "Awgu", code: "AWG" },
  { name: "Udi", code: "UDI" },
  { name: "Oji River", code: "OJR" },
  { name: "Ezeagu", code: "EZA" },
  { name: "Nkanu", code: "NKA" },
  { name: "Abakaliki", code: "ABK" },
  { name: "Onitsha", code: "ONI" },
  { name: "Owerri", code: "OWE" }
];

export const transportCompanies = [
  { name: "Peace Mass Transit", id: "peace-mass" },
  { name: "GUO Transport", id: "guo-transport" },
  { name: "ABC Transport", id: "abc-transport" },
  { name: "God is Good Motors", id: "gigm" },
  { name: "Enugu City Transport", id: "enugu-city" },
  { name: "Ifesinachi Transport", id: "ifesinachi" }
];

export const fakeHistoricalPrices = {
  "ENU-NSK": [1200, 1300, 1400, 1250, 1350, 1450, 1500],
  "ENU-OWE": [2500, 2400, 2600, 2700, 2550, 2450, 2600],
  "ENU-ONI": [1800, 1900, 1750, 1850, 2000, 1950, 1900],
  "ENU-ABK": [1000, 1100, 1050, 1150, 1200, 1100, 1150]
};

export const transportFares: FareData[] = [
  {
    id: "1",
    company: "Peace Mass Transit",
    route: {
      from: "Enugu",
      to: "Nsukka"
    },
    price: 1500,
    duration: "1h 30m",
    departureTime: "08:30 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.2,
    amenities: ["Air Conditioning", "Comfortable Seats", "Storage Space"]
  },
  {
    id: "2",
    company: "GUO Transport",
    route: {
      from: "Enugu",
      to: "Nsukka"
    },
    price: 1300,
    discount: 10,
    duration: "1h 45m",
    departureTime: "09:15 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.0,
    amenities: ["Air Conditioning", "Comfortable Seats", "Free Water", "Storage Space"]
  },
  {
    id: "3",
    company: "ABC Transport",
    route: {
      from: "Enugu",
      to: "Owerri"
    },
    price: 2600,
    duration: "2h 45m",
    departureTime: "10:00 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.5,
    amenities: ["Air Conditioning", "Refreshments", "Extra Legroom"]
  },
  {
    id: "4",
    company: "God is Good Motors",
    route: {
      from: "Enugu",
      to: "Onitsha"
    },
    price: 1900,
    duration: "2h 00m",
    departureTime: "11:30 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.3,
    amenities: ["Air Conditioning", "Comfortable Seats", "Power Outlets"]
  },
  {
    id: "5",
    company: "Enugu City Transport",
    route: {
      from: "Enugu",
      to: "Awgu"
    },
    price: 800,
    duration: "1h 10m",
    departureTime: "09:00 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 3.7,
    amenities: ["Basic Seating", "Storage Space"]
  },
  {
    id: "6",
    company: "Ifesinachi Transport",
    route: {
      from: "Enugu",
      to: "Abakaliki"
    },
    price: 1150,
    discount: 15,
    duration: "1h 30m",
    departureTime: "07:45 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.1,
    amenities: ["Air Conditioning", "Refreshments", "Extra Baggage"]
  },
  {
    id: "7",
    company: "Peace Mass Transit",
    route: {
      from: "Enugu",
      to: "Udi"
    },
    price: 600,
    duration: "45m",
    departureTime: "08:00 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 3.9,
    amenities: ["Basic Seating", "Storage Space"]
  },
  {
    id: "8",
    company: "GUO Transport",
    route: {
      from: "Enugu",
      to: "Oji River"
    },
    price: 750,
    duration: "1h 00m",
    departureTime: "10:30 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.4,
    amenities: ["Air Conditioning", "Comfortable Seats", "Storage Space"]
  }
];
