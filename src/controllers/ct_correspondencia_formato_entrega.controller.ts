import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtCorrespondenciaFormatoEntregaService } from "../services/ct_correspondencia_formato_entrega.service";
import {
  CrearCtCorrespondenciaFormatoEntregaInput,
  ActualizarCtCorrespondenciaFormatoEntregaInput,
  ctCorrespondenciaFormatoEntregaIdParamSchema,
  CtCorrespondenciaFormatoEntregaIdParam,
  EliminarCtCorrespondenciaFormatoEntregaInput,
  eliminarCtCorrespondenciaFormatoEntregaSchema,
} from "../schemas/ct_correspondencia_formato_entrega.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CAPITULO CON BASE SERVICE =====
const ctCorrespondenciaFormatoEntregaBaseService =
  new CtCorrespondenciaFormatoEntregaService();

export class CtCorrespondenciaFormatoEntregaBaseController extends BaseController {
  /**
   * 📦 Crear nueva capitulo
   * @route POST /api/inventario/capitulo
   */
  crearCorrespondenciaFormatoEntrega = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const correspondenciaFormatoEntregaData: CrearCtCorrespondenciaFormatoEntregaInput =
          req.body;
        return await ctCorrespondenciaFormatoEntregaBaseService.crear(
          correspondenciaFormatoEntregaData
        );
      },
      "Capitulo creado exitosamente"
    );
  };

  /**
   * 📦 Obtener capitulo por ID
   * @route GET /api/inventario/capitulo/:id_ct_capitulo
   */
  obtenerCorrespondenciaFormatoEntregaPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_correspondencia_formato_entrega } =
          this.validarDatosConEsquema<CtCorrespondenciaFormatoEntregaIdParam>(
            ctCorrespondenciaFormatoEntregaIdParamSchema,
            req.params
          );

        return await ctCorrespondenciaFormatoEntregaBaseService.obtenerPorId(
          id_ct_correspondencia_formato_entrega
        );
      },
      "Capitulo obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las correspondencia formatos entrega con filtros y paginación
   * @route GET /api/inventario/capitulo
   *
   * Query parameters soportados:
   * - id_ct_correspondencia_formato_entrega: Filtrar por ID de correspondencia formato entrega (búsqueda parcial)
   * - clave_correspondencia_formato_entrega: Filtrar por clave de correspondencia formato entrega (búsqueda parcial)
   * - nombre_correspondencia_formato_entrega: Filtrar por nombre de correspondencia formato entrega (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasCorrespondenciaFormatosEntrega = async (
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

        return await ctCorrespondenciaFormatoEntregaBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Correspondencia formatos entrega obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar correspondencia formato entrega
   * @route PUT /api/inventario/capitulo/:id_ct_capitulo
   */
  actualizarCorrespondenciaFormatoEntrega = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_correspondencia_formato_entrega } =
          this.validarDatosConEsquema<CtCorrespondenciaFormatoEntregaIdParam>(
            ctCorrespondenciaFormatoEntregaIdParamSchema,
            req.params
          );
        const correspondenciaFormatoEntregaData: ActualizarCtCorrespondenciaFormatoEntregaInput =
          req.body;

        return await ctCorrespondenciaFormatoEntregaBaseService.actualizar(
          id_ct_correspondencia_formato_entrega,
          correspondenciaFormatoEntregaData
        );
      },
      "Capitulo actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar capitulo
   * @route DELETE /api/inventario/capitulo/:id_ct_capitulo
   */
  eliminarCorrespondenciaFormatoEntrega = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_correspondencia_formato_entrega } =
          this.validarDatosConEsquema<CtCorrespondenciaFormatoEntregaIdParam>(
            ctCorrespondenciaFormatoEntregaIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtCorrespondenciaFormatoEntregaInput>(
            eliminarCtCorrespondenciaFormatoEntregaSchema,
            req.body
          );

        await ctCorrespondenciaFormatoEntregaBaseService.eliminar(
          id_ct_correspondencia_formato_entrega,
          id_ct_usuario_up
        );
      },
      "Capitulo eliminada exitosamente"
    );
  };
}
