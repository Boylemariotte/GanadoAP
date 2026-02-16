import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DropdownMenu from './DropdownMenu';
import { CashMovement } from '../types/cash';
import {
  getCashMovements,
  createCashMovement,
  updateCashMovement,
  deleteCashMovement
} from '../services/cashService';
import { getSales } from '../services/saleService';
import { Sale } from '../types/sale';

// Sale interface is now imported from ../types/sale

const SalesRecords: React.FC = () => {
  const { user, isOwner } = useAuth();
  const navigate = useNavigate();
  const [sales, setSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Cash Register State
  const [cashMovements, setCashMovements] = useState<CashMovement[]>([]);
  const [showCashModal, setShowCashModal] = useState<{ show: boolean, type: 'inicio' | 'gasto', item?: CashMovement }>({ show: false, type: 'inicio' });
  const [showDenomModal, setShowDenomModal] = useState<{ show: boolean, type: 'billete' | 'moneda', item?: CashMovement }>({ show: false, type: 'billete' });
  const [cashFormData, setCashFormData] = useState<Partial<CashMovement>>({ concept: '', amount: 0, totalBills: 0, totalCoins: 0 });
  const [cashLoading, setCashLoading] = useState(true);

  // Sale Detail Modal State
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const detailModalRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!detailModalRef.current || !selectedSale) return;

    try {
      const element = detailModalRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Venta_${(selectedSale.id || selectedSale._id || '').toString().slice(-6).toUpperCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF');
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'owner') {
      navigate('/');
      return;
    }

    fetchSales();
    fetchCashMovements();
  }, [user, navigate]);

  const fetchSales = async () => {
    try {
      const data = await getSales();
      setSales(data);
      setFilteredSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const fetchCashMovements = async () => {
    try {
      const data = await getCashMovements();
      setCashMovements(data);
    } catch (error) {
      console.error('Error fetching cash movements:', error);
    } finally {
      setCashLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...sales];

    if (searchTerm) {
      filtered = filtered.filter(sale =>
        sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.buyerPhone.includes(searchTerm)
      );
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      switch (dateFilter) {
        case 'today': filterDate.setHours(0, 0, 0, 0); break;
        case 'week': filterDate.setDate(now.getDate() - 7); break;
        case 'month': filterDate.setMonth(now.getMonth() - 1); break;
        case 'year': filterDate.setFullYear(now.getFullYear() - 1); break;
      }
      filtered = filtered.filter(sale => new Date(sale.saleDate) >= filterDate);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc': return new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime();
        case 'date-asc': return new Date(a.saleDate).getTime() - new Date(b.saleDate).getTime();
        case 'price-desc': return b.salePrice - a.salePrice;
        case 'price-asc': return a.salePrice - b.salePrice;
        case 'name-asc': return a.productName.localeCompare(b.productName);
        case 'name-desc': return b.productName.localeCompare(a.productName);
        default: return 0;
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
    if (filteredSales.length === 0) {
      alert('No hay ventas para exportar');
      return;
    }

    const headers = ['ID', 'Fecha', 'Producto', 'Raza', 'Peso (kg)', 'Comprador', 'Teléfono', 'Email', 'Dirección', 'Precio', 'Método Pago', 'Vendedor'];
    const data = filteredSales.map(sale => [
      (sale.id || sale._id || '').toString().slice(-6).toUpperCase(),
      sale.saleDate,
      sale.productName,
      sale.breed,
      sale.weight,
      sale.buyerName,
      sale.buyerPhone,
      sale.buyerEmail || 'N/A',
      sale.buyerAddress || 'N/A',
      sale.salePrice,
      sale.paymentMethod,
      sale.sellerName || 'GANADERIA AP'
    ]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Ventas_GANADERIA_AP_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const getCashTotals = () => {
    const totalIncome = cashMovements
      .filter(m => m.category === 'inicio')
      .reduce((sum, m) => sum + (m.amount || 0), 0);

    const totalExpenses = cashMovements
      .filter(m => m.category === 'gasto')
      .reduce((sum, m) => sum + (m.amount || 0), 0);

    const totalBills = cashMovements.reduce((sum, m) => sum + (m.totalBills || 0), 0);
    const totalCoins = cashMovements.reduce((sum, m) => sum + (m.totalCoins || 0), 0);

    return {
      totalIncome,
      totalExpenses,
      finalBalance: totalIncome - totalExpenses,
      totalBills,
      totalCoins,
      billMovement: cashMovements.find(m => m.totalBills > 0 && m.amount === 0),
      coinMovement: cashMovements.find(m => m.totalCoins > 0 && m.amount === 0)
    };
  };

  const totals = getCashTotals();

  const handleCashAction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const activeItem = showCashModal.item || showDenomModal.item;
      if (activeItem?._id) {
        await updateCashMovement(activeItem._id, cashFormData);
      } else {
        const category = showCashModal.show ? showCashModal.type : 'inicio';
        await createCashMovement({ ...cashFormData, category });
      }
      setShowCashModal({ show: false, type: 'inicio' });
      setShowDenomModal({ show: false, type: 'billete' });
      setCashFormData({ concept: '', amount: 0, totalBills: 0, totalCoins: 0 });
      fetchCashMovements();
    } catch (error) {
      console.error('Error saving cash movement:', error);
    }
  };

  const handleDeleteCash = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este movimiento?')) {
      try {
        await deleteCashMovement(id);
        fetchCashMovements();
      } catch (error) {
        console.error('Error deleting cash movement:', error);
      }
    }
  };



  if (!user || user.role !== 'owner') {
    return <div className="mg-app">Acceso Restringido</div>;
  }

  return (
    <div className="mg-app">
      <header className="mg-header">
        <div className="mg-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="mg-title">📊 Registros de Ventas</h1>
            <p className="mg-subtitle">Gestión comercial y caja diaria</p>
          </div>
          <DropdownMenu />
        </div>
      </header>

      <main className="mg-container mg-section">
        {/* Resumen Comercial */}
        <div className="mg-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--mg-primary)' }}>{filteredSales.length}</div>
              <div style={{ color: 'var(--mg-text-muted)', fontSize: '0.9rem' }}>Ventas Realizadas</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--mg-secondary)' }}>${getTotalSales().toLocaleString('es-AR')}</div>
              <div style={{ color: 'var(--mg-text-muted)', fontSize: '0.9rem' }}>Ingresos por Ventas</div>
            </div>
          </div>
        </div>

        {/* --- SECCIÓN DE CAJA --- */}
        <div className="mg-card" style={{ padding: '0', marginBottom: '3rem', border: '2px solid var(--mg-primary)', overflow: 'hidden' }}>
          <div style={{ background: 'var(--mg-primary)', color: 'white', padding: '1rem', fontWeight: 800 }}>💼 CAJA DIARIA</div>

          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>

              {/* Columna Ingresos */}
              <div>
                <button
                  onClick={() => { setCashFormData({ concept: '', amount: 0, totalBills: 0, totalCoins: 0 }); setShowCashModal({ show: true, type: 'inicio' }); }}
                  className="mg-btn" style={{ background: 'var(--mg-accent)', color: 'var(--mg-primary)', width: '100%', marginBottom: '1rem', fontWeight: 800 }}
                >📥 AGREGAR CAJA</button>
                <div style={{ border: '1px solid var(--mg-border)', borderRadius: '8px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', fontSize: '0.7rem' }}>
                      <tr><th style={{ padding: '0.5rem', textAlign: 'left' }}>CONCEPTO</th><th style={{ padding: '0.5rem', textAlign: 'right' }}>MONTO</th><th style={{ width: '80px' }}></th></tr>
                    </thead>
                    <tbody>
                      {cashMovements.filter(m => m.category === 'inicio' && m.amount > 0).length > 0 ? (
                        cashMovements.filter(m => m.category === 'inicio' && m.amount > 0).map(m => (
                          <tr key={m._id} style={{ borderBottom: '1px solid var(--mg-border)', fontSize: '0.85rem' }}>
                            <td style={{ padding: '0.5rem' }}>{m.concept}</td>
                            <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 700, color: 'var(--mg-secondary)' }}>${(m.amount || 0).toLocaleString()}</td>
                            <td style={{ textAlign: 'center' }}>
                              <button onClick={() => {
                                setCashFormData(m);
                                setShowCashModal({ show: true, type: 'inicio', item: m });
                              }} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>✏️</button>
                              <button onClick={() => m._id && handleDeleteCash(m._id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
                            </td>
                          </tr>
                        ))
                      ) : (<tr><td colSpan={3} style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8' }}>Sin ingresos</td></tr>)}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Columna Gastos */}
              <div>
                <button
                  onClick={() => { setCashFormData({ concept: '', amount: 0, totalBills: 0, totalCoins: 0 }); setShowCashModal({ show: true, type: 'gasto' }); }}
                  className="mg-btn" style={{ background: '#fee2e2', color: '#dc2626', width: '100%', marginBottom: '1rem', fontWeight: 800 }}
                >📤 AGREGAR GASTOS</button>
                <div style={{ border: '1px solid var(--mg-border)', borderRadius: '8px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', fontSize: '0.7rem' }}>
                      <tr><th style={{ padding: '0.5rem', textAlign: 'left' }}>CONCEPTO</th><th style={{ padding: '0.5rem', textAlign: 'right' }}>MONTO</th><th style={{ width: '80px' }}></th></tr>
                    </thead>
                    <tbody>
                      {cashMovements.filter(m => m.category === 'gasto').length > 0 ? (
                        cashMovements.filter(m => m.category === 'gasto').map(m => (
                          <tr key={m._id} style={{ borderBottom: '1px solid var(--mg-border)', fontSize: '0.85rem' }}>
                            <td style={{ padding: '0.5rem' }}>{m.concept}</td>
                            <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 700, color: '#dc2626' }}>-${(m.amount || 0).toLocaleString()}</td>
                            <td style={{ textAlign: 'center' }}>
                              <button onClick={() => { setCashFormData(m); setShowCashModal({ show: true, type: 'gasto', item: m }); }} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>✏️</button>
                              <button onClick={() => m._id && handleDeleteCash(m._id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
                            </td>
                          </tr>
                        ))
                      ) : (<tr><td colSpan={3} style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8' }}>Sin gastos</td></tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Totales Resumen */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '1px solid var(--mg-border)', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ padding: '1rem', textAlign: 'center', background: '#f8fafc', borderRight: '1px solid var(--mg-border)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b' }}>TOTAL INGRESOS</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--mg-secondary)' }}>${totals.totalIncome.toLocaleString()}</div>
              </div>
              <div style={{ padding: '1rem', textAlign: 'center', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b' }}>TOTAL GASTOS</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#dc2626' }}>-${totals.totalExpenses.toLocaleString()}</div>
              </div>
            </div>

            <div style={{ background: 'var(--mg-primary)', color: 'white', padding: '1rem', textAlign: 'center', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, opacity: 0.8 }}>SALDO FINAL</div>
              <div style={{ fontSize: '2rem', fontWeight: 900 }}>${totals.finalBalance.toLocaleString()}</div>
            </div>

            {/* Divisas Visuales con Modal */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--mg-border)', borderRadius: '8px', textAlign: 'center', position: 'relative' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b' }}>BILLETES</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.25rem 0' }}>${totals.totalBills.toLocaleString()}</div>
                  {totals.billMovement && (
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        onClick={() => {
                          if (totals.billMovement) {
                            setCashFormData(totals.billMovement);
                            setShowDenomModal({ show: true, type: 'billete', item: totals.billMovement });
                          }
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                      >✏️</button>
                      <button
                        onClick={() => totals.billMovement?._id && handleDeleteCash(totals.billMovement._id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                      >🗑️</button>
                    </div>
                  )}
                </div>
                {!totals.billMovement && (
                  <button
                    onClick={() => {
                      setCashFormData({ concept: 'Control Billetes', amount: 0, totalBills: 0, totalCoins: 0 });
                      setShowDenomModal({ show: true, type: 'billete' });
                    }}
                    className="mg-btn"
                    style={{ fontSize: '0.7rem', width: '100%', padding: '0.4rem', borderRadius: '5px', cursor: 'pointer', background: 'var(--mg-bg)', border: '1px solid var(--mg-border)' }}
                  >Agregar Total Billetes</button>
                )}
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--mg-border)', borderRadius: '8px', textAlign: 'center', position: 'relative' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b' }}>MONEDAS</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.25rem 0' }}>${totals.totalCoins.toLocaleString()}</div>
                  {totals.coinMovement && (
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        onClick={() => {
                          if (totals.coinMovement) {
                            setCashFormData(totals.coinMovement);
                            setShowDenomModal({ show: true, type: 'moneda', item: totals.coinMovement });
                          }
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                      >✏️</button>
                      <button
                        onClick={() => totals.coinMovement?._id && handleDeleteCash(totals.coinMovement._id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                      >🗑️</button>
                    </div>
                  )}
                </div>
                {!totals.coinMovement && (
                  <button
                    onClick={() => {
                      setCashFormData({ concept: 'Control Monedas', amount: 0, totalBills: 0, totalCoins: 0 });
                      setShowDenomModal({ show: true, type: 'moneda' });
                    }}
                    className="mg-btn"
                    style={{ fontSize: '0.7rem', width: '100%', padding: '0.4rem', borderRadius: '5px', cursor: 'pointer', background: 'var(--mg-bg)', border: '1px solid var(--mg-border)' }}
                  >Agregar Total Monedas</button>
                )}
              </div>
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
                borderRadius: '50px',
                padding: '0.5rem 1.5rem'
              }}
            >
              📥 Exportar CSV
            </button>
          </div>
        </div>

        <div className="mg-card" style={{ padding: '0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left' }}>MINI</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>FECHA / CÓDIGO</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>ANIMAL / RAZA</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>PESO</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>CLIENTE</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>TELÉFONO</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>PRECIO</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(sale => {
                // Lógica de miniatura: Imagen > Video > Default
                const images = sale.images || [];
                const thumbnail = (images.length > 0)
                  ? images[0]
                  : (sale as any).videos && (sale as any).videos.length > 0
                    ? '/video-placeholder.png'
                    : '/cow-placeholder.png';

                const saleId = sale.id || sale._id || '';

                return (
                  <tr key={saleId || sale.productId} style={{ borderBottom: '1px solid var(--mg-border)', fontSize: '0.85rem' }}>
                    <td style={{ padding: '0.5rem 1rem' }}>
                      <img
                        src={thumbnail}
                        alt={sale.productName}
                        style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover', background: '#f1f5f9' }}
                        onError={(e) => { e.currentTarget.src = '/cow-placeholder.png'; }}
                      />
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700 }}>{new Date(sale.saleDate).toLocaleDateString()}</div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b' }}>#{saleId.toString().slice(-6).toUpperCase()}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700 }}>{sale.productName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sale.breed || 'N/A'}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>{sale.weight ? `${sale.weight}kg` : 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{sale.buyerName}</td>
                    <td style={{ padding: '1rem' }}>{sale.buyerPhone}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 800, color: 'var(--mg-secondary)' }}>
                      ${sale.salePrice.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        className="mg-btn"
                        style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem', borderRadius: '4px' }}
                        onClick={() => {
                          setSelectedSale(sale);
                          setShowDetailModal(true);
                        }}
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Caja (Sin campos de billetes/monedas) */}
      {showCashModal.show && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="mg-card" style={{ padding: '2rem', width: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>{showCashModal.item ? 'Editar' : 'Registrar'} {showCashModal.type === 'inicio' ? 'Ingreso' : 'Gasto'}</h3>
            <form onSubmit={handleCashAction}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Concepto</label>
                <input required value={cashFormData.concept} onChange={e => setCashFormData({ ...cashFormData, concept: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--mg-border)', borderRadius: '8px' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Monto</label>
                <input type="number" required value={cashFormData.amount} onChange={e => setCashFormData({ ...cashFormData, amount: Number(e.target.value) })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--mg-border)', borderRadius: '8px', fontWeight: 700 }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="mg-btn mg-btn-primary" style={{ flex: 1 }}>Guardar</button>
                <button type="button" onClick={() => setShowCashModal({ show: false, type: 'inicio' })} className="mg-btn mg-btn-secondary" style={{ flex: 1 }}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Denominaciones */}
      {showDenomModal.show && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="mg-card" style={{ padding: '2rem', width: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>{showDenomModal.item ? 'Editar' : 'Registrar'} Total {showDenomModal.type === 'billete' ? 'Billetes' : 'Monedas'}</h3>
            <form onSubmit={handleCashAction}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Concepto</label>
                <input required value={cashFormData.concept} onChange={e => setCashFormData({ ...cashFormData, concept: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--mg-border)', borderRadius: '8px' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Monto {showDenomModal.type === 'billete' ? 'en Billetes' : 'en Monedas'}</label>
                <input
                  type="number" required
                  value={showDenomModal.type === 'billete' ? cashFormData.totalBills : cashFormData.totalCoins}
                  onChange={e => setCashFormData({
                    ...cashFormData,
                    amount: 0,
                    totalBills: showDenomModal.type === 'billete' ? Number(e.target.value) : 0,
                    totalCoins: showDenomModal.type === 'moneda' ? Number(e.target.value) : 0
                  })}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--mg-border)', borderRadius: '8px', fontWeight: 700 }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="mg-btn mg-btn-primary" style={{ flex: 1 }}>Guardar</button>
                <button type="button" onClick={() => setShowDenomModal({ show: false, type: 'billete' })} className="mg-btn mg-btn-secondary" style={{ flex: 1 }}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detalle de Venta */}
      {showDetailModal && selectedSale && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
          <div className="mg-card" style={{
            width: '100%',
            maxWidth: '500px',
            maxHeight: '85vh',
            position: 'relative',
            background: 'white',
            borderRadius: 'var(--mg-radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            {/* Top Buttons (Fixed relative to card) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 100 }}>
              <button
                onClick={handleDownloadPDF}
                className="mg-btn"
                style={{
                  background: 'var(--mg-secondary)',
                  color: 'white',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  borderRadius: '20px'
                }}
              >
                📥 PDF
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                style={{
                  background: 'white',
                  border: '1px solid var(--mg-border)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  color: '#64748b',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                ✕
              </button>
            </div>

            {/* Inset Scrollable Area */}
            <div className="mg-scrollbar" style={{
              overflowY: 'auto',
              flex: 1,
              padding: '1.5rem',
              margin: '0.5rem', // Creates a small gap from card edge
              borderRadius: 'var(--mg-radius-md)'
            }}>
              <div ref={detailModalRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'white', padding: '1rem' }}>
                {/* Header con Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid var(--mg-border)', paddingBottom: '1rem' }}>
                  <img
                    src="/logo.png"
                    alt="Logo"
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--mg-primary)', margin: 0 }}>GANADERIA AP</h2>
                </div>

                <div style={{ textAlign: 'center', padding: '0.5rem', background: 'var(--mg-bg)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
                  DETALLE DE VENTA #{(selectedSale.id || selectedSale._id || '').toString().slice(-6).toUpperCase()}
                </div>

                {/* Datos del Cliente */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>👤 DATOS DEL COMPRADOR</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ fontSize: '0.9rem' }}><strong>Nombre:</strong> {selectedSale.buyerName}</div>
                    <div style={{ fontSize: '0.9rem' }}><strong>Teléfono:</strong> {selectedSale.buyerPhone}</div>
                    {selectedSale.buyerEmail && <div style={{ fontSize: '0.9rem' }}><strong>Email:</strong> {selectedSale.buyerEmail}</div>}
                    {selectedSale.buyerAddress && <div style={{ fontSize: '0.9rem' }}><strong>Dirección:</strong> {selectedSale.buyerAddress}</div>}
                  </div>
                </div>

                {/* Datos del Vendedor */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--mg-border)', paddingTop: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>🤝 DATOS DEL VENDEDOR</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ fontSize: '0.9rem' }}><strong>Vendedor:</strong> {selectedSale.sellerName || 'GANADERIA AP'}</div>
                    <div style={{ fontSize: '0.9rem' }}><strong>Contacto:</strong> {selectedSale.sellerContact || 'N/A'}</div>
                  </div>
                </div>

                {/* Datos de la Venta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--mg-border)', paddingTop: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>💰 RESUMEN DE COMPRA</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--mg-primary)', color: 'white', padding: '0.75rem 1rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{selectedSale.productName}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>${selectedSale.salePrice.toLocaleString()}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="mg-btn mg-btn-primary"
                    style={{ padding: '0.8rem 2rem', borderRadius: '12px' }}
                  >
                    Cerrar Detalle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesRecords;
