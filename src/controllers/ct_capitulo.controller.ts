import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtCapituloService } from "../services/ct_capitulo.service";
import {
  CrearCtCapituloInput,
  ActualizarCtCapituloInput,
  ctCapituloIdParamSchema,
  CtCapituloIdParam,
} from "../schemas/ct_capitulo.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_BITACORA_ACCION CON BASE SERVICE =====
const ctCapituloBaseService = new CtCapituloService();

export class CtCapituloBaseController extends BaseController {
  /**
   * 📦 Crear nueva bitacora acción
   * @route POST /api/inventario/bitacora_accion
   */
  crearCapitulo = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const capituloData: CrearCtCapituloInput = req.body;
        return await ctCapituloBaseService.crear(capituloData);
      },
      "Capitulo creado exitosamente"
    );
  };

  /**
   * 📦 Obtener capitulo por ID
   * @route GET /api/inventario/bitacora_accion/:id_bitacora_accion
   */
  obtenerCapituloPorId = async (req: Request, res: Response): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_capitulo } = this.validarDatosConEsquema<CtCapituloIdParam>(
          ctCapituloIdParamSchema,
          req.params
        );

        return await ctCapituloBaseService.obtenerPorId(id_capitulo);
      },
      "Capitulo obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las capitulos con filtros y paginación
   * @route GET /api/inventario/capitulo
   *
   * Query parameters soportados:
   * - id_capitulo: Filtrar por ID de capitulo (búsqueda parcial)
   * - clave_capitulo: Filtrar por clave de capitulo (búsqueda parcial)
   * - nombre_capitulo: Filtrar por nombre de capitulo (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasCapitulos = async (
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

        return await ctCapituloBaseService.obtenerTodos(filters, pagination);
      },
      "Capitulos obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar capitulo
   * @route PUT /api/inventario/capitulo/:id_capitulo
   */
  actualizarCapitulo = async (req: Request, res: Response): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_capitulo } = this.validarDatosConEsquema<CtCapituloIdParam>(
          ctCapituloIdParamSchema,
          req.params
        );
        const capituloData: ActualizarCtCapituloInput = req.body;

        return await ctCapituloBaseService.actualizar(
          id_capitulo,
          capituloData
        );
      },
      "Capitulo actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar capitulo
   * @route DELETE /api/inventario/capitulo/:id_capitulo
   */
  eliminarCapitulo = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_capitulo } = this.validarDatosConEsquema<CtCapituloIdParam>(
          ctCapituloIdParamSchema,
          req.params
        );

        await ctCapituloBaseService.eliminar(id_capitulo);
      },
      "Capitulo eliminada exitosamente"
    );
  };
}
