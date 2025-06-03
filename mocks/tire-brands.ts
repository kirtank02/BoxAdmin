import { TireBrand } from "@/types/tire-brand";
import { MOCK_TIRE_SUPPLIERS } from "./tire-suppliers";

const MOCK_TIRE_BRANDS: TireBrand[] = [
  {
    id: "1",
    logoUrl: "/images/Manager/michelin.svg",
    name: "Michelin",
    status: true,
    preferredSuplierId: MOCK_TIRE_SUPPLIERS[0].id,
    suppliers: [MOCK_TIRE_SUPPLIERS[0]]
  },
  {
    id: "2",
    logoUrl: "/images/Manager/generaltire.svg",
    name: "Generaltire",
    status: false,
    preferredSuplierId: MOCK_TIRE_SUPPLIERS[3].id,
    suppliers: [MOCK_TIRE_SUPPLIERS[1], MOCK_TIRE_SUPPLIERS[3]]
  },
  {
    id: "3",
    logoUrl: "/images/Manager/coopertires.svg",
    name: "Coopertires",
    status: false,
    preferredSuplierId: MOCK_TIRE_SUPPLIERS[3].id,
    suppliers: [MOCK_TIRE_SUPPLIERS[0], MOCK_TIRE_SUPPLIERS[2], MOCK_TIRE_SUPPLIERS[3]]
  },
  {
    id: "4",
    logoUrl: "/images/Manager/bridgestone.svg",
    name: "Bridgestone",
    status: true,
    preferredSuplierId: MOCK_TIRE_SUPPLIERS[1].id,
    suppliers: [MOCK_TIRE_SUPPLIERS[1]]
  },
  {
    id: "5",
    logoUrl: "/images/Manager/pirelli.svg",
    name: "Pirelli",
    status: false,
    preferredSuplierId: MOCK_TIRE_SUPPLIERS[3].id,
    suppliers: [MOCK_TIRE_SUPPLIERS[3]]
  },
  {
    id: "6",
    logoUrl: "/images/Manager/falken.svg",
    name: "Falken",
    status: true,
    preferredSuplierId: null,
    suppliers: [MOCK_TIRE_SUPPLIERS[0], MOCK_TIRE_SUPPLIERS[2], MOCK_TIRE_SUPPLIERS[3]]
  },
  {
    id: "7",
    logoUrl: "/images/Manager/dunlop.svg",
    name: "Falken",
    status: true,
    preferredSuplierId: MOCK_TIRE_SUPPLIERS[3].id,
    suppliers: [MOCK_TIRE_SUPPLIERS[3]]
  }
]


async function mockFetchTireBrands(): Promise<TireBrand[]> {
  return new Promise(resolve => setTimeout(() => {
    resolve(MOCK_TIRE_BRANDS);
  }, 100)) as Promise<TireBrand[]>;
}

export async function getTireBrands(): Promise<TireBrand[] | null> {
  try {
    return await mockFetchTireBrands();
  } catch (error) {
    console.error(error);
    return null
  }
}

