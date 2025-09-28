import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtFuncionService } from "../services/dt_funcion.service";
import {
  CrearDtFuncionInput,
  ActualizarDtFuncionInput,
  dtFuncionIdParamSchema,
  DtFuncionIdParam,
  EliminarDtFuncionInput,
  eliminarDtFuncionSchema,
} from "../schemas/dt_funcion.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA DT_FUNCION CON BASE SERVICE =====
const dtFuncionBaseService = new DtFuncionService();

export class DtFuncionBaseController extends BaseController {
  /**
   * 📦 Crear nueva dt_funcion
   * @route POST /api/inventario/dt_funcion
   */
  crearDtFuncion = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const dtFuncionData: CrearDtFuncionInput = req.body;
        return await dtFuncionBaseService.crear(dtFuncionData);
      },
      "DtFuncion creado exitosamente"
    );
  };

  /**
   * 📦 Obtener dt_funcion por ID
   * @route GET /api/inventario/dt_funcion/:id_dt_funcion
   */
  obtenerDtFuncionPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_funcion } = this.validarDatosConEsquema<DtFuncionIdParam>(
          dtFuncionIdParamSchema,
          req.params
        );

        return await dtFuncionBaseService.obtenerPorId(id_dt_funcion);
      },
      "DtFuncion obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las dt_funciones con filtros y paginación
   * @route GET /api/inventario/dt_funcion/:id_dt_funcion
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
  obtenerTodasLasDtFunciones = async (
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

        return await dtFuncionBaseService.obtenerTodos(filters, pagination);
      },
      "DtFunciones obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar dt_funcion
   * @route PUT /api/inventario/dt_funcion/:id_dt_funcion
   */
  actualizarDtFuncion = async (req: Request, res: Response): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_funcion } = this.validarDatosConEsquema<DtFuncionIdParam>(
          dtFuncionIdParamSchema,
          req.params
        );
        const dtFuncionData: ActualizarDtFuncionInput = req.body;

        return await dtFuncionBaseService.actualizar(
          id_dt_funcion,
          dtFuncionData
        );
      },
      "DtFuncion actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar dt_funcion
   * @route DELETE /api/inventario/dt_funcion/:id_dt_funcion
   */
  eliminarDtFuncion = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_funcion } = this.validarDatosConEsquema<DtFuncionIdParam>(
          dtFuncionIdParamSchema,
          req.params
        );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtFuncionInput>(
            eliminarDtFuncionSchema,
            req.body
          );

        await dtFuncionBaseService.eliminar(id_dt_funcion, id_ct_usuario_up);
      },
      "DtFuncion eliminada exitosamente"
    );
  };
}
