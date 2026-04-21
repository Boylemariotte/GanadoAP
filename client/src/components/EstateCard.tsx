import React from 'react';
import { Estate } from '../types/estate';
import { MapPin, Home, TreePine, Droplets, Zap, Car, Star, Heart } from 'lucide-react';

interface EstateCardProps {
  estate: Estate;
  onClick?: () => void;
}

const EstateCard: React.FC<EstateCardProps> = ({ estate, onClick }) => {
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
      case 'estancia':
        return <Home size={16} />;
      case 'campo':
        return <TreePine size={16} />;
      case 'finca':
        return <Droplets size={16} />;
      case 'chacra':
        return <TreePine size={16} />;
      case 'potrero':
        return <Home size={16} />;
      default:
        return <Home size={16} />;
    }
  };

  const getEstateTypeLabel = (type: string) => {
    switch (type) {
      case 'estancia':
        return 'Estancia';
      case 'campo':
        return 'Campo';
      case 'finca':
        return 'Finca';
      case 'chacra':
        return 'Chacra';
      case 'potrero':
        return 'Potrero';
      default:
        return 'Propiedad Rural';
    }
  };

  return (
    <div 
      className="mg-card"
      style={{ 
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        backgroundColor: '#FAFAFA',
        border: '1px solid #E0E0E0',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={estate.images[0]}
          alt={estate.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1580434659871-4c9b054d6dc7?w=400';
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
        
        {/* Estate Type Badge */}
        <div 
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#2E5E3E',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
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
              top: '12px',
              right: '12px',
              backgroundColor: '#4C8C5A',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            Disponible
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Title and Location */}
        <div style={{ marginBottom: '12px' }}>
          <h3 
            style={{ 
              fontSize: '1.125rem', 
              fontWeight: 700, 
              color: '#1e293b',
              marginBottom: '8px',
              lineHeight: '1.3'
            }}
          >
            {estate.name}
          </h3>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              color: '#64748b',
              fontSize: '0.875rem'
            }}
          >
            <MapPin size={14} />
            {estate.location}
          </div>
        </div>

        {/* Key Features */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            fontSize: '0.8rem',
            color: '#475569'
          }}>
            <Home size={14} />
            {formatSurface(estate.surface, estate.surfaceUnit)}
          </div>
          
          {estate.hasWater && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              fontSize: '0.8rem',
              color: '#475569'
            }}>
              <Droplets size={14} />
              Agua
            </div>
          )}
          
          {estate.hasElectricity && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              fontSize: '0.8rem',
              color: '#475569'
            }}>
              <Zap size={14} />
              Luz
            </div>
          )}
          
          {estate.hasRoadAccess && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              fontSize: '0.8rem',
              color: '#475569'
            }}>
              <Car size={14} />
              Acceso
            </div>
          )}
        </div>

        {/* Description */}
        <p 
          style={{ 
            fontSize: '0.875rem', 
            color: '#64748b',
            lineHeight: '1.5',
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {estate.description}
        </p>

        {/* Price and Seller */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end',
          marginBottom: '12px'
        }}>
          <div>
            <div 
              style={{ 
                fontSize: '1.5rem', 
                fontWeight: 800, 
                color: '#C0392B',
                lineHeight: '1'
              }}
            >
              {formatPrice(estate.price)}
            </div>
            <div 
              style={{ 
                fontSize: '0.75rem', 
                color: '#64748b',
                marginTop: '2px'
              }}
            >
              {formatSurface(estate.surface, estate.surfaceUnit)}
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              fontSize: '0.8rem',
              color: '#92400e',
              fontWeight: 600
            }}>
              <Star size={14} />
              {estate.seller.rating}
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#64748b',
              marginTop: '2px'
            }}>
              {estate.seller.name.split(' ')[0]}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '8px',
          paddingTop: '12px',
          borderTop: '1px solid #E0E0E0'
        }}>
          <button
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: '#2E5E3E',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#234a32';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2E5E3E';
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle contact action
            }}
          >
            Contactar
          </button>
          
          <button
            style={{
              padding: '10px',
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.color = '#C0392B';
              e.currentTarget.style.borderColor = '#C0392B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#64748b';
              e.currentTarget.style.borderColor = '#E0E0E0';
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle save action
            }}
          >
            <Heart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstateCard;
