import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlProductoAreaService } from "../services/rl_producto_area.service";
import {
  CrearRlProductoAreaInput,
  ActualizarRlProductoAreaInput,
  rlProductoAreaIdParamSchema,
  RlProductoAreaIdParam,
  EliminarRlProductoAreaInput,
  eliminarRlProductoAreaSchema,
} from "../schemas/rl_producto_area.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_PRODUCTO_AREA CON BASE SERVICE =====
const rlProductoAreaBaseService = new RlProductoAreaService();

export class RlProductoAreaBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación producto área
   * @route POST /api/rl_producto_area
   */
  crearProductoArea = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const productoAreaData: CrearRlProductoAreaInput = req.body;
        return await rlProductoAreaBaseService.crear(productoAreaData);
      },
      "Relación producto área creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación producto área por ID
   * @route GET /api/rl_producto_area/:id_rl_producto_area
   */
  obtenerProductoAreaPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_producto_area } =
          this.validarDatosConEsquema<RlProductoAreaIdParam>(
            rlProductoAreaIdParamSchema,
            req.params
          );

        return await rlProductoAreaBaseService.obtenerPorId(
          id_rl_producto_area
        );
      },
      "Relación producto área obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones producto área con filtros y paginación
   * @route GET /api/rl_producto_area
   *
   * Query parameters soportados:
   * - id_rl_producto_area: Filtrar por ID de relación producto área (búsqueda parcial)
   * - id_ct_producto_consumible: Filtrar por ID de producto consumible
   * - id_area_infra: Filtrar por ID de área infraestructura
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasProductosArea = async (
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

        return await rlProductoAreaBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Relaciones producto área obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación producto área
   * @route PUT /api/rl_producto_area/:id_rl_producto_area
   */
  actualizarProductoArea = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_producto_area } =
          this.validarDatosConEsquema<RlProductoAreaIdParam>(
            rlProductoAreaIdParamSchema,
            req.params
          );
        const productoAreaData: ActualizarRlProductoAreaInput = req.body;

        return await rlProductoAreaBaseService.actualizar(
          id_rl_producto_area,
          productoAreaData
        );
      },
      "Relación producto área actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación producto área
   * @route DELETE /api/rl_producto_area/:id_rl_producto_area
   */
  eliminarProductoArea = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_producto_area } =
          this.validarDatosConEsquema<RlProductoAreaIdParam>(
            rlProductoAreaIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlProductoAreaInput>(
            eliminarRlProductoAreaSchema,
            req.body
          );

        await rlProductoAreaBaseService.eliminar(
          id_rl_producto_area,
          id_ct_usuario_up
        );
      },
      "Relación producto área eliminada exitosamente"
    );
  };
}
