import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  User, 
  Menu,
  Plus,
  Settings,
  Folder, 
  Gift, 
  TrendingUp, 
  Truck, 
  HelpCircle 
} from 'lucide-react';

const NavBarLinks: React.FC = () => {
  const navigate = useNavigate();

  const navLinks = [
    {
      name: 'Categorías',
      icon: <Folder size={16} />,
      action: () => navigate('/'),
      badge: null,
      priority: 'neutral' // Botón neutro
    },
    {
      name: 'Administración',
      icon: <Settings size={16} />,
      action: () => navigate('/admin'),
      badge: null,
      priority: 'primary' // Botón importante
    },
    {
      name: 'Ofertas',
      icon: <Gift size={16} />,
      action: () => {
        // Scroll to products section
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      badge: 'HOT',
      priority: 'neutral' // Botón neutro
    },
    {
      name: 'Ayuda',
      icon: <HelpCircle size={16} />,
      action: () => {
        alert('Centro de ayuda: ¿Cómo comprar? ¿Cómo vender? Contacto');
      },
      badge: null,
      priority: 'neutral' // Botón neutro
    }
  ];

  const getButtonStyles = (priority: string) => {
    switch (priority) {
      case 'primary':
        return {
          background: '#C9A24A',
          color: '#2E2E2E',
          border: '1px solid #C9A24A',
          fontWeight: '700',
          boxShadow: '0 2px 4px rgba(201, 162, 74, 0.2)'
        };
      default:
        return {
          background: '#F0F0F0',
          color: '#2E2E2E',
          border: '1px solid #E0E0E0',
          fontWeight: '600'
        };
    }
  };

  const getHoverStyles = (priority: string) => {
    switch (priority) {
      case 'primary':
        return {
          background: '#B8931F',
          borderColor: '#B8931F',
          boxShadow: '0 4px 8px rgba(201, 162, 74, 0.3)'
        };
      default:
        return {
          background: '#E0E0E0',
          borderColor: '#4C8C5A'
        };
    }
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'nowrap'
    }}>
      {navLinks.map((link, index) => (
        <button
          key={index}
          onClick={link.action}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 16px',
            borderRadius: '999px', // Pills style
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
            whiteSpace: 'nowrap',
            minHeight: '40px',
            ...getButtonStyles(link.priority)
          }}
          onMouseEnter={(e) => {
            const hoverStyles = getHoverStyles(link.priority);
            Object.assign(e.currentTarget.style, hoverStyles);
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            const normalStyles = getButtonStyles(link.priority);
            Object.assign(e.currentTarget.style, normalStyles);
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', lineHeight: '1' }}>{link.icon}</span>
          <span className="mg-mobile-hidden" style={{ fontSize: '0.7rem', lineHeight: '1' }}>{link.name}</span>
          <span className="mg-desktop-hidden" style={{ fontSize: '0.7rem', lineHeight: '1' }}>{link.name.split(' ')[0]}</span>
          
          {link.badge && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: link.badge === 'HOT' ? '#E74C3C' : '#3498DB',
              color: 'white',
              fontSize: '0.6rem',
              fontWeight: '700',
              padding: '2px 6px',
              borderRadius: '6px',
              textTransform: 'uppercase',
              lineHeight: '1',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              {link.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default NavBarLinks;
