import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Livestock } from '../types/livestock';
import { Estate } from '../types/estate';
import { mockLivestock, allEstates, categories } from '../data/mockData'; // Import mock data
// import { getLivestock } from '../services/livestockService'; // Commented for now
import ProductCardML from './ProductCardML';
import EstateCard from './EstateCard';
import SearchBar from './SearchBar';
import NavBarLinks from './NavBarLinks';
import { useAuth } from '../contexts/AuthContext';
import SaleForm from './SaleForm';
import DropdownMenu from './DropdownMenu';

const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const { isOwner } = useAuth();
  const [livestock, setLivestock] = useState<Livestock[]>([]);
  const [estates, setEstates] = useState<Estate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('price-low');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSaleForm, setShowSaleForm] = useState<Livestock | null>(null);
  const [activeTab, setActiveTab] = useState<'ganado' | 'fincas'>('ganado');

  useEffect(() => {
    // Use mock data for now
    setLivestock(mockLivestock);
    setEstates(allEstates);
    setLoading(false);
    
    // Uncomment below when API is ready
    // const fetchLivestock = async () => {
    //   try {
    //     const data = await getLivestock();
    //     setLivestock(data);
    //   } catch (error) {
    //     setError('Error al cargar el ganado');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchLivestock();
  }, []);

  const sortOptions = [
    { value: 'price-low', label: 'Precio: Menor a Mayor' },
    { value: 'price-high', label: 'Precio: Mayor a Menor' },
    { value: 'age-low', label: 'Edad: Menor a Mayor' },
    { value: 'age-high', label: 'Edad: Mayor a Menor' }
  ];

  const filteredAndSortedLivestock = livestock
    .filter(item => {
      const matchesCategory = selectedPurpose === 'all' || item.purpose === selectedPurpose;
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
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
    <div style={{ backgroundColor: '#F4F1EC', minHeight: '100vh' }}>
      {/* Header - MercadoLibre Style */}
      <header style={{ 
        backgroundColor: '#2E5E3E', 
        borderBottom: '1px solid #1a3a2a',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          height: '72px'
        }}>
          {/* Logo y Búsqueda - Izquierda */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <img
                src="/logo.png"
                alt="GANADERIA AP"
                style={{ 
                  height: '44px', 
                  width: '44px', 
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '2px solid #fff',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onClick={() => navigate('/')}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
              <div className="mg-desktop-hidden">
                <h1 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#FFFFFF',
                  margin: 0
                }}>
                  GANADERIA AP
                </h1>
              </div>
            </div>

            {/* Search Bar */}
            <div style={{ flex: 1, maxWidth: '450px', minWidth: '180px' }}>
              <SearchBar 
                onSearch={setSearchQuery}
                placeholder="Buscar ganado por raza, ubicación..."
              />
            </div>
          </div>

          {/* Navigation Links - Centro */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <NavBarLinks />
          </div>

          {/* Right Section - Derecha */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <DropdownMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 16px' }}>
        {/* Filters and Results */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
          {/* Sidebar Filters */}
          <aside style={{ 
            width: '240px', 
            flexShrink: 0,
            display: 'none'
          }} className="mg-mobile-hidden">
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #e6e6e6'
            }}>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: '#333'
              }}>
                Categorías
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedPurpose(category.id)}
                    style={{
                      padding: '8px 12px',
                      border: 'none',
                      background: selectedPurpose === category.id ? '#3b82f6' : 'transparent',
                      color: selectedPurpose === category.id ? 'white' : '#333',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedPurpose !== category.id) {
                        e.currentTarget.style.background = '#f3f4f6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedPurpose !== category.id) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {category.icon} {category.name} ({category.count})
                  </button>
                ))}
              </div>

              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                marginTop: '24px',
                marginBottom: '16px',
                color: '#333'
              }}>
                Ordenar por
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e6e6e6',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  background: 'white'
                }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </aside>

          {/* Products Grid */}
          <div style={{ flex: 1 }}>
            {/* Category Tabs */}
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginBottom: '20px',
              borderBottom: '2px solid #E0E0E0'
            }}>
              <button
                onClick={() => setActiveTab('ganado')}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  background: activeTab === 'ganado' ? '#2E5E3E' : 'transparent',
                  color: activeTab === 'ganado' ? 'white' : '#64748b',
                  borderRadius: '8px 8px 0 0',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: activeTab === 'ganado' ? '2px solid #2E5E3E' : '2px solid transparent',
                  marginBottom: '-2px'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'ganado') {
                    e.currentTarget.style.background = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'ganado') {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                Ganado ({livestock.length})
              </button>
              <button
                onClick={() => setActiveTab('fincas')}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  background: activeTab === 'fincas' ? '#2E5E3E' : 'transparent',
                  color: activeTab === 'fincas' ? 'white' : '#64748b',
                  borderRadius: '8px 8px 0 0',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: activeTab === 'fincas' ? '2px solid #2E5E3E' : '2px solid transparent',
                  marginBottom: '-2px'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'fincas') {
                    e.currentTarget.style.background = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'fincas') {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                Fincas ({estates.length})
              </button>
            </div>

            {/* Mobile Filters */}
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              border: '1px solid #e6e6e6',
              display: 'none'
            }} className="mg-desktop-hidden">
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                overflowX: 'auto',
                paddingBottom: '8px'
              }}>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedPurpose(category.id)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #e6e6e6',
                      background: selectedPurpose === category.id ? '#3b82f6' : 'white',
                      color: selectedPurpose === category.id ? 'white' : '#333',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginTop: '12px'
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#666' }}>
                  Ordenar:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '4px 8px',
                    border: '1px solid #e6e6e6',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '1.125rem', color: '#666' }}>Cargando productos...</div>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '1.125rem', color: '#dc2626' }}>{error}</div>
              </div>
            ) : (
              <>
                {activeTab === 'ganado' && (
                  <>
                    {filteredAndSortedLivestock.length > 0 ? (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                        gap: '24px'
                      }}>
                        {filteredAndSortedLivestock.map(item => (
                          <div key={item.id} style={{ marginBottom: '20px' }}>
                            <ProductCardML livestock={item} />
                            {isOwner() && item.available && (
                              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => navigate(`/admin`)}
                                  style={{
                                    flex: 1,
                                    padding: '8px 16px',
                                    backgroundColor: '#2E5E3E',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => setShowSaleForm(item)}
                                  style={{
                                    flex: 1,
                                    padding: '8px 16px',
                                    backgroundColor: '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Vendido
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '1.125rem', color: '#666' }}>No se encontró ganado</div>
                      </div>
                    )}
                  </>
                )}
                
                {activeTab === 'fincas' && (
                  <>
                    {estates.length > 0 ? (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                        gap: '28px'
                      }}>
                        {estates.map(estate => (
                          <div key={estate.id} style={{ marginBottom: '20px' }}>
                            <EstateCard 
                              estate={estate} 
                              onClick={() => navigate(`/estate/${estate.id}`)}
                            />
                            {isOwner() && estate.available && (
                              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => navigate(`/admin`)}
                                  style={{
                                    flex: 1,
                                    padding: '8px 16px',
                                    backgroundColor: '#2E5E3E',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => setShowSaleForm(estate as any)}
                                  style={{
                                    flex: 1,
                                    padding: '8px 16px',
                                    backgroundColor: '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Vendido
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '1.125rem', color: '#666' }}>No se encontraron fincas</div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>

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
