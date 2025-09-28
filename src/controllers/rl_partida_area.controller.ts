import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlPartidaAreaService } from "../services/rl_partida_area.service";
import {
  CrearRlPartidaAreaInput,
  ActualizarRlPartidaAreaInput,
  rlPartidaAreaIdParamSchema,
  RlPartidaAreaIdParam,
  EliminarRlPartidaAreaInput,
  eliminarRlPartidaAreaSchema,
} from "../schemas/rl_partida_area.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_PARTIDA_AREA CON BASE SERVICE =====
const rlPartidaAreaBaseService = new RlPartidaAreaService();

export class RlPartidaAreaBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación partida área
   * @route POST /api/rl_partida_area
   */
  crearPartidaArea = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const partidaAreaData: CrearRlPartidaAreaInput = req.body;
        return await rlPartidaAreaBaseService.crear(partidaAreaData);
      },
      "Relación partida área creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación partida área por ID
   * @route GET /api/rl_partida_area/:id_rl_partida_area
   */
  obtenerPartidaAreaPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_partida_area } =
          this.validarDatosConEsquema<RlPartidaAreaIdParam>(
            rlPartidaAreaIdParamSchema,
            req.params
          );

        return await rlPartidaAreaBaseService.obtenerPorId(id_rl_partida_area);
      },
      "Relación partida área obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones partida área con filtros y paginación
   * @route GET /api/rl_partida_area
   *
   * Query parameters soportados:
   * - id_rl_partida_area: Filtrar por ID de relación partida área (búsqueda parcial)
   * - id_area_infra: Filtrar por ID de área infraestructura
   * - id_ct_partida: Filtrar por ID de partida
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasPartidasArea = async (
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

        return await rlPartidaAreaBaseService.obtenerTodos(filters, pagination);
      },
      "Relaciones partida área obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación partida área
   * @route PUT /api/rl_partida_area/:id_rl_partida_area
   */
  actualizarPartidaArea = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_partida_area } =
          this.validarDatosConEsquema<RlPartidaAreaIdParam>(
            rlPartidaAreaIdParamSchema,
            req.params
          );
        const partidaAreaData: ActualizarRlPartidaAreaInput = req.body;

        return await rlPartidaAreaBaseService.actualizar(
          id_rl_partida_area,
          partidaAreaData
        );
      },
      "Relación partida área actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación partida área
   * @route DELETE /api/rl_partida_area/:id_rl_partida_area
   */
  eliminarPartidaArea = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_partida_area } =
          this.validarDatosConEsquema<RlPartidaAreaIdParam>(
            rlPartidaAreaIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlPartidaAreaInput>(
            eliminarRlPartidaAreaSchema,
            req.body
          );

        await rlPartidaAreaBaseService.eliminar(
          id_rl_partida_area,
          id_ct_usuario_up
        );
      },
      "Relación partida área eliminada exitosamente"
    );
  };
}
