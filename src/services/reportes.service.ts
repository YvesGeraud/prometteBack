import {
  DatosReporte,
  ConfiguracionPDF,
  ResultadoReporte,
} from "../types/reports";
import * as fs from "fs-extra";

/**
 * Interfaz para configuración de reporte
 */
export interface ConfiguracionReporte {
  titulo: string;
  descripcion?: string;
  columnas: ColumnaReporte[];
  formato?: ConfiguracionPDF;
  filtros?: Record<string, any>;
  metadatos?: Record<string, any>;
}

/**
 * Interfaz para definir columnas del reporte
 */
export interface ColumnaReporte {
  campo: string;
  titulo: string;
  tipo?: "texto" | "numero" | "fecha" | "booleano";
  formato?: (valor: any) => string;
  ancho?: string;
}

/**
 * Servicio genérico para generación de reportes PDF
 * Reutilizable para cualquier tipo de datos
 */
export class ReportesService {
  private pdfService: any;

  constructor() {
    const { PDFService } = require("./pdfService");
    this.pdfService = new PDFService();
  }

  /**
   * Genera un reporte PDF a partir de datos y configuración
   */
  async generarReportePDF(
    datos: any[],
    configuracion: ConfiguracionReporte
  ): Promise<Buffer> {
    try {
      // Preparar datos en formato DatosReporte
      const datosReporte: DatosReporte = {
        titulo: configuracion.titulo,
        descripcion: configuracion.descripcion || "",
        fechaGeneracion: new Date(),
        usuarioGenerador: "Sistema",
        datos: this.formatearDatos(datos, configuracion.columnas),
        totales: {
          totalRegistros: datos.length,
        },
        metadatos: {
          filtros: configuracion.filtros,
          ...configuracion.metadatos,
        },
      };

      // Configuración PDF por defecto
      const configuracionPDF: ConfiguracionPDF = {
        formato: "A4",
        orientacion: "landscape",
        margenes: {
          superior: 20,
          inferior: 20,
          izquierdo: 15,
          derecho: 15,
        },
        encabezado: { mostrar: false },
        piePagina: { mostrar: false },
        estilos: {
          titulo: {
            fuente: {
              familia: "Arial",
              tamanio: 16,
              negrita: true,
              color: "#000000",
            },
          },
          subtitulo: {
            fuente: {
              familia: "Arial",
              tamanio: 14,
              negrita: false,
              color: "#333333",
            },
          },
          texto: {
            fuente: {
              familia: "Arial",
              tamanio: 12,
              negrita: false,
              color: "#000000",
            },
          },
          tabla: {
            encabezado: {
              fuente: {
                familia: "Arial",
                tamanio: 12,
                negrita: true,
                color: "#FFFFFF",
              },
              relleno: { tipo: "solid", color: "#4A90E2" },
            },
            filas: {
              fuente: {
                familia: "Arial",
                tamanio: 11,
                negrita: false,
                color: "#000000",
              },
              alternado: true,
              colorAlternado: "#F8F9FA",
            },
            bordes: { color: "#DDDDDD", grosor: 1 },
          },
        },
        ...configuracion.formato,
      };

      // Generar PDF usando el servicio existente
      const resultado = await this.pdfService.generarPDFConPuppeteer(
        datosReporte,
        configuracionPDF
      );

      if (!resultado.exito) {
        throw new Error(`Error generando PDF: ${resultado.mensaje}`);
      }

      // Leer el archivo generado y devolverlo como Buffer
      const buffer = await fs.readFile(resultado.archivo.ruta);

      // Opcionalmente limpiar el archivo temporal
      // await fs.remove(resultado.archivo.ruta);

      return buffer;
    } catch (error) {
      throw new Error(
        `Error en ReportesService: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  }

  /**
   * Formatea los datos según las columnas definidas
   */
  private formatearDatos(datos: any[], columnas: ColumnaReporte[]): any[] {
    return datos.map((registro) => {
      const registroFormateado: any = {};

      columnas.forEach((columna) => {
        let valor = this.obtenerValorAnidado(registro, columna.campo);

        // Aplicar formato personalizado si existe
        if (columna.formato && typeof columna.formato === "function") {
          valor = columna.formato(valor);
        } else {
          // Formato por defecto según tipo
          valor = this.formatearPorTipo(valor, columna.tipo);
        }

        registroFormateado[columna.titulo] = valor;
      });

      return registroFormateado;
    });
  }

  /**
   * Obtiene un valor anidado usando dot notation (ej: "marca.descripcion")
   */
  private obtenerValorAnidado(objeto: any, ruta: string): any {
    return ruta.split(".").reduce((obj, prop) => {
      return obj && obj[prop] !== undefined ? obj[prop] : null;
    }, objeto);
  }

  /**
   * Formatea un valor según su tipo
   */
  private formatearPorTipo(valor: any, tipo?: string): string {
    if (valor === null || valor === undefined) {
      return "N/A";
    }

    switch (tipo) {
      case "fecha":
        return valor instanceof Date
          ? valor.toLocaleDateString("es-ES")
          : new Date(valor).toLocaleDateString("es-ES");

      case "numero":
        return typeof valor === "number"
          ? valor.toLocaleString("es-ES")
          : valor.toString();

      case "booleano":
        return valor ? "Sí" : "No";

      case "texto":
      default:
        return valor.toString();
    }
  }

  /**
   * Genera reporte de localidades usando el nuevo patrón BaseReportService
   * Delega toda la lógica al servicio especializado
   */
  async generarReporteLocalidadesCompleto(
    localidadesData: any[],
    filtros?: any
  ): Promise<Buffer> {
    const { LocalidadesReportService } = await import(
      "./reportes/localidadesReport.service"
    );
    const localidadesReportService = new LocalidadesReportService();

    return localidadesReportService.generarReporte(localidadesData, filtros);
  }

  /**
   * Genera reporte simplificado de localidades por municipio
   */
  async generarReporteLocalidadesPorMunicipio(
    localidadesData: any[],
    municipioInfo?: any
  ): Promise<Buffer> {
    const { LocalidadesReportService } = await import(
      "./reportes/localidadesReport.service"
    );
    const localidadesReportService = new LocalidadesReportService();

    return localidadesReportService.generarReportePorMunicipio(
      localidadesData,
      municipioInfo
    );
  }

  /**
   * Helper para convertir códigos de ámbito a texto legible
   */
  private obtenerTextoAmbito(ambito: string | null | undefined): string {
    if (!ambito) return "Sin especificar";

    switch (ambito.toUpperCase()) {
      case "U":
        return "Urbano";
      case "R":
        return "Rural";
      default:
        return ambito;
    }
  }

  /**
   * Helper genérico para formatear estados/estatus
   * Útil para diferentes tipos de datos
   */
  private formatearEstado(estado: any): string {
    if (estado === null || estado === undefined) return "Sin estado";

    if (typeof estado === "boolean") {
      return estado ? "Activo" : "Inactivo";
    }

    if (typeof estado === "number") {
      switch (estado) {
        case 0:
          return "Inactivo";
        case 1:
          return "Activo";
        case 2:
          return "En proceso";
        case 3:
          return "Suspendido";
        default:
          return `Estado ${estado}`;
      }
    }

    return estado.toString();
  }
}
