import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DropdownMenu from './DropdownMenu';

interface SaleData {
  id: string;
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
  timestamp: string;
}

const SalesRecords: React.FC = () => {
  const { user, logout, isOwner } = useAuth();
  const navigate = useNavigate();
  const [sales, setSales] = useState<SaleData[]>([]);
  const [filteredSales, setFilteredSales] = useState<SaleData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    if (!user || user.role !== 'owner') {
      navigate('/');
      return;
    }

    // Cargar ventas desde localStorage
    const savedSales = JSON.parse(localStorage.getItem('livestock-sales') || '[]');
    setSales(savedSales);
    setFilteredSales(savedSales);
  }, [user, navigate]);

  useEffect(() => {
    let filtered = [...sales];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(sale => 
        sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.buyerPhone.includes(searchTerm)
      );
    }

    // Filtrar por fecha
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(sale => 
        new Date(sale.saleDate) >= filterDate
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime();
        case 'date-asc':
          return new Date(a.saleDate).getTime() - new Date(b.saleDate).getTime();
        case 'price-desc':
          return b.salePrice - a.salePrice;
        case 'price-asc':
          return a.salePrice - b.salePrice;
        case 'name-asc':
          return a.productName.localeCompare(b.productName);
        case 'name-desc':
          return b.productName.localeCompare(a.productName);
        default:
          return 0;
      }
    });

    setFilteredSales(filtered);
  }, [sales, searchTerm, dateFilter, sortBy]);

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cash': return '💵 Efectivo';
      case 'transfer': return '🏦 Transferencia';
      case 'check': return '📄 Cheque';
      case 'card': return '💳 Tarjeta';
      default: return method;
    }
  };

  const getDeliveryMethodLabel = (method: string) => {
    switch (method) {
      case 'pickup': return '🏪 Retiro en Tienda';
      case 'delivery': return '🚚 Entrega a Domicilio';
      default: return method;
    }
  };

  const getTotalSales = () => {
    return filteredSales.reduce((total, sale) => total + sale.salePrice, 0);
  };

  const exportToCSV = () => {
    const headers = [
      'Fecha de Venta',
      'Producto',
      'Comprador',
      'Teléfono',
      'Precio',
      'Método de Pago',
      'Método de Entrega'
    ];

    const csvData = filteredSales.map(sale => [
      sale.saleDate,
      sale.productName,
      sale.buyerName,
      sale.buyerPhone,
      sale.salePrice.toString(),
      getPaymentMethodLabel(sale.paymentMethod),
      getDeliveryMethodLabel(sale.deliveryMethod)
    ]);

    const csv = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ventas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user || user.role !== 'owner') {
    return (
      <div className="mg-app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="mg-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--mg-text)', marginBottom: '1rem' }}>⛔ Acceso Restringido</h2>
          <p style={{ color: 'var(--mg-text-muted)', marginBottom: '1.5rem' }}>
            Solo los dueños pueden ver los registros de ventas
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
                <h1 className="mg-title">📊 Registros de Ventas</h1>
                <p className="mg-subtitle">Historial completo de transacciones</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <DropdownMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mg-container mg-section">
        {/* Resumen */}
        <div className="mg-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--mg-primary)' }}>
                {filteredSales.length}
              </div>
              <div style={{ color: 'var(--mg-text-muted)', fontSize: '0.9rem' }}>Total Ventas</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--mg-secondary)' }}>
                ${getTotalSales().toLocaleString('es-AR')}
              </div>
              <div style={{ color: 'var(--mg-text-muted)', fontSize: '0.9rem' }}>Ingresos Totales</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--mg-accent)' }}>
                ${filteredSales.length > 0 ? Math.round(getTotalSales() / filteredSales.length).toLocaleString('es-AR') : 0}
              </div>
              <div style={{ color: 'var(--mg-text-muted)', fontSize: '0.9rem' }}>Promedio por Venta</div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mg-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <div>
                <input
                  type="text"
                  placeholder="Buscar por producto, comprador o teléfono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    border: '2px solid var(--mg-border)', 
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    width: '300px'
                  }}
                />
              </div>
              
              <div>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="mg-select"
                  style={{ borderRadius: '50px' }}
                >
                  <option value="all">Todas las fechas</option>
                  <option value="today">Hoy</option>
                  <option value="week">Última semana</option>
                  <option value="month">Último mes</option>
                  <option value="year">Último año</option>
                </select>
              </div>

              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mg-select"
                  style={{ borderRadius: '50px' }}
                >
                  <option value="date-desc">Fecha: Más reciente</option>
                  <option value="date-asc">Fecha: Más antigua</option>
                  <option value="price-desc">Precio: Mayor a menor</option>
                  <option value="price-asc">Precio: Menor a mayor</option>
                  <option value="name-asc">Nombre: A-Z</option>
                  <option value="name-desc">Nombre: Z-A</option>
                </select>
              </div>
            </div>

            <button
              onClick={exportToCSV}
              className="mg-btn"
              style={{ 
                background: 'var(--mg-secondary)',
                color: 'white',
                borderRadius: '50px'
              }}
            >
              📥 Exportar CSV
            </button>
          </div>
        </div>

        {/* Tabla de Ventas */}
        {filteredSales.length > 0 ? (
          <div className="mg-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--mg-bg)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--mg-text)', borderBottom: '2px solid var(--mg-border)' }}>
                      Fecha
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--mg-text)', borderBottom: '2px solid var(--mg-border)' }}>
                      Producto
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--mg-text)', borderBottom: '2px solid var(--mg-border)' }}>
                      Comprador
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--mg-text)', borderBottom: '2px solid var(--mg-border)' }}>
                      Contacto
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, color: 'var(--mg-text)', borderBottom: '2px solid var(--mg-border)' }}>
                      Precio
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: 'var(--mg-text)', borderBottom: '2px solid var(--mg-border)' }}>
                      Pago
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: 'var(--mg-text)', borderBottom: '2px solid var(--mg-border)' }}>
                      Entrega
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((sale, index) => (
                    <tr key={sale.id} style={{ borderBottom: '1px solid var(--mg-border)' }}>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--mg-text)' }}>
                            {new Date(sale.saleDate).toLocaleDateString('es-AR')}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--mg-text-muted)' }}>
                            {new Date(sale.saleDate).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--mg-text)' }}>
                          {sale.productName}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--mg-text)' }}>
                            {sale.buyerName}
                          </div>
                          {sale.buyerEmail && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--mg-text-muted)' }}>
                              {sale.buyerEmail}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{ color: 'var(--mg-text)' }}>
                            📱 {sale.buyerPhone}
                          </div>
                          {sale.buyerAddress && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--mg-text-muted)' }}>
                              📍 {sale.buyerAddress}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: 'var(--mg-secondary)', fontSize: '1.1rem' }}>
                          ${sale.salePrice.toLocaleString('es-AR')}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div className="mg-badge" style={{ 
                          background: 'var(--mg-accent)', 
                          color: 'var(--mg-text)',
                          fontSize: '0.8rem'
                        }}>
                          {getPaymentMethodLabel(sale.paymentMethod)}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div className="mg-badge" style={{ 
                          background: 'var(--mg-accent)', 
                          color: 'var(--mg-text)',
                          fontSize: '0.8rem'
                        }}>
                          {getDeliveryMethodLabel(sale.deliveryMethod)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mg-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--mg-text)', marginBottom: '0.5rem' }}>
              No hay registros de ventas
            </h3>
            <p style={{ color: 'var(--mg-text-muted)', marginBottom: '1.5rem' }}>
              {searchTerm || dateFilter !== 'all' 
                ? 'No se encontraron ventas con los filtros aplicados' 
                : 'Comienza a registrar ventas desde el catálogo'}
            </p>
            {(searchTerm || dateFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setDateFilter('all');
                }}
                className="mg-btn mg-btn-secondary"
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SalesRecords;
