import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtDiagnosticoAneecService } from "../services/dt_diagnostico_aneec.service";
import {
  CrearDtDiagnosticoAneecInput,
  ActualizarDtDiagnosticoAneecInput,
  dtDiagnosticoAneecIdParamSchema,
  DtDiagnosticoAneecIdParam,
  EliminarDtDiagnosticoAneecInput,
  eliminarDtDiagnosticoAneecSchema,
} from "../schemas/dt_diagnostico_aneec.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CAPITULO CON BASE SERVICE =====
const dtDiagnosticoAneecBaseService = new DtDiagnosticoAneecService();

export class DtDiagnosticoAneecBaseController extends BaseController {
  /**
   * 📦 Crear nuevo diagnostico aneec
   * @route POST /api/inventario/diagnostico_aneec
   */
  crearDiagnosticoAneec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const diagnosticoAneecData: CrearDtDiagnosticoAneecInput = req.body;
        return await dtDiagnosticoAneecBaseService.crear(diagnosticoAneecData);
      },
      "Diagnostico Aneec creado exitosamente"
    );
  };

  /**
   * 📦 Obtener diagnostico aneec por ID
   * @route GET /api/inventario/diagnostico_aneec/:id_dt_diagnostico_aneec
   */
  obtenerDiagnosticoAneecPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_diagnostico_aneec } =
          this.validarDatosConEsquema<DtDiagnosticoAneecIdParam>(
            dtDiagnosticoAneecIdParamSchema,
            req.params
          );

        return await dtDiagnosticoAneecBaseService.obtenerPorId(
          id_dt_diagnostico_aneec
        );
      },
      "Diagnostico Aneec obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las diagnostico aneec con filtros y paginación
   * @route GET /api/inventario/diagnostico_aneec
   *
   * Query parameters soportados:
   * - id_dt_diagnostico_aneec: Filtrar por ID de diagnostico aneec (búsqueda parcial)
   * - clave_capitulo: Filtrar por clave de capitulo (búsqueda parcial)
   * - nombre_capitulo: Filtrar por nombre de capitulo (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasDiagnosticoAneec = async (
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

        return await dtDiagnosticoAneecBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Diagnostico Aneec obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar diagnostico aneec
   * @route PUT /api/inventario/capitulo/:id_ct_capitulo
   */
  actualizarDiagnosticoAneec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_diagnostico_aneec } =
          this.validarDatosConEsquema<DtDiagnosticoAneecIdParam>(
            dtDiagnosticoAneecIdParamSchema,
            req.params
          );
        const diagnosticoAneecData: ActualizarDtDiagnosticoAneecInput =
          req.body;

        return await dtDiagnosticoAneecBaseService.actualizar(
          id_dt_diagnostico_aneec,
          diagnosticoAneecData
        );
      },
      "Diagnostico Aneec actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar diagnostico aneec
   * @route DELETE /api/inventario/capitulo/:id_ct_capitulo
   */
  eliminarDiagnosticoAneec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_diagnostico_aneec } =
          this.validarDatosConEsquema<DtDiagnosticoAneecIdParam>(
            dtDiagnosticoAneecIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtDiagnosticoAneecInput>(
            eliminarDtDiagnosticoAneecSchema,
            req.body
          );

        await dtDiagnosticoAneecBaseService.eliminar(
          id_dt_diagnostico_aneec,
          id_ct_usuario_up
        );
      },
      "Diagnostico Aneec eliminada exitosamente"
    );
  };
}
