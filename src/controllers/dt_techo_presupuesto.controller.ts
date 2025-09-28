import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtTechoPresupuestoService } from "../services/dt_techo_presupuesto.service";
import {
  CrearDtTechoPresupuestoInput,
  ActualizarDtTechoPresupuestoInput,
  dtTechoPresupuestoIdParamSchema,
  DtTechoPresupuestoIdParam,
  EliminarDtTechoPresupuestoInput,
  eliminarDtTechoPresupuestoSchema,
} from "../schemas/dt_techo_presupuesto.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA DT_TECHO_PRESUPUESTO CON BASE SERVICE =====
const dtTechoPresupuestoBaseService = new DtTechoPresupuestoService();

export class DtTechoPresupuestoBaseController extends BaseController {
  /**
   * 📦 Crear nuevo techo presupuestal
   * @route POST /api/dt_techo_presupuesto
   */
  crearTechoPresupuesto = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const techoPresupuestoData: CrearDtTechoPresupuestoInput = req.body;
        return await dtTechoPresupuestoBaseService.crear(techoPresupuestoData);
      },
      "Techo presupuestal creado exitosamente"
    );
  };

  /**
   * 📦 Obtener techo presupuestal por ID
   * @route GET /api/dt_techo_presupuesto/:id_dt_techo_presupuesto
   */
  obtenerTechoPresupuestoPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_techo_presupuesto } =
          this.validarDatosConEsquema<DtTechoPresupuestoIdParam>(
            dtTechoPresupuestoIdParamSchema,
            req.params
          );

        return await dtTechoPresupuestoBaseService.obtenerPorId(
          id_dt_techo_presupuesto
        );
      },
      "Techo presupuestal obtenido exitosamente"
    );
  };

  /**
   * 📦 Obtener todos los techos presupuestales con filtros y paginación
   * @route GET /api/dt_techo_presupuesto
   *
   * Query parameters soportados:
   * - id_dt_techo_presupuesto: Filtrar por ID de techo presupuestal (búsqueda parcial)
   * - id_rl_area_financiero: Filtrar por ID de área financiera
   * - id_ct_capitulo: Filtrar por ID de capítulo
   * - id_ct_financiamiento: Filtrar por ID de financiamiento
   * - cantidad_presupuestada: Filtrar por cantidad presupuestada
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodosLosTechosPresupuestales = async (
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

        return await dtTechoPresupuestoBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Techos presupuestales obtenidos exitosamente"
    );
  };

  /**
   * 📦 Actualizar techo presupuestal
   * @route PUT /api/dt_techo_presupuesto/:id_dt_techo_presupuesto
   */
  actualizarTechoPresupuesto = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_techo_presupuesto } =
          this.validarDatosConEsquema<DtTechoPresupuestoIdParam>(
            dtTechoPresupuestoIdParamSchema,
            req.params
          );
        const techoPresupuestoData: ActualizarDtTechoPresupuestoInput =
          req.body;

        return await dtTechoPresupuestoBaseService.actualizar(
          id_dt_techo_presupuesto,
          techoPresupuestoData
        );
      },
      "Techo presupuestal actualizado exitosamente"
    );
  };

  /**
   * 📦 Eliminar techo presupuestal
   * @route DELETE /api/dt_techo_presupuesto/:id_dt_techo_presupuesto
   */
  eliminarTechoPresupuesto = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_techo_presupuesto } =
          this.validarDatosConEsquema<DtTechoPresupuestoIdParam>(
            dtTechoPresupuestoIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtTechoPresupuestoInput>(
            eliminarDtTechoPresupuestoSchema,
            req.body
          );

        await dtTechoPresupuestoBaseService.eliminar(
          id_dt_techo_presupuesto,
          id_ct_usuario_up
        );
      },
      "Techo presupuestal eliminado exitosamente"
    );
  };
}
