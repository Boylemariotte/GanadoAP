import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateLivestock } from '../services/livestockService';

interface MediaGalleryProps {
  images: string[];
  videos: string[];
  productName: string;
  productId: string;
  onMediaUpdate?: (images: string[], videos: string[]) => void;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  images,
  videos,
  productName,
  productId,
  onMediaUpdate
}) => {
  const { isOwner } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAddMedia, setShowAddMedia] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Combine images and videos into a single array with types
  const mediaItems = [
    ...images.map(url => ({ type: 'image', url })),
    ...videos.map(url => ({ type: 'video', url }))
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('media', file);
    });

    try {
      const updatedProduct = await updateLivestock(productId, formData);

      if (onMediaUpdate) {
        onMediaUpdate(updatedProduct.images, updatedProduct.videos);
      }

      setShowAddMedia(false);
      // Select the last added item
      const totalItems = (updatedProduct.images.length + updatedProduct.videos.length);
      if (totalItems > 0) {
        setSelectedIndex(totalItems - 1);
      }
      alert('¡Medios subidos correctamente!');
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Error al subir los archivos. Por favor intenta de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  // Si no hay medios, mostrar placeholder
  if (mediaItems.length === 0) {
    return (
      <div style={{
        height: '500px',
        border: '2px dashed var(--mg-border)',
        borderRadius: 'var(--mg-radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--mg-bg)'
      }}>
        {isOwner() ? (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setShowAddMedia(true)}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '3px solid var(--mg-secondary)',
                background: 'white',
                color: 'var(--mg-secondary)',
                fontSize: '2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--mg-secondary)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = 'var(--mg-secondary)';
              }}
            >
              +
            </button>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--mg-text)', marginBottom: '0.5rem' }}>
                Añadir Foto o Video
              </h3>
              <p style={{ color: 'var(--mg-text-muted)', fontSize: '0.9rem' }}>
                Click para subir medios del producto
              </p>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--mg-text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Sin fotos disponibles
            </h3>
            <p style={{ fontSize: '0.9rem' }}>
              El vendedor aún no ha añadido imágenes
            </p>
          </div>
        )}

        {/* Modal para añadir medios */}
        {showAddMedia && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="mg-card" style={{ padding: '2rem', maxWidth: '400px', width: '90%', position: 'relative', overflow: 'hidden' }}>
              {/* Pantalla de carga superpuesta */}
              {isUploading && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20,
                  gap: '1rem'
                }}>
                  <div className="mg-spinner" style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid var(--mg-border)',
                    borderTopColor: 'var(--mg-primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <style>{`
                    @keyframes spin { to { transform: rotate(360deg); } }
                  `}</style>
                  <div style={{ fontWeight: 800, color: 'var(--mg-primary)' }}>Subiendo a Cloudinary...</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--mg-text-muted)' }}>Esto puede tardar unos segundos</div>
                </div>
              )}

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--mg-text)' }}>
                Añadir Foto o Video
              </h3>

              <div style={{
                border: '2px dashed var(--mg-border)',
                borderRadius: 'var(--mg-radius-md)',
                padding: '2rem',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                <p style={{ color: 'var(--mg-text-muted)', marginBottom: '1rem' }}>
                  Selecciona archivos desde tu dispositivo
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="media-upload-input"
                  disabled={isUploading}
                />
                <label
                  htmlFor="media-upload-input"
                  className="mg-btn mg-btn-primary"
                  style={{ borderRadius: '50px', cursor: isUploading ? 'not-allowed' : 'pointer', margin: 0, opacity: isUploading ? 0.7 : 1 }}
                >
                  {isUploading ? 'Subiendo...' : 'Seleccionar Archivos'}
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowAddMedia(false)}
                  className="mg-btn mg-btn-secondary"
                  style={{ borderRadius: '50px' }}
                  disabled={isUploading}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentMedia = mediaItems[selectedIndex];

  return (
    <div>
      {/* Media Principal */}
      <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
        {currentMedia.type === 'image' ? (
          <img
            src={currentMedia.url}
            alt={`${productName} - ${selectedIndex + 1}`}
            style={{
              width: '100%',
              height: '500px',
              objectFit: 'contain',
              background: 'black',
              borderRadius: 'var(--mg-radius-lg)',
              border: '2px solid var(--mg-border)'
            }}
          />
        ) : (
          <video
            src={currentMedia.url}
            controls
            style={{
              width: '100%',
              height: '500px',
              objectFit: 'contain',
              background: 'black',
              borderRadius: 'var(--mg-radius-lg)',
              border: '2px solid var(--mg-border)'
            }}
          />
        )}

        {/* Botón de añadir más medios para dueño */}
        {isOwner() && (
          <button
            onClick={() => setShowAddMedia(true)}
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '2px solid var(--mg-secondary)',
              background: 'white',
              color: 'var(--mg-secondary)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s ease'
            }}
            title="Añadir más fotos/videos"
          >
            +
          </button>
        )}
      </div>

      {/* Miniaturas */}
      {mediaItems.length > 1 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '1rem'
        }}>
          {mediaItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              style={{
                cursor: 'pointer',
                borderRadius: 'var(--mg-radius-md)',
                overflow: 'hidden',
                border: selectedIndex === index ? '3px solid var(--mg-secondary)' : '2px solid var(--mg-border)',
                transition: 'all 0.2s',
                position: 'relative',
                height: '80px',
                background: 'black'
              }}
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={`Miniatura ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <video
                    src={item.url}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    preload="metadata" // Only load metadata for thumbnails
                  />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '1.5rem',
                    textShadow: '0 0 5px rgba(0,0,0,0.5)'
                  }}>
                    ▶️
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal para añadir medios (Reutilizado del bloque if-empty) */}
      {showAddMedia && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="mg-card" style={{ padding: '2rem', maxWidth: '400px', width: '90%', position: 'relative', overflow: 'hidden' }}>
            {/* Pantalla de carga superpuesta */}
            {isUploading && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,255,255,0.9)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                gap: '1rem'
              }}>
                <div className="mg-spinner" style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid var(--mg-border)',
                  borderTopColor: 'var(--mg-primary)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <div style={{ fontWeight: 800, color: 'var(--mg-primary)' }}>Subiendo a Cloudinary...</div>
              </div>
            )}

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--mg-text)' }}>
              Añadir Foto o Video
            </h3>

            <div style={{
              border: '2px dashed var(--mg-border)',
              borderRadius: 'var(--mg-radius-md)',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
              <p style={{ color: 'var(--mg-text-muted)', marginBottom: '1rem' }}>
                Selecciona archivos desde tu dispositivo
              </p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="media-upload-input-gallery"
                disabled={isUploading}
              />
              <label
                htmlFor="media-upload-input-gallery"
                className="mg-btn mg-btn-primary"
                style={{ borderRadius: '50px', cursor: isUploading ? 'not-allowed' : 'pointer', margin: 0, opacity: isUploading ? 0.7 : 1 }}
              >
                {isUploading ? 'Subiendo...' : 'Seleccionar Archivos'}
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddMedia(false)}
                className="mg-btn mg-btn-secondary"
                style={{ borderRadius: '50px' }}
                disabled={isUploading}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
