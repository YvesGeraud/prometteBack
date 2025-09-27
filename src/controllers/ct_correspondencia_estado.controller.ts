import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtCorrespondenciaEstadoService } from "../services/ct_correspondencia_estado.service";
import {
  CrearCtCorrespondenciaEstadoInput,
  ActualizarCtCorrespondenciaEstadoInput,
  ctCorrespondenciaEstadoIdParamSchema,
  CtCorrespondenciaEstadoIdParam,
  EliminarCtCorrespondenciaEstadoInput,
  eliminarCtCorrespondenciaEstadoSchema,
} from "../schemas/ct_correspondencia_estado.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_BITACORA_ACCION CON BASE SERVICE =====
const ctCorrespondenciaEstadoBaseService = new CtCorrespondenciaEstadoService();

export class CtCorrespondenciaEstadoController extends BaseController {
  /**
   * 📦 Crear nueva correspondencia estado
   * @route POST /api/inventario/correspondencia_estado
   */
  crearCorrespondenciaEstado = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const correspondenciaEstadoData: CrearCtCorrespondenciaEstadoInput =
          req.body;
        return await ctCorrespondenciaEstadoBaseService.crear(
          correspondenciaEstadoData
        );
      },
      "Correspondencia estado creado exitosamente"
    );
  };

  /**
   * 📦 Obtener correspondencia estado por ID
   * @route GET /api/inventario/correspondencia_estado/:id_ct_correspondencia_estado
   */
  obtenerCorrespondenciaEstadoPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_correspondencia_estado } =
          this.validarDatosConEsquema<CtCorrespondenciaEstadoIdParam>(
            ctCorrespondenciaEstadoIdParamSchema,
            req.params
          );

        return await ctCorrespondenciaEstadoBaseService.obtenerPorId(
          id_ct_correspondencia_estado
        );
      },
      "Correspondencia estado obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las correspondencia estados con filtros y paginación
   * @route GET /api/inventario/correspondencia_estado
   *
   * Query parameters soportados:
   * - id_ct_correspondencia_estado: Filtrar por ID de correspondencia estado (búsqueda parcial)
   * - nombre: Filtrar por nombre de correspondencia estado (búsqueda parcial)
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasCorrespondenciaEstados = async (
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

        return await ctCorrespondenciaEstadoBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Correspondencia estados obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar correspondencia estado
   * @route PUT /api/inventario/correspondencia_estado/:id_ct_correspondencia_estado
   */
  actualizarCorrespondenciaEstado = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_correspondencia_estado } =
          this.validarDatosConEsquema<CtCorrespondenciaEstadoIdParam>(
            ctCorrespondenciaEstadoIdParamSchema,
            req.params
          );
        const correspondenciaEstadoData: ActualizarCtCorrespondenciaEstadoInput =
          req.body;

        return await ctCorrespondenciaEstadoBaseService.actualizar(
          id_ct_correspondencia_estado,
          correspondenciaEstadoData
        );
      },
      "Correspondencia estado actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar correspondencia estado
   * @route DELETE /api/inventario/correspondencia_estado/:id_ct_correspondencia_estado
   */
  eliminarCorrespondenciaEstado = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_correspondencia_estado } =
          this.validarDatosConEsquema<CtCorrespondenciaEstadoIdParam>(
            ctCorrespondenciaEstadoIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtCorrespondenciaEstadoInput>(
            eliminarCtCorrespondenciaEstadoSchema,
            req.body
          );

        await ctCorrespondenciaEstadoBaseService.eliminar(
          id_ct_correspondencia_estado,
          id_ct_usuario_up
        );
      },
      "Correspondencia estado eliminada exitosamente"
    );
  };
}
