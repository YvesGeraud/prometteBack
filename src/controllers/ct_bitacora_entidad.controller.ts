import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtBitacoraEntidadService } from "../services/ct_bitacora_entidad.service";
import {
  CrearCtBitacoraEntidadInput,
  ActualizarCtBitacoraEntidadInput,
  ctBitacoraEntidadIdParamSchema,
  CtBitacoraEntidadIdParam,
} from "../schemas/ct_bitacora_entidad.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_BITACORA_ENTIDAD CON BASE SERVICE =====
const ctBitacoraEntidadBaseService = new CtBitacoraEntidadService();

export class CtBitacoraEntidadBaseController extends BaseController {
  /**
   * 📦 Crear nueva bitacora entidad
   * @route POST /api/inventario/bitacora_accion
   */
  crearBitacoraEntidad = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const bitacoraEntidadData: CrearCtBitacoraEntidadInput = req.body;
        return await ctBitacoraEntidadBaseService.crear(bitacoraEntidadData);
      },
      "Bitacora entidad creado exitosamente"
    );
  };

  /**
   * 📦 Obtener bitacora entidad por ID
   * @route GET /api/inventario/bitacora_accion/:id_bitacora_accion
   */
  obtenerBitacoraEntidadPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_bitacora_entidad } =
          this.validarDatosConEsquema<CtBitacoraEntidadIdParam>(
            ctBitacoraEntidadIdParamSchema,
            req.params
          );

        return await ctBitacoraEntidadBaseService.obtenerPorId(
          id_ct_bitacora_entidad
        );
      },
      "Bitacora entidad obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las bitacoras entidades con filtros y paginación
   * @route GET /api/inventario/bitacora_entidad
   *
   * Query parameters soportados:
   * - id_ct_bitacora_entidad: Filtrar por ID de bitacora entidad (búsqueda parcial)
   * - entidad: Filtrar por entidad (búsqueda parcial)
   * - descripcion: Filtrar por descripción (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasBitacorasEntidades = async (
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

        return await ctBitacoraEntidadBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Bitacoras entidades obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar bitacora entidad
   * @route PUT /api/inventario/bitacora_entidad/:id_ct_bitacora_entidad
   */
  actualizarBitacoraEntidad = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_bitacora_entidad } =
          this.validarDatosConEsquema<CtBitacoraEntidadIdParam>(
            ctBitacoraEntidadIdParamSchema,
            req.params
          );
        const bitacoraEntidadData: ActualizarCtBitacoraEntidadInput = req.body;

        return await ctBitacoraEntidadBaseService.actualizar(
          id_ct_bitacora_entidad,
          bitacoraEntidadData
        );
      },
      "Bitacora entidad actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar bitacora entidad
   * @route DELETE /api/inventario/bitacora_entidad/:id_ct_bitacora_entidad
   */
  eliminarBitacoraEntidad = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_bitacora_entidad } =
          this.validarDatosConEsquema<CtBitacoraEntidadIdParam>(
            ctBitacoraEntidadIdParamSchema,
            req.params
          );

        await ctBitacoraEntidadBaseService.eliminar(id_ct_bitacora_entidad);
      },
      "Bitacora entidad eliminada exitosamente"
    );
  };
}
