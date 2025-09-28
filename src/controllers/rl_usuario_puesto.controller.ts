import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlUsuarioPuestoService } from "../services/rl_usuario_puesto.service";
import {
  CrearRlUsuarioPuestoInput,
  ActualizarRlUsuarioPuestoInput,
  rlUsuarioPuestoIdParamSchema,
  RlUsuarioPuestoIdParam,
  EliminarRlUsuarioPuestoInput,
  eliminarRlUsuarioPuestoSchema,
} from "../schemas/rl_usuario_puesto.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_USUARIO_PUESTO CON BASE SERVICE =====
const rlUsuarioPuestoBaseService = new RlUsuarioPuestoService();

export class RlUsuarioPuestoBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación usuario puesto
   * @route POST /api/rl_usuario_puesto
   */
  crearUsuarioPuesto = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const usuarioPuestoData: CrearRlUsuarioPuestoInput = req.body;
        return await rlUsuarioPuestoBaseService.crear(usuarioPuestoData);
      },
      "Relación usuario puesto creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación usuario puesto por ID
   * @route GET /api/rl_usuario_puesto/:id_rl_usuario_puesto
   */
  obtenerUsuarioPuestoPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_usuario_puesto } =
          this.validarDatosConEsquema<RlUsuarioPuestoIdParam>(
            rlUsuarioPuestoIdParamSchema,
            req.params
          );

        return await rlUsuarioPuestoBaseService.obtenerPorId(
          id_rl_usuario_puesto
        );
      },
      "Relación usuario puesto obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones usuario puesto con filtros y paginación
   * @route GET /api/rl_usuario_puesto
   *
   * Query parameters soportados:
   * - id_rl_usuario_puesto: Filtrar por ID de relación usuario puesto (búsqueda parcial)
   * - id_ct_usuario: Filtrar por ID de usuario
   * - id_ct_puesto: Filtrar por ID de puesto
   * - id_area: Filtrar por ID de área
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasUsuariosPuesto = async (
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

        return await rlUsuarioPuestoBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Relaciones usuario puesto obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación usuario puesto
   * @route PUT /api/rl_usuario_puesto/:id_rl_usuario_puesto
   */
  actualizarUsuarioPuesto = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_usuario_puesto } =
          this.validarDatosConEsquema<RlUsuarioPuestoIdParam>(
            rlUsuarioPuestoIdParamSchema,
            req.params
          );
        const usuarioPuestoData: ActualizarRlUsuarioPuestoInput = req.body;

        return await rlUsuarioPuestoBaseService.actualizar(
          id_rl_usuario_puesto,
          usuarioPuestoData
        );
      },
      "Relación usuario puesto actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación usuario puesto
   * @route DELETE /api/rl_usuario_puesto/:id_rl_usuario_puesto
   */
  eliminarUsuarioPuesto = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_usuario_puesto } =
          this.validarDatosConEsquema<RlUsuarioPuestoIdParam>(
            rlUsuarioPuestoIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlUsuarioPuestoInput>(
            eliminarRlUsuarioPuestoSchema,
            req.body
          );

        await rlUsuarioPuestoBaseService.eliminar(
          id_rl_usuario_puesto,
          id_ct_usuario_up
        );
      },
      "Relación usuario puesto eliminada exitosamente"
    );
  };
}
