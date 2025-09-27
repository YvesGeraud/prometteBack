import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtConsumibleProveedorService } from "../services/ct_consumible_proveedor.service";
import {
  CrearCtConsumibleProveedorInput,
  ActualizarCtConsumibleProveedorInput,
  ctConsumibleProveedorIdParamSchema,
  CtConsumibleProveedorIdParam,
  EliminarCtConsumibleProveedorInput,
  eliminarCtConsumibleProveedorSchema,
} from "../schemas/ct_consumible_proveedor.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_BITACORA_ACCION CON BASE SERVICE =====
const ctConsumibleProveedorBaseService = new CtConsumibleProveedorService();

export class CtConsumibleProveedorBaseController extends BaseController {
  /**
   * 📦 Crear nueva bitacora acción
   * @route POST /api/inventario/consumible_proveedor
   */
  crearConsumiblesProveedor = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const consumiblesProveedorData: CrearCtConsumibleProveedorInput =
          req.body;
        return await ctConsumibleProveedorBaseService.crear(
          consumiblesProveedorData
        );
      },
      "Consumibles proveedor creado exitosamente"
    );
  };

  /**
   * 📦 Obtener consumibles proveedor por ID
   * @route GET /api/inventario/consumibles_proveedor/:id_ct_consumible_proveedor
   */
  obtenerConsumiblesProveedorPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_consumible_proveedor } =
          this.validarDatosConEsquema<CtConsumibleProveedorIdParam>(
            ctConsumibleProveedorIdParamSchema,
            req.params
          );

        return await ctConsumibleProveedorBaseService.obtenerPorId(
          id_ct_consumible_proveedor
        );
      },
      "Consumibles proveedor obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las consumibles proveedores con filtros y paginación
   * @route GET /api/inventario/consumibles_proveedor
   *
   * Query parameters soportados:
   * - id_ct_consumible_proveedor: Filtrar por ID de consumibles proveedor (búsqueda parcial)
   * - razon_social: Filtrar por razon social de consumibles proveedor (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasConsumiblesProveedores = async (
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

        return await ctConsumibleProveedorBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Consumibles proveedores obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar consumibles proveedor
   * @route PUT /api/inventario/consumibles_proveedor/:id_ct_consumible_proveedor
   */
  actualizarConsumiblesProveedor = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_consumible_proveedor } =
          this.validarDatosConEsquema<CtConsumibleProveedorIdParam>(
            ctConsumibleProveedorIdParamSchema,
            req.params
          );
        const consumibleProveedorData: ActualizarCtConsumibleProveedorInput =
          req.body;

        return await ctConsumibleProveedorBaseService.actualizar(
          id_ct_consumible_proveedor,
          consumibleProveedorData
        );
      },
      "Consumibles proveedor actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar consumibles proveedor
   * @route DELETE /api/inventario/consumibles_proveedor/:id_ct_consumible_proveedor
   */
  eliminarConsumiblesProveedor = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_consumible_proveedor } =
          this.validarDatosConEsquema<CtConsumibleProveedorIdParam>(
            ctConsumibleProveedorIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtConsumibleProveedorInput>(
            eliminarCtConsumibleProveedorSchema,
            req.body
          );

        await ctConsumibleProveedorBaseService.eliminar(
          id_ct_consumible_proveedor,
          id_ct_usuario_up
        );
      },
      "Consumibles proveedor eliminada exitosamente"
    );
  };
}
