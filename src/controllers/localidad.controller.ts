import { Request, Response } from "express";
import { BaseController } from "./BaseController";
    import { CtLocalidadBaseService } from "../services/localidad.service";
import {
  CrearCtLocalidadInput,
  ActualizarCtLocalidadInput,
  ctLocalidadIdParamSchema,
  CtLocalidadIdParam,
} from "../schemas/ct_localidad.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_ENTIDAD CON BASE SERVICE =====
    const ctLocalidadBaseService = new CtLocalidadBaseService();

export class CtLocalidadBaseController extends BaseController {
  /**
   * 📦 Crear nueva entidad
   * @route POST /api/inventario/marca
   */
  crearEntidad = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const entidadData: CrearCtLocalidadInput = req.body;
        return await ctLocalidadBaseService.crear(entidadData);
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
        const { id_localidad } = this.validarDatosConEsquema<CtLocalidadIdParam>(
          ctLocalidadIdParamSchema,
          req.params
        );

            return await ctLocalidadBaseService.obtenerPorId(id_localidad);
      },
      "Localidad obtenida exitosamente"
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
  obtenerTodasLasLocalidades = async (
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

                return await ctLocalidadBaseService.obtenerTodos(filters, pagination);
      },
      "Localidades obtenidas exitosamente"
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
            const { id_localidad } = this.validarDatosConEsquema<CtLocalidadIdParam>(
          ctLocalidadIdParamSchema,
          req.params
        );
        const localidadData: ActualizarCtLocalidadInput = req.body;

        return await ctLocalidadBaseService.actualizar(id_localidad, localidadData);
      },
      "Localidad actualizada exitosamente"
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
        const { id_localidad } = this.validarDatosConEsquema<CtLocalidadIdParam>(
            ctLocalidadIdParamSchema,
          req.params
        );

        await ctLocalidadBaseService.eliminar(id_localidad);
      },
      "Entidad eliminada exitosamente"
    );
  };
}
