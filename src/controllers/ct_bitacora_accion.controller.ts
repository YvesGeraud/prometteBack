import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtBitacoraAccionService } from "../services/ct_bitacora_accion.service";
import {
  CrearCtBitacoraAccionInput,
  ActualizarCtBitacoraAccionInput,
  ctBitacoraAccionIdParamSchema,
  CtBitacoraAccionIdParam,
  eliminarCtBitacoraAccionSchema,
  EliminarCtBitacoraAccionInput,
} from "../schemas/ct_bitacora_accion.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_BITACORA_ACCION CON BASE SERVICE =====
const ctBitacoraAccionBaseService = new CtBitacoraAccionService();

export class CtBitacoraAccionBaseController extends BaseController {
  /**
   * 📦 Crear nueva bitacora acción
   * @route POST /api/inventario/bitacora_accion
   */
  crearBitacoraAccion = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const bitacoraAccionData: CrearCtBitacoraAccionInput = req.body;
        return await ctBitacoraAccionBaseService.crear(bitacoraAccionData);
      },
      "Bitacora acción creada exitosamente"
    );
  };

  /**
   * 📦 Obtener bitacora acción por ID
   * @route GET /api/inventario/bitacora_accion/:id_bitacora_accion
   */
  obtenerBitacoraAccionPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_bitacora_accion } =
          this.validarDatosConEsquema<CtBitacoraAccionIdParam>(
            ctBitacoraAccionIdParamSchema,
            req.params
          );

        return await ctBitacoraAccionBaseService.obtenerPorId(
          id_ct_bitacora_accion
        );
      },
      "Bitacora acción obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las bitacora acciones con filtros y paginación
   * @route GET /api/inventario/bitacora_accion
   *
   * Query parameters soportados:
   * - id_ct_bitacora_accion: Filtrar por ID de bitacora acción (búsqueda parcial)
   * - accion: Filtrar por acción (búsqueda parcial)
   * - descripcion: Filtrar por descripción (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasBitacoraAcciones = async (
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

        return await ctBitacoraAccionBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Bitacora acciones obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar bitacora acción
   * @route PUT /api/inventario/bitacora_accion/:id_bitacora_accion
   */
  actualizarBitacoraAccion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_bitacora_accion } =
          this.validarDatosConEsquema<CtBitacoraAccionIdParam>(
            ctBitacoraAccionIdParamSchema,
            req.params
          );
        const bitacoraAccionData: ActualizarCtBitacoraAccionInput = req.body;

        return await ctBitacoraAccionBaseService.actualizar(
          id_ct_bitacora_accion,
          bitacoraAccionData
        );
      },
      "Bitacora acción actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar bitacora acción
   * @route DELETE /api/inventario/bitacora_accion/:id_bitacora_accion
   */
  eliminarBitacoraAccion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_bitacora_accion } =
          this.validarDatosConEsquema<CtBitacoraAccionIdParam>(
            ctBitacoraAccionIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtBitacoraAccionInput>(
            eliminarCtBitacoraAccionSchema,
            req.body
          );

        await ctBitacoraAccionBaseService.eliminar(
          id_ct_bitacora_accion,
          id_ct_usuario_up
        );
      },
      "Bitacora acción eliminada exitosamente"
    );
  };
}
