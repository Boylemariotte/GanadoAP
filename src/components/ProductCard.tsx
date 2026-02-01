import React from 'react';
import { Livestock } from '../types/livestock';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  livestock: Livestock;
}

const ProductCard: React.FC<ProductCardProps> = ({ livestock }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${livestock.id}`);
  };

  const getPurposeLabel = (purpose: string) => {
    switch (purpose) {
      case 'leche': return '🥛 Leche';
      case 'carne': return '🥩 Carne';
      case 'doble_proposito': return '⚖️ Doble Propósito';
      default: return '🐄 Ganado';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'mg-badge-success';
      case 'good': return 'mg-badge-info';
      case 'fair': return 'mg-badge-warning';
      default: return 'mg-badge-glass';
    }
  };

  return (
    <div onClick={handleClick} className="mg-card mg-group">
      {/* Product Image */}
      <div className="mg-card-image-wrap">
        <img
          src={livestock.images[0]}
          alt={livestock.name}
          className="mg-card-image"
        />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
          <div className="mg-badge mg-badge-glass">
            {getPurposeLabel(livestock.purpose)}
          </div>
          {livestock.isLot && (
            <div className="mg-badge" style={{ background: 'var(--mg-secondary)', color: 'white', border: '1px solid var(--mg-secondary)' }}>
              📦 LOTE
            </div>
          )}
        </div>
        <div className={`mg-badge ${getHealthStatusColor(livestock.healthStatus)}`} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          {livestock.healthStatus === 'excellent' ? 'Excelente' :
            livestock.healthStatus === 'good' ? 'Bueno' : 'Regular'}
        </div>
      </div>

      {/* Product Info */}
      <div className="mg-card-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>{livestock.name}</h3>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
            {livestock.breed}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <div className="mg-price-tag" style={{ color: livestock.isLot ? 'var(--mg-secondary)' : 'var(--mg-primary)' }}>
              <span style={{ fontSize: '1rem', alignSelf: 'flex-start', marginTop: '0.3rem', marginRight: '0.1rem' }}>$</span>
              {livestock.price.toLocaleString('es-AR')}
            </div>
            {livestock.isLot && (
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginTop: '0.2rem' }}>
                ${(livestock.price / livestock.lotSize).toLocaleString('es-AR')} c/u
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {livestock.milkYield && (
                <span className="mg-badge" style={{ fontSize: '0.75rem', background: 'var(--mg-accent)', color: 'var(--mg-primary)' }}>{livestock.milkYield}L/día</span>
              )}
              <span className="mg-badge" style={{ fontSize: '0.75rem', background: '#fef3c7', color: '#92400e' }}>{livestock.births} partos</span>
            </div>
            {livestock.isLot && (
              <span className="mg-badge" style={{ fontSize: '0.75rem', background: 'var(--mg-accent)', color: 'var(--mg-secondary)', fontWeight: 800 }}>
                x{livestock.lotSize} Animales
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            <strong>Peso Prom:</strong> {livestock.weight}kg
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            <strong>Prom. Edad:</strong> {livestock.age} años
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem', fontWeight: 500 }}>
          <span style={{ marginRight: '0.5rem' }}>📍</span>
          {livestock.location}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#fffbeb', padding: '0.25rem 0.75rem', borderRadius: '50px', border: '1px solid #fef3c7' }}>
            <span style={{ marginRight: '0.35rem' }}>⭐</span>
            <span style={{ fontWeight: 800, color: '#92400e', fontSize: '0.85rem' }}>{livestock.seller.rating}</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>{livestock.seller.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
