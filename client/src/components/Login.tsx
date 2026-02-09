import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="mg-app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="mg-card" style={{ padding: '3rem', maxWidth: '500px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/logo.png" 
            alt="GANADERIA AP Logo" 
            style={{ height: '100px', width: 'auto', borderRadius: '50%', marginBottom: '1.5rem' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <h1 className="mg-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>GANADERIA AP</h1>
          <p className="mg-subtitle">Sistema de Gestión Ganadera</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--mg-text)' }}>
            Seleccionar tipo de acceso:
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              onClick={() => login('user')}
              className="mg-btn mg-btn-primary"
              style={{ 
                padding: '1.25rem', 
                fontSize: '1.1rem',
                background: 'var(--mg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>👤</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800 }}>Entrar como Visitante</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Ver catálogo de ganado disponible</div>
              </div>
            </button>

            <button 
              onClick={() => login('owner')}
              className="mg-btn"
              style={{ 
                padding: '1.25rem', 
                fontSize: '1.1rem',
                background: 'var(--mg-secondary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>👨‍🌾</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800 }}>Entrar como Dueño</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Administrar productos y ventas</div>
              </div>
            </button>
          </div>
        </div>

        <div style={{ 
          padding: '1rem', 
          background: 'var(--mg-accent)', 
          borderRadius: '12px', 
          fontSize: '0.85rem', 
          color: 'var(--mg-text-muted)',
          textAlign: 'center'
        }}>
          💡 <strong>Visitantes:</strong> Pueden ver todo el catálogo<br/>
          💡 <strong>Dueños:</strong> Pueden añadir productos y registrar ventas
        </div>
      </div>
    </div>
  );
};

export default Login;
