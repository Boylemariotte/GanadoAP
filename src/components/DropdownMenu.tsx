import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface DropdownMenuProps {
  trigger?: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger }) => {
  const { user, logout, isOwner } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const defaultTrigger = (
    <button
      onClick={() => setIsOpen(!isOpen)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'white',
        border: '2px solid var(--mg-border)',
        borderRadius: '50px',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: 'var(--mg-text)',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'var(--mg-secondary)';
        e.currentTarget.style.color = 'var(--mg-secondary)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'var(--mg-border)';
        e.currentTarget.style.color = 'var(--mg-text)';
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>☰</span>
      <span>Menú</span>
      <span style={{ 
        marginLeft: '0.25rem',
        transition: 'transform 0.2s ease',
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
      }}>
        ▼
      </span>
    </button>
  );

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      {trigger || defaultTrigger}
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '0.5rem',
          background: 'white',
          border: '2px solid var(--mg-border)',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          minWidth: '220px',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Usuario Info */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid var(--mg-border)',
            background: 'var(--mg-bg)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--mg-secondary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700
              }}>
                {isOwner() ? '👨‍🌾' : '👤'}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--mg-text)', fontSize: '0.95rem' }}>
                  {user?.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--mg-text-muted)' }}>
                  {isOwner() ? 'Administrador' : 'Visitante'}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div style={{ padding: '0.5rem' }}>
            {/* Opciones básicas */}
            <button
              onClick={() => {
                window.location.href = '/';
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontSize: '0.9rem',
                color: 'var(--mg-text)',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--mg-bg)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              <span>📋</span>
              <span>Catálogo de Productos</span>
            </button>

            {/* Opciones de administrador */}
            {isOwner() && (
              <>
                <button
                  onClick={() => {
                    window.location.href = '/add-product';
                    setIsOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    color: 'var(--mg-text)',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--mg-bg)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  <span>➕</span>
                  <span>Añadir Producto</span>
                </button>

                <button
                  onClick={() => {
                    window.location.href = '/sales-records';
                    setIsOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    color: 'var(--mg-text)',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--mg-bg)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  <span>📊</span>
                  <span>Ver Ventas</span>
                </button>
              </>
            )}

            {/* Separador */}
            {isOwner() && (
              <div style={{
                height: '1px',
                background: 'var(--mg-border)',
                margin: '0.5rem 0'
              }} />
            )}

            {/* Opciones adicionales */}
            <button
              onClick={() => {
                // Aquí podrías añadir configuración
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontSize: '0.9rem',
                color: 'var(--mg-text)',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--mg-bg)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              <span>⚙️</span>
              <span>Configuración</span>
            </button>

            <button
              onClick={() => {
                // Aquí podrías añadir ayuda
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontSize: '0.9rem',
                color: 'var(--mg-text)',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--mg-bg)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              <span>❓</span>
              <span>Ayuda</span>
            </button>
          </div>

          {/* Separador antes de logout */}
          <div style={{
            height: '1px',
            background: 'var(--mg-border)',
            margin: '0.5rem 0'
          }} />

          {/* Logout */}
          <div style={{ padding: '0.5rem' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: '#ef4444',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontWeight: 600,
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#dc2626';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#ef4444';
              }}
            >
              <span>🚪</span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
