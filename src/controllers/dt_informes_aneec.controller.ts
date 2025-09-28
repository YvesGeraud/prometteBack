import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtInformesAneecService } from "../services/dt_informes_aneec.service";
import {
  CrearDtInformesAneecInput,
  ActualizarDtInformesAneecInput,
  dtInformesAneecIdParamSchema,
  DtInformesAneecIdParam,
  EliminarDtInformesAneecInput,
  eliminarDtInformesAneecSchema,
} from "../schemas/dt_informes_aneec.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA DT_INFORMES_ANEEC CON BASE SERVICE =====
const dtInformesAneecBaseService = new DtInformesAneecService();

export class DtInformesAneecBaseController extends BaseController {
  /**
   * 📦 Crear nuevo informe aneec
   * @route POST /api/dt_informes_aneec
   */
  crearInformeAneec = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const informeAneecData: CrearDtInformesAneecInput = req.body;
        return await dtInformesAneecBaseService.crear(informeAneecData);
      },
      "Informe aneec creado exitosamente"
    );
  };

  /**
   * 📦 Obtener informe aneec por ID
   * @route GET /api/dt_informes_aneec/:id_dt_informes_aneec
   */
  obtenerInformeAneecPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_informes_aneec } =
          this.validarDatosConEsquema<DtInformesAneecIdParam>(
            dtInformesAneecIdParamSchema,
            req.params
          );

        return await dtInformesAneecBaseService.obtenerPorId(
          id_dt_informes_aneec
        );
      },
      "Informe aneec obtenido exitosamente"
    );
  };

  /**
   * 📦 Obtener todos los informes aneec con filtros y paginación
   * @route GET /api/dt_informes_aneec
   *
   * Query parameters soportados:
   * - id_dt_informes_aneec: Filtrar por ID de informe aneec (búsqueda parcial)
   * - ruta_informe: Filtrar por ruta de informe (búsqueda parcial)
   * - id_dt_aspirante_aneec: Filtrar por ID de aspirante aneec
   * - id_dt_diagnostico_aneec: Filtrar por ID de diagnóstico aneec
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodosLosInformesAneec = async (
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

        return await dtInformesAneecBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Informes aneec obtenidos exitosamente"
    );
  };

  /**
   * 📦 Actualizar informe aneec
   * @route PUT /api/dt_informes_aneec/:id_dt_informes_aneec
   */
  actualizarInformeAneec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_informes_aneec } =
          this.validarDatosConEsquema<DtInformesAneecIdParam>(
            dtInformesAneecIdParamSchema,
            req.params
          );
        const informeAneecData: ActualizarDtInformesAneecInput = req.body;

        return await dtInformesAneecBaseService.actualizar(
          id_dt_informes_aneec,
          informeAneecData
        );
      },
      "Informe aneec actualizado exitosamente"
    );
  };

  /**
   * 📦 Eliminar informe aneec
   * @route DELETE /api/dt_informes_aneec/:id_dt_informes_aneec
   */
  eliminarInformeAneec = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_informes_aneec } =
          this.validarDatosConEsquema<DtInformesAneecIdParam>(
            dtInformesAneecIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtInformesAneecInput>(
            eliminarDtInformesAneecSchema,
            req.body
          );

        await dtInformesAneecBaseService.eliminar(
          id_dt_informes_aneec,
          id_ct_usuario_up
        );
      },
      "Informe aneec eliminado exitosamente"
    );
  };
}
