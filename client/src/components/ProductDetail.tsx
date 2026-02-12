import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { mockLivestock } from '../data/mockData'; // Removed
import { getLivestockById } from '../services/api'; // Import API service
import { Livestock } from '../types/livestock';
import MediaGallery from './MediaGallery';
import DropdownMenu from './DropdownMenu';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productVideos, setProductVideos] = useState<string[]>([]);

  const [livestock, setLivestock] = useState<Livestock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getLivestockById(id);
        setLivestock(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        // navigate('/'); // Optional: redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Removed navigate dependency to avoid loops

  useEffect(() => {
    if (livestock) {
      setProductImages(livestock.images || []);
      setProductVideos(livestock.videos || []);
    }
  }, [livestock]);

  if (loading) {
    return <div className="mg-app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>;
  }

  if (!livestock) {
    return (
      <div className="mg-app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="mg-title">Producto no encontrado</h2>
          <button onClick={() => navigate('/')} className="mg-btn mg-btn-primary">
            Volver al Marketplace
          </button>
        </div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Mira este excelente ejemplar: ${livestock.name} (${livestock.breed}) en Mercado Ganadero.`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'instagram':
      case 'tiktok':
        navigator.clipboard.writeText(url);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
        // Direct share to these is not possible via web, so copying is the best alternative
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
        break;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cattle': return '🐄';
      case 'goats': return '🐐';
      case 'sheep': return '🐑';
      case 'pigs': return '🐷';
      case 'horses': return '🐴';
      default: return '🐄';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'cattle': return 'Ganado';
      case 'goats': return 'Cabras';
      case 'sheep': return 'Ovejas';
      case 'pigs': return 'Cerdos';
      case 'horses': return 'Caballos';
      default: return 'Ganado';
    }
  };

  const getPurposeLabel = (purpose: string) => {
    switch (purpose) {
      case 'leche': return '🥛 Producción Lechera';
      case 'carne': return '🥩 Producción Cárnica';
      case 'doble_proposito': return '⚖️ Doble Propósito';
      default: return '🐄 Ganado Vacuno';
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

  const getHealthStatusLabel = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bueno';
      case 'fair': return 'Regular';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="mg-app">
      {/* Header */}
      <header className="mg-header">
        <div className="mg-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <DropdownMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Product Detail Content */}
      <main className="mg-container mg-section">
        <div className="mg-detail-grid">
          {/* Gallery Column */}
          <div className="mg-gallery-section">
            <MediaGallery
              images={productImages}
              videos={productVideos}
              productName={livestock.name}
              productId={livestock.id}
              onMediaUpdate={(newImages, newVideos) => {
                setProductImages(newImages);
                setProductVideos(newVideos);
                // Aquí podrías actualizar el producto en la base de datos
                console.log('Media updated:', { newImages, newVideos });
              }}
            />

            <div className="mg-card" style={{ marginTop: '2rem', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>📋 Ficha Técnica</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Raza</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>{livestock.breed}</div>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Partos</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>{livestock.births}</div>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Peso</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>{livestock.weight} Kg</div>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Litraje Diario</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>{livestock.milkYield ? `${livestock.milkYield} Litros` : 'N/A'}</div>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Tiempo Gestación</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>{livestock.gestationTime > 0 ? `${livestock.gestationTime} Meses` : 'No está gestando'}</div>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Última Cría</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>{livestock.offspring.quantity > 0 ? `${livestock.offspring.sex === 'hembra' ? '♀️ Hembra' : '♂️ Macho'}` : 'Sin cría'}</div>
                </div>
                {livestock.isLot && (
                  <div style={{ padding: '1rem', background: 'var(--mg-accent)', borderRadius: '12px', border: '2px solid var(--mg-secondary)', gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mg-secondary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Animales en Lote</div>
                    <div style={{ fontWeight: 800, color: 'var(--mg-primary)', fontSize: '1.25rem' }}>{livestock.lotSize} vacas</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className="mg-info-section">
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span className="mg-badge mg-badge-glass">
                  {getPurposeLabel(livestock.purpose)}
                </span>
                {livestock.isLot && (
                  <span className="mg-badge" style={{ background: 'var(--mg-secondary)', color: 'white', border: '1px solid var(--mg-secondary)' }}>
                    📦 Venta por Lote
                  </span>
                )}
                <span className="mg-badge mg-badge-glass">ID: {livestock.id}</span>
              </div>

              <h1 className="mg-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{livestock.name}</h1>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                  <div className="mg-price-tag" style={{ fontSize: '3rem', color: livestock.isLot ? 'var(--mg-secondary)' : 'var(--mg-primary)' }}>
                    <span style={{ fontSize: '1.5rem', marginRight: '0.2rem' }}>$</span>
                    {livestock.price.toLocaleString('es-AR')}
                    {livestock.isLot && <span style={{ fontSize: '1.25rem', marginLeft: '0.5rem', color: '#64748b', fontWeight: 600 }}>(Total)</span>}
                  </div>
                  {livestock.isLot && (
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569', marginTop: '0.5rem' }}>
                      Promedio unidad: <span style={{ color: 'var(--mg-secondary)' }}>${(livestock.price / livestock.lotSize).toLocaleString('es-AR')}</span>
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className={`mg-badge ${getHealthStatusColor(livestock.healthStatus)}`} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                    {getHealthStatusLabel(livestock.healthStatus)}
                  </div>
                  {livestock.isLot && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', fontWeight: 800, color: 'var(--mg-secondary)' }}>
                      Cantidad: {livestock.lotSize} animales
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Descripción</h3>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.8' }}>{livestock.description}</p>
            </div>

            {/* Vaccinations */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Plan de Vacunación</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {livestock.vaccinations.map((vaccine, index) => (
                  <span
                    key={index}
                    className="mg-badge"
                    style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' }}
                  >
                    💉 {vaccine}
                  </span>
                ))}
              </div>
            </div>

            {/* Location */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div className="mg-badge mg-badge-glass" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}>
                📍 {livestock.location}
              </div>
            </div>

            {/* Seller Action Card */}
            <div className="mg-card" style={{ padding: '2rem', background: '#f8fafc', borderStyle: 'dashed', borderWidth: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{livestock.seller.name}</h4>
                  <div style={{ color: '#92400e', fontWeight: 700, fontSize: '0.9rem' }}>⭐ {livestock.seller.rating} calificación</div>
                </div>
                <div className="mg-badge mg-badge-success">{livestock.available ? 'Disponible' : 'Vendido'}</div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="mg-btn mg-btn-primary" style={{ flex: 1, padding: '1rem' }}>
                  Contactar por WhatsApp
                </button>
                <button className="mg-btn mg-btn-secondary" style={{ padding: '1rem' }}>
                  ❤️ Guardar
                </button>
              </div>
            </div>

            {/* Share Section */}
            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', color: '#475569' }}>Compartir ejemplar</h3>
              <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                <div className={`mg-copy-tooltip ${showTooltip ? 'active' : ''}`}>¡Enlace copiado!</div>

                <button onClick={() => handleShare('whatsapp')} className="mg-share-btn mg-share-whatsapp" title="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </button>

                <button onClick={() => handleShare('facebook')} className="mg-share-btn mg-share-facebook" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.249h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </button>

                <button onClick={() => handleShare('instagram')} className="mg-share-btn mg-share-instagram" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </button>

                <button onClick={() => handleShare('tiktok')} className="mg-share-btn mg-share-tiktok" title="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.14 1.11.2 2.27 1.01 3.06.77.74 1.83 1.13 2.89 1.07 1.34-.02 2.61-.75 3.27-1.91.31-.54.46-1.16.48-1.79.02-3.86-.02-7.72.01-11.58z" /></svg>
                </button>

                <button onClick={() => handleShare('copy')} className="mg-share-btn" title="Copiar Enlace">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
