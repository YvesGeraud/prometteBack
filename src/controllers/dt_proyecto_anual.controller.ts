import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtProyectoAnualService } from "../services/dt_proyecto_anual.service";
import {
  CrearDtProyectoAnualInput,
  ActualizarDtProyectoAnualInput,
  dtProyectoAnualIdParamSchema,
  DtProyectoAnualIdParam,
  EliminarDtProyectoAnualInput,
  eliminarDtProyectoAnualSchema,
} from "../schemas/dt_proyecto_anual.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA DT_PROYECTO_ANUAL CON BASE SERVICE =====
const dtProyectoAnualBaseService = new DtProyectoAnualService();

export class DtProyectoAnualBaseController extends BaseController {
  /**
   * 📦 Crear nuevo proyecto anual
   * @route POST /api/dt_proyecto_anual
   */
  crearProyectoAnual = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const proyectoAnualData: CrearDtProyectoAnualInput = req.body;
        return await dtProyectoAnualBaseService.crear(proyectoAnualData);
      },
      "Proyecto anual creado exitosamente"
    );
  };

  /**
   * 📦 Obtener proyecto anual por ID
   * @route GET /api/dt_proyecto_anual/:id_dt_proyecto_anual
   */
  obtenerProyectoAnualPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_proyecto_anual } =
          this.validarDatosConEsquema<DtProyectoAnualIdParam>(
            dtProyectoAnualIdParamSchema,
            req.params
          );

        return await dtProyectoAnualBaseService.obtenerPorId(
          id_dt_proyecto_anual
        );
      },
      "Proyecto anual obtenido exitosamente"
    );
  };

  /**
   * 📦 Obtener todos los proyectos anuales con filtros y paginación
   * @route GET /api/dt_proyecto_anual
   *
   * Query parameters soportados:
   * - id_dt_proyecto_anual: Filtrar por ID de proyecto anual (búsqueda parcial)
   * - a_o: Filtrar por año
   * - id_dt_techo_presupuesto: Filtrar por ID de techo presupuestal
   * - monto_asignado: Filtrar por monto asignado
   * - monto_utilizado: Filtrar por monto utilizado
   * - monto_disponible: Filtrar por monto disponible
   * - descripcion: Filtrar por descripción (búsqueda parcial)
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodosLosProyectosAnuales = async (
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

        return await dtProyectoAnualBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Proyectos anuales obtenidos exitosamente"
    );
  };

  /**
   * 📦 Actualizar proyecto anual
   * @route PUT /api/dt_proyecto_anual/:id_dt_proyecto_anual
   */
  actualizarProyectoAnual = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_proyecto_anual } =
          this.validarDatosConEsquema<DtProyectoAnualIdParam>(
            dtProyectoAnualIdParamSchema,
            req.params
          );
        const proyectoAnualData: ActualizarDtProyectoAnualInput = req.body;

        return await dtProyectoAnualBaseService.actualizar(
          id_dt_proyecto_anual,
          proyectoAnualData
        );
      },
      "Proyecto anual actualizado exitosamente"
    );
  };

  /**
   * 📦 Eliminar proyecto anual
   * @route DELETE /api/dt_proyecto_anual/:id_dt_proyecto_anual
   */
  eliminarProyectoAnual = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_proyecto_anual } =
          this.validarDatosConEsquema<DtProyectoAnualIdParam>(
            dtProyectoAnualIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtProyectoAnualInput>(
            eliminarDtProyectoAnualSchema,
            req.body
          );

        await dtProyectoAnualBaseService.eliminar(
          id_dt_proyecto_anual,
          id_ct_usuario_up
        );
      },
      "Proyecto anual eliminado exitosamente"
    );
  };
}
