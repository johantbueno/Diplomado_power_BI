# Diplomado Power BI - Johan Tapia, PhD

Web oficial del Diplomado completo de Power BI e Inteligencia de Negocios, impartido por Johan Tapia, PhD.

## 🚀 Características

- **Diseño moderno y responsive** con modo claro/oscuro
- **Buscador global** con resultados categorizados
- **Quiz interactivo** con 20 preguntas y feedback
- **Dashboards demo** interactivos con ECharts.js
- **Videos tutoriales** embebidos de YouTube
- **Formulario de contacto** funcional
- **SEO optimizado** con meta tags y sitemap

## 📁 Estructura del Proyecto

```
powerbi-diplomado/
├── index.html              # Landing page principal
├── programa.html           # Contenido del diplomado con acordeones
├── temas.html              # Listado de temas por módulos
├── practicas.html          # Prácticas y ejercicios
├── dashboards.html         # Dashboards demo interactivos
├── quiz.html               # Quiz de autoevaluación
├── recursos.html           # Videos y documentación
├── sobre.html              # Información del facilitador
├── contacto.html           # Formulario de contacto
├── 404.html                # Página de error personalizada
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   └── main.js             # JavaScript con todas las funcionalidades
├── data/
│   ├── ventas.json         # Dataset de ventas para dashboards
│   └── rrhh.json           # Dataset de recursos humanos
├── assets/
│   └── images/             # Recursos de imagen
├── sitemap.xml             # Mapa del sitio para SEO
├── robots.txt              # Configuración para crawlers
└── README.md               # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con variables CSS y animaciones
- **JavaScript ES6+** - Funcionalidades interactivas
- **ECharts.js** - Gráficos y dashboards interactivos
- **Tailwind CSS** (conceptos) - Diseño responsive

## 🚀 Instalación y Ejecución Local

### Opción 1: Python (Recomendado)

```bash
# Navegar al directorio del proyecto
cd powerbi-diplomado

# Servidor Python 3
python -m http.server 8000

# Abrir en el navegador
http://localhost:8000
```

### Opción 2: Node.js

```bash
# Instalar serve globalmente
npm install -g serve

# Servir el proyecto
serve .

# Abrir en el navegador
http://localhost:3000
```

### Opción 3: Live Server (VS Code)

1. Abrir VS Code
2. Instalar extensión "Live Server"
3. Click derecho en `index.html` → "Open with Live Server"

## 📦 Despliegue

### GitHub Pages

1. Subir proyecto a GitHub:
```bash
git init
git add .
git commit -m "Diplomado Power BI - Sitio Web"
git remote add origin https://github.com/tu-usuario/powerbi-diplomado.git
git push -u origin main
```

2. Configurar GitHub Pages:
   - Ir a Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Save

3. Tu sitio estará disponible en: `https://tu-usuario.github.io/powerbi-diplomado/`

### Hostinger (u otro hosting)

1. Comprimir todos los archivos en un ZIP
2. Subir vía cPanel File Manager o FTP
3. Extraer en el directorio `public_html/`
4. El sitio estará disponible en tu dominio

## 🔧 Personalización

### Cambiar información del facilitador

Editar `js/main.js` → línea de LinkedIn:
```javascript
// En la sección de SearchEngine o directamente en sobre.html
<a href="https://www.linkedin.com/in/TU-USUARIO-AQUI/" target="_blank" rel="noopener">
```

### Modificar datasets

Los datasets están en `data/ventas.json` y `data/rrhh.json`. Puedes:
- Agregar más registros
- Modificar campos
- Crear nuevos datasets

### Cambiar colores

Editar `css/styles.css` → variables CSS:
```css
:root {
  --color-primary: #1e40af;     /* Azul principal */
  --color-secondary: #f59e0b;   /* Amarillo/Anaranjado */
  --color-accent: #10b981;      /* Verde éxito */
  // ... más variables
}
```

## 📊 Funcionalidades Implementadas

### 1. Buscador Global
- Búsqueda en tiempo real
- Resultados categorizados (Tema, Práctica, Recurso, Glosario)
- Resaltado de coincidencias

### 2. Quiz Interactivo
- 20 preguntas de opción múltiple
- Feedback por pregunta con explicación
- Puntuación y tiempo de finalización
- Guardado de progreso en localStorage
- Revisión de respuestas

### 3. Dashboards Demo
- Dashboard de Ventas con KPIs
- Dashboard de RRHH con métricas
- Gráficos interactivos con ECharts
- Filtros funcionales
- Tablas con datos ordenables

### 4. Modo Oscuro/Claro
- Toggle en el header
- Persistencia en localStorage
- Transiciones suaves

### 5. Formulario de Contacto
- Validación de campos
- Estados de carga
- Mensajes de éxito/error
- Diseño responsive

## 🎯 SEO y Performance

### Optimizaciones implementadas:
- Meta tags OpenGraph y Twitter Cards
- Sitemap.xml automático
- Robots.txt configurado
- Lazy loading de imágenes
- CSS y JS minimizados
- Favicon optimizado
- Estructura semántica HTML5

## 📱 Responsive Design

El sitio es 100% responsive con:
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px, 1200px
- Menú hamburguesa en móvil
- Tipografía escalable
- Touch-friendly buttons

## 🔄 Actualizaciones

Para actualizar el contenido:

1. **Programa**: Editar `programa.html`
2. **Recursos**: Editar `recursos.html`
3. **Videos**: Cambiar URLs de YouTube en `recursos.html`
4. **Datasets**: Modificar archivos JSON en `data/`

## 🐛 Solución de Problemas

### Dashboards no cargan
- Verificar que ECharts esté cargado: `https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js`
- Revisar consola del navegador (F12)
- Verificar que los archivos JSON estén en `data/`

### Formulario no envía
- El formulario simula el envío (no tiene backend real)
- Para producción, integrar con Formspree, Netlify Forms o backend propio

### Buscador no funciona
- Verificar que `main.js` esté cargado
- Revisar consola por errores de JavaScript

## ✅ Estado del Proyecto

**✅ VERSION 2.0 - COMPLETAMENTE FUNCIONAL**

Todas las correcciones solicitadas han sido implementadas:
- ✅ Información académica del facilitador actualizada
- ✅ Quiz interactivo 100% funcional
- ✅ Retos de 21 días completos agregados
- ✅ Todos los acordeones funcionando
- ✅ Diseño responsive verificado
- ✅ Cero errores en consola

## 📄 Licencia

Este proyecto es de uso libre para fines educativos.

---

**Desarrollado para el Diplomado Power BI - Johan Tapia, PhD**

¿Preguntas? Contacta a través de la página de contacto o LinkedIn.

## 📝 Cambios Recientes (v2.0)

Ver archivo `CHANGES.md` para el detalle completo de todas las correcciones y mejoras implementadas.

**Fecha de actualización**: 8 de enero de 2024

