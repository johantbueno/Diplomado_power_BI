/**
 * ========================================
 * POWER BI DIPLOMADO - JAVASCRIPT PRINCIPAL
 * ========================================
 */

// ========================================
// CONFIGURACIÓN Y UTILIDADES
// ========================================

const CONFIG = {
  STORAGE_KEY: 'powerbi_diplomado',
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300
};

// Utilidad para debounce
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ========================================
// GESTIÓN DE TEMA (CLARO/OSCURO)
// ========================================

class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.bindEvents();
  }

  bindEvents() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }
}

// ========================================
// NAVEGACIÓN MÓVIL
// ========================================

class Navigation {
  constructor() {
    this.init();
  }

  init() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });

      // Cerrar menú al hacer clic en un enlace
      const navLinks = navMenu.querySelectorAll('.nav__link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
        });
      });
    }

    // Header sticky
    this.initStickyHeader();
  }

  initStickyHeader() {
    const header = document.querySelector('.header');
    if (header) {
      let lastScroll = 0;
      
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        
        lastScroll = currentScroll;
      });
    }
  }
}

// ========================================
// BUSCADOR GLOBAL
// ========================================

class SearchEngine {
  constructor() {
    this.searchIndex = [];
    this.init();
  }

  init() {
    this.buildIndex();
    this.bindEvents();
  }

  buildIndex() {
    // Contenido indexado para búsqueda
    this.searchIndex = [
      // Temas
      { type: 'Tema', title: 'Inteligencia de Negocios', url: 'programa.html#tema1', content: 'Conceptos fundamentales de Business Intelligence, arquitectura y componentes' },
      { type: 'Tema', title: 'Power BI Desktop', url: 'programa.html#tema2', content: 'Conociendo las capas de Power BI: Power Query, Power Pivot, Power View' },
      { type: 'Tema', title: 'Casos de Uso', url: 'programa.html#tema3', content: 'Aplicaciones prácticas y casos reales de Power BI' },
      { type: 'Tema', title: 'Complementos Avanzados', url: 'programa.html#tema4', content: 'Filtros avanzados, tooltips, cross-filter y personalización' },
      
      // Prácticas
      { type: 'Práctica', title: 'Conexiones y Extracción', url: 'practicas.html#practica1', content: 'Práctica de conexión a fuentes de datos con Power Query' },
      { type: 'Práctica', title: 'Transformaciones y Lenguaje M', url: 'practicas.html#practica2', content: 'Transformación de datos usando lenguaje M en Power Query' },
      { type: 'Práctica', title: 'Modelado DAX', url: 'practicas.html#practica3', content: 'Modelado de tablas y medidas con DAX en Power Pivot' },
      { type: 'Práctica', title: 'Visualizaciones', url: 'practicas.html#practica4', content: 'Creación de visualizaciones en Power View' },
      
      // Recursos
      { type: 'Recurso', title: 'Videos Power BI', url: 'recursos.html', content: 'Colección de videos tutoriales de Power BI oficial' },
      { type: 'Recurso', title: 'Documentación DAX', url: 'recursos.html', content: 'Guía de referencia del lenguaje DAX' },
      { type: 'Recurso', title: 'Power Query M', url: 'recursos.html', content: 'Referencia del lenguaje M de Power Query' },
      
      // Glosario
      { type: 'Glosario', title: 'ETL', url: 'programa.html#glosario', content: 'Extract, Transform, Load - Proceso de extracción, transformación y carga de datos' },
      { type: 'Glosario', title: 'DAX', url: 'programa.html#glosario', content: 'Data Analysis Expressions - Lenguaje de fórmulas de Power BI' },
      { type: 'Glosario', title: 'Data Warehouse', url: 'programa.html#glosario', content: 'Almacén de datos estructurado para análisis' },
      { type: 'Glosario', title: 'Modelo Estrella', url: 'programa.html#glosario', content: 'Esquema dimensional con tabla de hechos central' },
      { type: 'Glosario', title: 'Power Query', url: 'programa.html#glosario', content: 'Herramienta de transformación y limpieza de datos' },
      { type: 'Glosario', title: 'Power Pivot', url: 'programa.html#glosario', content: 'Capa de modelado de datos y relaciones' },
      { type: 'Glosario', title: 'Power View', url: 'programa.html#glosario', content: 'Capa de visualización y reportes de Power BI' }
    ];
  }

  bindEvents() {
    const searchInput = document.querySelector('.nav__search input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        this.performSearch(e.target.value);
      }, CONFIG.DEBOUNCE_DELAY));
    }
  }

  performSearch(query) {
    if (!query || query.length < 2) {
      this.hideResults();
      return;
    }

    // Buscar en índice local
    let results = this.searchIndex.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    );

    // Si existe base de datos, buscar también en contenido teórico
    if (window.powerbiDB) {
      const contenidoResults = window.powerbiDB.searchContenido(query);
      contenidoResults.forEach(item => {
        results.push({
          type: 'Contenido Teórico',
          title: `${item.unidad} - ${item.titulo}`,
          url: 'programa_completo.html',
          content: item.contenido.substring(0, 150) + '...'
        });
      });
    }

    this.displayResults(results, query);
  }

  displayResults(results, query) {
    // Crear o actualizar contenedor de resultados
    let resultsContainer = document.querySelector('.search-results');
    
    if (!resultsContainer) {
      resultsContainer = document.createElement('div');
      resultsContainer.className = 'search-results';
      resultsContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        max-height: 400px;
        overflow-y: auto;
        z-index: 1001;
        margin-top: 0.5rem;
      `;
      
      const searchContainer = document.querySelector('.nav__search');
      searchContainer.style.position = 'relative';
      searchContainer.appendChild(resultsContainer);
    }

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 1rem; text-align: center; color: #64748b;">
          No se encontraron resultados para "${query}"
        </div>
      `;
      return;
    }

    const resultsHTML = results.map(result => `
      <div style="padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: background 0.2s;" 
           onmouseover="this.style.background='#f8fafc'" 
           onmouseout="this.style.background='white'"
           onclick="window.location.href='${result.url}'">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span style="background: #3b82f6; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600;">
            ${result.type}
          </span>
          <strong style="color: #1e293b;">${this.highlightMatch(result.title, query)}</strong>
        </div>
        <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.4;">
          ${this.highlightMatch(result.content, query)}
        </p>
      </div>
    `).join('');

    resultsContainer.innerHTML = resultsHTML;
  }

  highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: #fef3c7; padding: 0.1rem 0.2rem; border-radius: 0.25rem;">$1</mark>');
  }

  hideResults() {
    const resultsContainer = document.querySelector('.search-results');
    if (resultsContainer) {
      resultsContainer.remove();
    }
  }
}

// ========================================
// ACORDEONES
// ========================================

class Accordion {
  constructor(selector) {
    this.accordion = document.querySelector(selector);
    if (this.accordion) {
      this.init();
    }
  }

  init() {
    const items = this.accordion.querySelectorAll('.accordion__item');
    
    items.forEach(item => {
      const header = item.querySelector('.accordion__header');
      if (header) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Cerrar todos los items
          items.forEach(i => i.classList.remove('active'));
          
          // Abrir el item clickeado si no estaba activo
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }
}

// ========================================
// QUIZ / AUTOEVALUACIÓN
// ========================================

class Quiz {
  constructor() {
    this.questions = [
      {
        question: "¿Qué significa BI en el contexto de Power BI?",
        options: [
          "Business Intelligence (Inteligencia de Negocios)",
          "Binary Information (Información Binaria)",
          "Basic Integration (Integración Básica)",
          "Business Innovation (Innovación Empresarial)"
        ],
        correct: 0,
        explanation: "BI significa Business Intelligence o Inteligencia de Negocios, que es el conjunto de metodologías y tecnologías para transformar datos en información estratégica."
      },
      {
        question: "¿Cuál es el propósito principal de Power Query?",
        options: [
          "Crear visualizaciones y gráficos",
          "Conectar y transformar datos de diversas fuentes",
          "Definir relaciones entre tablas",
          "Publicar reportes en la nube"
        ],
        correct: 1,
        explanation: "Power Query es la herramienta de ETL (Extract, Transform, Load) de Power BI que permite conectar, limpiar y transformar datos de múltiples fuentes."
      },
      {
        question: "¿Qué lenguaje se utiliza en Power Pivot para crear medidas?",
        options: [
          "SQL",
          "Python",
          "DAX (Data Analysis Expressions)",
          "R"
        ],
        correct: 2,
        explanation: "DAX (Data Analysis Expressions) es el lenguaje de fórmulas utilizado en Power Pivot para crear medidas, columnas calculadas y tablas."
      },
      {
        question: "En un modelo estrella, ¿qué tipo de tabla contiene las métricas?",
        options: [
          "Tabla de dimensiones",
          "Tabla de hechos",
          "Tabla de referencia",
          "Tabla maestra"
        ],
        correct: 1,
        explanation: "La tabla de hechos (Fact Table) contiene las métricas o medidas que se van a analizar, mientras que las tablas de dimensiones contienen los atributos descriptivos."
      },
      {
        question: "¿Qué función DAX se utiliza para sumar todos los valores de una columna?",
        options: [
          "COUNT()",
          "SUM()",
          "TOTAL()",
          "ADD()"
        ],
        correct: 1,
        explanation: "La función SUM() en DAX se utiliza para sumar todos los valores numéricos de una columna específica."
      },
      {
        question: "¿Cuál es la diferencia entre Power BI Desktop y Power BI Service?",
        options: [
          "No hay diferencia, son lo mismo",
          "Desktop es para desarrollo, Service es para publicación y colaboración",
          "Service es más potente que Desktop",
          "Desktop solo funciona sin internet"
        ],
        correct: 1,
        explanation: "Power BI Desktop es la aplicación de escritorio para desarrollar reportes, mientras que Power BI Service es la plataforma en la nube para publicar, compartir y colaborar."
      },
      {
        question: "¿Qué significa ETL?",
        options: [
          "Extract, Transform, Load (Extraer, Transformar, Cargar)",
          "Evaluate, Test, Launch (Evaluar, Probar, Lanzar)",
          "Enable, Track, Log (Habilitar, Rastrear, Registrar)",
          "Execute, Transfer, Link (Ejecutar, Transferir, Vincular)"
        ],
        correct: 0,
        explanation: "ETL significa Extract, Transform, Load, que es el proceso de extraer datos de fuentes, transformarlos y cargarlos en un destino."
      },
      {
        question: "¿En qué capa de Power BI se crean las visualizaciones?",
        options: [
          "Power Query",
          "Power Pivot",
          "Power View",
          "Power Service"
        ],
        correct: 2,
        explanation: "Power View es la capa de visualización de Power BI donde se crean gráficos, tablas y otros elementos visuales del reporte."
      },
      {
        question: "¿Qué tipo de relación es más común en modelos de datos de Power BI?",
        options: [
          "Uno a Uno (1:1)",
          "Uno a Muchos (1:N)",
          "Muchos a Muchos (N:N)",
          "Ninguna de las anteriores"
        ],
        correct: 1,
        explanation: "La relación Uno a Muchos (1:N) es la más común en modelos de datos de Power BI, donde una fila en la tabla 'uno' se relaciona con múltiples filas en la tabla 'muchos'."
      },
      {
        question: "¿Qué función DAX devuelve el año de una fecha?",
        options: [
          "GETYEAR()",
          "YEAR()",
          "DATEYEAR()",
          "EXTRACTYEAR()"
        ],
        correct: 1,
        explanation: "La función YEAR() en DAX devuelve el año de una fecha como un número entero."
      },
      {
        question: "¿Qué es un Data Warehouse?",
        options: [
          "Un almacén de datos físicos",
          "Una base de datos optimizada para transacciones",
          "Un repositorio centralizado de datos históricos para análisis",
          "Un servicio de almacenamiento en la nube"
        ],
        correct: 2,
        explanation: "Un Data Warehouse es un repositorio centralizado que almacena datos históricos estructurados y optimizados para consultas analíticas."
      },
      {
        question: "¿Qué característica permite filtrar datos en múltiples visualizaciones simultáneamente?",
        options: [
          "Cross-filtering",
          "Drill-down",
          "Slicing",
          "Dicing"
        ],
        correct: 0,
        explanation: "El cross-filtering permite que al seleccionar un elemento en una visualización, todos los demás elementos del reporte se filtren automáticamente."
      },
      {
        question: "¿Qué lenguaje se utiliza en Power Query para transformaciones avanzadas?",
        options: [
          "DAX",
          "M (Power Query Formula Language)",
          "SQL",
          "Python"
        ],
        correct: 1,
        explanation: "El lenguaje M, también conocido como Power Query Formula Language, se utiliza para crear transformaciones avanzadas de datos."
      },
      {
        question: "¿Cuál es el propósito de una tabla de calendario en Power BI?",
        options: [
          "Almacenar eventos importantes",
          "Facilitar análisis de tiempo y comparaciones periódicas",
          "Mostrar fechas en formato visual",
          "Calcular días hábiles"
        ],
        correct: 1,
        explanation: "Una tabla de calendario es esencial para análisis de tiempo en Power BI, permitiendo cálculos como YTD, QTD, MTD y comparaciones con períodos anteriores."
      },
      {
        question: "¿Qué servicio de Microsoft permite publicar reportes de Power BI en la nube?",
        options: [
          "Azure",
          "Office 365",
          "Power BI Service",
          "SharePoint"
        ],
        correct: 2,
        explanation: "Power BI Service es la plataforma de Microsoft para publicar, compartir y colaborar con reportes de Power BI en la nube."
      },
      {
        question: "¿Qué función DAX se usa para filtrar una tabla según una condición?",
        options: [
          "SELECT()",
          "FILTER()",
          "WHERE()",
          "SEARCH()"
        ],
        correct: 1,
        explanation: "La función FILTER() en DAX se utiliza para devolver una tabla filtrada según una condición especificada."
      },
      {
        question: "¿Qué tipo de gráfico es más adecuado para mostrar tendencias temporales?",
        options: [
          "Gráfico de barras",
          "Gráfico de líneas",
          "Gráfico circular",
          "Mapa de calor"
        ],
        correct: 1,
        explanation: "El gráfico de líneas es ideal para mostrar tendencias y cambios a lo largo del tiempo."
      },
      {
        question: "¿Qué significa Self-Service BI?",
        options: [
          "BI que funciona sin conexión a internet",
          "BI que los usuarios finales pueden crear sin soporte IT",
          "BI gratuito",
          "BI para uso personal"
        ],
        correct: 1,
        explanation: "Self-Service BI permite a los usuarios de negocios crear sus propios reportes y análisis sin depender del departamento de IT."
      },
      {
        question: "¿Qué componente de Power BI permite crear jerarquías de datos?",
        options: [
          "Power Query",
          "Power Pivot",
          "Power View",
          "Power Service"
        ],
        correct: 1,
        explanation: "Power Pivot permite crear jerarquías de datos que facilitan el drill-down y análisis en diferentes niveles de detalle."
      },
      {
        question: "¿Qué es el Row-Level Security (RLS) en Power BI?",
        options: [
          "Encriptación de filas de datos",
          "Restricción de acceso a datos según el usuario",
          "Validación de datos por fila",
          "Copia de seguridad automática"
        ],
        correct: 1,
        explanation: "Row-Level Security (RLS) es una función de seguridad que restringe el acceso a las filas de datos según las características del usuario."
      }
    ];
    
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    this.timeStarted = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadProgress();
  }

  bindEvents() {
    const startBtn = document.querySelector('.quiz__start');
    const nextBtn = document.querySelector('.quiz__next');
    const prevBtn = document.querySelector('.quiz__prev');
    const restartBtn = document.querySelector('.quiz__restart');

    if (startBtn) startBtn.addEventListener('click', () => this.start());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevQuestion());
    if (restartBtn) restartBtn.addEventListener('click', () => this.restart());
  }

  start() {
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    this.timeStarted = Date.now();
    this.showQuestion();
  }

  showQuestion() {
    const container = document.querySelector('.quiz__container');
    if (!container) return;

    const question = this.questions[this.currentQuestion];
    const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;

    container.innerHTML = `
      <div class="quiz__progress" style="margin-bottom: 2rem;">
        <div class="quiz__progress-bar" style="width: ${progress}%; height: 8px; background: linear-gradient(90deg, var(--color-primary), var(--color-accent)); border-radius: 4px; transition: width 0.3s ease;"></div>
      </div>
      
      <div class="quiz__card" style="max-width: 800px; margin: 0 auto;">
        <div class="quiz__question" style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; color: var(--color-dark);">
          ${this.currentQuestion + 1}. ${question.question}
        </div>
        
        <ul class="quiz__options" style="list-style: none; padding: 0; margin-bottom: 2rem;">
          ${question.options.map((option, index) => `
            <li class="quiz__option" style="margin-bottom: 0.75rem;">
              <input type="radio" id="option-${index}" name="answer" value="${index}" style="display: none;">
              <label for="option-${index}" style="display: block; padding: 1rem 1.5rem; border: 2px solid var(--color-gray-light); border-radius: 0.5rem; cursor: pointer; transition: all 0.3s ease; background: var(--color-light);">${option}</label>
            </li>
          `).join('')}
        </ul>
        
        <div class="quiz__actions" style="display: flex; justify-content: space-between; align-items: center;">
          <button class="btn btn--outline quiz__prev" style="padding: 0.75rem 1.5rem; ${this.currentQuestion === 0 ? 'opacity: 0.5; pointer-events: none;' : ''}">
            ← Anterior
          </button>
          <span class="quiz__counter" style="font-weight: 600; color: var(--color-gray);">
            ${this.currentQuestion + 1} / ${this.questions.length}
          </span>
          <button class="btn btn--primary quiz__next" style="padding: 0.75rem 1.5rem;" disabled>
            ${this.currentQuestion === this.questions.length - 1 ? 'Finalizar Quiz' : 'Siguiente →'}
          </button>
        </div>
      </div>
    `;

    this.bindQuestionEvents();
  }

  bindQuestionEvents() {
    const options = document.querySelectorAll('input[name="answer"]');
    const nextBtn = document.querySelector('.quiz__next');
    const labels = document.querySelectorAll('.quiz__option label');

    labels.forEach((label, index) => {
      label.addEventListener('click', () => {
        // Remove previous selections
        labels.forEach(l => {
          l.style.borderColor = 'var(--color-gray-light)';
          l.style.background = 'var(--color-light)';
          l.style.color = 'var(--color-dark)';
        });
        
        // Select current
        label.style.borderColor = 'var(--color-primary)';
        label.style.background = 'rgba(59, 130, 246, 0.1)';
        label.style.color = 'var(--color-primary)';
        
        // Check the radio button
        const radio = document.getElementById(`option-${index}`);
        radio.checked = true;
        
        // Enable next button
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        
        // Store answer
        this.answers[this.currentQuestion] = index;
      });
    });

    this.bindEvents();
  }

  nextQuestion() {
    if (this.answers[this.currentQuestion] === undefined) return;

    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.showQuestion();
    } else {
      this.finish();
    }
  }

  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.showQuestion();
    }
  }

  finish() {
    this.calculateScore();
    this.showResults();
    this.saveProgress();
    
    // Guardar en base de datos local
    if (window.powerbiDB) {
      window.powerbiDB.saveQuizResult(this.score, this.questions.length, this.answers);
    }
  }

  calculateScore() {
    this.score = this.answers.reduce((total, answer, index) => {
      return total + (answer === this.questions[index].correct ? 1 : 0);
    }, 0);
  }

  showResults() {
    const container = document.querySelector('.quiz__container');
    if (!container) return;

    const percentage = Math.round((this.score / this.questions.length) * 100);
    const timeElapsed = Math.round((Date.now() - this.timeStarted) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    let message = '';
    let messageClass = '';

    if (percentage >= 90) {
      message = '¡Excelente! Eres un experto en Power BI';
      messageClass = 'quiz__message--excellent';
    } else if (percentage >= 70) {
      message = '¡Muy bien! Tienes un buen conocimiento de Power BI';
      messageClass = 'quiz__message--good';
    } else if (percentage >= 50) {
      message = 'Bien, pero puedes mejorar. Revisa los materiales del diplomado';
      messageClass = 'quiz__message--average';
    } else {
      message = 'Necesitas estudiar más. Te recomendamos revisar el programa completo';
      messageClass = 'quiz__message--needs-improvement';
    }

    container.innerHTML = `
      <div class="quiz__result">
        <div class="quiz__score">${percentage}%</div>
        <p class="quiz__message ${messageClass}">${message}</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 2rem 0;">
          <div class="kpi-card">
            <div class="kpi-card__value">${this.score}/${this.questions.length}</div>
            <div class="kpi-card__label">Respuestas Correctas</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-card__value">${minutes}:${seconds.toString().padStart(2, '0')}</div>
            <div class="kpi-card__label">Tiempo Total</div>
          </div>
        </div>
        
        <div class="quiz__actions" style="justify-content: center; margin-top: 2rem;">
          <button class="btn btn--primary quiz__restart">Reintentar Quiz</button>
        </div>
        
        <div class="quiz__review" style="margin-top: 2rem; text-align: left;">
          <h3 style="margin-bottom: 1rem; color: var(--color-dark);">Revisión de Respuestas</h3>
          ${this.questions.map((q, index) => `
            <div style="margin-bottom: 1rem; padding: 1rem; border-radius: 0.5rem; background: ${this.answers[index] === q.correct ? '#dcfce7' : '#fef2f2'};">
              <strong>${index + 1}. ${q.question}</strong><br>
              <span style="color: ${this.answers[index] === q.correct ? '#16a34a' : '#dc2626'};">
                Tu respuesta: ${q.options[this.answers[index]]}
                ${this.answers[index] !== q.correct ? `<br>Correcta: ${q.options[q.correct]}` : ''}
              </span><br>
              <small style="color: var(--color-gray);">${q.explanation}</small>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  restart() {
    this.start();
  }

  saveProgress() {
    const progress = {
      score: this.score,
      total: this.questions.length,
      percentage: Math.round((this.score / this.questions.length) * 100),
      date: new Date().toISOString(),
      answers: this.answers
    };

    localStorage.setItem(`${CONFIG.STORAGE_KEY}_quiz_progress`, JSON.stringify(progress));
  }

  loadProgress() {
    const saved = localStorage.getItem(`${CONFIG.STORAGE_KEY}_quiz_progress`);
    if (saved) {
      const progress = JSON.parse(saved);
      // Mostrar último resultado si existe
      const lastResult = document.querySelector('.quiz__last-result');
      if (lastResult) {
        lastResult.innerHTML = `
          <div class="card">
            <h3>Último Intento</h3>
            <p><strong>Puntuación:</strong> ${progress.score}/${progress.total} (${progress.percentage}%)</p>
            <p><strong>Fecha:</strong> ${new Date(progress.date).toLocaleDateString()}</p>
          </div>
        `;
      }
    }
  }
}

// ========================================
// DASHBOARDS INTERACTIVOS
// ========================================

class Dashboard {
  constructor() {
    this.ventasData = null;
    this.rrhhData = null;
    this.currentFilters = {
      ventas: {},
      rrhh: {}
    };
    this.init();
  }

  async init() {
    await this.loadData();
    this.initVentasDashboard();
    this.initRRHHDashboard();
    this.bindEvents();
  }

  async loadData() {
    try {
      const [ventasResponse, rrhhResponse] = await Promise.all([
        fetch('./data/ventas.json'),
        fetch('./data/rrhh.json')
      ]);
      
      this.ventasData = await ventasResponse.json();
      this.rrhhData = await rrhhResponse.json();
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  }

  initVentasDashboard() {
    if (!this.ventasData) return;

    this.createKPICards('ventas', this.ventasData.kpis);
    this.createVentasChart();
    this.createVentasPorRegionChart();
    this.createVentasTable();
  }

  initRRHHDashboard() {
    if (!this.rrhhData) return;

    this.createKPICards('rrhh', this.rrhhData.kpis);
    this.createRRHHDistribucionChart();
    this.createRRHHSatisfaccionChart();
    this.createRRHHTable();
  }

  createKPICards(type, kpis) {
    const container = document.querySelector(`#${type}-kpis`);
    if (!container) return;

    let cards = '';
    
    if (type === 'ventas') {
      cards = `
        <div class="kpi-card">
          <div class="kpi-card__value">$${kpis.total_ventas.toLocaleString()}</div>
          <div class="kpi-card__label">Ventas Totales</div>
          <div class="kpi-card__change up">
            <span>↗</span> +12% vs mes anterior
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-card__value">${kpis.total_unidades}</div>
          <div class="kpi-card__label">Unidades Vendidas</div>
          <div class="kpi-card__change up">
            <span>↗</span> +8% vs mes anterior
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-card__value">${kpis.promedio_venta.toLocaleString()}</div>
          <div class="kpi-card__label">Venta Promedio</div>
          <div class="kpi-card__change down">
            <span>↘</span> -3% vs mes anterior
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-card__value">${kpis.categorias_top[0].nombre}</div>
          <div class="kpi-card__label">Categoría Top</div>
          <div class="kpi-card__change">
            $${kpis.categorias_top[0].monto.toLocaleString()}
          </div>
        </div>
      `;
    } else if (type === 'rrhh') {
      cards = `
        <div class="kpi-card">
          <div class="kpi-card__value">${kpis.total_empleados}</div>
          <div class="kpi-card__label">Total Empleados</div>
          <div class="kpi-card__change">
            ${kpis.empleados_activos} activos
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-card__value">${kpis.tasa_retencion}%</div>
          <div class="kpi-card__label">Tasa de Retención</div>
          <div class="kpi-card__change up">
            <span>↗</span> Excelente
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-card__value">${kpis.promedio_satisfaccion}/10</div>
          <div class="kpi-card__label">Satisfacción Promedio</div>
          <div class="kpi-card__change up">
            <span>↗</span> +0.5 vs trim anterior
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-card__value">$${kpis.promedio_salario.toLocaleString()}</div>
          <div class="kpi-card__label">Salario Promedio</div>
          <div class="kpi-card__change up">
            <span>↗</span> +5% vs año anterior
          </div>
        </div>
      `;
    }

    container.innerHTML = cards;
  }

  createVentasChart() {
    const container = document.querySelector('#ventas-chart');
    if (!container || typeof echarts === 'undefined') return;

    const chart = echarts.init(container);
    
    // Procesar datos por mes
    const monthlyData = this.processVentasByMonth();

    const option = {
      title: {
        text: 'Ventas por Mes',
        textStyle: { color: '#1e293b' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: ${c}'
      },
      xAxis: {
        type: 'category',
        data: monthlyData.months,
        axisLabel: { color: '#64748b' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { 
          color: '#64748b',
          formatter: '${value}'
        }
      },
      series: [{
        data: monthlyData.values,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#3b82f6', width: 3 },
        itemStyle: { color: '#3b82f6' },
        areaStyle: { 
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
            ]
          }
        }
      }]
    };

    chart.setOption(option);
    
    // Responsive
    window.addEventListener('resize', () => chart.resize());
  }

  createVentasPorRegionChart() {
    const container = document.querySelector('#ventas-region-chart');
    if (!container || typeof echarts === 'undefined') return;

    const chart = echarts.init(container);
    
    const data = this.ventasData.kpis.regiones_top.map(r => ({
      name: r.nombre,
      value: r.monto
    }));

    const option = {
      title: {
        text: 'Ventas por Región',
        textStyle: { color: '#1e293b' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: ${c} ({d}%)'
      },
      series: [{
        name: 'Ventas',
        type: 'pie',
        radius: ['40%', '70%'],
        data: data,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
  }

  createRRHHDistribucionChart() {
    const container = document.querySelector('#rrhh-distribucion-chart');
    if (!container || typeof echarts === 'undefined') return;

    const chart = echarts.init(container);
    
    const option = {
      title: {
        text: 'Distribución por Departamento',
        textStyle: { color: '#1e293b' }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'category',
        data: this.rrhhData.kpis.distribucion_departamento.map(d => d.departamento),
        axisLabel: { color: '#64748b' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#64748b' }
      },
      series: [{
        data: this.rrhhData.kpis.distribucion_departamento.map(d => d.cantidad),
        type: 'bar',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#1e40af' }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
  }

  createRRHHSatisfaccionChart() {
    const container = document.querySelector('#rrhh-satisfaccion-chart');
    if (!container || typeof echarts === 'undefined') return;

    const chart = echarts.init(container);
    
    // Procesar datos de satisfacción
    const satisfaccionData = this.rrhhData.empleados.map(e => e.satisfaccion);
    const histogram = this.createHistogram(satisfaccionData, 5);

    const option = {
      title: {
        text: 'Distribución de Satisfacción',
        textStyle: { color: '#1e293b' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: 'Satisfacción {b}: {c} empleados'
      },
      xAxis: {
        type: 'category',
        data: histogram.labels,
        axisLabel: { color: '#64748b' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#64748b' }
      },
      series: [{
        data: histogram.values,
        type: 'bar',
        itemStyle: {
          color: '#10b981',
          borderRadius: [4, 4, 0, 0]
        }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
  }

  createVentasTable() {
    const container = document.querySelector('#ventas-table');
    if (!container) return;

    const table = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
        <thead>
          <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
            <th style="padding: 1rem; text-align: left;">Fecha</th>
            <th style="padding: 1rem; text-align: left;">Producto</th>
            <th style="padding: 1rem; text-align: left;">Región</th>
            <th style="padding: 1rem; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${this.ventasData.ventas.slice(0, 10).map(v => `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 0.75rem 1rem;">${new Date(v.fecha).toLocaleDateString()}</td>
              <td style="padding: 0.75rem 1rem;">${v.producto}</td>
              <td style="padding: 0.75rem 1rem;">${v.region}</td>
              <td style="padding: 0.75rem 1rem; text-align: right; font-weight: 600;">$${v.total.toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    container.innerHTML = table;
  }

  createRRHHTable() {
    const container = document.querySelector('#rrhh-table');
    if (!container) return;

    const table = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
        <thead>
          <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
            <th style="padding: 1rem; text-align: left;">Nombre</th>
            <th style="padding: 1rem; text-align: left;">Departamento</th>
            <th style="padding: 1rem; text-align: left;">Puesto</th>
            <th style="padding: 1rem; text-align: right;">Salario</th>
            <th style="padding: 1rem; text-align: center;">Satisfacción</th>
          </tr>
        </thead>
        <tbody>
          ${this.rrhhData.empleados.slice(0, 10).map(e => `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 0.75rem 1rem;">${e.nombre}</td>
              <td style="padding: 0.75rem 1rem;">${e.departamento}</td>
              <td style="padding: 0.75rem 1rem;">${e.puesto}</td>
              <td style="padding: 0.75rem 1rem; text-align: right;">$${e.salario.toLocaleString()}</td>
              <td style="padding: 0.75rem 1rem; text-align: center;">
                <span style="background: ${e.satisfaccion >= 8 ? '#dcfce7' : e.satisfaccion >= 7 ? '#fef3c7' : '#fef2f2'}; 
                             color: ${e.satisfaccion >= 8 ? '#16a34a' : e.satisfaccion >= 7 ? '#d97706' : '#dc2626'}; 
                             padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.9rem;">
                  ${e.satisfaccion}/10
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    container.innerHTML = table;
  }

  processVentasByMonth() {
    const months = {};
    
    this.ventasData.ventas.forEach(venta => {
      const date = new Date(venta.fecha);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!months[monthKey]) {
        months[monthKey] = 0;
      }
      months[monthKey] += venta.total;
    });

    const sortedMonths = Object.keys(months).sort();
    
    return {
      months: sortedMonths.map(m => {
        const date = new Date(m + '-01');
        return date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
      }),
      values: sortedMonths.map(m => months[m])
    };
  }

  createHistogram(data, bins) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binSize = (max - min) / bins;
    
    const histogram = new Array(bins).fill(0);
    const labels = [];
    
    for (let i = 0; i < bins; i++) {
      const binStart = min + i * binSize;
      const binEnd = min + (i + 1) * binSize;
      labels.push(`${binStart.toFixed(1)}-${binEnd.toFixed(1)}`);
      
      data.forEach(value => {
        if (value >= binStart && (value < binEnd || (i === bins - 1 && value <= binEnd))) {
          histogram[i]++;
        }
      });
    }
    
    return { labels, values: histogram };
  }

  bindEvents() {
    // Filtros de dashboard
    const filterButtons = document.querySelectorAll('.dashboard__filter');
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        const value = e.target.dataset.value;
        
        // Toggle active state
        e.target.classList.toggle('active');
        
        // Apply filter logic here
        this.applyFilter(filter, value);
      });
    });
  }

  applyFilter(filter, value) {
    // Lógica de filtrado (simplificada)
    console.log(`Aplicando filtro: ${filter} = ${value}`);
    // En una implementación real, aquí se actualizarían los gráficos
  }
}

// ========================================
// ANIMACIONES DE SCROLL
// ========================================

class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.scroll-reveal');
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.elements.forEach(el => this.observer.observe(el));
  }
}

// ========================================
// FORMULARIO DE CONTACTO
// ========================================

class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  async submit() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Validación básica
    if (!data.nombre || !data.email || !data.mensaje) {
      this.showMessage('Por favor completa todos los campos requeridos.', 'error');
      return;
    }

    // Simular envío (en producción, esto iría a un servidor real)
    try {
      this.showLoading();
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.hideLoading();
      this.showMessage('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
      this.form.reset();
      
    } catch (error) {
      this.hideLoading();
      this.showMessage('Error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
    }
  }

  showLoading() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
    }
  }

  hideLoading() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enviar Mensaje';
    }
  }

  showMessage(text, type) {
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();

    const message = document.createElement('div');
    message.className = `form-message form-message--${type}`;
    message.style.cssText = `
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      background: ${type === 'success' ? '#dcfce7' : '#fef2f2'};
      color: ${type === 'success' ? '#16a34a' : '#dc2626'};
      border: 1px solid ${type === 'success' ? '#bbf7d0' : '#fecaca'};
    `;
    message.textContent = text;

    this.form.insertBefore(message, this.form.firstChild);

    // Auto-remove después de 5 segundos
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 5000);
  }
}

// ========================================
// INICIALIZACIÓN GLOBAL
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar todos los módulos
  new ThemeManager();
  new Navigation();
  new SearchEngine();
  new ScrollAnimations();
  new ContactForm();
  
  // Inicializar dashboard si estamos en la página correspondiente
  if (document.querySelector('.dashboard')) {
    new Dashboard();
  }
  
  // Inicializar quiz si estamos en la página correspondiente
  if (document.querySelector('.quiz')) {
    new Quiz();
  }
  
  // Inicializar acordeones si existen
  if (document.querySelector('.accordion')) {
    new Accordion('.accordion');
  }
  
  // Animaciones de entrada para la página
  const animatedElements = document.querySelectorAll('.animate-fadeInUp, .animate-fadeInLeft, .animate-fadeInRight');
  animatedElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });
});

// ========================================
// EXPORT PARA USO GLOBAL
// ========================================

window.PowerBIDiplomado = {
  ThemeManager,
  Navigation,
  SearchEngine,
  Quiz,
  Dashboard,
  ScrollAnimations,
  ContactForm
};

// Función para guardar progreso de estudio
function saveStudyProgress(modulo, unidad) {
  if (window.powerbiDB) {
    window.powerbiDB.saveProgreso(modulo, unidad, true);
    console.log(`Progreso guardado: Módulo ${modulo}, Unidad ${unidad}`);
  }
}

// Función para mostrar progreso
function showStudyProgress() {
  if (window.powerbiDB) {
    const progreso = window.powerbiDB.getProgreso();
    const totalUnidades = 10; // Total de unidades en el diplomado
    const completadas = progreso.filter(p => p.completado).length;
    const porcentaje = Math.round((completadas / totalUnidades) * 100);
    
    console.log(`Progreso del diplomado: ${completadas}/${totalUnidades} unidades (${porcentaje}%)`);
    
    // Mostrar en la UI si existe un elemento para ello
    const progressElement = document.querySelector('.study-progress');
    if (progressElement) {
      progressElement.innerHTML = `
        <div class="progress-bar" style="background: var(--color-gray-light); height: 8px; border-radius: 4px; margin-bottom: 0.5rem;">
          <div style="width: ${porcentaje}%; height: 100%; background: var(--color-primary); border-radius: 4px; transition: width 0.3s;"></div>
        </div>
        <small>${completadas} de ${totalUnidades} unidades completadas (${porcentaje}%)</small>
      `;
    }
  }
}
