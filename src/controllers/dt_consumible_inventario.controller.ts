import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtConsumibleInventarioService } from "../services/dt_consumible_inventario.service";
import {
  CrearDtConsumibleInventarioInput,
  ActualizarDtConsumibleInventarioInput,
  dtConsumibleInventarioIdParamSchema,
  DtConsumibleInventarioIdParam,
  EliminarDtConsumibleInventarioInput,
  eliminarDtConsumibleInventarioSchema,
} from "../schemas/dt_consumible_inventario.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CAPITULO CON BASE SERVICE =====
const dtConsumibleInventarioBaseService = new DtConsumibleInventarioService();

export class DtConsumibleInventarioBaseController extends BaseController {
  /**
   * 📦 Crear nueva consumible inventario
   * @route POST /api/inventario/consumible_inventario
   */
  crearConsumibleInventario = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const consumibleInventarioData: CrearDtConsumibleInventarioInput =
          req.body;
        return await dtConsumibleInventarioBaseService.crear(
          consumibleInventarioData
        );
      },
      "Consumible inventario creado exitosamente"
    );
  };

  /**
   * 📦 Obtener capitulo por ID
   * @route GET /api/inventario/capitulo/:id_ct_capitulo
   */
  obtenerConsumibleInventarioPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_consumible_inventario } =
          this.validarDatosConEsquema<DtConsumibleInventarioIdParam>(
            dtConsumibleInventarioIdParamSchema,
            req.params
          );

        return await dtConsumibleInventarioBaseService.obtenerPorId(
          id_dt_consumible_inventario
        );
      },
      "Consumible inventario obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las consumible inventario con filtros y paginación
   * @route GET /api/inventario/capitulo
   *
   * Query parameters soportados:
   * - id_dt_consumible_inventario: Filtrar por ID de consumible inventario (búsqueda parcial)
   * - folio: Filtrar por folio de consumible inventario (búsqueda parcial)
   * - descripcion: Filtrar por descripcion de consumible inventario (búsqueda parcial)
   * - cantidad: Filtrar por cantidad de consumible inventario (búsqueda parcial)
   * - resta: Filtrar por resta de consumible inventario (búsqueda parcial)
   * - id_ct_partida: Filtrar por ID de partida (búsqueda parcial)
   * - id_ct_unidad_medida: Filtrar por ID de unidad de medida (búsqueda parcial)
   * - id_ct_consumible_factura: Filtrar por ID de consumible factura (búsqueda parcial)
   * - observaciones: Filtrar por observaciones de consumible inventario (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasConsumibleInventario = async (
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

        return await dtConsumibleInventarioBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Consumible inventario obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar consumible inventario
   * @route PUT /api/inventario/consumible_inventario/:id_dt_consumible_inventario
   */
  actualizarConsumibleInventario = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_consumible_inventario } =
          this.validarDatosConEsquema<DtConsumibleInventarioIdParam>(
            dtConsumibleInventarioIdParamSchema,
            req.params
          );
        const consumibleInventarioData: ActualizarDtConsumibleInventarioInput =
          req.body;

        return await dtConsumibleInventarioBaseService.actualizar(
          id_dt_consumible_inventario,
          consumibleInventarioData
        );
      },
      "Consumible inventario actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar consumible inventario
   * @route DELETE /api/inventario/consumible_inventario/:id_dt_consumible_inventario
   */
  eliminarConsumibleInventario = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_consumible_inventario } =
          this.validarDatosConEsquema<DtConsumibleInventarioIdParam>(
            dtConsumibleInventarioIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtConsumibleInventarioInput>(
            eliminarDtConsumibleInventarioSchema,
            req.body
          );

        await dtConsumibleInventarioBaseService.eliminar(
          id_dt_consumible_inventario,
          id_ct_usuario_up
        );
      },
      "Consumible inventario eliminada exitosamente"
    );
  };
}
