import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtConsumibleEntregaService } from "../services/dt_consumible_entrega.service";
import {
  CrearDtConsumibleEntregaInput,
  ActualizarDtConsumibleEntregaInput,
  dtConsumibleEntregaIdParamSchema,
  DtConsumibleEntregaIdParam,
  EliminarDtConsumibleEntregaInput,
  eliminarDtConsumibleEntregaSchema,
} from "../schemas/dt_consumible_entrega.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CAPITULO CON BASE SERVICE =====
const dtConsumibleEntregaBaseService = new DtConsumibleEntregaService();

export class DtConsumibleEntregaBaseController extends BaseController {
  /**
   * 📦 Crear nueva consumible entrega
   * @route POST /api/inventario/consumible_entrega
   */
  crearConsumibleEntrega = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const consumibleEntregaData: CrearDtConsumibleEntregaInput = req.body;
        return await dtConsumibleEntregaBaseService.crear(
          consumibleEntregaData
        );
      },
      "Consumible entrega creado exitosamente"
    );
  };

  /**
   * 📦 Obtener consumible entrega por ID
   * @route GET /api/inventario/consumible_entrega/:id_dt_consumible_entrega
   */
  obtenerConsumibleEntregaPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_consumible_entrega } =
          this.validarDatosConEsquema<DtConsumibleEntregaIdParam>(
            dtConsumibleEntregaIdParamSchema,
            req.params
          );

        return await dtConsumibleEntregaBaseService.obtenerPorId(
          id_dt_consumible_entrega
        );
      },
      "Consumible entrega obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las consumible entregas con filtros y paginación
   * @route GET /api/inventario/consumible_entrega
   *
   * Query parameters soportados:
   * - id_dt_consumible_entrega: Filtrar por ID de consumible entrega (búsqueda parcial)
   * - folio: Filtrar por folio de consumible entrega (búsqueda parcial)
   * - id_ct_area: Filtrar por ID de area (búsqueda parcial)
   * - id_dt_consumible_inventario: Filtrar por ID de consumible inventario (búsqueda parcial)
   * - id_ct_unidad_medida: Filtrar por ID de unidad de medida (búsqueda parcial)
   * - id_rl_entrega_formato: Filtrar por ID de formato de entrega (búsqueda parcial)
   * - cantidad: Filtrar por cantidad de consumible entrega (búsqueda parcial)
   * - observaciones: Filtrar por observaciones de consumible entrega (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasConsumibleEntregas = async (
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

        return await dtConsumibleEntregaBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Consumible entregas obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar consumible entrega
   * @route PUT /api/inventario/consumible_entrega/:id_dt_consumible_entrega
   */
  actualizarConsumibleEntrega = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_consumible_entrega } =
          this.validarDatosConEsquema<DtConsumibleEntregaIdParam>(
            dtConsumibleEntregaIdParamSchema,
            req.params
          );
        const consumibleEntregaData: ActualizarDtConsumibleEntregaInput =
          req.body;

        return await dtConsumibleEntregaBaseService.actualizar(
          id_dt_consumible_entrega,
          consumibleEntregaData
        );
      },
      "Consumible entrega actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar consumible entrega
   * @route DELETE /api/inventario/consumible_entrega/:id_dt_consumible_entrega
   */
  eliminarConsumibleEntrega = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_consumible_entrega } =
          this.validarDatosConEsquema<DtConsumibleEntregaIdParam>(
            dtConsumibleEntregaIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtConsumibleEntregaInput>(
            eliminarDtConsumibleEntregaSchema,
            req.body
          );

        await dtConsumibleEntregaBaseService.eliminar(
          id_dt_consumible_entrega,
          id_ct_usuario_up
        );
      },
      "Consumible entrega eliminada exitosamente"
    );
  };
}
