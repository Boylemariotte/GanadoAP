import React, { useState } from 'react';

interface MediaUploadProps {
  images: string[];
  videos: string[];
  onImagesChange: (images: string[]) => void;
  onVideosChange: (videos: string[]) => void;
  maxFiles?: number;
  disabled?: boolean;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  images,
  videos,
  onImagesChange,
  onVideosChange,
  maxFiles = 10,
  disabled = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);

    try {
      const mediaFiles = files.filter(file => 
        file.type.startsWith('image/') || file.type.startsWith('video/')
      );

      if (mediaFiles.length === 0) {
        alert('Por favor selecciona solo archivos de imagen o video');
        return;
      }

      const totalFiles = images.length + videos.length + mediaFiles.length;
      if (totalFiles > maxFiles) {
        alert(`Solo puedes subir máximo ${maxFiles} archivos`);
        return;
      }

      // Simular subida y generar URLs locales
      const newImages: string[] = [];
      const newVideos: string[] = [];

      for (const file of mediaFiles) {
        if (file.type.startsWith('image/')) {
          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl);
        } else if (file.type.startsWith('video/')) {
          const videoUrl = URL.createObjectURL(file);
          newVideos.push(videoUrl);
        }
      }

      // Actualizar estados
      onImagesChange([...images, ...newImages]);
      onVideosChange([...videos, ...newVideos]);

    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error al subir los archivos');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    onVideosChange(newVideos);
  };

  const getFileIcon = (url: string, isVideo: boolean) => {
    if (isVideo) {
      return '🎥';
    }
    return '📷';
  };

  return (
    <div>
      {/* Área de arrastrar y soltar */}
      <div
        className={`mg-card ${dragActive ? 'drag-active' : ''}`}
        style={{
          padding: '2rem',
          border: dragActive ? '2px dashed var(--mg-secondary)' : '2px dashed var(--mg-border)',
          background: dragActive ? 'var(--mg-bg)' : 'var(--mg-bg-card)',
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          marginBottom: '1.5rem'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileInput}
          style={{ display: 'none' }}
          disabled={disabled}
        />
        
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {uploading ? '⏳' : '📁'}
        </div>
        
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--mg-text)', marginBottom: '0.5rem' }}>
          {uploading ? 'Subiendo archivos...' : 'Arrastra fotos y videos aquí'}
        </h3>
        
        <p style={{ color: 'var(--mg-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          o haz clic para seleccionar archivos
        </p>
        
        <div style={{ fontSize: '0.85rem', color: 'var(--mg-text-muted)' }}>
          Formatos: JPG, PNG, GIF, MP4, WebM (Máx. {maxFiles} archivos)
        </div>
      </div>

      {/* Vista previa de imágenes */}
      {images.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--mg-text)', marginBottom: '1rem' }}>
            📷 Fotos ({images.length})
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
            {images.map((image, index) => (
              <div key={`img-${index}`} style={{ position: 'relative' }}>
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '2px solid var(--mg-border)'
                  }}
                />
                {!disabled && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vista previa de videos */}
      {videos.length > 0 && (
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--mg-text)', marginBottom: '1rem' }}>
            🎥 Videos ({videos.length})
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {videos.map((video, index) => (
              <div key={`vid-${index}`} style={{ position: 'relative' }}>
                <video
                  src={video}
                  controls
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '2px solid var(--mg-border)'
                  }}
                />
                {!disabled && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVideo(index);
                    }}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contador de archivos */}
      <div style={{ 
        marginTop: '1rem', 
        padding: '0.75rem', 
        background: 'var(--mg-accent)', 
        borderRadius: '8px', 
        fontSize: '0.9rem', 
        color: 'var(--mg-text-muted)',
        textAlign: 'center'
      }}>
        Total: {images.length + videos.length} / {maxFiles} archivos
      </div>
    </div>
  );
};

export default MediaUpload;
