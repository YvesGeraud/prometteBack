import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlAnalistaUnidadService } from "../services/rl_analista_unidad.service";
import {
  CrearRlAnalistaUnidadInput,
  ActualizarRlAnalistaUnidadInput,
  rlAnalistaUnidadIdParamSchema,
  RlAnalistaUnidadIdParam,
  EliminarRlAnalistaUnidadInput,
  eliminarRlAnalistaUnidadSchema,
} from "../schemas/rl_analista_unidad.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_ANALISTA_UNIDAD CON BASE SERVICE =====
const rlAnalistaUnidadBaseService = new RlAnalistaUnidadService();

export class RlAnalistaUnidadBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación analista unidad
   * @route POST /api/rl_analista_unidad
   */
  crearAnalistaUnidad = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const analistaUnidadData: CrearRlAnalistaUnidadInput = req.body;
        return await rlAnalistaUnidadBaseService.crear(analistaUnidadData);
      },
      "Relación analista unidad creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación analista unidad por ID
   * @route GET /api/rl_analista_unidad/:id_rl_analista_unidad
   */
  obtenerAnalistaUnidadPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_analista_unidad } =
          this.validarDatosConEsquema<RlAnalistaUnidadIdParam>(
            rlAnalistaUnidadIdParamSchema,
            req.params
          );

        return await rlAnalistaUnidadBaseService.obtenerPorId(
          id_rl_analista_unidad
        );
      },
      "Relación analista unidad obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones analista unidad con filtros y paginación
   * @route GET /api/rl_analista_unidad
   *
   * Query parameters soportados:
   * - id_rl_analista_unidad: Filtrar por ID de relación analista unidad (búsqueda parcial)
   * - ct_usuario_id: Filtrar por ID de usuario
   * - rl_area_financiero: Filtrar por ID de área financiero
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasAnalistasUnidad = async (
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

        return await rlAnalistaUnidadBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Relaciones analista unidad obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación analista unidad
   * @route PUT /api/rl_analista_unidad/:id_rl_analista_unidad
   */
  actualizarAnalistaUnidad = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_analista_unidad } =
          this.validarDatosConEsquema<RlAnalistaUnidadIdParam>(
            rlAnalistaUnidadIdParamSchema,
            req.params
          );
        const analistaUnidadData: ActualizarRlAnalistaUnidadInput = req.body;

        return await rlAnalistaUnidadBaseService.actualizar(
          id_rl_analista_unidad,
          analistaUnidadData
        );
      },
      "Relación analista unidad actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación analista unidad
   * @route DELETE /api/rl_analista_unidad/:id_rl_analista_unidad
   */
  eliminarAnalistaUnidad = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_analista_unidad } =
          this.validarDatosConEsquema<RlAnalistaUnidadIdParam>(
            rlAnalistaUnidadIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlAnalistaUnidadInput>(
            eliminarRlAnalistaUnidadSchema,
            req.body
          );

        await rlAnalistaUnidadBaseService.eliminar(
          id_rl_analista_unidad,
          id_ct_usuario_up
        );
      },
      "Relación analista unidad eliminada exitosamente"
    );
  };
}
