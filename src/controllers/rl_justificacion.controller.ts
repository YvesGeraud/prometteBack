import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlJustificacionService } from "../services/rl_justificacion.service";
import {
  CrearRlJustificacionInput,
  ActualizarRlJustificacionInput,
  rlJustificacionIdParamSchema,
  RlJustificacionIdParam,
  EliminarRlJustificacionInput,
  eliminarRlJustificacionSchema,
} from "../schemas/rl_justificacion.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_JUSTIFICACION CON BASE SERVICE =====
const rlJustificacionBaseService = new RlJustificacionService();

export class RlJustificacionBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación justificación
   * @route POST /api/rl_justificacion
   */
  crearJustificacion = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const justificacionData: CrearRlJustificacionInput = req.body;
        return await rlJustificacionBaseService.crear(justificacionData);
      },
      "Relación justificación creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación justificación por ID
   * @route GET /api/rl_justificacion/:id_rl_justificacion
   */
  obtenerJustificacionPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_justificacion } =
          this.validarDatosConEsquema<RlJustificacionIdParam>(
            rlJustificacionIdParamSchema,
            req.params
          );

        return await rlJustificacionBaseService.obtenerPorId(
          id_rl_justificacion
        );
      },
      "Relación justificación obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones justificación con filtros y paginación
   * @route GET /api/rl_justificacion
   *
   * Query parameters soportados:
   * - id_rl_justificacion: Filtrar por ID de relación justificación (búsqueda parcial)
   * - ct_partida_id: Filtrar por ID de partida
   * - ct_area_id: Filtrar por ID de área
   * - dt_techo_id: Filtrar por ID de techo presupuesto
   * - justificacion: Filtrar por justificación (búsqueda parcial)
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasJustificaciones = async (
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

        return await rlJustificacionBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Relaciones justificación obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación justificación
   * @route PUT /api/rl_justificacion/:id_rl_justificacion
   */
  actualizarJustificacion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_justificacion } =
          this.validarDatosConEsquema<RlJustificacionIdParam>(
            rlJustificacionIdParamSchema,
            req.params
          );
        const justificacionData: ActualizarRlJustificacionInput = req.body;

        return await rlJustificacionBaseService.actualizar(
          id_rl_justificacion,
          justificacionData
        );
      },
      "Relación justificación actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación justificación
   * @route DELETE /api/rl_justificacion/:id_rl_justificacion
   */
  eliminarJustificacion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_justificacion } =
          this.validarDatosConEsquema<RlJustificacionIdParam>(
            rlJustificacionIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlJustificacionInput>(
            eliminarRlJustificacionSchema,
            req.body
          );

        await rlJustificacionBaseService.eliminar(
          id_rl_justificacion,
          id_ct_usuario_up
        );
      },
      "Relación justificación eliminada exitosamente"
    );
  };
}
