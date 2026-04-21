import React, { useRef } from 'react';
import { Livestock } from '../types/livestock';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  livestock: Livestock;
}

const ProductCard: React.FC<ProductCardProps> = ({ livestock }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    navigate(`/product/${livestock.id}`);
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Autoplay might be blocked by browser policy if unmuted or other reasons
        console.log('Video play failed:', error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to start
    }
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

  const hasVideo = livestock.videos && livestock.videos.length > 0;
  const hasImage = livestock.images && livestock.images.length > 0;

  return (
    <div
      onClick={handleClick}
      className="mg-card mg-group"
    >
      {/* Product Media */}
      <div
        className="mg-card-image-wrap"
        onMouseEnter={hasVideo ? handleMouseEnter : undefined}
        onMouseLeave={hasVideo ? handleMouseLeave : undefined}
      >
        {hasVideo ? (
          <video
            ref={videoRef}
            src={livestock.videos[0]}
            poster={hasImage ? livestock.images[0] : undefined}
            className="mg-card-image"
            muted
            loop
            playsInline
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <img
            src={hasImage ? livestock.images[0] : '/placeholder-image.png'}
            alt={livestock.name}
            className="mg-card-image"
            onError={(e) => {
              e.currentTarget.style.display = 'none'; // Hide if broken
            }}
          />
        )}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap', maxWidth: 'calc(100% - 4rem)' }}>
          <div className="mg-badge mg-badge-glass" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
            <span className="mg-mobile-hidden">{getPurposeLabel(livestock.purpose)}</span>
            <span className="mg-desktop-hidden">{getPurposeLabel(livestock.purpose).split(' ')[0]}</span>
          </div>
          {livestock.isLot && (
            <div className="mg-badge" style={{ background: 'var(--mg-secondary)', color: 'white', border: '1px solid var(--mg-secondary)', fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
              LOTE
            </div>
          )}
        </div>
        <div className={`mg-badge ${getHealthStatusColor(livestock.healthStatus)}`} style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
          <span className="mg-mobile-hidden">{livestock.healthStatus === 'excellent' ? 'Excelente' :
            livestock.healthStatus === 'good' ? 'Bueno' : 'Regular'}</span>
          <span className="mg-desktop-hidden">{livestock.healthStatus === 'excellent' ? 'Excel' :
            livestock.healthStatus === 'good' ? 'Bueno' : 'Reg'}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="mg-card-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', flex: 1, minWidth: '120px' }}>{livestock.name}</h3>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
            {livestock.breed}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div className="mg-price-tag" style={{ color: livestock.isLot ? 'var(--mg-secondary)' : 'var(--mg-primary)', fontSize: '1.4rem' }}>
              <span style={{ fontSize: '0.9rem', alignSelf: 'flex-start', marginTop: '0.2rem', marginRight: '0.1rem' }}>$</span>
              {livestock.price.toLocaleString('es-AR')}
            </div>
            {livestock.isLot && (
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', marginTop: '0.1rem' }}>
                ${(livestock.price / livestock.lotSize).toLocaleString('es-AR')} c/u
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {livestock.milkYield && (
                <span className="mg-badge" style={{ fontSize: '0.65rem', background: 'var(--mg-accent)', color: 'var(--mg-primary)', padding: '0.15rem 0.4rem' }}>{livestock.milkYield}L/d</span>
              )}
              <span className="mg-badge" style={{ fontSize: '0.65rem', background: '#fef3c7', color: '#92400e', padding: '0.15rem 0.4rem' }}>{livestock.births} p</span>
            </div>
            {livestock.isLot && (
              <span className="mg-badge" style={{ fontSize: '0.65rem', background: 'var(--mg-accent)', color: 'var(--mg-secondary)', fontWeight: 800, padding: '0.15rem 0.4rem' }}>
                x{livestock.lotSize}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            <strong>Peso:</strong> {livestock.weight}kg
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            <strong>Edad:</strong> {livestock.age}a
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: 500 }}>
          <span style={{ marginRight: '0.3rem' }}>???</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{livestock.location}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#fffbeb', padding: '0.2rem 0.6rem', borderRadius: '50px', border: '1px solid #fef3c7' }}>
            <span style={{ marginRight: '0.25rem' }}>??? </span>
            <span style={{ fontWeight: 800, color: '#92400e', fontSize: '0.8rem' }}>{livestock.seller.rating}</span>
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '150px' }}>{livestock.seller.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
