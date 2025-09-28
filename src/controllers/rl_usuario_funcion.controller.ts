import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlUsuarioFuncionService } from "../services/rl_usuario_funcion.service";
import {
  CrearRlUsuarioFuncionInput,
  ActualizarRlUsuarioFuncionInput,
  rlUsuarioFuncionIdParamSchema,
  RlUsuarioFuncionIdParam,
  EliminarRlUsuarioFuncionInput,
  eliminarRlUsuarioFuncionSchema,
} from "../schemas/rl_usuario_funcion.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_USUARIO_FUNCION CON BASE SERVICE =====
const rlUsuarioFuncionBaseService = new RlUsuarioFuncionService();

export class RlUsuarioFuncionBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación usuario función
   * @route POST /api/rl_usuario_funcion
   */
  crearUsuarioFuncion = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const usuarioFuncionData: CrearRlUsuarioFuncionInput = req.body;
        return await rlUsuarioFuncionBaseService.crear(usuarioFuncionData);
      },
      "Relación usuario función creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación usuario función por ID
   * @route GET /api/rl_usuario_funcion/:id_rl_usuario_funcion
   */
  obtenerUsuarioFuncionPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_usuario_funcion } =
          this.validarDatosConEsquema<RlUsuarioFuncionIdParam>(
            rlUsuarioFuncionIdParamSchema,
            req.params
          );

        return await rlUsuarioFuncionBaseService.obtenerPorId(
          id_rl_usuario_funcion
        );
      },
      "Relación usuario función obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones usuario función con filtros y paginación
   * @route GET /api/rl_usuario_funcion
   *
   * Query parameters soportados:
   * - id_rl_usuario_funcion: Filtrar por ID de relación usuario función (búsqueda parcial)
   * - id_ct_usuario: Filtrar por ID de usuario
   * - id_dt_funcion: Filtrar por ID de función
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasUsuariosFuncion = async (
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

        return await rlUsuarioFuncionBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Relaciones usuario función obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación usuario función
   * @route PUT /api/rl_usuario_funcion/:id_rl_usuario_funcion
   */
  actualizarUsuarioFuncion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_usuario_funcion } =
          this.validarDatosConEsquema<RlUsuarioFuncionIdParam>(
            rlUsuarioFuncionIdParamSchema,
            req.params
          );
        const usuarioFuncionData: ActualizarRlUsuarioFuncionInput = req.body;

        return await rlUsuarioFuncionBaseService.actualizar(
          id_rl_usuario_funcion,
          usuarioFuncionData
        );
      },
      "Relación usuario función actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación usuario función
   * @route DELETE /api/rl_usuario_funcion/:id_rl_usuario_funcion
   */
  eliminarUsuarioFuncion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_usuario_funcion } =
          this.validarDatosConEsquema<RlUsuarioFuncionIdParam>(
            rlUsuarioFuncionIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlUsuarioFuncionInput>(
            eliminarRlUsuarioFuncionSchema,
            req.body
          );

        await rlUsuarioFuncionBaseService.eliminar(
          id_rl_usuario_funcion,
          id_ct_usuario_up
        );
      },
      "Relación usuario función eliminada exitosamente"
    );
  };
}
