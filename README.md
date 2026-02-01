# Mercado de Ganado

Un marketplace profesional y elegante para la venta de ganado, desarrollado con React y Tailwind CSS.

## Características

- **Diseño Minimalista y Elegante**: Interfaz limpia con colores claros y profundos
- **Totalmente Responsivo**: Funciona perfectamente en dispositivos móviles y desktop
- **Filtros Avanzados**: Filtra por categoría (ganado, caballos, cabras, ovejas, cerdos)
- **Ordenamiento**: Ordena por precio o edad
- **Galería de Imágenes**: Vista detallada con múltiples imágenes por producto
- **Información Completa**: Detalles de salud, vacunas, ubicación y vendedor
- **Calificaciones**: Sistema de calificación de vendedores
- **Rendimiento Optimizado**: Construido con React y TypeScript

## Tecnologías

- **React 18** - Framework frontend
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS para diseño moderno
- **React Router** - Navegación entre páginas
- **Inter Font** - Tipografía moderna

## Estructura del Proyecto

```
src/
├── components/
│   ├── ProductCard.tsx      # Tarjeta de producto individual
│   ├── ProductDetail.tsx    # Vista detallada del producto
│   └── Marketplace.tsx      # Grid principal del marketplace
├── types/
│   └── livestock.ts         # Tipos de datos TypeScript
├── data/
│   └── mockData.ts          # Datos de ejemplo
├── App.tsx                  # Componente principal con routing
└── App.css                  # Estilos globales con Tailwind
```

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd ganado-marketplace
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

### `npm start`
Inicia la aplicación en modo desarrollo.
Abre [http://localhost:3000](http://localhost:3000) para verla.

### `npm test`
Inicia el test runner en modo interactivo.

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.

### `npm run eject`
**Nota: esta operación es irreversible.**
Expulsa la configuración de build si necesitas personalizarla.

## Características del Diseño

- **Paleta de Colores**: Grises elegantes con acentos sutiles
- **Tipografía**: Inter font para máxima legibilidad
- **Espaciado**: Diseño con amplio whitespace para respiración visual
- **Microinteracciones**: Hover effects y transiciones suaves
- **Cards Modernas**: Diseño de tarjetas con sombras suaves y bordes redondeados

## Datos de Ejemplo

La aplicación incluye 6 productos de ejemplo con información realista:
- Ganado (Angus, Hereford)
- Caballos (Criollo)
- Cabras (Saanen)
- Ovejas (Merino)
- Cerdos (Yorkshire)

## Deploy

Para hacer deploy a producción:

1. Construye la aplicación:
```bash
npm run build
```

2. Deploy la carpeta `build` a tu servicio de hosting preferido (Vercel, Netlify, etc.).

## Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
