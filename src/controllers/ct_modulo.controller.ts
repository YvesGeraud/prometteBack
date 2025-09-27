import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtModuloService } from "../services/ct_modulo.service";
import {
  CrearCtModuloInput,
  ActualizarCtModuloInput,
  ctModuloIdParamSchema,
  CtModuloIdParam,
  EliminarCtModuloInput,
  eliminarCtModuloSchema,
} from "../schemas/ct_modulo.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CAPITULO CON BASE SERVICE =====
const ctModuloBaseService = new CtModuloService();

export class CtModuloBaseController extends BaseController {
  /**
   * 📦 Crear nueva capitulo
   * @route POST /api/inventario/capitulo
   */
  crearModulo = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const moduloData: CrearCtModuloInput = req.body;
        return await ctModuloBaseService.crear(moduloData);
      },
      "Modulo creado exitosamente"
    );
  };

  /**
   * 📦 Obtener modulo por ID
   * @route GET /api/inventario/modulo/:id_ct_modulo
   */
  obtenerModuloPorId = async (req: Request, res: Response): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_modulo } = this.validarDatosConEsquema<CtModuloIdParam>(
          ctModuloIdParamSchema,
          req.params
        );

        return await ctModuloBaseService.obtenerPorId(id_modulo);
      },
      "Modulo obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las modulos con filtros y paginación
   * @route GET /api/inventario/capitulo
   *
   * Query parameters soportados:
   * - id_ct_modulo: Filtrar por ID de modulo (búsqueda parcial)
   * - clave_modulo: Filtrar por clave de modulo (búsqueda parcial)
   * - nombre_modulo: Filtrar por nombre de modulo (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasModulos = async (
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

        return await ctModuloBaseService.obtenerTodos(filters, pagination);
      },
      "Modulos obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar modulo
   * @route PUT /api/inventario/capitulo/:id_ct_capitulo
   */
  actualizarModulo = async (req: Request, res: Response): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_modulo } = this.validarDatosConEsquema<CtModuloIdParam>(
          ctModuloIdParamSchema,
          req.params
        );
        const moduloData: ActualizarCtModuloInput = req.body;

        return await ctModuloBaseService.actualizar(id_modulo, moduloData);
      },
      "Modulo actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar modulo
   * @route DELETE /api/inventario/capitulo/:id_ct_capitulo
   */
  eliminarModulo = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_modulo } = this.validarDatosConEsquema<CtModuloIdParam>(
          ctModuloIdParamSchema,
          req.params
        );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtModuloInput>(
            eliminarCtModuloSchema,
            req.body
          );

        await ctModuloBaseService.eliminar(id_modulo, id_ct_usuario_up);
      },
      "Modulo eliminada exitosamente"
    );
  };
}
