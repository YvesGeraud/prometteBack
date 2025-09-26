import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtConsumiblesProveedorService } from "../services/ct_consumible_proveedor.service";
import {
  CrearCtConsumiblesProveedorInput,
  ActualizarCtConsumiblesProveedorInput,
  ctConsumiblesProveedorIdParamSchema,
  CtConsumiblesProveedorIdParam,
} from "../schemas/ct_consumibles_proveedor.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_BITACORA_ACCION CON BASE SERVICE =====
const ctConsumiblesProveedorBaseService = new CtConsumiblesProveedorService();

export class CtConsumiblesProveedorBaseController extends BaseController {
  /**
   * 📦 Crear nueva bitacora acción
   * @route POST /api/inventario/bitacora_accion
   */
  crearConsumiblesProveedor = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const consumiblesProveedorData: CrearCtConsumiblesProveedorInput =
          req.body;
        return await ctConsumiblesProveedorBaseService.crear(
          consumiblesProveedorData
        );
      },
      "Consumibles proveedor creado exitosamente"
    );
  };

  /**
   * 📦 Obtener consumibles proveedor por ID
   * @route GET /api/inventario/consumibles_proveedor/:id_proveedor
   */
  obtenerConsumiblesProveedorPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_proveedor } =
          this.validarDatosConEsquema<CtConsumiblesProveedorIdParam>(
            ctConsumiblesProveedorIdParamSchema,
            req.params
          );

        return await ctConsumiblesProveedorBaseService.obtenerPorId(
          id_proveedor
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
   * - id_proveedor: Filtrar por ID de consumibles proveedor (búsqueda parcial)
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

        return await ctConsumiblesProveedorBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Consumibles proveedores obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar consumibles proveedor
   * @route PUT /api/inventario/consumibles_proveedor/:id_proveedor
   */
  actualizarConsumiblesProveedor = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_proveedor } =
          this.validarDatosConEsquema<CtConsumiblesProveedorIdParam>(
            ctConsumiblesProveedorIdParamSchema,
            req.params
          );
        const consumiblesProveedorData: ActualizarCtConsumiblesProveedorInput =
          req.body;

        return await ctConsumiblesProveedorBaseService.actualizar(
          id_proveedor,
          consumiblesProveedorData
        );
      },
      "Consumibles proveedor actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar consumibles proveedor
   * @route DELETE /api/inventario/consumibles_proveedor/:id_proveedor
   */
  eliminarConsumiblesProveedor = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_proveedor } =
          this.validarDatosConEsquema<CtConsumiblesProveedorIdParam>(
            ctConsumiblesProveedorIdParamSchema,
            req.params
          );

        await ctConsumiblesProveedorBaseService.eliminar(id_proveedor);
      },
      "Consumibles proveedor eliminada exitosamente"
    );
  };
}
