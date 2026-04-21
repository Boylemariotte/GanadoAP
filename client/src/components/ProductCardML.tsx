import React from 'react';
import { Livestock } from '../types/livestock';
import { useNavigate } from 'react-router-dom';

interface ProductCardMLProps {
  livestock: Livestock;
}

const ProductCardML: React.FC<ProductCardMLProps> = ({ livestock }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${livestock.id}`);
  };

  const getPurposeLabel = (purpose: string) => {
    switch (purpose) {
      case 'leche': return 'Leche';
      case 'carne': return 'Carne';
      case 'doble_proposito': return 'Doble Propósito';
      default: return 'Ganado';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return '#C9A24A';
      case 'good': return '#4C8C5A';
      case 'fair': return '#A93226';
      default: return '#64748b';
    }
  };

  const getHealthStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bueno';
      case 'fair': return 'Regular';
      default: return 'Normal';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: '#FAFAFA',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.borderColor = '#4C8C5A';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#E0E0E0';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Product Image */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '200px',
        backgroundColor: '#f9fafb',
        overflow: 'hidden'
      }}>
        {livestock.images && livestock.images.length > 0 ? (
          <img
            src={livestock.images[0]}
            alt={livestock.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: '#9ca3af'
          }}>
            ???
          </div>
        )}
        
        {/* Badges */}
        <div style={{ 
          position: 'absolute', 
          top: '8px', 
          left: '8px', 
          display: 'flex', 
          gap: '4px',
          flexWrap: 'wrap'
        }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: '600',
            color: '#374151',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}>
            {getPurposeLabel(livestock.purpose)}
          </span>
          {livestock.isLot && (
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: '#A93226',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase'
            }}>
              Lote x{livestock.lotSize}
            </div>
          )}
        </div>

        {/* Health Status */}
        <div style={{ 
          position: 'absolute', 
          top: '8px', 
          right: '8px' 
        }}>
          <span style={{
            background: getHealthStatusColor(livestock.healthStatus),
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: '600'
          }}>
            {getHealthStatusText(livestock.healthStatus)}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <h3 style={{
          fontSize: '0.9rem',
          fontWeight: '600',
          color: '#111827',
          margin: '0 0 8px 0',
          lineHeight: '1.3',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: '2.6em'
        }}>
          {livestock.name}
        </h3>

        {/* Price */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#C0392B'
          }}>
            {formatPrice(livestock.price)}
          </span>
          {livestock.isLot && (
            <span style={{
              fontSize: '0.75rem',
              color: '#64748b',
              fontWeight: '500',
              marginLeft: '4px'
            }}>
              c/u
            </span>
          )}
        </div>

        {/* Key Details */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '8px',
          flexWrap: 'wrap'
        }}>
          <span style={{
            background: '#f3f4f6',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            color: '#374151',
            fontWeight: '500'
          }}>
            {livestock.breed}
          </span>
          <span style={{
            background: '#f3f4f6',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            color: '#374151',
            fontWeight: '500'
          }}>
            {livestock.age} años
          </span>
          <span style={{
            background: '#f3f4f6',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            color: '#374151',
            fontWeight: '500'
          }}>
            {livestock.weight}kg
          </span>
        </div>

        {/* Additional Info */}
        {livestock.milkYield && (
          <div style={{ marginBottom: '8px' }}>
            <span style={{
              background: '#dbeafe',
              color: '#1e40af',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: '600'
            }}>
              {livestock.milkYield}L/día
            </span>
          </div>
        )}

        {/* Location */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: '#6b7280',
          marginTop: 'auto'
        }}>
          <span style={{ marginRight: '4px' }}>???</span>
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {livestock.location}
          </span>
        </div>

        {/* Seller */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid #f3f4f6'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{
              background: '#fef3c7',
              color: '#92400e',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: '600'
            }}>
              ? {livestock.seller.rating}
            </span>
          </div>
          <span style={{
            fontSize: '0.7rem',
            color: '#6b7280',
            fontWeight: '500',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '120px'
          }}>
            {livestock.seller.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardML;
