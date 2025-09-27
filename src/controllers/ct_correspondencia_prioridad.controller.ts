import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtCorrespondenciaPrioridadService } from "../services/ct_correspondencia_prioridad.service";
import {
  CrearCtCorrespondenciaPrioridadInput,
  ActualizarCtCorrespondenciaPrioridadInput,
  ctCorrespondenciaPrioridadIdParamSchema,
  CtCorrespondenciaPrioridadIdParam,
  EliminarCtCorrespondenciaPrioridadInput,
  eliminarCtCorrespondenciaPrioridadSchema,
} from "../schemas/ct_correspondencia_prioridad.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CORRESPONDENCIA_PRIORIDAD CON BASE SERVICE =====
const ctCorrespondenciaPrioridadBaseService =
  new CtCorrespondenciaPrioridadService();

export class CtCorrespondenciaPrioridadBaseController extends BaseController {
  /**
   * 📦 Crear nueva correspondencia prioridad
   * @route POST /api/inventario/capitulo
   */
  crearCorrespondenciaPrioridad = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const correspondenciaPrioridadData: CrearCtCorrespondenciaPrioridadInput =
          req.body;
        return await ctCorrespondenciaPrioridadBaseService.crear(
          correspondenciaPrioridadData
        );
      },
      "Correspondencia prioridad creada exitosamente"
    );
  };

  /**
   * 📦 Obtener correspondencia prioridad por ID
   * @route GET /api/inventario/capitulo/:id_ct_correspondencia_prioridad
   */
  obtenerCorrespondenciaPrioridadPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_correspondencia_prioridad } =
          this.validarDatosConEsquema<CtCorrespondenciaPrioridadIdParam>(
            ctCorrespondenciaPrioridadIdParamSchema,
            req.params
          );

        return await ctCorrespondenciaPrioridadBaseService.obtenerPorId(
          id_ct_correspondencia_prioridad
        );
      },
      "Correspondencia prioridad obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las correspondencias prioridades con filtros y paginación
   * @route GET /api/inventario/correspondencia_prioridad
   *
   * Query parameters soportados:
   * - id_ct_correspondencia_prioridad: Filtrar por ID de correspondencia prioridad (búsqueda parcial)
   * - nombre_correspondencia_prioridad: Filtrar por nombre de correspondencia prioridad (búsqueda parcial)
   * - nombre_correspondencia_prioridad: Filtrar por nombre de correspondencia prioridad (búsqueda parcial)
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasCorrespondenciasPrioridades = async (
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

        return await ctCorrespondenciaPrioridadBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Correspondencias prioridades obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar correspondencia prioridad
   * @route PUT /api/inventario/capitulo/:id_ct_correspondencia_prioridad
   */
  actualizarCorrespondenciaPrioridad = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_correspondencia_prioridad } =
          this.validarDatosConEsquema<CtCorrespondenciaPrioridadIdParam>(
            ctCorrespondenciaPrioridadIdParamSchema,
            req.params
          );
        const correspondenciaPrioridadData: ActualizarCtCorrespondenciaPrioridadInput =
          req.body;

        return await ctCorrespondenciaPrioridadBaseService.actualizar(
          id_ct_correspondencia_prioridad,
          correspondenciaPrioridadData
        );
      },
      "Correspondencia prioridad actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar correspondencia prioridad
   * @route DELETE /api/inventario/capitulo/:id_ct_correspondencia_prioridad
   */
  eliminarCorrespondenciaPrioridad = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_correspondencia_prioridad } =
          this.validarDatosConEsquema<CtCorrespondenciaPrioridadIdParam>(
            ctCorrespondenciaPrioridadIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtCorrespondenciaPrioridadInput>(
            eliminarCtCorrespondenciaPrioridadSchema,
            req.body
          );

        await ctCorrespondenciaPrioridadBaseService.eliminar(
          id_ct_correspondencia_prioridad,
          id_ct_usuario_up
        );
      },
      "Correspondencia prioridad eliminada exitosamente"
    );
  };
}
