import { Livestock } from '../types/livestock';

export const mockLivestock: Livestock[] = [
  {
    id: '1',
    name: 'Milky Way',
    breed: 'Holstein Puro',
    age: 4,
    weight: 680,
    price: 3200,
    location: 'Antioquia, Colombia',
    seller: {
      name: 'Hacienda La Aurora',
      phone: '+57 300 123-4567',
      email: 'aurora@ganaderia.com',
      rating: 4.9
    },
    images: [
      'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580974928017-4b89d06b40d0?w=800&h=600&fit=crop'
    ],
    videos: [],
    description: 'Excelente productora de leche, con genética superior. Ideal para expansión de hato lechero.',
    purpose: 'leche',
    healthStatus: 'excellent',
    vaccinations: ['Fiebre Aftosa', 'Brucelosis', 'Rabia'],
    available: true,
    listedDate: '2024-01-20',
    births: 2,
    milkYield: 28,
    gestationTime: 9,
    offspring: { sex: 'hembra', quantity: 1 },
    isLot: false,
    lotSize: 1
  },
  {
    id: 'lote-10-holstein',
    name: 'Lote de 10 Novillas Holstein',
    breed: 'Holstein',
    age: 2,
    weight: 450,
    price: 25000,
    location: 'Cundinamarca, Colombia',
    seller: {
      name: 'Criadero Vía Láctea',
      phone: '+57 311 555-6677',
      email: 'vialactea@agro.com',
      rating: 4.8
    },
    images: [
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1527153374720-3023933c9422?w=800&h=600&fit=crop'
    ],
    videos: [],
    description: 'Lote de 10 novillas de alta genética, todas con primer parto próximo. Sanidad garantizada.',
    purpose: 'leche',
    healthStatus: 'excellent',
    vaccinations: ['Fiebre Aftosa', 'Brucelosis', 'Triple Viral'],
    available: true,
    listedDate: '2024-01-28',
    births: 0,
    milkYield: 22,
    gestationTime: 7,
    offspring: { sex: 'hembra', quantity: 0 },
    isLot: true,
    lotSize: 10
  },
  {
    id: '2',
    name: 'Bronco Fuerte',
    breed: 'Brahman Rojo',
    age: 3,
    weight: 850,
    price: 4500,
    location: 'Córdoba, Colombia',
    seller: {
      name: 'Ganadería El Triunfo',
      phone: '+57 310 987-6543',
      email: 'triunfo@campo.com',
      rating: 4.7
    },
    images: [
      'https://images.unsplash.com/photo-1570042225831-d98fa93464b4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554313150-13f6396c0032?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545468843-95bd30461591?w=800&h=600&fit=crop'
    ],
    videos: [],
    description: 'Toro de alta genética para producción de carne. Excelente ganancia diaria de peso.',
    purpose: 'carne',
    healthStatus: 'excellent',
    vaccinations: ['Fiebre Aftosa', 'Septicemia Hemorrágica'],
    available: true,
    listedDate: '2024-01-25',
    births: 0,
    gestationTime: 0,
    offspring: { sex: 'macho', quantity: 0 },
    isLot: false,
    lotSize: 1
  },
  {
    id: '3',
    name: 'Reina Suiza',
    breed: 'Pardo Suizo',
    age: 5,
    weight: 720,
    price: 3800,
    location: 'Boyacá, Colombia',
    seller: {
      name: 'Finca El Paraíso',
      phone: '+57 320 456-7890',
      email: 'paraiso@agro.com',
      rating: 4.8
    },
    images: [
      'https://images.unsplash.com/photo-1589923188900-859e1bcad17e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590417825852-3e0b6443ea2e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&h=600&fit=crop'
    ],
    videos: [],
    description: 'Vaca doble propósito con excelente rinde en carne y leche. Muy rústica y adaptable.',
    purpose: 'doble_proposito',
    healthStatus: 'good',
    vaccinations: ['Fiebre Aftosa', 'Carbón Sintomático'],
    available: true,
    listedDate: '2024-01-22',
    births: 3,
    milkYield: 18,
    gestationTime: 9,
    offspring: { sex: 'macho', quantity: 1 },
    isLot: false,
    lotSize: 1
  },
  {
    id: 'lote-15-brahman',
    name: 'Lote 15 Terneros Brahman',
    breed: 'Brahman Blanco',
    age: 1,
    weight: 220,
    price: 18000,
    location: 'Meta, Colombia',
    seller: {
      name: 'Corral Llanero',
      phone: '+57 312 888-9900',
      email: 'corral@llano.com',
      rating: 4.6
    },
    images: [
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1527153374720-3023933c9422?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554313150-13f6396c0032?w=800&h=600&fit=crop'
    ],
    videos: [],
    description: 'Lote parejo de 15 terneros para inicio de engorde. Vacunados y desparasitados.',
    purpose: 'carne',
    healthStatus: 'good',
    vaccinations: ['Fiebre Aftosa', 'IBR-DVB'],
    available: true,
    listedDate: '2024-01-26',
    births: 0,
    gestationTime: 0,
    offspring: { sex: 'macho', quantity: 0 },
    isLot: true,
    lotSize: 15
  },
  {
    id: 'lote-20-mixto',
    name: 'Lote 20 Novillas Doble Propósito',
    breed: 'Cruce F1 (Jersey x Cebú)',
    age: 2,
    weight: 380,
    price: 42000,
    location: 'Huila, Colombia',
    seller: {
      name: 'Hacienda El Recreo',
      phone: '+57 315 111-2222',
      email: 'recreo@campo.com',
      rating: 4.7
    },
    images: [
      'https://images.unsplash.com/photo-1570042225831-d98fa93464b4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=600&fit=crop'
    ],
    videos: [],
    description: 'Lote de 20 novillas F1, ideales para trópico bajo. Excelente rusticidad y potencial lechero.',
    purpose: 'doble_proposito',
    healthStatus: 'excellent',
    vaccinations: ['Fiebre Aftosa', 'Brucelosis', 'Rabia'],
    available: true,
    listedDate: '2024-01-24',
    births: 0,
    milkYield: 12,
    gestationTime: 5,
    offspring: { sex: 'hembra', quantity: 0 },
    isLot: true,
    lotSize: 20
  }
];
