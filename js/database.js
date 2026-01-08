/**
 * ========================================
 * POWER BI DIPLOMADO - SISTEMA DE BASE DE DATOS LOCAL
 * Simula SQLite usando localStorage
 * ========================================
 */

class PowerBIDatabase {
  constructor() {
    this.dbName = 'powerbi_diplomado_db';
    this.init();
  }

  init() {
    // Inicializar base de datos si no existe
    if (!localStorage.getItem(this.dbName)) {
      this.createDatabase();
    }
  }

  createDatabase() {
    const db = {
      // Tabla de contenido teórico
      contenido_teoria: [
        {
          id: 1,
          modulo: 1,
          unidad: '1.1',
          titulo: 'Concepto de Inteligencia de Negocio',
          contenido: `La Inteligencia de Negocios (Business Intelligence - BI) es un conjunto de metodologías, procesos, arquitecturas y tecnologías que transforman datos crudos en información significativa y útil para la toma de decisiones estratégicas empresariales.

COMPONENTES FUNDAMENTALES:
• Datos como activo estratégico: Los datos representan el nuevo petróleo de las organizaciones modernas
• Transformación inteligente: Conversión de datos brutos en insights accionables
• Democratización de la información: Acceso a información relevante para todos los niveles organizacionales
• Decisiones basadas en evidencia: Reducción de la intuición a favor del análisis objetivo

EVOLUCIÓN HISTÓRICA:
• Década de 1960: Sistemas de Soporte a Decisiones (DSS)
• Década de 1980: Almacenes de datos (Data Warehouses)
• Década de 1990: OLAP (Online Analytical Processing)
• Década de 2000: Self-Service BI
• Década de 2010-presente: BI en la nube, Big Data, IA integrada

CASO PRÁCTICO: Cadena de Supermercados "SuperMax"
Situación inicial: Datos dispersos en sistema POS, Excel, Access y RRHH
Implementación: Consolidación de fuentes, dashboard ejecutivo, análisis por región
Resultados: 30% reducción en productos sin rotación, 25% aumento en productos de alta demanda, 15% ahorro en costos operacionales`,
          duracion: '45 minutos',
          dificultad: 'Básico'
        },
        {
          id: 2,
          modulo: 1,
          unidad: '1.2',
          titulo: 'Propósito de las Plataformas de Inteligencia de Negocios',
          contenido: `Las plataformas BI cumplen 5 propósitos fundamentales:

1. RECOLECCIÓN DE DATOS
Fuentes Internas: ERP (SAP, Oracle), CRM (Salesforce), Bases de datos, Archivos Excel
Fuentes Externas: APIs públicas, Google Analytics, Proveedores de datos, Open Data

2. LIMPIEZA Y TRANSFORMACIÓN (ETL)
Problemas comunes: Datos duplicados, valores nulos, formatos inconsistentes, datos fuera de rango
Transformaciones: Estandarización, normalización, agregación, derivación, limpieza, validación

3. ALMACENAMIENTO
Data Warehouse: Datos estructurados, schema-on-write, optimizado para análisis
Data Lake: Datos en formato crudo, schema-on-read, mayor volumen, menor costo

4. ANÁLISIS DE DATOS
Minería de datos, análisis estadístico, visualización efectiva

5. TOMA DE DECISIONES
Framework: Definir problema → Recopilar datos → Análisis → Insights → Acciones → Monitoreo`,
          duracion: '60 minutos',
          dificultad: 'Intermedio'
        },
        {
          id: 3,
          modulo: 1,
          unidad: '1.3',
          titulo: 'Esquemas de Implementación de BI',
          contenido: `ARQUITECTURAS DE IMPLEMENTACIÓN

A. SOLUCIONES EN LA NUBE (CLOUD)
Microsoft Power BI Service (Azure):
• Power BI Free: Uso personal, 1GB, gratuito
• Power BI Pro: $9.99/usuario/mes, 10GB, colaboración
• Premium Per User: $20/usuario/mes, mayor capacidad
• Premium Per Capacity: Desde $4,995/mes, capacidad dedicada

Azure Analysis Services: Motor de análisis multidimensional en la nube

B. SOLUCIONES ON-PREMISE (LOCAL)
SQL Server Analysis Services (SSAS): Servidor de análisis instalado en infraestructura propia
Power BI Report Server: Servidor de reportes on-premise

COMPARACIÓN CLOUD VS ON-PREMISE:
• Ubicación: Nube (Azure) vs Servidor local
• Costo: Suscripción mensual vs Inversión inicial alta
• Escalabilidad: Infinita vs Limitada por hardware
• Mantenimiento: Automático vs Requiere equipo IT`,
          duracion: '45 minutos',
          dificultad: 'Intermedio'
        },
        {
          id: 4,
          modulo: 1,
          unidad: '1.4',
          titulo: 'Ruta para el Procesamiento y Acceso a Datos en BI',
          contenido: `FLUJO COMPLETO: [FUENTES] → [ETL] → [DWH] → [MODELO BI] → [VISUALIZACIÓN] → [USUARIOS]

FASE 1: PROCESAMIENTO DE DATOS (ETL)
• Programación de carga: Full Load, Incremental, CDC
• Extracción: SQL, Archivos, APIs, Web Scraping
• Limpieza y validación de datos
• Monitoreo del rendimiento

FASE 2: ALMACENAMIENTO (DWH)
• Estructuración de tablas de dimensiones y hechos
• Modelo Estrella vs Copo de Nieve
• Actualización recurrente del almacén
• Configuración de roles para usuarios

FASE 3: DESPLIEGUE
• Dashboards y reportes
• Consumo en aplicaciones
• Integración con otras plataformas (REST, Email, DBLinks)`,
          duracion: '30 minutos',
          dificultad: 'Intermedio'
        },
        {
          id: 5,
          modulo: 2,
          unidad: '2.1',
          titulo: 'Conociendo la Interfaz de PBI Desktop',
          contenido: `POWER BI DESKTOP - LAS TRES CAPAS

COMPONENTES DE LA INTERFAZ:
1. Menú: Opciones de archivo, edición, vista y configuración
2. Barra de Herramientas: Accesos rápidos a funciones comunes
3. Capas de Power BI: Power Query, Power Pivot, Power View
4. Layout: Área de trabajo con visualizaciones
5. Selección de Layout: Vista Desktop, Tablet, Mobile
6. Visuales y Propiedades: Tipos de gráficos y configuración
7. Campos: Dimensiones y métricas disponibles
8. Zoom y Fuente: Modo de conexión de datos

LAS TRES CAPAS:
• Power Query: Conexión y transformación de datos (ETL)
• Power Pivot: Modelado de datos y relaciones
• Power View: Visualización y reportes`,
          duracion: '45 minutos',
          dificultad: 'Básico'
        },
        {
          id: 6,
          modulo: 2,
          unidad: '2.2',
          titulo: 'Power Query - Conexión y Transformación de Datos',
          contenido: `POWER QUERY - LA HERRAMIENTA ETL DE POWER BI

PASOS DEL PROCESO:
1. Conexión a fuentes: Bases de datos, archivos, servicios en la nube
2. Importación: Selección y preview de datos
3. Transformación: Limpieza, filtros, combinación de datos
4. Pasos aplicados: Registro de todas las transformaciones
5. Carga: Importar al modelo de datos
6. Actualización: Refresh automático de datos

FUNCIONES DEL LENGUAJE M:
• Manipulación de matrices: zeros, ones, eye, rand, reshape, transpose
• Operaciones matemáticas: sum, prod, mean, std, min, max, abs
• Funciones matemáticas: sin, cos, tan, exp, log, sqrt
• Archivos: load, save, fprintf
• Control de flujo: if, else, for, while, switch
• Gráficos: plot, scatter, surf, imshow
• Texto: strcat, strcmp, strfind, num2str

EJEMPLO PRÁCTICO:
let
  Origen = Excel.Workbook(File.Contents("C:\Datos\Ventas.xlsx")),
  Hoja = Origen{[Name="Ventas"]}[Data],
  Encabezados = Table.PromoteHeaders(Hoja),
  TiposCambiados = Table.TransformColumnTypes(Encabezados, {
    {"Fecha", type date},
    {"Monto", type number},
    {"Cantidad", Int64.Type}
  }),
  SinNulos = Table.SelectRows(TiposCambiados, each [Monto] <> null and [Monto] > 0),
  AgregarAño = Table.AddColumn(SinNulos, "Año", each Date.Year([Fecha]), Int64.Type),
  FiltroFecha = Table.SelectRows(AgregarAño, each [Año] >= 2023)
in
  FiltroFecha`,
          duracion: '90 minutos',
          dificultad: 'Intermedio'
        },
        {
          id: 7,
          modulo: 2,
          unidad: '2.3',
          titulo: 'Power Pivot - Relaciones y Definición de Medidas',
          contenido: `POWER PIVOT - EL CORAZÓN DEL MODELO DE DATOS

COMPONENTES DEL MODELO:
• Tablas: Contienen datos de diversas fuentes, dimensiones y hechos
• Relaciones: Vinculación entre tablas a través de atributos comunes
• Tipos de relaciones: Uno a Muchos (1:N), Uno a Uno (1:1), Muchos a Muchos (N:N)
• Columnas calculadas: Creadas con expresiones DAX
• Medidas: Cálculos personalizados con funciones DAX

FUNCIONES DAX PRINCIPALES:

AGREGACIÓN:
• SUM, AVERAGE, MIN, MAX, COUNT, COUNTROWS
• SUMX, AVERAGEX (funciones iteradoras)

FILTRADO:
• FILTER, ALL, ALLEXCEPT, ALLSELECTED
• REMOVEFILTERS, KEEPFILTERS

FECHA Y HORA:
• DATE, TODAY, NOW, YEAR, MONTH, DAY
• DATEDIFF, CALENDAR

LÓGICAS:
• IF, AND, OR, NOT, SWITCH, IFERROR

TEXTO:
• CONCATENATE, LEFT, RIGHT, MID, UPPER, LOWER, TRIM

INTELIGENCIA DE TIEMPO:
• TOTALYTD, TOTALQTD, TOTALMTD
• SAMEPERIODLASTYEAR, DATEADD`,
          duracion: '120 minutos',
          dificultad: 'Avanzado'
        },
        {
          id: 8,
          modulo: 2,
          unidad: '2.4',
          titulo: 'Power View - Reportería de Usuario',
          contenido: `POWER VIEW - LA CAPA DE VISUALIZACIÓN

TIPOS DE VISUALIZACIONES:
• Tablas y Matrices: Datos en formato tabular
• Gráficos: Barras, líneas, circulares, áreas, dispersión
• Mapas: Datos geográficos
• Tarjetas: KPIs y métricas clave
• Gauges: Indicadores de progreso
• Custom Visuals: Visualizaciones de terceros

CARACTERÍSTICAS DE INTERACTIVIDAD:
• Cross-filtering entre visualizaciones
• Drill-down y drill-through
• Tooltips personalizados
• Segmentaciones y filtros
• Bookmarks y navegación

ELEMENTOS DE DISEÑO:
• Layout responsivo (Desktop, Tablet, Mobile)
• Temas y paletas de colores
• Formato condicional
• Jerarquías de datos
• Paginación y navegación`,
          duracion: '75 minutos',
          dificultad: 'Intermedio'
        },
        {
          id: 9,
          modulo: 3,
          unidad: '3.1',
          titulo: 'Casos de Uso - Aplicaciones Prácticas',
          contenido: `CASOS DE USO EN POWER BI

RETO DIARIO POWER BI - 21 DÍAS:

SEMANA 1: FUNDAMENTOS (Día 1-7)
• Día 1: Carga de Datos y Construcción del Modelo
• Día 2: Crea las Medidas Básicas (SUM, COUNT)
• Día 3: Agrega Íconos en Tarjetas
• Día 4: Medidas de Comparación vs Año Anterior
• Día 5: Medidas con Resultados Combinados
• Día 6: Mejora el Formato de la Tarjeta Múltiple
• Día 7: Ordena tus Medidas en Carpetas

SEMANA 2: VISUALIZACIONES (Día 8-14)
• Día 8: Crea Segmentaciones de Datos
• Día 9: Crea Gráficos Sencillos
• Día 10: Mejora el Diseño de tus Gráficos
• Día 11: Segmentación con Imágenes
• Día 12: Cambia el Resultado con Parámetro de Campo
• Día 13: Agrega Imágenes al Parámetro de Campo
• Día 14: Segmentación de Cuadrícula Estilo Tarjetas

SEMANA 3: AVANZADO (Día 15-21)
• Día 15: Segmentación Dinámica para Periodos
• Día 16: Crea Tarjetas Descriptivas con Imágenes
• Día 17: Diseña tu Reporte desde Power Point
• Día 18: Diseña tu Reporte desde Power Point (Parte 2)
• Día 19: Importar Imagen de Fondo y Ajustar Posiciones
• Día 20: Información sobre Herramientas e Interacciones
• Día 21: Publicación y Compartición en Power BI Service`,
          duracion: '180 minutos',
          dificultad: 'Intermedio'
        },
        {
          id: 10,
          modulo: 4,
          unidad: '4.1',
          titulo: 'Complementos Avanzados - Filtros y Navegación',
          contenido: `COMPLEMENTOS AVANZADOS DE POWER BI

CUSTOMIZACIÓN CON FILTROS:
• Filtros con niveles (Drill-Down): Navegación jerárquica en los datos
• Filtros sincronizados: Aplicar filtros en todas las páginas
• Barra de filtros: En objetos, página actual, todas las páginas
• Botones de Navegación: A visuales y páginas
• Filtros sincronizados y desincronizados: Control granular

CUSTOMIZACIÓN AVANZADA:
• Tooltips (Marcadores): Ventanas emergentes con información detallada
• Cross-Filter: Navegación a otra página basada en filtro por referencia
• Bookmarks: Guardar estados del reporte
• Parámetros de campo: Cambiar dinámicamente las visualizaciones
• Diseño responsivo: Adaptación a diferentes tamaños de pantalla

SEGURIDAD Y GOBIERNO:
• Row-Level Security (RLS): Restricción de acceso por usuario
• Roles y permisos
• Auditoría de accesos
• Versionado de reportes`,
          duracion: '90 minutos',
          dificultad: 'Avanzado'
        }
      ],
      
      // Tabla de progreso de estudiantes
      progreso_estudiantes: [],
      
      // Tabla de resultados del quiz
      resultados_quiz: [],
      
      // Tabla de contactos
      contactos: [],
      
      // Tabla de configuración
      configuracion: {
        version: '2.0',
        fecha_creacion: new Date().toISOString(),
        tema_oscuro: false,
        idioma: 'es'
      }
    };

    localStorage.setItem(this.dbName, JSON.stringify(db));
    console.log('Base de datos creada exitosamente');
  }

  // Métodos para acceder a los datos
  getContenidoTeoria(modulo = null, unidad = null) {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    let contenido = db.contenido_teoria;
    
    if (modulo) {
      contenido = contenido.filter(item => item.modulo === modulo);
    }
    
    if (unidad) {
      contenido = contenido.filter(item => item.unidad === unidad);
    }
    
    return contenido;
  }

  getModulos() {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    return [...new Set(db.contenido_teoria.map(item => item.modulo))].sort();
  }

  getUnidadesByModulo(modulo) {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    return db.contenido_teoria
      .filter(item => item.modulo === modulo)
      .map(item => ({ unidad: item.unidad, titulo: item.titulo }));
  }

  searchContenido(query) {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    return db.contenido_teoria.filter(item => 
      item.titulo.toLowerCase().includes(query.toLowerCase()) ||
      item.contenido.toLowerCase().includes(query.toLowerCase()) ||
      item.unidad.includes(query)
    );
  }

  // Métodos para progreso del estudiante
  saveProgreso(modulo, unidad, completado = true) {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    const progreso = {
      id: Date.now(),
      modulo,
      unidad,
      completado,
      fecha: new Date().toISOString()
    };
    
    db.progreso_estudiantes.push(progreso);
    localStorage.setItem(this.dbName, JSON.stringify(db));
  }

  getProgreso() {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    return db.progreso_estudiantes;
  }

  // Métodos para resultados del quiz
  saveQuizResult(puntuacion, total_preguntas, respuestas) {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    const resultado = {
      id: Date.now(),
      puntuacion,
      total_preguntas,
      porcentaje: Math.round((puntuacion / total_preguntas) * 100),
      respuestas,
      fecha: new Date().toISOString()
    };
    
    db.resultados_quiz.push(resultado);
    localStorage.setItem(this.dbName, JSON.stringify(db));
    return resultado;
  }

  getQuizResults() {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    return db.resultados_quiz.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }

  // Métodos para contactos
  saveContacto(nombre, email, telefono, empresa, asunto, mensaje) {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    const contacto = {
      id: Date.now(),
      nombre,
      email,
      telefono,
      empresa,
      asunto,
      mensaje,
      fecha: new Date().toISOString()
    };
    
    db.contactos.push(contacto);
    localStorage.setItem(this.dbName, JSON.stringify(db));
    return contacto;
  }

  // Configuración
  toggleTema() {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    db.configuracion.tema_oscuro = !db.configuracion.tema_oscuro;
    localStorage.setItem(this.dbName, JSON.stringify(db));
    return db.configuracion.tema_oscuro;
  }

  getConfiguracion() {
    const db = JSON.parse(localStorage.getItem(this.dbName));
    return db.configuracion;
  }

  // Exportar/Importar base de datos
  exportDatabase() {
    const db = localStorage.getItem(this.dbName);
    return JSON.parse(db);
  }

  importDatabase(dbData) {
    localStorage.setItem(this.dbName, JSON.stringify(dbData));
  }

  // Resetear base de datos
  resetDatabase() {
    localStorage.removeItem(this.dbName);
    this.createDatabase();
    console.log('Base de datos reseteada');
  }
}

// Inicializar base de datos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  window.powerbiDB = new PowerBIDatabase();
  console.log('Sistema de base de datos inicializado');
});
