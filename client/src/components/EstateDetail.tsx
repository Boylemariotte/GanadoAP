import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Estate } from '../types/estate';
import { allEstates } from '../data/mockData';
import SearchBar from './SearchBar';
import NavBarLinks from './NavBarLinks';
import DropdownMenu from './DropdownMenu';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Home, 
  TreePine, 
  Droplets, 
  Zap, 
  Car, 
  Star, 
  Heart, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  CheckCircle, 
  XCircle,
  Share2,
  Bookmark,
  MessageCircle,
  Landmark,
  Wheat,
  Trees,
  Building,
  Shield,
  Ruler,
  Compass,
  DollarSign,
  User,
  Clock,
  Edit
} from 'lucide-react';

const EstateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isOwner } = useAuth();
  const [estate, setEstate] = useState<Estate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const foundEstate = allEstates.find(e => e.id === id);
    if (foundEstate) {
      setEstate(foundEstate);
      setLoading(false);
    } else {
      setError('Finca no encontrada');
      setLoading(false);
    }
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSurface = (surface: number, unit: string) => {
    if (unit === 'hectareas') {
      return `${surface} ha`;
    }
    return `${surface.toLocaleString('es-AR')} m²`;
  };

  const getEstateTypeIcon = (type: string) => {
    switch (type) {
      case 'estancia': return <Home size={20} />;
      case 'campo': return <TreePine size={20} />;
      case 'finca': return <Droplets size={20} />;
      case 'chacra': return <Wheat size={20} />;
      case 'potrero': return <Landmark size={20} />;
      default: return <Home size={20} />;
    }
  };

  const getEstateTypeLabel = (type: string) => {
    switch (type) {
      case 'estancia': return 'Estancia';
      case 'campo': return 'Campo';
      case 'finca': return 'Finca';
      case 'chacra': return 'Chacra';
      case 'potrero': return 'Potrero';
      default: return 'Propiedad Rural';
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#F4F1EC', minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <div style={{ fontSize: '1.25rem', color: '#64748b' }}>Cargando información de la finca...</div>
        </div>
      </div>
    );
  }

  if (error || !estate) {
    return (
      <div style={{ backgroundColor: '#F4F1EC', minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <div style={{ fontSize: '1.25rem', color: '#dc2626' }}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F4F1EC', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: '#2E5E3E', 
        borderBottom: '1px solid #1a3a2a',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          height: '72px'
        }}>
          {/* Logo y Búsqueda - Izquierda */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <img
                src="/logo.png"
                alt="GANADERIA AP"
                style={{ 
                  height: '44px', 
                  width: '44px', 
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '2px solid #fff',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onClick={() => navigate('/')}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
              <div className="mg-desktop-hidden">
                <h1 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#FFFFFF',
                  margin: 0
                }}>
                  GANADERIA AP
                </h1>
              </div>
            </div>

            {/* Search Bar */}
            <div style={{ flex: 1, maxWidth: '450px', minWidth: '180px' }}>
              <SearchBar 
                onSearch={() => {}}
                placeholder="Buscar propiedades..."
              />
            </div>
          </div>

          {/* Navigation Links - Centro */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <NavBarLinks />
          </div>

          {/* Right Section - Derecha */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <DropdownMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 16px' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Inicio
          </button>
          <span style={{ color: '#64748b' }}>&gt;</span>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Fincas
          </button>
          <span style={{ color: '#64748b' }}>&gt;</span>
          <span style={{ color: '#2E5E3E', fontSize: '0.875rem', fontWeight: 500 }}>
            {estate.name}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
          {/* Left Column - Images and Info */}
          <div>
            {/* Images Gallery */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '24px',
              border: '1px solid #E0E0E0'
            }}>
              <div style={{ position: 'relative', height: '500px' }}>
                <img
                  src={estate.images[currentImageIndex]}
                  alt={`${estate.name} - Imagen ${currentImageIndex + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1580434659871-4c9b054d6dc7?w=800';
                  }}
                />
                
                {/* Image Navigation */}
                {estate.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => prev === 0 ? estate.images.length - 1 : prev - 1)}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {'<'}
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % estate.images.length)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {'>'}
                    </button>
                  </>
                )}

                {/* Estate Type Badge */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: '#2E5E3E',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {getEstateTypeIcon(estate.estateType)}
                  {getEstateTypeLabel(estate.estateType)}
                </div>

                {/* Available Badge */}
                {estate.available && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      backgroundColor: '#4C8C5A',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    Disponible
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {estate.images.length > 1 && (
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  padding: '16px',
                  overflowX: 'auto'
                }}>
                  {estate.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: currentImageIndex === index ? '3px solid #2E5E3E' : '2px solid #E0E0E0',
                        opacity: currentImageIndex === index ? 1 : 0.7
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1580434659871-4c9b054d6dc7?w=160';
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid #E0E0E0'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
                Descripción
              </h2>
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: '1.6', 
                color: '#475569',
                marginBottom: '16px'
              }}>
                {estate.description}
              </p>
            </div>

            {/* Technical Information */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #E0E0E0'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>
                Ficha Técnica
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Ruler size={18} style={{ color: '#2E5E3E' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Superficie</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {formatSurface(estate.surface, estate.surfaceUnit)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} style={{ color: '#2E5E3E' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Ubicación</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {estate.location}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Compass size={18} style={{ color: '#2E5E3E' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Suelo</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {estate.soilType}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Landmark size={18} style={{ color: '#2E5E3E' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Topografía</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {estate.topography}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Droplets size={18} style={{ color: '#2E5E3E' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Agua</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {estate.hasWater ? 'Disponible' : 'No disponible'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} style={{ color: '#2E5E3E' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Electricidad</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {estate.hasElectricity ? 'Disponible' : 'No disponible'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Car size={18} style={{ color: '#2E5E3E' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Acceso</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {estate.hasRoadAccess ? 'Carretero' : 'No carretero'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={18} style={{ color: '#2E5E3E' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Alambrado</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {estate.fencing ? 'Perimetral' : 'Sin alambrar'}
                    </div>
                  </div>
                </div>

                {estate.livestockCapacity && estate.livestockCapacity > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Home size={18} style={{ color: '#2E5E3E' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Capacidad Ganado</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                        {estate.livestockCapacity} cabezas
                      </div>
                    </div>
                  </div>
                )}

                {estate.cropTypes && estate.cropTypes.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Wheat size={18} style={{ color: '#2E5E3E' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Cultivos</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                        {estate.cropTypes.join(', ')}
                      </div>
                    </div>
                  </div>
                )}

                {estate.irrigationSystem !== 'ninguno' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Droplets size={18} style={{ color: '#2E5E3E' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Riego</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                        {estate.irrigationSystem}
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} style={{ color: '#2E5E3E' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Escritura</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {estate.deedType === 'escritura' ? 'Escriturada' : 'Posesoria'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} style={{ color: '#2E5E3E' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Impuestos</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {estate.taxStatus === 'al_dia' ? 'Al día' : 'Pendiente'}
                    </div>
                  </div>
                </div>

                {estate.certifiedOrganic && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={18} style={{ color: '#4C8C5A' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Certificación</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                        Orgánica
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Facilities */}
              {estate.facilities.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1e293b', marginBottom: '12px' }}>
                    Instalaciones
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px'
                  }}>
                    {estate.facilities.map((facility, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: '#F8FAFC',
                          padding: '6px 12px',
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          color: '#2E5E3E',
                          border: '1px solid #E0E0E0'
                        }}
                      >
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Price and Actions */}
          <div>
            {/* Price Card */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid #E0E0E0'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#C0392B', marginBottom: '8px' }}>
                  {formatPrice(estate.price)}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  {formatSurface(estate.surface, estate.surfaceUnit)}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#92400e', marginTop: '4px' }}>
                  ~{formatPrice(Math.round(estate.price / estate.surface))} por hectárea
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  style={{
                    padding: '14px 20px',
                    backgroundColor: '#2E5E3E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#234a32';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2E5E3E';
                  }}
                >
                  <Phone size={18} />
                  Contactar Vendedor
                </button>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      backgroundColor: isSaved ? '#4C8C5A' : 'transparent',
                      color: isSaved ? 'white' : '#64748b',
                      border: '1px solid #E0E0E0',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Heart size={16} fill={isSaved ? 'white' : 'none'} />
                    {isSaved ? 'Guardado' : 'Guardar'}
                  </button>

                  <button
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'transparent',
                      color: '#64748b',
                      border: '1px solid #E0E0E0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid #E0E0E0'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                Información del Vendedor
              </h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>
                  {estate.seller.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                  <Star size={14} style={{ color: '#92400e' }} />
                  <span style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: 600 }}>
                    {estate.seller.rating}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    (23 ventas)
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  style={{
                    padding: '10px 16px',
                    backgroundColor: 'transparent',
                    color: '#2E5E3E',
                    border: '1px solid #2E5E3E',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2E5E3E';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#2E5E3E';
                  }}
                >
                  <Phone size={16} />
                  {estate.seller.phone}
                </button>

                <button
                  style={{
                    padding: '10px 16px',
                    backgroundColor: 'transparent',
                    color: '#2E5E3E',
                    border: '1px solid #2E5E3E',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2E5E3E';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#2E5E3E';
                  }}
                >
                  <Mail size={16} />
                  Enviar mensaje
                </button>

                {isOwner() && (
                  <button
                    onClick={() => navigate('/admin')}
                    style={{
                      padding: '10px 16px',
                      backgroundColor: '#2E5E3E',
                      color: 'white',
                      border: '1px solid #2E5E3E',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#234a32';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2E5E3E';
                    }}
                  >
                    <Edit size={16} />
                    Editar propiedad
                  </button>
                )}
              </div>
            </div>

            {/* Location Information */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #E0E0E0'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                Ubicación
              </h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <MapPin size={16} style={{ color: '#2E5E3E' }} />
                  <span style={{ fontSize: '0.875rem', color: '#1e293b', fontWeight: 500 }}>
                    {estate.location}, {estate.province}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '12px' }}>
                  A {estate.distanceToCity} km de la ciudad más cercana
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Ciudades cercanas: {estate.nearbyCities.join(', ')}
                </div>
              </div>

              {/* Map Placeholder */}
              <div style={{ 
                height: '200px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #E0E0E0',
                color: '#64748b',
                fontSize: '0.875rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <MapPin size={32} style={{ marginBottom: '8px' }} />
                  <div>Mapa no disponible</div>
                  <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                    {estate.coordinates?.lat.toFixed(4)}, {estate.coordinates?.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EstateDetail;
