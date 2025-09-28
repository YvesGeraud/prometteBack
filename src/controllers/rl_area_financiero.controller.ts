import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlAreaFinancieroService } from "../services/rl_area_financiero.service";
import {
  CrearRlAreaFinancieroInput,
  ActualizarRlAreaFinancieroInput,
  rlAreaFinancieroIdParamSchema,
  RlAreaFinancieroIdParam,
  EliminarRlAreaFinancieroInput,
  eliminarRlAreaFinancieroSchema,
} from "../schemas/rl_area_financiero.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_AREA_FINANCIERO CON BASE SERVICE =====
const rlAreaFinancieroBaseService = new RlAreaFinancieroService();

export class RlAreaFinancieroBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación área financiero
   * @route POST /api/rl_area_financiero
   */
  crearAreaFinanciero = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const areaFinancieroData: CrearRlAreaFinancieroInput = req.body;
        return await rlAreaFinancieroBaseService.crear(areaFinancieroData);
      },
      "Relación área financiero creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación área financiero por ID
   * @route GET /api/rl_area_financiero/:id_rl_area_financiero
   */
  obtenerAreaFinancieroPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_area_financiero } =
          this.validarDatosConEsquema<RlAreaFinancieroIdParam>(
            rlAreaFinancieroIdParamSchema,
            req.params
          );

        return await rlAreaFinancieroBaseService.obtenerPorId(
          id_rl_area_financiero
        );
      },
      "Relación área financiero obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones área financiero con filtros y paginación
   * @route GET /api/rl_area_financiero
   *
   * Query parameters soportados:
   * - id_rl_area_financiero: Filtrar por ID de relación área financiero (búsqueda parcial)
   * - id_financiero: Filtrar por ID de financiero
   * - id_area_infra: Filtrar por ID de área infraestructura
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasAreasFinanciero = async (
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

        return await rlAreaFinancieroBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Relaciones área financiero obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación área financiero
   * @route PUT /api/rl_area_financiero/:id_rl_area_financiero
   */
  actualizarAreaFinanciero = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_area_financiero } =
          this.validarDatosConEsquema<RlAreaFinancieroIdParam>(
            rlAreaFinancieroIdParamSchema,
            req.params
          );
        const areaFinancieroData: ActualizarRlAreaFinancieroInput = req.body;

        return await rlAreaFinancieroBaseService.actualizar(
          id_rl_area_financiero,
          areaFinancieroData
        );
      },
      "Relación área financiero actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación área financiero
   * @route DELETE /api/rl_area_financiero/:id_rl_area_financiero
   */
  eliminarAreaFinanciero = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_area_financiero } =
          this.validarDatosConEsquema<RlAreaFinancieroIdParam>(
            rlAreaFinancieroIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlAreaFinancieroInput>(
            eliminarRlAreaFinancieroSchema,
            req.body
          );

        await rlAreaFinancieroBaseService.eliminar(
          id_rl_area_financiero,
          id_ct_usuario_up
        );
      },
      "Relación área financiero eliminada exitosamente"
    );
  };
}
