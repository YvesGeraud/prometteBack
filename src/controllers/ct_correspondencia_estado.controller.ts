import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtCorrespondenciaEstadoService } from "../services/ct_correspondencia_estado.service";
import {
  CrearCtCorrespondenciaEstadoInput,
  ActualizarCtCorrespondenciaEstadoInput,
  ctCorrespondenciaEstadoIdParamSchema,
  CtCorrespondenciaEstadoIdParam,
} from "../schemas/ct_correspondencia_estado.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_BITACORA_ACCION CON BASE SERVICE =====
const ctCorrespondenciaEstadoBaseService = new CtCorrespondenciaEstadoService();

export class CtCorrespondenciaEstadoController extends BaseController {
  /**
   * 📦 Crear nueva correspondencia estado
   * @route POST /api/inventario/correspondencia_estado
   */
  crearCorrespondenciaEstado = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const capituloData: CrearCtCorrespondenciaEstadoInput = req.body;
        return await ctCorrespondenciaEstadoBaseService.crear(capituloData);
      },
      "Correspondencia estado creado exitosamente"
    );
  };

  /**
   * 📦 Obtener capitulo por ID
   * @route GET /api/inventario/correspondencia_estado/:id_estado
   */
  obtenerCorrespondenciaEstadoPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_estado } =
          this.validarDatosConEsquema<CtCorrespondenciaEstadoIdParam>(
            ctCorrespondenciaEstadoIdParamSchema,
            req.params
          );

        return await ctCorrespondenciaEstadoBaseService.obtenerPorId(id_estado);
      },
      "Correspondencia estado obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las correspondencia estados con filtros y paginación
   * @route GET /api/inventario/correspondencia_estado
   *
   * Query parameters soportados:
   * - id_estado: Filtrar por ID de correspondencia estado (búsqueda parcial)
   * - nombre: Filtrar por nombre de correspondencia estado (búsqueda parcial)
   * - nombre_capitulo: Filtrar por nombre de capitulo (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasCorrespondenciaEstados = async (
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

        return await ctCorrespondenciaEstadoBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Capitulos obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar correspondencia estado
   * @route PUT /api/inventario/correspondencia_estado/:id_correspondencia_estado
   */
  actualizarCorrespondenciaEstado = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_estado } =
          this.validarDatosConEsquema<CtCorrespondenciaEstadoIdParam>(
            ctCorrespondenciaEstadoIdParamSchema,
            req.params
          );
        const capituloData: ActualizarCtCorrespondenciaEstadoInput = req.body;

        return await ctCorrespondenciaEstadoBaseService.actualizar(
          id_estado,
          capituloData
        );
      },
      "Correspondencia estado actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar correspondencia estado
   * @route DELETE /api/inventario/correspondencia_estado/:id_correspondencia_estado
   */
  eliminarCorrespondenciaEstado = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_estado } =
          this.validarDatosConEsquema<CtCorrespondenciaEstadoIdParam>(
            ctCorrespondenciaEstadoIdParamSchema,
            req.params
          );

        await ctCorrespondenciaEstadoBaseService.eliminar(id_estado);
      },
      "Correspondencia estado eliminada exitosamente"
    );
  };
}
