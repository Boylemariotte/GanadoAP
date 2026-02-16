import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Livestock } from '../types/livestock';
import { useAuth } from '../contexts/AuthContext';
import MediaUpload from './MediaUpload';
import DropdownMenu from './DropdownMenu';
import { createLivestock } from '../services/livestockService';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<Livestock>>({
    name: '',
    breed: '',
    age: 0,
    weight: 0,
    price: 0,
    location: '',
    description: '',
    purpose: 'leche',
    healthStatus: 'excellent',
    vaccinations: [],
    available: true,
    listedDate: new Date().toISOString().split('T')[0],
    births: 0,
    milkYield: 0,
    gestationTime: 0,
    offspring: { sex: 'hembra', quantity: 0 },
    isLot: false,
    lotSize: 1,
    seller: {
      name: user?.name || 'GANADERIA AP',
      phone: '3164827334',
      email: 'info@ganaderiaap.com',
      rating: 4.8
    }
  });

  const [productImages, setProductImages] = useState<File[]>([]);
  const [productVideos, setProductVideos] = useState<File[]>([]);

  const [newVaccine, setNewVaccine] = useState('');

  // ... imports moved to top

  // ... imports

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar que haya al menos una imagen o video
    if (productImages.length === 0 && productVideos.length === 0) {
      alert('Por favor añade al menos una foto o video del producto');
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append simple fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'seller' || key === 'offspring' || key === 'vaccinations') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      // Append files
      productImages.forEach(file => {
        formDataToSend.append('media', file);
      });
      productVideos.forEach(file => {
        formDataToSend.append('media', file);
      });

      // Call API
      await createLivestock(formDataToSend);

      alert('✅ Producto añadido exitosamente');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('❌ Error al añadir el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addVaccine = () => {
    if (newVaccine.trim()) {
      setFormData(prev => ({
        ...prev,
        vaccinations: [...(prev.vaccinations || []), newVaccine.trim()]
      }));
      setNewVaccine('');
    }
  };

  const removeVaccine = (index: number) => {
    setFormData(prev => ({
      ...prev,
      vaccinations: prev.vaccinations?.filter((_, i) => i !== index) || []
    }));
  };

  if (!user || user.role !== 'owner') {
    return (
      <div className="mg-app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="mg-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--mg-text)', marginBottom: '1rem' }}>⛔ Acceso Restringido</h2>
          <p style={{ color: 'var(--mg-text-muted)', marginBottom: '1.5rem' }}>
            Solo los dueños pueden añadir productos
          </p>
          <button onClick={() => navigate('/')} className="mg-btn mg-btn-primary">
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mg-app">
      {/* Header */}
      <header className="mg-header">
        <div className="mg-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img
                src="/logo.png"
                alt="GANADERIA AP Logo"
                style={{ height: '50px', width: 'auto', borderRadius: '50%' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h1 className="mg-title">Añadir Nuevo Producto</h1>
                <p className="mg-subtitle">Registrar nuevo ejemplar en el catálogo</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <DropdownMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="mg-container mg-section">
        <div className="mg-card" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--mg-text)' }}>
                  Nombre del Ejemplar *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--mg-border)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--mg-text)' }}>
                  Raza *
                </label>
                <input
                  type="text"
                  required
                  value={formData.breed}
                  onChange={(e) => setFormData(prev => ({ ...prev, breed: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--mg-border)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--mg-text)' }}>
                  Edad (años) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: Number(e.target.value) }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--mg-border)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--mg-text)' }}>
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--mg-border)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--mg-text)' }}>
                  Precio ($) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--mg-border)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--mg-text)' }}>
                  Ubicación *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--mg-border)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            {/* Fotos y Videos */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--mg-text)' }}>
                📸 Fotos y Videos del Producto
              </h3>
              <MediaUpload
                images={productImages}
                videos={productVideos}
                onImagesChange={setProductImages}
                onVideosChange={setProductVideos}
                maxFiles={8}
              />
            </div>

            {/* Venta por Lote */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--mg-text)' }}>
                <input
                  type="checkbox"
                  checked={formData.isLot}
                  onChange={(e) => setFormData(prev => ({ ...prev, isLot: e.target.checked }))}
                />
                Es venta por lote
              </label>

              {formData.isLot && (
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--mg-text-muted)' }}>
                    Cantidad de animales en el lote
                  </label>
                  <input
                    type="number"
                    min="2"
                    value={formData.lotSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, lotSize: Number(e.target.value) }))}
                    style={{
                      width: '200px',
                      padding: '0.5rem',
                      border: '2px solid var(--mg-border)',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Descripción */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--mg-text)' }}>
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--mg-border)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Datos Técnicos */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--mg-text)' }}>
                📋 Datos Técnicos
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--mg-text-muted)' }}>
                    Partos
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.births}
                    onChange={(e) => setFormData(prev => ({ ...prev, births: Number(e.target.value) }))}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '2px solid var(--mg-border)',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--mg-text-muted)' }}>
                    Litraje Diario (L)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.milkYield}
                    onChange={(e) => setFormData(prev => ({ ...prev, milkYield: Number(e.target.value) }))}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '2px solid var(--mg-border)',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--mg-text-muted)' }}>
                    Tiempo Gestación (meses)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.gestationTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, gestationTime: Number(e.target.value) }))}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '2px solid var(--mg-border)',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Vacunas */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--mg-text)' }}>
                💉 Plan de Vacunación
              </h3>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={newVaccine}
                  onChange={(e) => setNewVaccine(e.target.value)}
                  placeholder="Nombre de la vacuna"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVaccine())}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: '2px solid var(--mg-border)',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                />
                <button
                  type="button"
                  onClick={addVaccine}
                  className="mg-btn mg-btn-primary"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Añadir
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {formData.vaccinations?.map((vaccine, index) => (
                  <span
                    key={index}
                    className="mg-badge"
                    style={{
                      background: 'var(--mg-accent)',
                      color: 'var(--mg-text)',
                      border: '1px solid var(--mg-border)',
                      cursor: 'pointer'
                    }}
                    onClick={() => removeVaccine(index)}
                  >
                    💉 {vaccine} ❌
                  </span>
                ))}
              </div>
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="mg-btn mg-btn-secondary"
                style={{ padding: '0.75rem 2rem' }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mg-btn mg-btn-primary"
                style={{ padding: '0.75rem 2rem' }}
              >
                {isSubmitting ? 'Guardando...' : '✅ Añadir Producto'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
