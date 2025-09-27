import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtUnidadMedidaService } from "../services/ct_unidad_medida.service";
import {
  CrearCtUnidadMedidaInput,
  ActualizarCtUnidadMedidaInput,
  ctUnidadMedidaIdParamSchema,
  CtUnidadMedidaIdParam,
  EliminarCtUnidadMedidaInput,
  eliminarCtUnidadMedidaSchema,
} from "../schemas/ct_unidad_medida.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_UNIDAD_MEDIDA CON BASE SERVICE =====
const ctUnidadMedidaBaseService = new CtUnidadMedidaService();

export class CtUnidadMedidaBaseController extends BaseController {
  /**
   * 📦 Crear nueva unidad medida
   * @route POST /api/inventario/unidad_medida
   */
  crearUnidadMedida = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const unidadMedidaData: CrearCtUnidadMedidaInput = req.body;
        return await ctUnidadMedidaBaseService.crear(unidadMedidaData);
      },
      "Unidad medida creada exitosamente"
    );
  };

  /**
   * 📦 Obtener unidad medida por ID
   * @route GET /api/inventario/unidad_medida/:id_ct_unidad_medida
   */
  obtenerUnidadMedidaPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_unidad_medida } =
          this.validarDatosConEsquema<CtUnidadMedidaIdParam>(
            ctUnidadMedidaIdParamSchema,
            req.params
          );

        return await ctUnidadMedidaBaseService.obtenerPorId(
          id_ct_unidad_medida
        );
      },
      "Unidad medida obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las unidades medidas con filtros y paginación
   * @route GET /api/inventario/unidad_medida
   *
   * Query parameters soportados:
   * - id_ct_unidad_medida: Filtrar por ID de unidad medida (búsqueda parcial)
   * - clave_unidad: Filtrar por clave de unidad medida (búsqueda parcial)
   * - nombre_unidad: Filtrar por nombre de unidad medida (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasUnidadesMedidas = async (
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

        return await ctUnidadMedidaBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Unidades medidas obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar unidad medida
   * @route PUT /api/inventario/unidad_medida/:id_ct_unidad_medida
   */
  actualizarUnidadMedida = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_unidad_medida } =
          this.validarDatosConEsquema<CtUnidadMedidaIdParam>(
            ctUnidadMedidaIdParamSchema,
            req.params
          );
        const unidadMedidaData: ActualizarCtUnidadMedidaInput = req.body;

        return await ctUnidadMedidaBaseService.actualizar(
          id_ct_unidad_medida,
          unidadMedidaData
        );
      },
      "Unidad medida actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar unidad medida
   * @route DELETE /api/inventario/unidad_medida/:id_ct_unidad_medida
   */
  eliminarUnidadMedida = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_unidad_medida } =
          this.validarDatosConEsquema<CtUnidadMedidaIdParam>(
            ctUnidadMedidaIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtUnidadMedidaInput>(
            eliminarCtUnidadMedidaSchema,
            req.body
          );

        await ctUnidadMedidaBaseService.eliminar(
          id_ct_unidad_medida,
          id_ct_usuario_up
        );
      },
      "Unidad medida eliminada exitosamente"
    );
  };
}
