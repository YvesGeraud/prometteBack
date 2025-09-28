import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtBitacoraMovimientoService } from "../services/dt_bitacora_movimiento.service";
import {
  CrearDtBitacoraMovimientoInput,
  ActualizarDtBitacoraMovimientoInput,
  dtBitacoraMovimientoIdParamSchema,
  DtBitacoraMovimientoIdParam,
  EliminarDtBitacoraMovimientoInput,
  eliminarDtBitacoraMovimientoSchema,
} from "../schemas/dt_bitacora_movimiento.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CAPITULO CON BASE SERVICE =====
const dtBitacoraMovimientoBaseService = new DtBitacoraMovimientoService();

export class DtBitacoraMovimientoBaseController extends BaseController {
  /**
   * 📦 Crear nueva capitulo
   * @route POST /api/inventario/dt_bitacora_movimiento
   */
  crearDtBitacoraMovimiento = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const dtBitacoraMovimientoData: CrearDtBitacoraMovimientoInput =
          req.body;
        return await dtBitacoraMovimientoBaseService.crear(
          dtBitacoraMovimientoData
        );
      },
      "DtBitacoraMovimiento creado exitosamente"
    );
  };

  /**
   * 📦 Obtener capitulo por ID
   * @route GET /api/inventario/dt_bitacora_movimiento/:id_dt_bitacora_movimiento
   */
  obtenerDtBitacoraMovimientoPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_bitacora_movimiento } =
          this.validarDatosConEsquema<DtBitacoraMovimientoIdParam>(
            dtBitacoraMovimientoIdParamSchema,
            req.params
          );

        return await dtBitacoraMovimientoBaseService.obtenerPorId(
          id_dt_bitacora_movimiento
        );
      },
      "DtBitacoraMovimiento obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las capitulos con filtros y paginación
   * @route GET /api/inventario/dt_bitacora_movimiento
   *
   * Query parameters soportados:
   * - id_dt_bitacora_movimiento: Filtrar por ID de capitulo (búsqueda parcial)
   * - id_dt_bitacora_accion: Filtrar por clave de capitulo (búsqueda parcial)
   * - id_ct_usuario: Filtrar por nombre de capitulo (búsqueda parcial)
   * - ip_origen: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasDtBitacoraMovimiento = async (
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

        return await dtBitacoraMovimientoBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "DtBitacoraMovimientos obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar capitulo
   * @route PUT /api/inventario/dt_bitacora_movimiento/:id_dt_bitacora_movimiento
   */
  actualizarDtBitacoraMovimiento = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_bitacora_movimiento } =
          this.validarDatosConEsquema<DtBitacoraMovimientoIdParam>(
            dtBitacoraMovimientoIdParamSchema,
            req.params
          );
        const dtBitacoraMovimientoData: ActualizarDtBitacoraMovimientoInput =
          req.body;

        return await dtBitacoraMovimientoBaseService.actualizar(
          id_dt_bitacora_movimiento,
          dtBitacoraMovimientoData
        );
      },
      "DtBitacoraMovimiento actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar capitulo
   * @route DELETE /api/inventario/dt_bitacora_movimiento/:id_dt_bitacora_movimiento
   */
  eliminarDtBitacoraMovimiento = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_bitacora_movimiento } =
          this.validarDatosConEsquema<DtBitacoraMovimientoIdParam>(
            dtBitacoraMovimientoIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtBitacoraMovimientoInput>(
            eliminarDtBitacoraMovimientoSchema,
            req.body
          );

        await dtBitacoraMovimientoBaseService.eliminar(
          id_dt_bitacora_movimiento,
          id_ct_usuario_up
        );
      },
      "DtBitacoraMovimiento eliminada exitosamente"
    );
  };
}
