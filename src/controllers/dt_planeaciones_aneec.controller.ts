import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtPlaneacionesAneecService } from "../services/dt_planeaciones_aneec.service";
import {
  CrearDtPlaneacionesAneecInput,
  ActualizarDtPlaneacionesAneecInput,
  dtPlaneacionesAneecIdParamSchema,
  DtPlaneacionesAneecIdParam,
  EliminarDtPlaneacionesAneecInput,
  eliminarDtPlaneacionesAneecSchema,
} from "../schemas/dt_planeaciones_aneec.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA DT_PLANEACIONES_ANEEC CON BASE SERVICE =====
const dtPlaneacionesAneecBaseService = new DtPlaneacionesAneecService();

export class DtPlaneacionesAneecBaseController extends BaseController {
  /**
   * 📦 Crear nueva planeación aneec
   * @route POST /api/dt_planeaciones_aneec
   */
  crearPlaneacionAneec = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const planeacionAneecData: CrearDtPlaneacionesAneecInput = req.body;
        return await dtPlaneacionesAneecBaseService.crear(planeacionAneecData);
      },
      "Planeación aneec creada exitosamente"
    );
  };

  /**
   * 📦 Obtener planeación aneec por ID
   * @route GET /api/dt_planeaciones_aneec/:id_dt_planeaciones_aneec
   */
  obtenerPlaneacionAneecPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_planeaciones_aneec } =
          this.validarDatosConEsquema<DtPlaneacionesAneecIdParam>(
            dtPlaneacionesAneecIdParamSchema,
            req.params
          );

        return await dtPlaneacionesAneecBaseService.obtenerPorId(
          id_dt_planeaciones_aneec
        );
      },
      "Planeación aneec obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las planeaciones aneec con filtros y paginación
   * @route GET /api/dt_planeaciones_aneec
   *
   * Query parameters soportados:
   * - id_dt_planeaciones_aneec: Filtrar por ID de planeación aneec (búsqueda parcial)
   * - ruta_documento: Filtrar por ruta de documento (búsqueda parcial)
   * - id_ct_documento_aneec: Filtrar por ID de documento aneec
   * - id_dt_aspirante_aneec: Filtrar por ID de aspirante aneec
   * - id_dt_diagnostico_aneec: Filtrar por ID de diagnóstico aneec
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasPlaneacionesAneec = async (
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

        return await dtPlaneacionesAneecBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Planeaciones aneec obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar planeación aneec
   * @route PUT /api/dt_planeaciones_aneec/:id_dt_planeaciones_aneec
   */
  actualizarPlaneacionAneec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_planeaciones_aneec } =
          this.validarDatosConEsquema<DtPlaneacionesAneecIdParam>(
            dtPlaneacionesAneecIdParamSchema,
            req.params
          );
        const planeacionAneecData: ActualizarDtPlaneacionesAneecInput =
          req.body;

        return await dtPlaneacionesAneecBaseService.actualizar(
          id_dt_planeaciones_aneec,
          planeacionAneecData
        );
      },
      "Planeación aneec actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar planeación aneec
   * @route DELETE /api/dt_planeaciones_aneec/:id_dt_planeaciones_aneec
   */
  eliminarPlaneacionAneec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_planeaciones_aneec } =
          this.validarDatosConEsquema<DtPlaneacionesAneecIdParam>(
            dtPlaneacionesAneecIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtPlaneacionesAneecInput>(
            eliminarDtPlaneacionesAneecSchema,
            req.body
          );

        await dtPlaneacionesAneecBaseService.eliminar(
          id_dt_planeaciones_aneec,
          id_ct_usuario_up
        );
      },
      "Planeación aneec eliminada exitosamente"
    );
  };
}
