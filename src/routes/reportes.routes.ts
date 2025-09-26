import { Router } from "express";
import { reportesController } from "../controllers/reportes.controller";
import { validarRequest } from "../middleware/validacion";
import {
  reporteLocalidadesFiltrosSchema,
  reporteGenericoSchema,
  reporteMunicipioParamSchema,
} from "../schemas/reportes.schema";

const router = Router();

// ========== RUTAS DE REPORTES DE LOCALIDADES ==========

/**
 * @route GET /api/reportes/localidades/pdf
 * @description Genera reporte PDF de localidades con filtros opcionales
 * @query {string} localidad - Filtro por nombre de localidad (opcional)
 * @query {string} ambito - Filtro por ámbito: 'U' (Urbano) o 'R' (Rural) (opcional)
 * @query {number} id_municipio - Filtro por ID de municipio (opcional)
 * @query {boolean} incluir_municipio - Incluir datos de municipio (opcional)
 * @query {boolean} incluir_municipio_con_entidad - Incluir datos de municipio y estado (opcional)
 * @returns {file} PDF - Archivo PDF descargable
 *
 * @example
 * GET /api/reportes/localidades/pdf
 * GET /api/reportes/localidades/pdf?ambito=U
 * GET /api/reportes/localidades/pdf?incluir_municipio=true
 * GET /api/reportes/localidades/pdf?id_municipio=1&incluir_municipio_con_entidad=true
 * Descarga: localidades_reporte_2025-09-23.pdf
 */
router.get(
  "/localidades/pdf",
  validarRequest({ query: reporteLocalidadesFiltrosSchema }),
  reportesController.generarReporteLocalidades
);

/**
 * @route GET /api/reportes/localidades/municipio/:id_municipio/pdf
 * @description Genera reporte PDF de localidades de un municipio específico
 * @param {number} id_municipio - ID del municipio para filtrar localidades
 * @returns {file} PDF - Archivo PDF descargable con localidades del municipio
 *
 * @example
 * GET /api/reportes/localidades/municipio/1/pdf
 * Descarga: localidades_municipio_1_2025-09-23.pdf
 */
router.get(
  "/localidades/municipio/:id_municipio/pdf",
  validarRequest({ params: reporteMunicipioParamSchema }),
  reportesController.generarReporteLocalidadesPorMunicipio
);

// ========== RUTAS DE REPORTES GENÉRICOS ==========

/**
 * @route POST /api/reportes/generico/pdf
 * @description Genera reporte PDF genérico a partir de datos y configuración
 * @body {object} datos - Array de objetos con los datos del reporte
 * @body {object} configuracion - Configuración del reporte (título, columnas, etc.)
 * @returns {file} PDF - Archivo PDF descargable
 *
 * @example
 * POST /api/reportes/generico/pdf
 * {
 *   "datos": [
 *     {"id": 1, "nombre": "Item 1", "fecha": "2025-01-01"},
 *     {"id": 2, "nombre": "Item 2", "fecha": "2025-01-02"}
 *   ],
 *   "configuracion": {
 *     "titulo": "Reporte de Items",
 *     "descripcion": "Lista de items del sistema",
 *     "columnas": [
 *       {"campo": "id", "titulo": "ID", "tipo": "numero"},
 *       {"campo": "nombre", "titulo": "Nombre", "tipo": "texto"},
 *       {"campo": "fecha", "titulo": "Fecha", "tipo": "fecha"}
 *     ]
 *   }
 * }
 */
router.post(
  "/generico/pdf",
  validarRequest({ body: reporteGenericoSchema }),
  reportesController.generarReporteGenerico
);

// ========== RUTAS FUTURAS (Para expansión) ==========

/**
 * Rutas futuras que se pueden implementar siguiendo el mismo patrón:
 *
 * GET /api/reportes/municipios/pdf - Reporte de municipios con estados
 * GET /api/reportes/municipios/entidad/:id_entidad/pdf - Municipios por estado
 * GET /api/reportes/entidades/pdf - Reporte de estados/entidades
 * GET /api/reportes/estadisticas/localidades/pdf - Estadísticas de localidades
 * GET /api/reportes/comparativo/municipios/pdf - Comparativo entre municipios
 * POST /api/reportes/dashboard/pdf - Dashboard personalizado
 * GET /api/reportes/plantillas - Listar plantillas disponibles
 * POST /api/reportes/plantilla/:id/pdf - Generar reporte desde plantilla
 */

export default router;
