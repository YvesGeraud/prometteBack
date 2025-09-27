import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtDocumentosAnnecService } from "../services/ct_documentos_annec.service";
import {
  CrearCtDocumentosAnnecInput,
  ActualizarCtDocumentosAnnecInput,
  ctDocumentosAnnecIdParamSchema,
  CtDocumentosAnnecIdParam,
  EliminarCtDocumentosAnnecInput,
  eliminarCtDocumentosAnnecSchema,
} from "../schemas/ct_documentos_annec.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CAPITULO CON BASE SERVICE =====
const ctDocumentosAnnecBaseService = new CtDocumentosAnnecService();

export class CtDocumentosAnnecBaseController extends BaseController {
  /**
   * 📦 Crear nueva documentos Annec
   * @route POST /api/inventario/documentos-annec
   */
  crearDocumentosAnnec = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const documentosAnnecData: CrearCtDocumentosAnnecInput = req.body;
        return await ctDocumentosAnnecBaseService.crear(documentosAnnecData);
      },
      "Documentos Annec creado exitosamente"
    );
  };

  /**
   * 📦 Obtener documentos Annec por ID
   * @route GET /api/inventario/documentos-annec/:id_tipo_documento
   */
  obtenerDocumentosAnnecPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_tipo_documento } =
          this.validarDatosConEsquema<CtDocumentosAnnecIdParam>(
            ctDocumentosAnnecIdParamSchema,
            req.params
          );

        return await ctDocumentosAnnecBaseService.obtenerPorId(
          id_tipo_documento
        );
      },
      "Documentos Annec obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las documentos Annec con filtros y paginación
   * @route GET /api/inventario/documentos-annec
   *
   * Query parameters soportados:
   * - id_tipo_documento: Filtrar por ID de documentos Annec (búsqueda parcial)
   * - clave_capitulo: Filtrar por clave de documentos Annec (búsqueda parcial)
   * - nombre_capitulo: Filtrar por nombre de documentos Annec (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasDocumentosAnnec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarListaPaginada(
      req,
      res,
      async () => {
        // Separar filtros de paginación
        const { pagina, limite, ...filters } = req.query as any;
        const pagination: PaginationInput = { pagina, limite };

        return await ctDocumentosAnnecBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Documentos Annec obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar documentos Annec
   * @route PUT /api/inventario/documentos-annec/:id_tipo_documento
   */
  actualizarDocumentosAnnec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_tipo_documento } =
          this.validarDatosConEsquema<CtDocumentosAnnecIdParam>(
            ctDocumentosAnnecIdParamSchema,
            req.params
          );
        const documentosAnnecData: ActualizarCtDocumentosAnnecInput = req.body;

        return await ctDocumentosAnnecBaseService.actualizar(
          id_tipo_documento,
          documentosAnnecData
        );
      },
      "Documentos Annec actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar documentos Annec
   * @route DELETE /api/inventario/documentos-annec/:id_tipo_documento
   */
  eliminarDocumentosAnnec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_tipo_documento } =
          this.validarDatosConEsquema<CtDocumentosAnnecIdParam>(
            ctDocumentosAnnecIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtDocumentosAnnecInput>(
            eliminarCtDocumentosAnnecSchema,
            req.body
          );

        await ctDocumentosAnnecBaseService.eliminar(
          id_tipo_documento,
          id_ct_usuario_up
        );
      },
      "Documentos Annec eliminada exitosamente"
    );
  };
}
