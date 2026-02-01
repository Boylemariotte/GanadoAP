export interface Livestock {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  price: number;
  location: string;
  seller: {
    name: string;
    phone: string;
    email: string;
    rating: number;
  };
  images: string[];
  videos: string[]; // Array de URLs de videos
  description: string;
  purpose: 'leche' | 'carne' | 'doble_proposito';
  healthStatus: 'excellent' | 'good' | 'fair';
  vaccinations: string[];
  available: boolean;
  listedDate: string;

  /* Technical Cattle Data */
  births: number; // Número de partos
  milkYield?: number; // Litraje diario (opcional para carne)
  gestationTime: number; // Tiempo de gestación en meses
  offspring: {
    sex: 'hembra' | 'macho';
    quantity: number;
  }; // Información de la cría

  /* Batch Sales */
  isLot: boolean;
  lotSize: number; // Cantidad de animales en el lote
}
