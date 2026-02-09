import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Livestock } from '../types/livestock';
import { useAuth } from '../contexts/AuthContext';

interface SaleFormProps {
  livestock: Livestock;
  onClose: () => void;
  onSaleComplete: (saleData: SaleData) => void;
}

interface SaleData {
  productId: string;
  productName: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerAddress: string;
  saleDate: string;
  salePrice: number;
  paymentMethod: 'cash' | 'transfer' | 'check' | 'card';
  deliveryMethod: 'pickup' | 'delivery';
  deliveryDate?: string;
  deliveryAddress?: string;
  observations: string;
  sellerName: string;
  sellerContact: string;
}

const SaleForm: React.FC<SaleFormProps> = ({ livestock, onClose, onSaleComplete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [saleData, setSaleData] = useState<SaleData>({
    productId: livestock.id,
    productName: livestock.name,
    buyerName: '',
    buyerPhone: '',
    buyerEmail: '',
    buyerAddress: '',
    saleDate: new Date().toISOString().split('T')[0],
    salePrice: livestock.price,
    paymentMethod: 'cash',
    deliveryMethod: 'pickup',
    deliveryDate: '',
    deliveryAddress: '',
    observations: '',
    sellerName: user?.name || 'GANADERIA AP',
    sellerContact: '3164827334'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Guardar datos de la venta
      const existingSales = JSON.parse(localStorage.getItem('livestock-sales') || '[]');
      const newSale = {
        ...saleData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
      existingSales.push(newSale);
      localStorage.setItem('livestock-sales', JSON.stringify(existingSales));

      // Actualizar estado del producto a vendido
      const existingProducts = JSON.parse(localStorage.getItem('livestock-products') || '[]');
      const updatedProducts = existingProducts.map((product: Livestock) => 
        product.id === livestock.id 
          ? { ...product, available: false }
          : product
      );
      localStorage.setItem('livestock-products', JSON.stringify(updatedProducts));

      alert('✅ Venta registrada exitosamente');
      onSaleComplete(newSale);
      onClose();
    } catch (error) {
      alert('❌ Error al registrar la venta');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || user.role !== 'owner') {
    return (
      <div className="mg-app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="mg-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--mg-text)', marginBottom: '1rem' }}>⛔ Acceso Restringido</h2>
          <p style={{ color: 'var(--mg-text-muted)', marginBottom: '1.5rem' }}>
            Solo los dueños pueden registrar ventas
          </p>
          <button onClick={onClose} className="mg-btn mg-btn-primary">
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
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
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="mg-card" style={{ 
        padding: '2rem', 
        maxWidth: '600px', 
        width: '100%', 
        maxHeight: '90vh', 
        overflowY: 'auto',
        background: 'white'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--mg-text)', marginBottom: '0.5rem' }}>
              📋 Registrar Venta
            </h2>
            <p style={{ color: 'var(--mg-text-muted)', fontSize: '0.9rem' }}>
              Producto: <strong>{livestock.name}</strong> ({livestock.breed})
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '1.5rem', 
              cursor: 'pointer',
              color: 'var(--mg-text-muted)'
            }}
          >
            ❌
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Información del Producto */}
          <div className="mg-card" style={{ padding: '1rem', marginBottom: '1.5rem', background: 'var(--mg-bg)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--mg-text)' }}>
              🐄 Información del Producto
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--mg-text-muted)' }}>Nombre:</span> {livestock.name}
              </div>
              <div>
                <span style={{ color: 'var(--mg-text-muted)' }}>Raza:</span> {livestock.breed}
              </div>
              <div>
                <span style={{ color: 'var(--mg-text-muted)' }}>Peso:</span> {livestock.weight}kg
              </div>
              <div>
                <span style={{ color: 'var(--mg-text-muted)' }}>Edad:</span> {livestock.age} años
              </div>
              {livestock.isLot && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ color: 'var(--mg-text-muted)' }}>Cantidad:</span> {livestock.lotSize} animales
                </div>
              )}
            </div>
          </div>

          {/* Datos del Comprador */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--mg-text)' }}>
              👤 Datos del Comprador
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--mg-text-muted)' }}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={saleData.buyerName}
                  onChange={(e) => setSaleData(prev => ({ ...prev, buyerName: e.target.value }))}
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
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={saleData.buyerPhone}
                  onChange={(e) => setSaleData(prev => ({ ...prev, buyerPhone: e.target.value }))}
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
                  Email
                </label>
                <input
                  type="email"
                  value={saleData.buyerEmail}
                  onChange={(e) => setSaleData(prev => ({ ...prev, buyerEmail: e.target.value }))}
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
                  Dirección
                </label>
                <input
                  type="text"
                  value={saleData.buyerAddress}
                  onChange={(e) => setSaleData(prev => ({ ...prev, buyerAddress: e.target.value }))}
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

          {/* Detalles de la Venta */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--mg-text)' }}>
              💰 Detalles de la Venta
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--mg-text-muted)' }}>
                  Fecha de Venta *
                </label>
                <input
                  type="date"
                  required
                  value={saleData.saleDate}
                  onChange={(e) => setSaleData(prev => ({ ...prev, saleDate: e.target.value }))}
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
                  Precio de Venta ($) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={saleData.salePrice}
                  onChange={(e) => setSaleData(prev => ({ ...prev, salePrice: Number(e.target.value) }))}
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
                  Método de Pago *
                </label>
                <select
                  required
                  value={saleData.paymentMethod}
                  onChange={(e) => setSaleData(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem', 
                    border: '2px solid var(--mg-border)', 
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="cash">Efectivo</option>
                  <option value="transfer">Transferencia Bancaria</option>
                  <option value="check">Cheque</option>
                  <option value="card">Tarjeta de Crédito/Débito</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--mg-text-muted)' }}>
                  Método de Entrega *
                </label>
                <select
                  required
                  value={saleData.deliveryMethod}
                  onChange={(e) => setSaleData(prev => ({ ...prev, deliveryMethod: e.target.value as any }))}
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem', 
                    border: '2px solid var(--mg-border)', 
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="pickup">Retiro en Establecimiento</option>
                  <option value="delivery">Entrega a Domicilio</option>
                </select>
              </div>

              {saleData.deliveryMethod === 'delivery' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--mg-text-muted)' }}>
                      Fecha de Entrega
                    </label>
                    <input
                      type="date"
                      value={saleData.deliveryDate}
                      onChange={(e) => setSaleData(prev => ({ ...prev, deliveryDate: e.target.value }))}
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
                      Dirección de Entrega
                    </label>
                    <input
                      type="text"
                      value={saleData.deliveryAddress}
                      onChange={(e) => setSaleData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '0.5rem', 
                        border: '2px solid var(--mg-border)', 
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Observaciones */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--mg-text-muted)' }}>
              Observaciones
            </label>
            <textarea
              value={saleData.observations}
              onChange={(e) => setSaleData(prev => ({ ...prev, observations: e.target.value }))}
              rows={3}
              placeholder="Notas adicionales sobre la venta..."
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '2px solid var(--mg-border)', 
                borderRadius: '8px',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              className="mg-btn mg-btn-secondary"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mg-btn mg-btn-primary"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              {isSubmitting ? 'Registrando...' : '✅ Registrar Venta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleForm;
