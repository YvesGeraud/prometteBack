import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtFinanciamientoService } from "../services/ct_financiamiento.service";
import {
  CrearCtFinanciamientoInput,
  ActualizarCtFinanciamientoInput,
  ctFinanciamientoIdParamSchema,
  CtFinanciamientoIdParam,
  EliminarCtFinanciamientoInput,
  eliminarCtFinanciamientoSchema,
} from "../schemas/ct_financiamiento.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_FINANCIAMIENTO CON BASE SERVICE =====
const ctFinanciamientoBaseService = new CtFinanciamientoService();

export class CtFinanciamientoBaseController extends BaseController {
  /**
   * 📦 Crear nueva financiamiento
   * @route POST /api/inventario/financiamiento
   */
  crearFinanciamiento = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const financiamientoData: CrearCtFinanciamientoInput = req.body;
        return await ctFinanciamientoBaseService.crear(financiamientoData);
      },
      "Financiamiento creado exitosamente"
    );
  };

  /**
   * 📦 Obtener financiamiento por ID
   * @route GET /api/inventario/financiamiento/:id_ct_financiamiento
   */
  obtenerFinanciamientoPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_financiamiento } =
          this.validarDatosConEsquema<CtFinanciamientoIdParam>(
            ctFinanciamientoIdParamSchema,
            req.params
          );

        return await ctFinanciamientoBaseService.obtenerPorId(
          id_financiamiento
        );
      },
      "Financiamiento obtenido exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las financiamientos con filtros y paginación
   * @route GET /api/inventario/financiamiento
   *
   * Query parameters soportados:
   * - id_ct_financiamiento: Filtrar por ID de financiamiento (búsqueda parcial)
   * - clave_financiamiento: Filtrar por clave de financiamiento (búsqueda parcial)
   * - nombre_financiamiento: Filtrar por nombre de financiamiento (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasFinanciamientos = async (
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

        return await ctFinanciamientoBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Financiamientos obtenidos exitosamente"
    );
  };

  /**
   * 📦 Actualizar financiamiento
   * @route PUT /api/inventario/financiamiento/:id_ct_financiamiento
   */
  actualizarFinanciamiento = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_financiamiento } =
          this.validarDatosConEsquema<CtFinanciamientoIdParam>(
            ctFinanciamientoIdParamSchema,
            req.params
          );
        const financiamientoData: ActualizarCtFinanciamientoInput = req.body;

        return await ctFinanciamientoBaseService.actualizar(
          id_financiamiento,
          financiamientoData
        );
      },
      "Financiamiento actualizado exitosamente"
    );
  };

  /**
   * 📦 Eliminar financiamiento
   * @route DELETE /api/inventario/financiamiento/:id_ct_financiamiento
   */
  eliminarFinanciamiento = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_financiamiento } =
          this.validarDatosConEsquema<CtFinanciamientoIdParam>(
            ctFinanciamientoIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtFinanciamientoInput>(
            eliminarCtFinanciamientoSchema,
            req.body
          );

        await ctFinanciamientoBaseService.eliminar(
          id_financiamiento,
          id_ct_usuario_up
        );
      },
      "Financiamiento eliminado exitosamente"
    );
  };
}
