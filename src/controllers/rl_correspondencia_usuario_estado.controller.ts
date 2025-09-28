import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlCorrespondenciaUsuarioEstadoService } from "../services/rl_correspondencia_usuario_estado.service";
import {
  CrearRlCorrespondenciaUsuarioEstadoInput,
  ActualizarRlCorrespondenciaUsuarioEstadoInput,
  rlCorrespondenciaUsuarioEstadoIdParamSchema,
  RlCorrespondenciaUsuarioEstadoIdParam,
  EliminarRlCorrespondenciaUsuarioEstadoInput,
  eliminarRlCorrespondenciaUsuarioEstadoSchema,
} from "../schemas/rl_correspondencia_usuario_estado.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_CORRESPONDENCIA_USUARIO_ESTADO CON BASE SERVICE =====
const rlCorrespondenciaUsuarioEstadoBaseService =
  new RlCorrespondenciaUsuarioEstadoService();

export class RlCorrespondenciaUsuarioEstadoBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación correspondencia usuario estado
   * @route POST /api/rl_correspondencia_usuario_estado
   */
  crearCorrespondenciaUsuarioEstado = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const correspondenciaUsuarioEstadoData: CrearRlCorrespondenciaUsuarioEstadoInput =
          req.body;
        return await rlCorrespondenciaUsuarioEstadoBaseService.crear(
          correspondenciaUsuarioEstadoData
        );
      },
      "Relación correspondencia usuario estado creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación correspondencia usuario estado por ID
   * @route GET /api/rl_correspondencia_usuario_estado/:id_rl_correspondencia_usuario_estado
   */
  obtenerCorrespondenciaUsuarioEstadoPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_correspondencia_usuario_estado } =
          this.validarDatosConEsquema<RlCorrespondenciaUsuarioEstadoIdParam>(
            rlCorrespondenciaUsuarioEstadoIdParamSchema,
            req.params
          );

        return await rlCorrespondenciaUsuarioEstadoBaseService.obtenerPorId(
          id_rl_correspondencia_usuario_estado
        );
      },
      "Relación correspondencia usuario estado obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones correspondencia usuario estado con filtros y paginación
   * @route GET /api/rl_correspondencia_usuario_estado
   *
   * Query parameters soportados:
   * - id_rl_correspondencia_usuario_estado: Filtrar por ID de relación correspondencia usuario estado (búsqueda parcial)
   * - id_dt_correspondencia: Filtrar por ID de correspondencia
   * - id_rl_usuario_puesto: Filtrar por ID de usuario puesto
   * - id_ct_correspondencia_estado: Filtrar por ID de estado de correspondencia
   * - tipo_turnado: Filtrar por tipo de turnado (respuesta/consulta)
   * - observaciones: Filtrar por observaciones (búsqueda parcial)
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasCorrespondenciasUsuarioEstado = async (
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

        return await rlCorrespondenciaUsuarioEstadoBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Relaciones correspondencia usuario estado obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación correspondencia usuario estado
   * @route PUT /api/rl_correspondencia_usuario_estado/:id_rl_correspondencia_usuario_estado
   */
  actualizarCorrespondenciaUsuarioEstado = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_correspondencia_usuario_estado } =
          this.validarDatosConEsquema<RlCorrespondenciaUsuarioEstadoIdParam>(
            rlCorrespondenciaUsuarioEstadoIdParamSchema,
            req.params
          );
        const correspondenciaUsuarioEstadoData: ActualizarRlCorrespondenciaUsuarioEstadoInput =
          req.body;

        return await rlCorrespondenciaUsuarioEstadoBaseService.actualizar(
          id_rl_correspondencia_usuario_estado,
          correspondenciaUsuarioEstadoData
        );
      },
      "Relación correspondencia usuario estado actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación correspondencia usuario estado
   * @route DELETE /api/rl_correspondencia_usuario_estado/:id_rl_correspondencia_usuario_estado
   */
  eliminarCorrespondenciaUsuarioEstado = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_correspondencia_usuario_estado } =
          this.validarDatosConEsquema<RlCorrespondenciaUsuarioEstadoIdParam>(
            rlCorrespondenciaUsuarioEstadoIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlCorrespondenciaUsuarioEstadoInput>(
            eliminarRlCorrespondenciaUsuarioEstadoSchema,
            req.body
          );

        await rlCorrespondenciaUsuarioEstadoBaseService.eliminar(
          id_rl_correspondencia_usuario_estado,
          id_ct_usuario_up
        );
      },
      "Relación correspondencia usuario estado eliminada exitosamente"
    );
  };
}
