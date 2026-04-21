import React, { useState } from 'react';

interface MediaGalleryMLProps {
  images: string[];
  videos: string[];
  productName: string;
  productId: string;
}

const MediaGalleryML: React.FC<MediaGalleryMLProps> = ({
  images,
  videos,
  productName,
  productId
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log('MediaGalleryML - Imágenes recibidas:', images);
  console.log('MediaGalleryML - Videos recibidos:', videos);
  console.log('MediaGalleryML - Nombre del producto:', productName);
  console.log('MediaGalleryML - ID del producto:', productId);

  // Combine images and videos into a single array with types
  const mediaItems = [
    ...images.map(url => ({ type: 'image', url })),
    ...videos.map(url => ({ type: 'video', url }))
  ];

  console.log('MediaGalleryML - MediaItems combinados:', mediaItems);

  const selectedMedia = mediaItems[selectedIndex];
  
  console.log('MediaGalleryML - SelectedIndex:', selectedIndex);
  console.log('MediaGalleryML - SelectedMedia:', selectedMedia);
  console.log('MediaGalleryML - MediaItems length:', mediaItems.length);

  // Si no hay medios, mostrar placeholder
  if (mediaItems.length === 0) {
    console.log('MediaGalleryML - No hay medios, mostrando placeholder');
    return (
      <div style={{
        width: '100%',
        height: '500px',
        backgroundColor: '#f8f9fa',
        border: '2px dashed #dee2e6',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#e9ecef',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: '#6c757d'
        }}>
          ???
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            color: '#495057', 
            marginBottom: '8px' 
          }}>
            Sin imágenes disponibles
          </h3>
          <p style={{ 
            color: '#6c757d', 
            fontSize: '0.9rem',
            margin: 0 
          }}>
            El vendedor aún no ha añadido fotos de este producto
          </p>
        </div>
      </div>
    );
  }

  console.log('MediaGalleryML - Renderizando galería con medios');

  return (
    <div style={{ width: '100%' }}>
      {/* Main Media Display */}
      <div style={{
        width: '100%',
        height: '500px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #dee2e6',
        marginBottom: '16px',
        position: 'relative'
      }}>
        {selectedMedia.type === 'image' ? (
          <>
            {console.log('MediaGalleryML - Renderizando imagen:', selectedMedia.url)}
            <img
              src={selectedMedia.url}
              alt={`${productName} - Imagen ${selectedIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              onLoad={() => {
                console.log('MediaGalleryML - Imagen cargada exitosamente');
              }}
              onError={(e) => {
                console.error('MediaGalleryML - Error al cargar imagen:', selectedMedia.url);
                // Si la imagen falla, mostrar placeholder
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </>
        ) : (
          <video
            src={selectedMedia.url}
            controls
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}
        
        {/* Placeholder si la imagen no carga */}
        {selectedMedia.type === 'image' && (
          <div
            id={`img-placeholder-${selectedIndex}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={() => {
              const img = document.querySelector(`img[src="${selectedMedia.url}"]`) as HTMLImageElement;
              if (img && img.style.display === 'none') {
                img.style.display = 'block';
                (document.getElementById(`img-placeholder-${selectedIndex}`) as HTMLElement).style.display = 'none';
              }
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#e9ecef',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: '#6c757d'
            }}>
              ???
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                color: '#495057', 
                marginBottom: '4px' 
              }}>
                Imagen no disponible
              </h3>
              <p style={{ 
                color: '#6c757d', 
                fontSize: '0.8rem',
                margin: 0 
              }}>
                Click para reintentar
              </p>
            </div>
          </div>
        )}

        {/* Media Counter */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          {selectedIndex + 1} / {mediaItems.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {mediaItems.length > 1 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: '8px'
        }}>
          {mediaItems.map((media, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              style={{
                position: 'relative',
                width: '100%',
                height: '80px',
                border: selectedIndex === index ? '2px solid #3b82f6' : '1px solid #dee2e6',
                borderRadius: '6px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (selectedIndex !== index) {
                  e.currentTarget.style.borderColor = '#6b7280';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedIndex !== index) {
                  e.currentTarget.style.borderColor = '#dee2e6';
                }
              }}
            >
              {media.type === 'image' ? (
                <>
                  <img
                    src={media.url}
                    alt={`${productName} - Thumbnail ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  {/* Thumbnail placeholder */}
                  <div
                    id={`thumb-placeholder-${index}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#e9ecef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: '#6c757d'
                    }}
                  >
                    ???
                  </div>
                </>
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: '#6c757d'
                }}>
                  ???
                </div>
              )}
              
              {/* Video indicator */}
              {media.type === 'video' && (
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.6rem',
                  fontWeight: '600'
                }}>
                  VIDEO
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGalleryML;
