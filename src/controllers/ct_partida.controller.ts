import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtPartidaService } from "../services/ct_partida.service";
import {
  CrearCtPartidaInput,
  ActualizarCtPartidaInput,
  ctPartidaIdParamSchema,
  CtPartidaIdParam,
  EliminarCtPartidaInput,
  eliminarCtPartidaSchema,
} from "../schemas/ct_partida.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_PARTIDA CON BASE SERVICE =====
const ctPartidaBaseService = new CtPartidaService();

export class CtPartidaBaseController extends BaseController {
  /**
   * 📦 Crear nueva partida
   * @route POST /api/inventario/partida
   */
  crearPartida = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const partidaData: CrearCtPartidaInput = req.body;
        return await ctPartidaBaseService.crear(partidaData);
      },
      "Partida creado exitosamente"
    );
  };

  /**
   * 📦 Obtener partida por ID
   * @route GET /api/inventario/partida/:id_ct_partida
   */
  obtenerPartidaPorId = async (req: Request, res: Response): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_partida } = this.validarDatosConEsquema<CtPartidaIdParam>(
          ctPartidaIdParamSchema,
          req.params
        );

        return await ctPartidaBaseService.obtenerPorId(id_ct_partida);
      },
      "Partida obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las partidas con filtros y paginación
   * @route GET /api/inventario/partida
   *
   * Query parameters soportados:
   * - id_ct_partida: Filtrar por ID de partida (búsqueda parcial)
   * - clave_partida: Filtrar por clave de partida (búsqueda parcial)
   * - nombre_partida: Filtrar por nombre de partida (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasPartidas = async (
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

        return await ctPartidaBaseService.obtenerTodos(filters, pagination);
      },
      "Partidas obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar partida
   * @route PUT /api/inventario/partida/:id_ct_partida
   */
  actualizarPartida = async (req: Request, res: Response): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_partida } = this.validarDatosConEsquema<CtPartidaIdParam>(
          ctPartidaIdParamSchema,
          req.params
        );
        const partidaData: ActualizarCtPartidaInput = req.body;

        return await ctPartidaBaseService.actualizar(
          id_ct_partida,
          partidaData
        );
      },
      "Partida actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar partida
   * @route DELETE /api/inventario/partida/:id_ct_partida
   */
  eliminarPartida = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_partida } = this.validarDatosConEsquema<CtPartidaIdParam>(
          ctPartidaIdParamSchema,
          req.params
        );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtPartidaInput>(
            eliminarCtPartidaSchema,
            req.body
          );

        await ctPartidaBaseService.eliminar(id_ct_partida, id_ct_usuario_up);
      },
      "Partida eliminada exitosamente"
    );
  };
}
