import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtDispositivoService } from "../services/ct_dispositivo.service";
import {
  CrearCtDispositivoInput,
  ActualizarCtDispositivoInput,
  ctDispositivoIdParamSchema,
  CtDispositivoIdParam,
  EliminarCtDispositivoInput,
  eliminarCtDispositivoSchema,
} from "../schemas/ct_dispositivo.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_DISPOSITIVO CON BASE SERVICE =====
const ctDispositivoBaseService = new CtDispositivoService();

export class CtDispositivoBaseController extends BaseController {
  /**
   * 📦 Crear nueva dispositivo
   * @route POST /api/inventario/dispositivo
   */
  crearDispositivo = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const dispositivoData: CrearCtDispositivoInput = req.body;
        return await ctDispositivoBaseService.crear(dispositivoData);
      },
      "Dispositivo creado exitosamente"
    );
  };

  /**
   * 📦 Obtener dispositivo por ID
   * @route GET /api/inventario/dispositivo/:id_dispositivo
   */
  obtenerDispositivoPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dispositivo } =
          this.validarDatosConEsquema<CtDispositivoIdParam>(
            ctDispositivoIdParamSchema,
            req.params
          );

        return await ctDispositivoBaseService.obtenerPorId(id_dispositivo);
      },
      "Dispositivo obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las dispositivos con filtros y paginación
   * @route GET /api/inventario/dispositivo
   *
   * Query parameters soportados:
   * - id_dispositivo: Filtrar por ID de dispositivo (búsqueda parcial)
   * - clave_dispositivo: Filtrar por clave de dispositivo (búsqueda parcial)
   * - nombre_dispositivo: Filtrar por nombre de dispositivo (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasDispositivos = async (
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

        return await ctDispositivoBaseService.obtenerTodos(filters, pagination);
      },
      "Dispositivos obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar dispositivo
   * @route PUT /api/inventario/dispositivo/:id_dispositivo
   */
  actualizarDispositivo = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dispositivo } =
          this.validarDatosConEsquema<CtDispositivoIdParam>(
            ctDispositivoIdParamSchema,
            req.params
          );
        const dispositivoData: ActualizarCtDispositivoInput = req.body;

        return await ctDispositivoBaseService.actualizar(
          id_dispositivo,
          dispositivoData
        );
      },
      "Dispositivo actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar dispositivo
   * @route DELETE /api/inventario/dispositivo/:id_dispositivo
   */
  eliminarDispositivo = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dispositivo } =
          this.validarDatosConEsquema<CtDispositivoIdParam>(
            ctDispositivoIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtDispositivoInput>(
            eliminarCtDispositivoSchema,
            req.body
          );

        await ctDispositivoBaseService.eliminar(
          id_dispositivo,
          id_ct_usuario_up
        );
      },
      "Dispositivo eliminada exitosamente"
    );
  };
}
