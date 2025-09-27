import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtDocumentoAnnecService } from "../services/ct_documento_annec.service";
import {
  CrearCtDocumentoAnnecInput,
  ActualizarCtDocumentoAnnecInput,
  ctDocumentoAnnecIdParamSchema,
  CtDocumentoAnnecIdParam,
  EliminarCtDocumentoAnnecInput,
  eliminarCtDocumentoAnnecSchema,
} from "../schemas/ct_documento_annec.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CAPITULO CON BASE SERVICE =====
const ctDocumentoAnnecBaseService = new CtDocumentoAnnecService();

export class CtDocumentoAnnecBaseController extends BaseController {
  /**
   * 📦 Crear nueva documentos Annec
   * @route POST /api/inventario/documentos-annec
   */
  crearDocumentosAnnec = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const documentosAnnecData: CrearCtDocumentoAnnecInput = req.body;
        return await ctDocumentoAnnecBaseService.crear(documentosAnnecData);
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
        const { id_ct_documento_aneec } =
          this.validarDatosConEsquema<CtDocumentoAnnecIdParam>(
            ctDocumentoAnnecIdParamSchema,
            req.params
          );

        return await ctDocumentoAnnecBaseService.obtenerPorId(
          id_ct_documento_aneec
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
   * - id_ct_documento_aneec: Filtrar por ID de documentos Annec (búsqueda parcial)
   * - nombre_documento_aneec: Filtrar por nombre de documentos Annec (búsqueda parcial)
   * - nombre_capitulo: Filtrar por nombre de documentos Annec (búsqueda parcial)
   * - estado: Filtrar por estado (true/false)
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

        return await ctDocumentoAnnecBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Documentos Annec obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar documentos Annec
   * @route PUT /api/inventario/documentos-annec/:id_ct_documento_aneec
   */
  actualizarDocumentosAnnec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_documento_aneec } =
          this.validarDatosConEsquema<CtDocumentoAnnecIdParam>(
            ctDocumentoAnnecIdParamSchema,
            req.params
          );
        const documentosAnnecData: ActualizarCtDocumentoAnnecInput = req.body;

        return await ctDocumentoAnnecBaseService.actualizar(
          id_ct_documento_aneec,
          documentosAnnecData
        );
      },
      "Documentos Annec actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar documentos Annec
   * @route DELETE /api/inventario/documentos-annec/:id_ct_documento_aneec
   */
  eliminarDocumentosAnnec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_documento_aneec } =
          this.validarDatosConEsquema<CtDocumentoAnnecIdParam>(
            ctDocumentoAnnecIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtDocumentoAnnecInput>(
            eliminarCtDocumentoAnnecSchema,
            req.body
          );

        await ctDocumentoAnnecBaseService.eliminar(
          id_ct_documento_aneec,
          id_ct_usuario_up
        );
      },
      "Documentos Annec eliminada exitosamente"
    );
  };
}
