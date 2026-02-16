import React, { useState, useEffect } from 'react';
import { Livestock } from '../types/livestock';
// import { mockLivestock } from '../data/mockData'; // Removed mock data
import { getLivestock } from '../services/livestockService'; // Import modular service
import ProductCard from './ProductCard';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SaleForm from './SaleForm';
import DropdownMenu from './DropdownMenu';

const Marketplace: React.FC = () => {
  const { user, logout, isOwner } = useAuth();
  const navigate = useNavigate();
  const [livestock, setLivestock] = useState<Livestock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('price-low');
  const [showSaleForm, setShowSaleForm] = useState<Livestock | null>(null);

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        const data = await getLivestock();
        setLivestock(data);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLivestock();
  }, []);

  const categories = [
    { value: 'all', label: 'Todos', icon: '🐄' },
    { value: 'leche', label: 'Leche', icon: '🥛' },
    { value: 'carne', label: 'Carne', icon: '🥩' },
    { value: 'doble_proposito', label: 'Doble Propósito', icon: '⚖️' }
  ];

  const sortOptions = [
    { value: 'price-low', label: 'Precio: Menor a Mayor' },
    { value: 'price-high', label: 'Precio: Mayor a Menor' },
    { value: 'age-low', label: 'Edad: Menor a Mayor' },
    { value: 'age-high', label: 'Edad: Mayor a Menor' }
  ];

  const filteredAndSortedLivestock = livestock
    .filter(item => selectedPurpose === 'all' || item.purpose === selectedPurpose)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'age-low': return a.age - b.age;
        case 'age-high': return b.age - a.age;
        default: return 0;
      }
    });

  const handleSaleComplete = (saleData: any) => {
    console.log('Venta registrada:', saleData);
    // Aquí podrías mostrar una notificación o actualizar la lista
  };

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
                style={{ height: '200px', width: 'auto', borderRadius: '50%' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h1 className="mg-title">GANADERIA AP</h1>
                <p className="mg-subtitle">Venta de ganado Girolando y ganado de leche en todas sus cruces</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--mg-accent)', padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--mg-text-muted)' }}>
                {filteredAndSortedLivestock.length} ejemplares disponibles
              </div>

              <DropdownMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mg-container mg-section">
        {/* Filter Bar */}
        <div className="mg-card" style={{ padding: '1.5rem', marginBottom: '3rem', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedPurpose(category.value)}
                className={`mg-btn ${selectedPurpose === category.value ? 'mg-btn-active' : 'mg-btn-secondary'}`}
                style={{ borderRadius: '50px', padding: '0.5rem 1.25rem' }}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>Ordenar:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mg-select"
              style={{ borderRadius: '50px' }}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>Cargando productos...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'red' }}>{error}</div>
        ) : filteredAndSortedLivestock.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {filteredAndSortedLivestock.map(item => (
              <div key={item.id}>
                <ProductCard livestock={item} />
                {isOwner() && item.available && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setShowSaleForm(item)}
                      className="mg-btn"
                      style={{
                        flex: 1,
                        background: '#dc2626',
                        color: 'white',
                        fontSize: '0.9rem'
                      }}
                    >
                      💰 Registrar Venta
                    </button>
                  </div>
                )}
                {isOwner() && !item.available && (
                  <div style={{ marginTop: '1rem' }}>
                    <div className="mg-badge" style={{
                      width: '100%',
                      justifyContent: 'center',
                      background: '#ef4444',
                      color: 'white'
                    }}>
                      ✅ Vendido
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🕵️‍♂️</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>No hay resultados</h3>
            <p style={{ color: '#64748b' }}>Intenta ajustar tus filtros de búsqueda.</p>
          </div>
        )}

        {/* Sale Form Modal */}
        {showSaleForm && (
          <SaleForm
            livestock={showSaleForm}
            onClose={() => setShowSaleForm(null)}
            onSaleComplete={handleSaleComplete}
          />
        )}
      </main>
    </div>
  );
};

export default Marketplace;
