import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Buscar ganado..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1, maxWidth: '600px' }}>
      <div style={{ 
        position: 'relative', 
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        border: '1px solid #E0E0E0',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        height: '44px'
      }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: '0 12px',
            border: 'none',
            outline: 'none',
            fontSize: '0.95rem',
            background: 'transparent',
            height: '100%'
          }}
          onFocus={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.borderColor = '#4C8C5A';
              parent.style.boxShadow = '0 0 0 3px rgba(76, 140, 90, 0.1)';
            }
          }}
          onBlur={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.borderColor = '#E0E0E0';
              parent.style.boxShadow = 'none';
            }
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.25rem',
            background: '#4C8C5A',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2E5E3E';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#4C8C5A';
          }}
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
