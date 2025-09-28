import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlProductoRequisicionService } from "../services/rl_producto_requisicion.service";
import {
  CrearRlProductoRequisicionInput,
  ActualizarRlProductoRequisicionInput,
  rlProductoRequisicionIdParamSchema,
  RlProductoRequisicionIdParam,
  EliminarRlProductoRequisicionInput,
  eliminarRlProductoRequisicionSchema,
} from "../schemas/rl_producto_requisicion.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_PRODUCTO_REQUISICION CON BASE SERVICE =====
const rlProductoRequisicionBaseService = new RlProductoRequisicionService();

export class RlProductoRequisicionBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación producto requisición
   * @route POST /api/rl_producto_requisicion
   */
  crearProductoRequisicion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const productoRequisicionData: CrearRlProductoRequisicionInput =
          req.body;
        return await rlProductoRequisicionBaseService.crear(
          productoRequisicionData
        );
      },
      "Relación producto requisición creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación producto requisición por ID
   * @route GET /api/rl_producto_requisicion/:id_rl_producto_requisicion
   */
  obtenerProductoRequisicionPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_producto_requisicion } =
          this.validarDatosConEsquema<RlProductoRequisicionIdParam>(
            rlProductoRequisicionIdParamSchema,
            req.params
          );

        return await rlProductoRequisicionBaseService.obtenerPorId(
          id_rl_producto_requisicion
        );
      },
      "Relación producto requisición obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones producto requisición con filtros y paginación
   * @route GET /api/rl_producto_requisicion
   *
   * Query parameters soportados:
   * - id_rl_producto_requisicion: Filtrar por ID de relación producto requisición (búsqueda parcial)
   * - id_rl_area_financiero: Filtrar por ID de área financiero
   * - id_dt_techo_presupuesto: Filtrar por ID de techo presupuesto
   * - id_ct_producto_consumible: Filtrar por ID de producto consumible
   * - cantidad: Filtrar por cantidad
   * - mes: Filtrar por mes (búsqueda parcial)
   * - total: Filtrar por total
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasProductosRequisicion = async (
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

        return await rlProductoRequisicionBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Relaciones producto requisición obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación producto requisición
   * @route PUT /api/rl_producto_requisicion/:id_rl_producto_requisicion
   */
  actualizarProductoRequisicion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_producto_requisicion } =
          this.validarDatosConEsquema<RlProductoRequisicionIdParam>(
            rlProductoRequisicionIdParamSchema,
            req.params
          );
        const productoRequisicionData: ActualizarRlProductoRequisicionInput =
          req.body;

        return await rlProductoRequisicionBaseService.actualizar(
          id_rl_producto_requisicion,
          productoRequisicionData
        );
      },
      "Relación producto requisición actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación producto requisición
   * @route DELETE /api/rl_producto_requisicion/:id_rl_producto_requisicion
   */
  eliminarProductoRequisicion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_producto_requisicion } =
          this.validarDatosConEsquema<RlProductoRequisicionIdParam>(
            rlProductoRequisicionIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlProductoRequisicionInput>(
            eliminarRlProductoRequisicionSchema,
            req.body
          );

        await rlProductoRequisicionBaseService.eliminar(
          id_rl_producto_requisicion,
          id_ct_usuario_up
        );
      },
      "Relación producto requisición eliminada exitosamente"
    );
  };
}
