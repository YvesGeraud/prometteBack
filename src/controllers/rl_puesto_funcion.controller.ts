import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlPuestoFuncionService } from "../services/rl_puesto_funcion.service";
import {
  CrearRlPuestoFuncionInput,
  ActualizarRlPuestoFuncionInput,
  rlPuestoFuncionIdParamSchema,
  RlPuestoFuncionIdParam,
  EliminarRlPuestoFuncionInput,
  eliminarRlPuestoFuncionSchema,
} from "../schemas/rl_puesto_funcion.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_PUESTO_FUNCION CON BASE SERVICE =====
const rlPuestoFuncionBaseService = new RlPuestoFuncionService();

export class RlPuestoFuncionBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación puesto función
   * @route POST /api/rl_puesto_funcion
   */
  crearPuestoFuncion = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const puestoFuncionData: CrearRlPuestoFuncionInput = req.body;
        return await rlPuestoFuncionBaseService.crear(puestoFuncionData);
      },
      "Relación puesto función creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación puesto función por ID
   * @route GET /api/rl_puesto_funcion/:id_rl_puesto_funcion
   */
  obtenerPuestoFuncionPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_puesto_funcion } =
          this.validarDatosConEsquema<RlPuestoFuncionIdParam>(
            rlPuestoFuncionIdParamSchema,
            req.params
          );

        return await rlPuestoFuncionBaseService.obtenerPorId(
          id_rl_puesto_funcion
        );
      },
      "Relación puesto función obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones puesto función con filtros y paginación
   * @route GET /api/rl_puesto_funcion
   *
   * Query parameters soportados:
   * - id_rl_puesto_funcion: Filtrar por ID de relación puesto función (búsqueda parcial)
   * - id_ct_puesto: Filtrar por ID de puesto
   * - id_dt_funcion: Filtrar por ID de función
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasPuestosFuncion = async (
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

        return await rlPuestoFuncionBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Relaciones puesto función obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación puesto función
   * @route PUT /api/rl_puesto_funcion/:id_rl_puesto_funcion
   */
  actualizarPuestoFuncion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_puesto_funcion } =
          this.validarDatosConEsquema<RlPuestoFuncionIdParam>(
            rlPuestoFuncionIdParamSchema,
            req.params
          );
        const puestoFuncionData: ActualizarRlPuestoFuncionInput = req.body;

        return await rlPuestoFuncionBaseService.actualizar(
          id_rl_puesto_funcion,
          puestoFuncionData
        );
      },
      "Relación puesto función actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación puesto función
   * @route DELETE /api/rl_puesto_funcion/:id_rl_puesto_funcion
   */
  eliminarPuestoFuncion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_puesto_funcion } =
          this.validarDatosConEsquema<RlPuestoFuncionIdParam>(
            rlPuestoFuncionIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlPuestoFuncionInput>(
            eliminarRlPuestoFuncionSchema,
            req.body
          );

        await rlPuestoFuncionBaseService.eliminar(
          id_rl_puesto_funcion,
          id_ct_usuario_up
        );
      },
      "Relación puesto función eliminada exitosamente"
    );
  };
}
