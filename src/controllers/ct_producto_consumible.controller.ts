import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtProductoConsumibleService } from "../services/ct_producto_consumible.service";
import {
  CrearCtProductoConsumibleInput,
  ActualizarCtProductoConsumibleInput,
  ctProductoConsumibleIdParamSchema,
  CtProductoConsumibleIdParam,
  EliminarCtProductoConsumibleInput,
  eliminarCtProductoConsumibleSchema,
} from "../schemas/ct_producto_consumible.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CAPITULO CON BASE SERVICE =====
const ctProductoConsumibleBaseService = new CtProductoConsumibleService();

export class CtProductoConsumibleBaseController extends BaseController {
  /**
   * 📦 Crear nueva producto consumible
   * @route POST /api/inventario/producto_consumible
   */
  crearProductoConsumible = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const productoConsumibleData: CrearCtProductoConsumibleInput = req.body;
        return await ctProductoConsumibleBaseService.crear(
          productoConsumibleData
        );
      },
      "Producto consumible creado exitosamente"
    );
  };

  /**
   * 📦 Obtener producto consumible por ID
   * @route GET /api/inventario/producto_consumible/:id_ct_producto_consumible
   */
  obtenerProductoConsumiblePorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_producto_consumible } =
          this.validarDatosConEsquema<CtProductoConsumibleIdParam>(
            ctProductoConsumibleIdParamSchema,
            req.params
          );

        return await ctProductoConsumibleBaseService.obtenerPorId(
          id_ct_producto_consumible
        );
      },
      "Producto consumible obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las producto consumibles con filtros y paginación
   * @route GET /api/inventario/producto_consumible
   *
   * Query parameters soportados:
   * - id_ct_producto_consumible: Filtrar por ID de producto consumible (búsqueda parcial)
   * - id_ct_partida: Filtrar por ID de partida (búsqueda parcial)
   * - nombre_producto: Filtrar por nombre de producto (búsqueda parcial)
   * - precio: Filtrar por precio (búsqueda parcial)
   * - id_ct_unidad_medida: Filtrar por ID de unidad de medida (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasProductoConsumibles = async (
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

        return await ctProductoConsumibleBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Producto consumibles obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar producto consumible
   * @route PUT /api/inventario/producto_consumible/:id_ct_producto_consumible
   */
  actualizarProductoConsumible = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_producto_consumible } =
          this.validarDatosConEsquema<CtProductoConsumibleIdParam>(
            ctProductoConsumibleIdParamSchema,
            req.params
          );
        const productoConsumibleData: ActualizarCtProductoConsumibleInput =
          req.body;

        return await ctProductoConsumibleBaseService.actualizar(
          id_ct_producto_consumible,
          productoConsumibleData
        );
      },
      "Producto consumible actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar producto consumible
   * @route DELETE /api/inventario/producto_consumible/:id_ct_producto_consumible
   */
  eliminarProductoConsumible = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_producto_consumible } =
          this.validarDatosConEsquema<CtProductoConsumibleIdParam>(
            ctProductoConsumibleIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtProductoConsumibleInput>(
            eliminarCtProductoConsumibleSchema,
            req.body
          );

        await ctProductoConsumibleBaseService.eliminar(
          id_ct_producto_consumible,
          id_ct_usuario_up
        );
      },
      "Producto consumible eliminada exitosamente"
    );
  };
}
