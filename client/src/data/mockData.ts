import { Livestock } from '../types/livestock';
import { Estate } from '../types/estate';

export const mockLivestock: Livestock[] = [
  {
    id: '2',
    name: 'Lote de 10 Novillos Hereford',
    breed: 'Hereford',
    age: 2,
    weight: 380,
    price: 18000000,
    purpose: 'carne',
    healthStatus: 'excellent',
    births: 0,
    location: 'Buenos Aires, Argentina',
    images: [
      'https://images.unsplash.com/photo-1570484621962-9ae2e8b48c57?w=400',
      'https://images.unsplash.com/photo-1591485328236-b43cba247e6c?w=400',
      'https://images.unsplash.com/photo-1516233138836-5f0c4cc75831?w=400'
    ],
    videos: [],
    isLot: true,
    lotSize: 10,
    available: true,
    seller: {
      name: 'Estancia La Pampa',
      phone: '+54 11 2345-6789',
      email: 'info@estancialapampa.com',
      rating: 4.9
    },
    description: 'Lote de 10 novillos Hereford de 2 años, excelentes para engorde. Peso promedio 380kg.',
    vaccinations: ['Triple viral', 'Clostridiosis', 'Parasitarios'],
    listedDate: '2024-02-01',
    gestationTime: 9,
    offspring: {
      sex: 'macho',
      quantity: 0
    },
  },
  {
    id: '3',
    name: 'Ternera Holstein Friesian',
    breed: 'Holstein Friesian',
    age: 1,
    weight: 280,
    price: 1200000,
    purpose: 'leche',
    healthStatus: 'good',
    milkYield: 20,
    births: 0,
    location: 'Santa Fe, Argentina',
    images: [
      'https://images.unsplash.com/photo-1588463697833-cb197ac8fb85?w=400',
      'https://images.unsplash.com/photo-1551698618-1dcef9ad3d26?w=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    ],
    videos: [],
    isLot: false,
    lotSize: 1,
    available: true,
    seller: {
      name: 'Tambo Las Rosas',
      phone: '+54 11 3456-7890',
      email: 'contacto@tambolasrosas.com',
      rating: 4.7
    },
    description: 'Ternera Holstein con excelente potencial lechero. Padres de alta producción.',
    vaccinations: ['Triple viral', 'IBR', 'BVD'],
    listedDate: '2024-02-20',
    gestationTime: 9,
    offspring: {
      sex: 'hembra',
      quantity: 0
    },
  },
  {
    id: '4',
    name: 'Toros Brahman para Reproducción',
    breed: 'Brahman',
    age: 3,
    weight: 650,
    price: 3500000,
    purpose: 'doble_proposito',
    healthStatus: 'excellent',
    births: 0,
    location: 'Corrientes, Argentina',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'https://images.unsplash.com/photo-1516233138836-5f0c4cc75831?w=400',
      'https://images.unsplash.com/photo-1551698618-1dcef9ad3d26?w=400'
    ],
    videos: [],
    isLot: false,
    lotSize: 1,
    available: true,
    seller: {
      name: 'Cabaña El Cimarrón',
      phone: '+54 11 4567-8901',
      email: 'cabana@cimarron.com',
      rating: 5.0
    },
    description: 'Ejemplares Brahman de pedigree certificado. Excelentes para mejoramiento genético.',
    vaccinations: ['Triple viral', 'Fiebre aftosa', 'Brucelosis'],
    listedDate: '2024-01-10',
    gestationTime: 9,
    offspring: {
      sex: 'macho',
      quantity: 0
    },
  },
  {
    id: '5',
    name: 'Lote de 5 Vaquillas Angus',
    breed: 'Angus',
    age: 1.5,
    weight: 320,
    price: 7500000,
    purpose: 'carne',
    healthStatus: 'good',
    births: 0,
    location: 'Entre Ríos, Argentina',
    images: [
      'https://images.unsplash.com/photo-1516233138836-5f0c4cc75831?w=400',
      'https://images.unsplash.com/photo-1570484621962-9ae2e8b48c57?w=400',
      'https://images.unsplash.com/photo-1591485328236-b43cba247e6c?w=400'
    ],
    videos: [],
    isLot: true,
    lotSize: 5,
    available: true,
    seller: {
      name: 'Campo Verde S.A.',
      phone: '+54 11 5678-9012',
      email: 'ventas@campoverde.com',
      rating: 4.6
    },
    description: 'Lote de 5 vaquillas Angus de 1.5 años. Ideales para cría y engorde.',
    vaccinations: ['Triple viral', 'Clostridiosis', 'Parasitarios'],
    listedDate: '2024-02-15',
    gestationTime: 9,
    offspring: {
      sex: 'hembra',
      quantity: 0
    },
  },
  {
    id: '6',
    name: 'Vaca Jersey de Alta Línea',
    breed: 'Jersey',
    age: 5,
    weight: 420,
    price: 1800000,
    purpose: 'leche',
    healthStatus: 'excellent',
    milkYield: 22,
    births: 4,
    location: 'La Pampa, Argentina',
    images: [
      'https://images.unsplash.com/photo-1580434659871-4c9b054d6dc7?w=400',
      'https://images.unsplash.com/photo-1551698618-1dcef9ad3d26?w=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    ],
    videos: [],
    isLot: false,
    lotSize: 1,
    available: true,
    seller: {
      name: 'Lechería Suiza',
      phone: '+54 11 6789-0123',
      email: 'info@lecheriasuiza.com',
      rating: 4.8
    },
    description: 'Vaca Jersey con excelente producción de leche grasa. Ideal para quesería.',
    vaccinations: ['Triple viral', 'Brucelosis', 'Tuberculosis'],
    listedDate: '2024-01-25',
    gestationTime: 9,
    offspring: {
      sex: 'hembra',
      quantity: 1
    },
  },
  {
    id: '7',
    name: 'Novillo Charolais',
    breed: 'Charolais',
    age: 2.5,
    weight: 480,
    price: 2200000,
    purpose: 'carne',
    healthStatus: 'good',
    births: 0,
    location: 'Mendoza, Argentina',
    images: [
      'https://images.unsplash.com/photo-1591485328236-b43cba247e6c?w=400',
      'https://images.unsplash.com/photo-1570484621962-9ae2e8b48c57?w=400',
      'https://images.unsplash.com/photo-1516233138836-5f0c4cc75831?w=400'
    ],
    videos: [],
    isLot: false,
    lotSize: 1,
    available: true,
    seller: {
      name: 'Ganadería Andina',
      phone: '+54 11 7890-1234',
      email: 'ganaderia@andina.com',
      rating: 4.5
    },
    description: 'Novillo Charolais con excelente conformación carnicera. Rápido crecimiento.',
    vaccinations: ['Triple viral', 'Clostridiosis', 'Parasitarios'],
    listedDate: '2024-02-28',
    gestationTime: 9,
    offspring: {
      sex: 'macho',
      quantity: 0
    },
  },
  {
    id: '8',
    name: 'Lote Mixto Doble Propósito',
    breed: 'Criollo',
    age: 3,
    weight: 450,
    price: 12000000,
    purpose: 'doble_proposito',
    healthStatus: 'good',
    milkYield: 15,
    births: 2,
    location: 'Salta, Argentina',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dcef9ad3d26?w=400',
      'https://images.unsplash.com/photo-1580434659871-4c9b054d6dc7?w=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    ],
    videos: [],
    isLot: true,
    lotSize: 6,
    available: true,
    seller: {
      name: 'Campo Norte',
      phone: '+54 11 8901-2345',
      email: 'contacto@camponorte.com',
      rating: 4.4
    },
    description: 'Lote de 6 ejemplares Criollos de doble propósito. Rusticos y adaptables.',
    vaccinations: ['Triple viral', 'Fiebre aftosa', 'Brucelosis'],
    listedDate: '2024-02-10',
    gestationTime: 9,
    offspring: {
      sex: 'hembra',
      quantity: 1
    },
  }
];

export const categories = [
  { id: 'all', name: 'Todos los productos', icon: '??', count: mockLivestock.length },
  { id: 'leche', name: 'Producción Lechera', icon: '??', count: mockLivestock.filter(item => item.purpose === 'leche').length },
  { id: 'carne', name: 'Producción Cárnica', icon: '??', count: mockLivestock.filter(item => item.purpose === 'carne').length },
  { id: 'doble_proposito', name: 'Doble Propósito', icon: '??', count: mockLivestock.filter(item => item.purpose === 'doble_proposito').length }
];

export const mockEstates: Estate[] = [
  {
    id: 'estate-1',
    name: 'Estancia La Primavera',
    location: 'San Antonio de Areco, Buenos Aires',
    province: 'Buenos Aires',
    price: 850000000,
    surface: 250,
    surfaceUnit: 'hectareas',
    description: 'Excelente estancia con casa principal, galpones y corrales. Ideal para cría de ganado y agricultura. Acceso a agua potable y eléctrica.',
    seller: {
      name: 'Estancias S.A.',
      phone: '+54 11 9876-5432',
      email: 'ventas@estancias.com',
      rating: 4.9
    },
    images: [
      'https://images.unsplash.com/photo-1580434659871-4c9b054d6dc7?w=400',
      'https://images.unsplash.com/photo-1570484621962-9ae2e8b48c57?w=400',
      'https://images.unsplash.com/photo-1551698618-1dcef9ad3d26?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-03-01',
    estateType: 'estancia',
    hasWater: true,
    hasElectricity: true,
    hasRoadAccess: true,
    soilType: 'Franco limoso',
    topography: 'plano',
    vegetation: 'Pastizal natural',
    fencing: true,
    facilities: ['Casa principal', 'Galpón 500m²', 'Corrales', 'Tanque de agua'],
    livestockCapacity: 300,
    cropTypes: ['Soja', 'Maíz', 'Trigo'],
    irrigationSystem: 'gravedad',
    certifiedOrganic: false,
    deedType: 'escritura',
    taxStatus: 'al_dia',
    zoning: 'Rural agropecuario',
    restrictions: [],
    distanceToCity: 15,
    nearbyCities: ['San Antonio de Areco', 'Capilla del Señor'],
    coordinates: {
      lat: -34.2517,
      lng: -59.7345
    }
  },
  {
    id: 'estate-2',
    name: 'Campo Los Alamos',
    location: 'General Alvear, Mendoza',
    province: 'Mendoza',
    price: 320000000,
    surface: 120,
    surfaceUnit: 'hectareas',
    description: 'Campo agrícola con excelente potencial para viñedos y olivares. Terreno ondulado con vistas panorámicas.',
    seller: {
      name: 'AgroTierras',
      phone: '+54 261 4567-8901',
      email: 'info@agrotierras.com',
      rating: 4.7
    },
    images: [
      'https://images.unsplash.com/photo-1591485328236-b43cba247e6c?w=400',
      'https://images.unsplash.com/photo-1516233138836-5f0c4cc75831?w=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-02-15',
    estateType: 'campo',
    hasWater: true,
    hasElectricity: false,
    hasRoadAccess: true,
    soilType: 'Arcilloso',
    topography: 'ondulado',
    vegetation: 'Monte nativo',
    fencing: true,
    facilities: ['Almacén', 'Bodega pequeña'],
    livestockCapacity: 80,
    cropTypes: ['Vid', 'Olivo', 'Almendras'],
    irrigationSystem: 'goteo',
    certifiedOrganic: true,
    deedType: 'escritura',
    taxStatus: 'al_dia',
    zoning: 'Rural mixto',
    restrictions: ['Protección de cursos de agua'],
    distanceToCity: 25,
    nearbyCities: ['General Alvear', 'San Rafael'],
    coordinates: {
      lat: -35.0339,
      lng: -67.7658
    }
  },
  {
    id: 'estate-3',
    name: 'Finca El Paraíso',
    location: 'Concordia, Entre Ríos',
    province: 'Entre Ríos',
    price: 450000000,
    surface: 85,
    surfaceUnit: 'hectareas',
    description: 'Finca citrícola con producción en curso. Excelente infraestructura de riego y acceso a río Uruguay.',
    seller: {
      name: 'Citrus del Litoral',
      phone: '+54 345 1234-5678',
      email: 'contacto@citruslitoral.com',
      rating: 4.8
    },
    images: [
      'https://images.unsplash.com/photo-1588463697833-cb197ac8fb85?w=400',
      'https://images.unsplash.com/photo-1551698618-1dcef9ad3d26?w=400',
      'https://images.unsplash.com/photo-1570484621962-9ae2e8b48c57?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-01-20',
    estateType: 'finca',
    hasWater: true,
    hasElectricity: true,
    hasRoadAccess: true,
    soilType: 'Arenoso',
    topography: 'plano',
    vegetation: 'Cítricos',
    fencing: true,
    facilities: ['Empacadora', 'Galpón de almacenaje', 'Casa de encargado'],
    livestockCapacity: 0,
    cropTypes: ['Naranja', 'Mandarina', 'Limón'],
    irrigationSystem: 'aspersión',
    certifiedOrganic: false,
    deedType: 'escritura',
    taxStatus: 'al_dia',
    zoning: 'Agrícola intensivo',
    restrictions: [],
    distanceToCity: 8,
    nearbyCities: ['Concordia', 'Federación'],
    coordinates: {
      lat: -31.3939,
      lng: -58.0178
    }
  },
  {
    id: 'estate-4',
    name: 'Potrero El Cerrito',
    location: 'Río Cuarto, Córdoba',
    province: 'Córdoba',
    price: 180000000,
    surface: 45,
    surfaceUnit: 'hectareas',
    description: 'Potrero ideal para invernada y recría de ganado. Terreno plano con pasturas implantadas y alambrado perimetral.',
    seller: {
      name: 'Ganadera Córdoba',
      phone: '+54 358 7654-3210',
      email: 'info@ganaderiacordoba.com',
      rating: 4.6
    },
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'https://images.unsplash.com/photo-1516233138836-5f0c4cc75831?w=400',
      'https://images.unsplash.com/photo-1591485328236-b43cba247e6c?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-03-10',
    estateType: 'potrero',
    hasWater: true,
    hasElectricity: false,
    hasRoadAccess: true,
    soilType: 'Franco',
    topography: 'plano',
    vegetation: 'Pastura implantada',
    fencing: true,
    facilities: ['Corrales de manejo', 'Bebedero automático'],
    livestockCapacity: 150,
    cropTypes: [],
    irrigationSystem: 'ninguno',
    certifiedOrganic: false,
    deedType: 'posesoria',
    taxStatus: 'pendiente',
    zoning: 'Ganadero',
    restrictions: [],
    distanceToCity: 30,
    nearbyCities: ['Río Cuarto', 'Villa María'],
    coordinates: {
      lat: -33.1307,
      lng: -64.3499
    }
  },
  {
    id: 'estate-5',
    name: 'Chacra La Esperanza',
    location: 'Luján, Buenos Aires',
    province: 'Buenos Aires',
    price: 95000000,
    surface: 15,
    surfaceUnit: 'hectareas',
    description: 'Chacra hortícola con infraestructura completa. Ideal para producción de hortalizas y frutas.',
    seller: {
      name: 'Hortícolas del Oeste',
      phone: '+54 11 2345-6789',
      email: 'ventas@horticolas.com',
      rating: 4.5
    },
    images: [
      'https://images.unsplash.com/photo-1580434659871-4c9b054d6dc7?w=400',
      'https://images.unsplash.com/photo-1551698618-1dcef9ad3d26?w=400',
      'https://images.unsplash.com/photo-1570484621962-9ae2e8b48c57?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-02-28',
    estateType: 'chacra',
    hasWater: true,
    hasElectricity: true,
    hasRoadAccess: true,
    soilType: 'Orgánico rico',
    topography: 'plano',
    vegetation: 'Cultivos hortícolas',
    fencing: true,
    facilities: ['Invernadero', 'Sistema de riego', 'Almacén'],
    livestockCapacity: 0,
    cropTypes: ['Tomate', 'Lechuga', 'Zanahoria', 'Morrones'],
    irrigationSystem: 'goteo',
    certifiedOrganic: true,
    deedType: 'escritura',
    taxStatus: 'al_dia',
    zoning: 'Hortícola',
    restrictions: [],
    distanceToCity: 5,
    nearbyCities: ['Luján', 'Mercedes'],
    coordinates: {
      lat: -34.5667,
      lng: -59.1167
    }
  }
];

export const featuredProducts = mockLivestock.slice(0, 4);
export const recentlyViewed = mockLivestock.slice(2, 6);
export const recommendedProducts = mockLivestock.slice(1, 5);

export const featuredEstates = mockEstates.slice(0, 3);
export const recentlyViewedEstates = mockEstates.slice(1, 4);

// Ejemplos de prueba adicionales para fincas
export const additionalEstates: Estate[] = [
  {
    id: 'estate-6',
    name: 'Campo Santa María',
    location: 'Tandil, Buenos Aires',
    province: 'Buenos Aires',
    price: 280000000,
    surface: 180,
    surfaceUnit: 'hectareas',
    description: 'Campo agrícola-ganadero con excelente potencial mixto. Suelos fértiles y pasturas naturales. Ideal para agricultura y cría de ganado.',
    seller: {
      name: 'AgroSanta María SRL',
      phone: '+54 2293 456-7890',
      email: 'info@agrosantamaria.com',
      rating: 4.8
    },
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400',
      'https://images.unsplash.com/photo-1418035366296-d21f8ad6a0b0?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-03-15',
    estateType: 'campo',
    hasWater: true,
    hasElectricity: true,
    hasRoadAccess: true,
    soilType: 'Franco arenoso',
    topography: 'ondulado',
    vegetation: 'Pastizal mixto',
    fencing: true,
    facilities: ['Casa de campo', 'Galpón 300m²', 'Corrales', 'Silo de almacenaje'],
    livestockCapacity: 200,
    cropTypes: ['Trigo', 'Soja', 'Girasol'],
    irrigationSystem: 'ninguno',
    certifiedOrganic: false,
    deedType: 'escritura',
    taxStatus: 'al_dia',
    zoning: 'Mixto agropecuario',
    restrictions: [],
    distanceToCity: 20,
    nearbyCities: ['Tandil', 'Azul', 'Olavarría'],
    coordinates: {
      lat: -37.3216,
      lng: -59.1250
    }
  },
  {
    id: 'estate-7',
    name: 'Estancia El Refugio',
    location: 'Carlos Casares, Buenos Aires',
    province: 'Buenos Aires',
    price: 1200000000,
    surface: 450,
    surfaceUnit: 'hectareas',
    description: 'Estancia de lujo con casa principal de 500m², pileta y parque. Excelente para turismo rural o residencia privada. Ganado Aberdeen Angus de pedigree.',
    seller: {
      name: 'Estancias Premium',
      phone: '+54 11 5555-1234',
      email: 'ventas@estanciaspremium.com',
      rating: 5.0
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?w=400',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-01-10',
    estateType: 'estancia',
    hasWater: true,
    hasElectricity: true,
    hasRoadAccess: true,
    soilType: 'Franco limoso',
    topography: 'plano',
    vegetation: 'Pastizal mejorado',
    fencing: true,
    facilities: ['Casa principal 500m²', 'Piscina', 'Parque', 'Galpón 800m²', 'Hangar para aviones', 'Casa de encargado'],
    livestockCapacity: 500,
    cropTypes: ['Soja', 'Maíz', 'Trigo'],
    irrigationSystem: 'gravedad',
    certifiedOrganic: false,
    deedType: 'escritura',
    taxStatus: 'al_dia',
    zoning: 'Rural exclusivo',
    restrictions: ['No se permite subdividir'],
    distanceToCity: 35,
    nearbyCities: ['Carlos Casares', '9 de Julio', 'Bolívar'],
    coordinates: {
      lat: -35.6167,
      lng: -61.2167
    }
  },
  {
    id: 'estate-8',
    name: 'Finca Citrus del Sol',
    location: 'Montecarlo, Misiones',
    province: 'Misiones',
    price: 220000000,
    surface: 65,
    surfaceUnit: 'hectareas',
    description: 'Finca citrícola en plena producción. 35 hectáreas de pomelos en producción con riego por aspersión. Suelos rojos ideales para cítricos.',
    seller: {
      name: 'Citrus Misiones',
      phone: '+54 3751 987-6543',
      email: 'contacto@citrusmisiones.com',
      rating: 4.7
    },
    images: [
      'https://images.unsplash.com/photo-1580434659871-4c9b054d6dc7?w=400',
      'https://images.unsplash.com/photo-1551698618-1dcef9ad3d26?w=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-02-20',
    estateType: 'finca',
    hasWater: true,
    hasElectricity: true,
    hasRoadAccess: true,
    soilType: 'Laterítico',
    topography: 'ondulado',
    vegetation: 'Cítricos',
    fencing: true,
    facilities: ['Empacadora', 'Galpón de almacenaje', 'Casa de encargado', 'Sistema de riego'],
    livestockCapacity: 0,
    cropTypes: ['Pomelo', 'Naranja', 'Mandarina'],
    irrigationSystem: 'aspersión',
    certifiedOrganic: true,
    deedType: 'escritura',
    taxStatus: 'al_dia',
    zoning: 'Frutícola',
    restrictions: ['Mantenimiento de corredores biológicos'],
    distanceToCity: 12,
    nearbyCities: ['Montecarlo', 'Puerto Rico', 'Eldorado'],
    coordinates: {
      lat: -26.5833,
      lng: -54.7333
    }
  },
  {
    id: 'estate-9',
    name: 'Potrero Los Toldos',
    location: 'Los Toldos, Buenos Aires',
    province: 'Buenos Aires',
    price: 95000000,
    surface: 35,
    surfaceUnit: 'hectareas',
    description: 'Potrero ideal para recría y engorde. Pasturas implantadas de alta calidad. Alambrado perimetral y subdividido. Agua subterránea con bomba.',
    seller: {
      name: 'Ganadera Los Toldos',
      phone: '+54 2314 123-4567',
      email: 'info@ganaderalostoldos.com',
      rating: 4.6
    },
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'https://images.unsplash.com/photo-1516233138836-5f0c4cc75831?w=400',
      'https://images.unsplash.com/photo-1591485328236-b43cba247e6c?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-03-05',
    estateType: 'potrero',
    hasWater: true,
    hasElectricity: false,
    hasRoadAccess: true,
    soilType: 'Franco',
    topography: 'plano',
    vegetation: 'Pastura implantada',
    fencing: true,
    facilities: ['Corrales de manejo', 'Bebederos automáticos', 'Bomba de agua'],
    livestockCapacity: 120,
    cropTypes: [],
    irrigationSystem: 'ninguno',
    certifiedOrganic: false,
    deedType: 'posesoria',
    taxStatus: 'pendiente',
    zoning: 'Ganadero',
    restrictions: [],
    distanceToCity: 8,
    nearbyCities: ['Los Toldos', 'Villalonga', 'Lincoln'],
    coordinates: {
      lat: -34.7167,
      lng: -60.5833
    }
  },
  {
    id: 'estate-10',
    name: 'Chacra El Roble',
    location: 'San Pedro, Buenos Aires',
    province: 'Buenos Aires',
    price: 75000000,
    surface: 12,
    surfaceUnit: 'hectareas',
    description: 'Chacra frutícola con 8 hectáreas de peras en producción. Sistema de riego por goteo. Casa de campo y galpón de almacenaje.',
    seller: {
      name: 'Frutícola San Pedro',
      phone: '+54 3329 456-7890',
      email: 'info@fruticolasanpedro.com',
      rating: 4.5
    },
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'https://images.unsplash.com/photo-1551698618-1dcef9ad3d26?w=400',
      'https://images.unsplash.com/photo-1580434659871-4c9b054d6dc7?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-02-10',
    estateType: 'chacra',
    hasWater: true,
    hasElectricity: true,
    hasRoadAccess: true,
    soilType: 'Franco arcilloso',
    topography: 'plano',
    vegetation: 'Frutales',
    fencing: true,
    facilities: ['Casa de campo', 'Galpón 150m²', 'Cámara frigorífica', 'Sistema de riego'],
    livestockCapacity: 0,
    cropTypes: ['Pera', 'Manzana', 'Durazno'],
    irrigationSystem: 'goteo',
    certifiedOrganic: false,
    deedType: 'escritura',
    taxStatus: 'al_dia',
    zoning: 'Frutícola',
    restrictions: [],
    distanceToCity: 6,
    nearbyCities: ['San Pedro', 'Ramallo', 'Arrecifes'],
    coordinates: {
      lat: -33.6833,
      lng: -59.6833
    }
  },
  {
    id: 'estate-11',
    name: 'Campo El Paraíso',
    location: 'San Javier, Santa Fe',
    province: 'Santa Fe',
    price: 380000000,
    surface: 210,
    surfaceUnit: 'hectareas',
    description: 'Campo forestal con 150 hectáreas de eucaliptos en crecimiento. Potencial maderero y agropecuario. Acceso a río San Javier.',
    seller: {
      name: 'Forestales del Litoral',
      phone: '+54 3492 345-6789',
      email: 'info@forestaleslitoral.com',
      rating: 4.7
    },
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400',
      'https://images.unsplash.com/photo-1540202404-1b6271a6d4b5?w=400',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-01-25',
    estateType: 'campo',
    hasWater: true,
    hasElectricity: false,
    hasRoadAccess: true,
    soilType: 'Arcilloso',
    topography: 'ondulado',
    vegetation: 'Bosque implantado',
    fencing: true,
    facilities: ['Almacén', 'Vivero', 'Casa de guarda'],
    livestockCapacity: 80,
    cropTypes: ['Eucaliptus', 'Pino'],
    irrigationSystem: 'ninguno',
    certifiedOrganic: false,
    deedType: 'escritura',
    taxStatus: 'al_dia',
    zoning: 'Forestal',
    restrictions: ['Plan de manejo forestal obligatorio'],
    distanceToCity: 25,
    nearbyCities: ['San Javier', 'Reconquista', 'Esperanza'],
    coordinates: {
      lat: -29.8167,
      lng: -59.8167
    }
  },
  {
    id: 'estate-12',
    name: 'Estancia La Pampa',
    location: 'General Pico, La Pampa',
    province: 'La Pampa',
    price: 650000000,
    surface: 800,
    surfaceUnit: 'hectareas',
    description: 'Estancia pampeana tradicional para cría extensiva. Excelentes pasturas naturales y alambrados perimetrales. Casa histórica de estilo colonial.',
    seller: {
      name: 'Estancias Pampeanas',
      phone: '+54 2302 456-7890',
      email: 'ventas@estanciaspampeanas.com',
      rating: 4.9
    },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400'
    ],
    videos: [],
    available: true,
    listedDate: '2024-02-15',
    estateType: 'estancia',
    hasWater: true,
    hasElectricity: false,
    hasRoadAccess: true,
    soilType: 'Limoso',
    topography: 'plano',
    vegetation: 'Pastizal natural',
    fencing: true,
    facilities: ['Casa histórica', 'Galpón 600m²', 'Corrales', 'Tanque australiano'],
    livestockCapacity: 800,
    cropTypes: [],
    irrigationSystem: 'ninguno',
    certifiedOrganic: false,
    deedType: 'escritura',
    taxStatus: 'al_dia',
    zoning: 'Ganadero extensivo',
    restrictions: [],
    distanceToCity: 45,
    nearbyCities: ['General Pico', 'Santa Rosa', 'Quemú Quemú'],
    coordinates: {
      lat: -35.6667,
      lng: -63.7500
    }
  }
];

// Combinar todas las fincas para mayor variedad
export const allEstates = [...mockEstates, ...additionalEstates];
