import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { RlEntregaFormatoService } from "../services/rl_entrega_formato.service";
import {
  CrearRlEntregaFormatoInput,
  ActualizarRlEntregaFormatoInput,
  rlEntregaFormatoIdParamSchema,
  RlEntregaFormatoIdParam,
  EliminarRlEntregaFormatoInput,
  eliminarRlEntregaFormatoSchema,
} from "../schemas/rl_entrega_formato.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA RL_ENTREGA_FORMATO CON BASE SERVICE =====
const rlEntregaFormatoBaseService = new RlEntregaFormatoService();

export class RlEntregaFormatoBaseController extends BaseController {
  /**
   * 📦 Crear nueva relación entrega formato
   * @route POST /api/rl_entrega_formato
   */
  crearEntregaFormato = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const entregaFormatoData: CrearRlEntregaFormatoInput = req.body;
        return await rlEntregaFormatoBaseService.crear(entregaFormatoData);
      },
      "Relación entrega formato creada exitosamente"
    );
  };

  /**
   * 📦 Obtener relación entrega formato por ID
   * @route GET /api/rl_entrega_formato/:id_rl_entrega_formato
   */
  obtenerEntregaFormatoPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_rl_entrega_formato } =
          this.validarDatosConEsquema<RlEntregaFormatoIdParam>(
            rlEntregaFormatoIdParamSchema,
            req.params
          );

        return await rlEntregaFormatoBaseService.obtenerPorId(
          id_rl_entrega_formato
        );
      },
      "Relación entrega formato obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las relaciones entrega formato con filtros y paginación
   * @route GET /api/rl_entrega_formato
   *
   * Query parameters soportados:
   * - id_rl_entrega_formato: Filtrar por ID de relación entrega formato (búsqueda parcial)
   * - folio_formato: Filtrar por folio de formato (búsqueda parcial)
   * - mes_cantidad: Filtrar por mes cantidad (búsqueda parcial)
   * - persona_recibe: Filtrar por persona que recibe (búsqueda parcial)
   * - estado: Filtrar por estado (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasEntregasFormato = async (
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

        return await rlEntregaFormatoBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Relaciones entrega formato obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar relación entrega formato
   * @route PUT /api/rl_entrega_formato/:id_rl_entrega_formato
   */
  actualizarEntregaFormato = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_rl_entrega_formato } =
          this.validarDatosConEsquema<RlEntregaFormatoIdParam>(
            rlEntregaFormatoIdParamSchema,
            req.params
          );
        const entregaFormatoData: ActualizarRlEntregaFormatoInput = req.body;

        return await rlEntregaFormatoBaseService.actualizar(
          id_rl_entrega_formato,
          entregaFormatoData
        );
      },
      "Relación entrega formato actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar relación entrega formato
   * @route DELETE /api/rl_entrega_formato/:id_rl_entrega_formato
   */
  eliminarEntregaFormato = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_rl_entrega_formato } =
          this.validarDatosConEsquema<RlEntregaFormatoIdParam>(
            rlEntregaFormatoIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarRlEntregaFormatoInput>(
            eliminarRlEntregaFormatoSchema,
            req.body
          );

        await rlEntregaFormatoBaseService.eliminar(
          id_rl_entrega_formato,
          id_ct_usuario_up
        );
      },
      "Relación entrega formato eliminada exitosamente"
    );
  };
}
