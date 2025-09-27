import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtPuestoService } from "../services/ct_puesto.service";
import {
  CrearCtPuestoInput,
  ActualizarCtPuestoInput,
  ctPuestoIdParamSchema,
  CtPuestoIdParam,
  EliminarCtPuestoInput,
  eliminarCtPuestoSchema,
} from "../schemas/ct_puesto.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_CAPITULO CON BASE SERVICE =====
const ctPuestoBaseService = new CtPuestoService();

export class CtPuestoBaseController extends BaseController {
  /**
   * 📦 Crear nueva puesto
   * @route POST /api/inventario/capitulo
   */
  crearPuesto = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const puestoData: CrearCtPuestoInput = req.body;
        return await ctPuestoBaseService.crear(puestoData);
      },
      "Puesto creado exitosamente"
    );
  };

  /**
   * 📦 Obtener puesto por ID
   * @route GET /api/inventario/capitulo/:id_ct_capitulo
   */
  obtenerPuestoPorId = async (req: Request, res: Response): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_puesto } = this.validarDatosConEsquema<CtPuestoIdParam>(
          ctPuestoIdParamSchema,
          req.params
        );

        return await ctPuestoBaseService.obtenerPorId(id_ct_puesto);
      },
      "Puesto obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las puestos con filtros y paginación
   * @route GET /api/inventario/puesto
   *
   * Query parameters soportados:
   * - id_ct_puesto: Filtrar por ID de puesto (búsqueda parcial)
   * - nombre: Filtrar por nombre de puesto (búsqueda parcial)
   * - descripcion: Filtrar por descripción de puesto (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasPuestos = async (
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

        return await ctPuestoBaseService.obtenerTodos(filters, pagination);
      },
      "Puestos obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar puesto
   * @route PUT /api/inventario/puesto/:id_ct_puesto
   */
  actualizarPuesto = async (req: Request, res: Response): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_puesto } = this.validarDatosConEsquema<CtPuestoIdParam>(
          ctPuestoIdParamSchema,
          req.params
        );
        const puestoData: ActualizarCtPuestoInput = req.body;

        return await ctPuestoBaseService.actualizar(id_ct_puesto, puestoData);
      },
      "Puesto actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar puesto
   * @route DELETE /api/inventario/puesto/:id_ct_puesto
   */
  eliminarPuesto = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_puesto } = this.validarDatosConEsquema<CtPuestoIdParam>(
          ctPuestoIdParamSchema,
          req.params
        );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtPuestoInput>(
            eliminarCtPuestoSchema,
            req.body
          );

        await ctPuestoBaseService.eliminar(id_ct_puesto, id_ct_usuario_up);
      },
      "Puesto eliminada exitosamente"
    );
  };
}
