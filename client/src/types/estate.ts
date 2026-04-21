export interface Estate {
  id: string;
  name: string;
  location: string;
  province: string;
  price: number;
  surface: number; // Superficie en hectáreas
  surfaceUnit: 'hectareas' | 'metros_cuadrados';
  description: string;
  seller: {
    name: string;
    phone: string;
    email: string;
    rating: number;
  };
  images: string[];
  videos: string[];
  available: boolean;
  listedDate: string;

  /* Estate Features */
  estateType: 'campo' | 'estancia' | 'finca' | 'chacra' | 'potrero';
  hasWater: boolean; // Acceso a agua
  hasElectricity: boolean; // Acceso a electricidad
  hasRoadAccess: boolean; // Acceso por camino
  soilType: string; // Tipo de suelo
  topography: 'plano' | 'ondulado' | 'montañoso';
  vegetation: string; // Tipo de vegetación
  fencing: boolean; // Alambrado perimetral
  facilities: string[]; // Instalaciones (galpón, corrales, etc.)

  /* Agricultural Capacity */
  livestockCapacity?: number; // Capacidad de ganado (cabezas)
  cropTypes?: string[]; // Tipos de cultivos aptos
  irrigationSystem?: 'ninguno' | 'gravedad' | 'aspersión' | 'goteo';
  certifiedOrganic?: boolean; // Certificación orgánica

  /* Legal and Administrative */
  deedType: 'escritura' | 'posesoria' | 'compraventa';
  taxStatus: 'al_dia' | 'pendiente';
  zoning: string; // Zonificación municipal
  restrictions?: string[]; // Restricciones de uso

  /* Location Details */
  distanceToCity: number; // Distancia a ciudad más cercana en km
  nearbyCities: string[]; // Ciudades cercanas
  coordinates?: {
    lat: number;
    lng: number;
  };
}
