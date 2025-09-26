import { Request, Response } from "express";
import { BaseController } from "./BaseController";
    import { CtEntidadBaseService } from "../services/entidad.service";
import {
  CrearCtEntidadInput,
  ActualizarCtEntidadInput,
  ctEntidadIdParamSchema,
  CtEntidadIdParam,
} from "../schemas/entidad.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_ENTIDAD CON BASE SERVICE =====
    const ctEntidadBaseService = new CtEntidadBaseService();

export class CtEntidadBaseController extends BaseController {
  /**
   * 📦 Crear nueva entidad
   * @route POST /api/inventario/marca
   */
  crearEntidad = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const entidadData: CrearCtEntidadInput = req.body;
        return await ctEntidadBaseService.crear(entidadData);
      },
        "Entidad creada exitosamente"
    );
  };

  /**
   * 📦 Obtener entidad por ID
   * @route GET /api/inventario/entidad/:id_entidad
   */
  obtenerEntidadPorId = async (req: Request, res: Response): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_entidad } = this.validarDatosConEsquema<CtEntidadIdParam>(
          ctEntidadIdParamSchema,
          req.params
        );

            return await ctEntidadBaseService.obtenerPorId(id_entidad);
      },
      "Entidad obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las entidades con filtros y paginación
   * @route GET /api/inventario/entidad
   *
   * Query parameters soportados:
   * - descripcion: Filtrar por descripción (búsqueda parcial)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   */
  obtenerTodasLasEntidades = async (
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

        return await ctEntidadBaseService.obtenerTodos(filters, pagination);
      },
      "Entidades obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar entidad
   * @route PUT /api/inventario/marca/:id_marca
   */
  actualizarEntidad = async (req: Request, res: Response): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
            const { id_entidad } = this.validarDatosConEsquema<CtEntidadIdParam>(
          ctEntidadIdParamSchema,
          req.params
        );
        const entidadData: ActualizarCtEntidadInput = req.body;

        return await ctEntidadBaseService.actualizar(id_entidad, entidadData);
      },
      "Entidad actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar entidad
   * @route DELETE /api/inventario/marca/:id_marca
   */
  eliminarEntidad = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_entidad } = this.validarDatosConEsquema<CtEntidadIdParam>(
            ctEntidadIdParamSchema,
          req.params
        );

        await ctEntidadBaseService.eliminar(id_entidad);
      },
      "Entidad eliminada exitosamente"
    );
  };
}
