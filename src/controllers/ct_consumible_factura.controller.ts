import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtConsumibleFacturaService } from "../services/ct_consumible_factura.service";
import {
  CrearCtConsumibleFacturaInput,
  ActualizarCtConsumibleFacturaInput,
  ctConsumibleFacturaIdParamSchema,
  CtConsumibleFacturaIdParam,
  EliminarCtConsumibleFacturaInput,
  eliminarCtConsumibleFacturaSchema,
} from "../schemas/ct_consumible_factura.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CONSUMIBLE_FACTURA CON BASE SERVICE =====
const ctConsumibleFacturaBaseService = new CtConsumibleFacturaService();

export class CtConsumibleFacturaBaseController extends BaseController {
  /**
   * 📦 Crear nueva consumible factura
   * @route POST /api/inventario/consumible_factura
   */
  crearConsumibleFactura = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const consumibleFacturaData: CrearCtConsumibleFacturaInput = req.body;
        return await ctConsumibleFacturaBaseService.crear(
          consumibleFacturaData
        );
      },
      "Consumible factura creado exitosamente"
    );
  };

  /**
   * 📦 Obtener consumible factura por ID
   * @route GET /api/inventario/consumible_factura/:id_ct_consumible_factura
   */
  obtenerConsumibleFacturaPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_consumible_factura } =
          this.validarDatosConEsquema<CtConsumibleFacturaIdParam>(
            ctConsumibleFacturaIdParamSchema,
            req.params
          );

        return await ctConsumibleFacturaBaseService.obtenerPorId(
          id_ct_consumible_factura
        );
      },
      "Consumible factura obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las consumibles facturas con filtros y paginación
   * @route GET /api/inventario/consumible_factura
   *
   * Query parameters soportados:
   * - id_ct_consumible_factura: Filtrar por ID de factura (búsqueda parcial)
   * - factura: Filtrar por factura (búsqueda parcial)
   * - id_ct_consumible_proveedor: Filtrar por ID de proveedor (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasConsumiblesFacturas = async (
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

        return await ctConsumibleFacturaBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Consumibles facturas obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar consumible factura
   * @route PUT /api/inventario/consumible_factura/:id_ct_consumible_factura
   */
  actualizarConsumibleFactura = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_consumible_factura } =
          this.validarDatosConEsquema<CtConsumibleFacturaIdParam>(
            ctConsumibleFacturaIdParamSchema,
            req.params
          );
        const consumibleFacturaData: ActualizarCtConsumibleFacturaInput =
          req.body;

        return await ctConsumibleFacturaBaseService.actualizar(
          id_ct_consumible_factura,
          consumibleFacturaData
        );
      },
      "Consumible factura actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar consumible factura
   * @route DELETE /api/inventario/consumible_factura/:id_ct_consumible_factura
   */
  eliminarConsumibleFactura = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_consumible_factura } =
          this.validarDatosConEsquema<CtConsumibleFacturaIdParam>(
            ctConsumibleFacturaIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtConsumibleFacturaInput>(
            eliminarCtConsumibleFacturaSchema,
            req.body
          );

        await ctConsumibleFacturaBaseService.eliminar(
          id_ct_consumible_factura,
          id_ct_usuario_up
        );
      },
      "Consumible factura eliminada exitosamente"
    );
  };
}
