import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtCorrespondenciaService } from "../services/dt_correspondencia.service";
import {
  CrearDtCorrespondenciaInput,
  ActualizarDtCorrespondenciaInput,
  dtCorrespondenciaIdParamSchema,
  DtCorrespondenciaIdParam,
  EliminarDtCorrespondenciaInput,
  eliminarDtCorrespondenciaSchema,
} from "../schemas/dt_correspondencia.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA DT_CORRESPONDENCIA CON BASE SERVICE =====
const dtCorrespondenciaBaseService = new DtCorrespondenciaService();

export class DtCorrespondenciaBaseController extends BaseController {
  /**
   * 📦 Crear nueva correspondencia
   * @route POST /api/inventario/correspondencia
   */
  crearCorrespondencia = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const correspondenciaData: CrearDtCorrespondenciaInput = req.body;
        return await dtCorrespondenciaBaseService.crear(correspondenciaData);
      },
      "Correspondencia creada exitosamente"
    );
  };

  /**
   * 📦 Obtener correspondencia por ID
   * @route GET /api/inventario/correspondencia/:id_dt_correspondencia
   */
  obtenerCorrespondenciaPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_correspondencia } =
          this.validarDatosConEsquema<DtCorrespondenciaIdParam>(
            dtCorrespondenciaIdParamSchema,
            req.params
          );

        return await dtCorrespondenciaBaseService.obtenerPorId(
          id_dt_correspondencia
        );
      },
      "Correspondencia obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las correspondencias con filtros y paginación
   * @route GET /api/inventario/correspondencia
   *
   * Query parameters soportados:
   * - id_dt_correspondencia: Filtrar por ID de correspondencia (búsqueda parcial)
   * - clave_correspondencia: Filtrar por clave de correspondencia (búsqueda parcial)
   * - nombre_correspondencia: Filtrar por nombre de correspondencia (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasCorrespondencias = async (
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

        return await dtCorrespondenciaBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Correspondencias obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar correspondencia
   * @route PUT /api/inventario/correspondencia/:id_dt_correspondencia
   */
  actualizarCorrespondencia = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_correspondencia } =
          this.validarDatosConEsquema<DtCorrespondenciaIdParam>(
            dtCorrespondenciaIdParamSchema,
            req.params
          );
        const correspondenciaData: ActualizarDtCorrespondenciaInput = req.body;

        return await dtCorrespondenciaBaseService.actualizar(
          id_dt_correspondencia,
          correspondenciaData
        );
      },
      "Correspondencia actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar correspondencia
   * @route DELETE /api/inventario/correspondencia/:id_dt_correspondencia
   */
  eliminarCorrespondencia = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_correspondencia } =
          this.validarDatosConEsquema<DtCorrespondenciaIdParam>(
            dtCorrespondenciaIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtCorrespondenciaInput>(
            eliminarDtCorrespondenciaSchema,
            req.body
          );

        await dtCorrespondenciaBaseService.eliminar(
          id_dt_correspondencia,
          id_ct_usuario_up
        );
      },
      "Correspondencia eliminada exitosamente"
    );
  };
}
