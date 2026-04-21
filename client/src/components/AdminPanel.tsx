import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Livestock } from '../types/livestock';
import { Estate } from '../types/estate';
import { mockLivestock, allEstates } from '../data/mockData';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Image as ImageIcon,
  Save,
  X,
  Eye,
  EyeOff,
  Package,
  Home,
  CheckCircle
} from 'lucide-react';

interface AdminProduct {
  id: string;
  type: 'livestock' | 'estate';
  data: Livestock | Estate;
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'livestock' | 'estates'>('livestock');
  const [livestock, setLivestock] = useState<Livestock[]>([]);
  const [estates, setEstates] = useState<Estate[]>([]);
  const [selectedItem, setSelectedItem] = useState<AdminProduct | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState<Livestock | Estate | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setLivestock(mockLivestock);
    setEstates(allEstates);
  }, []);

  const handleEdit = (item: AdminProduct) => {
    setSelectedItem(item);
    setEditingData({ ...item.data });
    setIsEditing(true);
  };

  const handleDelete = (id: string, type: 'livestock' | 'estate') => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      if (type === 'livestock') {
        setLivestock(livestock.filter(item => item.id !== id));
        // Update mockData to persist deletion
        const index = mockLivestock.findIndex(item => item.id === id);
        if (index !== -1) {
          mockLivestock.splice(index, 1);
          console.log('Producto eliminado de mockData');
        }
      } else {
        setEstates(estates.filter(item => item.id !== id));
        // Update mockData to persist deletion
        const index = allEstates.findIndex(item => item.id === id);
        if (index !== -1) {
          allEstates.splice(index, 1);
          console.log('Finca eliminada de mockData');
        }
      }
    }
  };

  const handleSave = () => {
    if (!editingData || !selectedItem) return;

    console.log('Guardando cambios...');
    console.log('editingData:', editingData);
    console.log('selectedItem:', selectedItem);
    console.log('newImages:', newImages);

    // Add new images to the existing images
    const updatedData = { ...editingData };
    if ('images' in updatedData && newImages.length > 0) {
      console.log('Agregando nuevas imágenes a las existentes');
      console.log('Imágenes existentes:', updatedData.images);
      console.log('Nuevas imágenes:', newImages);
      updatedData.images = [...updatedData.images, ...newImages];
      console.log('Imágenes finales:', updatedData.images);
    }

    if (selectedItem.type === 'livestock') {
      console.log('Actualizando ganado');
      const updatedLivestock = livestock.map(item => 
        item.id === selectedItem.id ? updatedData as Livestock : item
      );
      console.log('Ganado actualizado:', updatedLivestock);
      setLivestock(updatedLivestock);
      
      // Update mockData to persist changes
      const index = mockLivestock.findIndex(item => item.id === selectedItem.id);
      if (index !== -1) {
        mockLivestock[index] = updatedData as Livestock;
        console.log('MockData actualizado');
      }
    } else {
      console.log('Actualizando fincas');
      const updatedEstates = estates.map(item => 
        item.id === selectedItem.id ? updatedData as Estate : item
      );
      console.log('Fincas actualizadas:', updatedEstates);
      setEstates(updatedEstates);
      
      // Update mockData to persist changes
      const index = allEstates.findIndex(item => item.id === selectedItem.id);
      if (index !== -1) {
        allEstates[index] = updatedData as Estate;
        console.log('MockData actualizado');
      }
    }

    console.log('Cerrando modo edición');
    setIsEditing(false);
    setSelectedItem(null);
    setEditingData(null);
    setNewImages([]);
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedItem(null);
    setEditingData(null);
    setNewImages([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    console.log('Subiendo imágenes...');
    console.log('Archivos seleccionados:', files);
    console.log('Cantidad de archivos:', files.length);

    setUploadingImages(true);
    const newImageUrls: string[] = [];

    Array.from(files).forEach((file, index) => {
      console.log(`Procesando archivo ${index + 1}:`, file.name);
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const result = event.target?.result as string;
        console.log(`Archivo ${index + 1} procesado, longitud:`, result.length);
        newImageUrls.push(result);
        
        // When all files are processed, update state
        if (newImageUrls.length === files.length) {
          console.log('Todos los archivos procesados');
          console.log('URLs de imágenes:', newImageUrls);
          setNewImages(prev => {
            console.log('Estado anterior de newImages:', prev);
            console.log('Nuevo estado de newImages:', [...prev, ...newImageUrls]);
            return [...prev, ...newImageUrls];
          });
          setUploadingImages(false);
        }
      };

      reader.onerror = () => {
        console.error('Error reading file:', file.name);
        setUploadingImages(false);
      };

      reader.readAsDataURL(file);
    });
  };

  const updateEditingImage = (index: number, newImageUrl: string) => {
    if (!editingData) return;

    const updatedData = { ...editingData };
    if ('images' in updatedData) {
      const images = [...updatedData.images];
      images[index] = newImageUrl;
      updatedData.images = images;
    }
    setEditingData(updatedData);
  };

  const removeImage = (index: number) => {
    if (!editingData) return;

    const updatedData = { ...editingData };
    if ('images' in updatedData) {
      const images = updatedData.images.filter((_, i) => i !== index);
      updatedData.images = images;
    }
    setEditingData(updatedData);
  };

  const renderLivestockForm = () => {
    const data = editingData as Livestock;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Nombre
          </label>
          <input
            type="text"
            value={data?.name || ''}
            onChange={(e) => setEditingData({ ...data, name: e.target.value })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Raza
          </label>
          <input
            type="text"
            value={data?.breed || ''}
            onChange={(e) => setEditingData({ ...data, breed: e.target.value })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Edad (meses)
          </label>
          <input
            type="number"
            value={data?.age || ''}
            onChange={(e) => setEditingData({ ...data, age: parseInt(e.target.value) })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Precio
          </label>
          <input
            type="number"
            value={data?.price || ''}
            onChange={(e) => setEditingData({ ...data, price: parseInt(e.target.value) })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Ubicación
          </label>
          <input
            type="text"
            value={data?.location || ''}
            onChange={(e) => setEditingData({ ...data, location: e.target.value })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Descripción
          </label>
          <textarea
            value={data?.description || ''}
            onChange={(e) => setEditingData({ ...data, description: e.target.value })}
            rows={4}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Propósito
          </label>
          <select
            value={data?.purpose || ''}
            onChange={(e) => setEditingData({ ...data, purpose: e.target.value as "leche" | "carne" | "doble_proposito" })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          >
            <option value="leche">Lechería</option>
            <option value="carne">Carne</option>
            <option value="doble_proposito">Doble Propósito</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Peso (kg)
          </label>
          <input
            type="number"
            value={data?.weight || ''}
            onChange={(e) => setEditingData({ ...data, weight: parseInt(e.target.value) })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>
    );
  };

  const renderEstateForm = () => {
    const data = editingData as Estate;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Nombre
          </label>
          <input
            type="text"
            value={data?.name || ''}
            onChange={(e) => setEditingData({ ...data, name: e.target.value })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Ubicación
          </label>
          <input
            type="text"
            value={data?.location || ''}
            onChange={(e) => setEditingData({ ...data, location: e.target.value })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Provincia
          </label>
          <input
            type="text"
            value={data?.province || ''}
            onChange={(e) => setEditingData({ ...data, province: e.target.value })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Precio
          </label>
          <input
            type="number"
            value={data?.price || ''}
            onChange={(e) => setEditingData({ ...data, price: parseInt(e.target.value) })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Superficie (hectáreas)
          </label>
          <input
            type="number"
            value={data?.surface || ''}
            onChange={(e) => setEditingData({ ...data, surface: parseInt(e.target.value) })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Tipo de Propiedad
          </label>
          <select
            value={data?.estateType || ''}
            onChange={(e) => setEditingData({ ...data, estateType: e.target.value as "campo" | "estancia" | "finca" | "chacra" | "potrero" })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          >
            <option value="estancia">Estancia</option>
            <option value="campo">Campo</option>
            <option value="finca">Finca</option>
            <option value="chacra">Chacra</option>
            <option value="potrero">Potrero</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Tipo de Suelo
          </label>
          <input
            type="text"
            value={data?.soilType || ''}
            onChange={(e) => setEditingData({ ...data, soilType: e.target.value })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Topografía
          </label>
          <select
            value={data?.topography || ''}
            onChange={(e) => setEditingData({ ...data, topography: e.target.value as "plano" | "ondulado" | "montañoso" })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          >
            <option value="plano">Plano</option>
            <option value="ondulado">Ondulado</option>
            <option value="montañoso">Montañoso</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: 500 }}>
            Capacidad de Ganado
          </label>
          <input
            type="number"
            value={data?.livestockCapacity || ''}
            onChange={(e) => setEditingData({ ...data, livestockCapacity: parseInt(e.target.value) })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#F4F1EC', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '24px', 
          marginBottom: '24px',
          border: '1px solid #E0E0E0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
              <Settings size={28} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
              Panel de Administración
            </h1>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '10px 16px',
                backgroundColor: '#2E5E3E',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#234a32';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2E5E3E';
              }}
            >
              <Home size={16} />
              Volver al Marketplace
            </button>
          </div>
          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
            Gestiona todo el catálogo de productos: ganado y fincas. Edita información, actualiza imágenes y mantén tu inventario al día.
          </p>
          
          {/* Success Message */}
          {showSuccessMessage && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              <CheckCircle size={16} />
              ¡Cambios guardados exitosamente!
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '16px', 
          marginBottom: '24px',
          border: '1px solid #E0E0E0'
        }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={() => setActiveTab('livestock')}
              style={{
                padding: '10px 20px',
                backgroundColor: activeTab === 'livestock' ? '#2E5E3E' : 'transparent',
                color: activeTab === 'livestock' ? 'white' : '#64748b',
                border: '1px solid #2E5E3E',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Package size={16} style={{ marginRight: '6px' }} />
              Ganado ({livestock.length})
            </button>
            <button
              onClick={() => setActiveTab('estates')}
              style={{
                padding: '10px 20px',
                backgroundColor: activeTab === 'estates' ? '#2E5E3E' : 'transparent',
                color: activeTab === 'estates' ? 'white' : '#64748b',
                border: '1px solid #2E5E3E',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Home size={16} style={{ marginRight: '6px' }} />
              Fincas ({estates.length})
            </button>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && editingData && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '800px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                  Editar {selectedItem?.type === 'livestock' ? 'Ganado' : 'Finca'}
                </h2>
                <button
                  onClick={handleCancel}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form Fields */}
              <div style={{ marginBottom: '20px' }}>
                {selectedItem?.type === 'livestock' ? renderLivestockForm() : renderEstateForm()}
              </div>

              {/* Images Section */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1e293b', marginBottom: '12px' }}>
                  Imágenes
                </h3>
                
                {/* Current Images */}
                {editingData.images && editingData.images.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
                      {editingData.images.map((image, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                          <img
                            src={image}
                            alt={`Imagen ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '120px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '1px solid #E0E0E0'
                            }}
                          />
                          <button
                            onClick={() => removeImage(index)}
                            style={{
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              backgroundColor: '#dc2626',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload New Images */}
                <div>
                  <label 
                    htmlFor="image-upload"
                    style={{
                      display: 'inline-block',
                      padding: '10px 16px',
                      backgroundColor: '#2E5E3E',
                      color: 'white',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#234a32';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2E5E3E';
                    }}
                  >
                    <Upload size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    {uploadingImages ? 'Subiendo...' : 'Subir Imágenes'}
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* New Images Preview */}
                {newImages.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
                      {newImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Nueva imagen ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            border: '2px solid #4C8C5A'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    color: '#64748b',
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#2E5E3E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Save size={16} style={{ marginRight: '6px' }} />
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '16px',
          border: '1px solid #E0E0E0'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>
            {activeTab === 'livestock' ? 'Ganado' : 'Fincas'}
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '16px' 
          }}>
            {(activeTab === 'livestock' ? livestock : estates).map(item => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E0E0E0',
                  borderRadius: '12px',
                  padding: '16px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0' }}>
                      {activeTab === 'livestock' 
                        ? `${(item as Livestock).breed} • ${(item as Livestock).age} meses`
                        : `${(item as Estate).estateType} • ${(item as Estate).surface} ha`
                      }
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEdit({ 
                        id: item.id, 
                        type: activeTab === 'livestock' ? 'livestock' : 'estate',
                        data: item 
                      })}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#2E5E3E',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: 500
                      }}
                    >
                      <Edit size={12} style={{ marginRight: '4px' }} />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, activeTab === 'livestock' ? 'livestock' : 'estate')}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: 500
                      }}
                    >
                      <Trash2 size={12} style={{ marginRight: '4px' }} />
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Preview Images */}
                <div style={{ marginBottom: '12px' }}>
                  {item.images && item.images.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                      {item.images.slice(0, 3).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            border: '1px solid #E0E0E0'
                          }}
                        />
                      ))}
                      {item.images.length > 3 && (
                        <div style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '6px',
                          backgroundColor: '#F1F5F9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          color: '#64748b',
                          border: '1px solid #E0E0E0'
                        }}>
                          +{item.images.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#C0392B', margin: '0' }}>
                      ${activeTab === 'livestock' 
                        ? (item as Livestock).price.toLocaleString('es-AR')
                        : (item as Estate).price.toLocaleString('es-AR')
                      }
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 0 0' }}>
                      {activeTab === 'livestock' 
                        ? `${(item as Livestock).weight} kg`
                        : `${(item as Estate).surface} ha`
                      }
                    </p>
                  </div>
                  <div style={{ 
                    padding: '4px 8px', 
                    backgroundColor: item.available ? '#4C8C5A' : '#dc2626', 
                    color: 'white', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600 
                  }}>
                    {item.available ? 'Disponible' : 'No Disponible'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
