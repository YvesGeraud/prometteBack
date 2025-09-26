import { Request, Response } from "express";
import { ReportesService } from "../services/reportes.service";
import { CtLocalidadBaseService } from "../services/localidad.service";
import {
  enviarRespuestaExitosa,
  enviarRespuestaError,
} from "../utils/responseUtils";

/**
 * Controlador específico para generación de reportes
 * Adaptado para trabajar con localidades y sus relaciones con municipios y estados
 */
export class ReportesController {
  private reportesService: ReportesService;
  private ctLocalidadService: CtLocalidadBaseService;

  constructor() {
    this.reportesService = new ReportesService();
    this.ctLocalidadService = new CtLocalidadBaseService();
  }

  /**
   * Genera reporte PDF de localidades con información de municipios y estados
   *
   * @route GET /api/reportes/localidades/pdf
   * @param {Request} req - Objeto de petición con filtros opcionales en query
   * @param {Response} res - Objeto de respuesta
   *
   * @example
   * GET /api/reportes/localidades/pdf?ambito=U&incluir_municipio_con_entidad=true
   *
   * @returns PDF file download con nombre: localidades_reporte_{fecha}.pdf
   */
  generarReporteLocalidades = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      // Los filtros ya vienen validados y transformados por el middleware
      // Seguir el mismo patrón que otros controladores: pasar req.query directamente
      const filtrosConLimite = {
        ...req.query,
        limite: 1000, // Límite alto para reportes
      };

      // Debug: Log para verificar filtros
      console.log("🔍 Filtros para reportes:", filtrosConLimite);
      console.log("🔍 Query original:", req.query);

      // Obtener localidades con información completa (incluye municipios y estados)
      const respuesta = await this.ctLocalidadService.obtenerTodos(
        filtrosConLimite
      );

      // Debug: Log para verificar respuesta
      console.log("📊 Respuesta del servicio:", {
        total: respuesta.data?.length,
        primerElemento: respuesta.data?.[0],
        tieneIncludes: !!(respuesta.data?.[0] as any)?.ct_municipio,
      });

      if (!respuesta.data || respuesta.data.length === 0) {
        enviarRespuestaError(
          res,
          "No se encontraron localidades para los filtros especificados",
          404,
          {
            filtros: req.query,
            totalEncontrados: 0,
          }
        );
        return;
      }

      // Usar el método específico del servicio que maneja toda la lógica
      const pdfBuffer =
        await this.reportesService.generarReporteLocalidadesCompleto(
          respuesta.data,
          req.query // Pasar query directamente, igual que otros controladores
        );

      // Configurar headers de respuesta para descarga
      const fechaActual = new Date().toISOString().split("T")[0];
      const nombreArchivo = `localidades_reporte_${fechaActual}.pdf`;

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${nombreArchivo}"`
      );
      res.setHeader("Content-Length", pdfBuffer.length);

      // Enviar el PDF
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generando reporte de localidades:", error);
      enviarRespuestaError(
        res,
        "Error interno al generar reporte de localidades",
        500,
        {
          error: error instanceof Error ? error.message : "Error desconocido",
          filtros: req.query,
        }
      );
    }
  };

  /**
   * Genera reporte PDF de localidades filtrado por municipio específico
   *
   * @route GET /api/reportes/localidades/municipio/:id_municipio/pdf
   * @param {Request} req - Objeto de petición con id_municipio en params
   * @param {Response} res - Objeto de respuesta
   *
   * @example
   * GET /api/reportes/localidades/municipio/1/pdf
   *
   * @returns PDF file download con nombre: localidades_municipio_{id}_{fecha}.pdf
   */
  generarReporteLocalidadesPorMunicipio = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      // Validar y parsear parámetros
      const idMunicipio = parseInt(req.params.id_municipio, 10);

      if (!idMunicipio || idMunicipio <= 0) {
        enviarRespuestaError(res, "ID de municipio inválido", 400, {
          parametro: "id_municipio",
          valor: req.params.id_municipio,
        });
        return;
      }

      // Filtros específicos para el municipio
      const filtros = {
        id_municipio: idMunicipio,
        incluir_municipio_con_entidad: true,
        limite: 1000,
      };

      // Obtener localidades del municipio
      const respuesta = await this.ctLocalidadService.obtenerTodos(filtros);

      if (!respuesta.data || respuesta.data.length === 0) {
        enviarRespuestaError(
          res,
          "No se encontraron localidades para el municipio especificado",
          404,
          {
            idMunicipio,
            totalEncontrados: 0,
          }
        );
        return;
      }

      // Obtener información del municipio para el título
      const municipioInfo = (respuesta.data[0] as any)?.ct_municipio;

      // Usar el método específico del servicio
      const pdfBuffer =
        await this.reportesService.generarReporteLocalidadesPorMunicipio(
          respuesta.data,
          municipioInfo
        );

      // Configurar headers de respuesta
      const fechaActual = new Date().toISOString().split("T")[0];
      const nombreArchivo = `localidades_municipio_${idMunicipio}_${fechaActual}.pdf`;

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${nombreArchivo}"`
      );
      res.setHeader("Content-Length", pdfBuffer.length);

      // Enviar el PDF
      res.send(pdfBuffer);
    } catch (error) {
      console.error(
        "Error generando reporte de localidades por municipio:",
        error
      );
      enviarRespuestaError(res, "Error interno al generar reporte", 500, {
        error: error instanceof Error ? error.message : "Error desconocido",
        idMunicipio: req.params.id_municipio,
      });
    }
  };

  /**
   * Ejemplo de reporte genérico para otros tipos de datos
   * Mantiene compatibilidad con el servicio genérico existente
   *
   * @route POST /api/reportes/generico/pdf
   * @param {Request} req - Objeto con datos y configuración del reporte en body
   * @param {Response} res - Objeto de respuesta
   */
  generarReporteGenerico = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { datos, configuracion } = req.body;

      if (!datos || !Array.isArray(datos)) {
        enviarRespuestaError(
          res,
          "Datos inválidos. Se esperaba un array de datos.",
          400,
          {
            tipoRecibido: typeof datos,
          }
        );
        return;
      }

      if (!configuracion || !configuracion.titulo || !configuracion.columnas) {
        enviarRespuestaError(
          res,
          "Configuración inválida. Se requiere título y columnas.",
          400,
          {
            configuracionRecibida: configuracion,
          }
        );
        return;
      }

      // Generar PDF
      const pdfBuffer = await this.reportesService.generarReportePDF(
        datos,
        configuracion
      );

      // Configurar headers de respuesta
      const nombreArchivo = `reporte_${configuracion.titulo
        .toLowerCase()
        .replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${nombreArchivo}"`
      );
      res.setHeader("Content-Length", pdfBuffer.length);

      // Enviar el PDF
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generando reporte genérico:", error);
      enviarRespuestaError(
        res,
        "Error interno al generar reporte genérico",
        500,
        {
          error: error instanceof Error ? error.message : "Error desconocido",
        }
      );
    }
  };
}

export const reportesController = new ReportesController();
