import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DtAspiranteAneecService } from "../services/dt_aspirante_aneec.service";
import {
  CrearDtAspiranteAneecInput,
  ActualizarDtAspiranteAneecInput,
  dtAspiranteAneecIdParamSchema,
  DtAspiranteAneecIdParam,
  EliminarDtAspiranteAneecInput,
  eliminarDtAspiranteAneecSchema,
} from "../schemas/dt_aspirante_aneec.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA DT_ASPIRANTE_ANEEC CON BASE SERVICE =====
const dtAspiranteAneecBaseService = new DtAspiranteAneecService();

export class DtAspiranteAneecBaseController extends BaseController {
  /**
   * 📦 Crear nueva aspirante Aneec
   * @route POST /api/inventario/aspirante_aneec
   */
  crearAspiranteAneec = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const aspiranteAneecData: CrearDtAspiranteAneecInput = req.body;
        return await dtAspiranteAneecBaseService.crear(aspiranteAneecData);
      },
      "Aspirante Aneec creado exitosamente"
    );
  };

  /**
   * 📦 Obtener aspirante Aneec por ID
   * @route GET /api/inventario/aspirante_aneec/:id_dt_aspirante_aneec
   */
  obtenerAspiranteAneecPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_dt_aspirante_aneec } =
          this.validarDatosConEsquema<DtAspiranteAneecIdParam>(
            dtAspiranteAneecIdParamSchema,
            req.params
          );

        return await dtAspiranteAneecBaseService.obtenerPorId(
          id_dt_aspirante_aneec
        );
      },
      "Aspirante Aneec obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las aspirantes Aneec con filtros y paginación
   * @route GET /api/inventario/aspirante_aneec
   *
   * Query parameters soportados:
   * - id_dt_aspirante_aneec: Filtrar por ID de aspirante Aneec (búsqueda parcial)
   * - curp: Filtrar por curp de aspirante Aneec (búsqueda parcial)
   * - nombre: Filtrar por nombre de aspirante Aneec (búsqueda parcial)
   * - apellido_paterno: Filtrar por apellido paterno de aspirante Aneec (búsqueda parcial)
   * - apellido_materno: Filtrar por apellido materno de aspirante Aneec (búsqueda parcial)
   * - codigo_postal: Filtrar por codigo postal de aspirante Aneec (búsqueda parcial)
   * - ct_municipio_id: Filtrar por ID de municipio de aspirante Aneec (búsqueda parcial)
   * - localidad: Filtrar por localidad de aspirante Aneec (búsqueda parcial)
   * - ruta_ine: Filtrar por ruta de INE de aspirante Aneec (búsqueda parcial)
   * - tipo_documento: Filtrar por tipo de documento de aspirante Aneec (búsqueda parcial)
   * - ruta_comprobante_estudio: Filtrar por ruta de comprobante de estudio de aspirante Aneec (búsqueda parcial)
   * - ruta_comprobante_domicilio: Filtrar por ruta de comprobante de domicilio de aspirante Aneec (búsqueda parcial)
   * - ruta_carta_compromiso: Filtrar por ruta de carta de compromiso de aspirante Aneec (búsqueda parcial)
   * - ruta_aviso_privacidad_aspirante: Filtrar por ruta de aviso de privacidad de aspirante Aneec (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasAspirantesAneec = async (
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

        return await dtAspiranteAneecBaseService.obtenerTodos(
          filters,
          pagination
        );
      },
      "Aspirantes Aneec obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar aspirante Aneec
   * @route PUT /api/inventario/aspirante_aneec/:id_dt_aspirante_aneec
   */
  actualizarAspiranteAneec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_dt_aspirante_aneec } =
          this.validarDatosConEsquema<DtAspiranteAneecIdParam>(
            dtAspiranteAneecIdParamSchema,
            req.params
          );
        const aspiranteAneecData: ActualizarDtAspiranteAneecInput = req.body;

        return await dtAspiranteAneecBaseService.actualizar(
          id_dt_aspirante_aneec,
          aspiranteAneecData
        );
      },
      "Aspirante Aneec actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar aspirante Aneec
   * @route DELETE /api/inventario/aspirante_aneec/:id_dt_aspirante_aneec
   */
  eliminarAspiranteAneec = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_dt_aspirante_aneec } =
          this.validarDatosConEsquema<DtAspiranteAneecIdParam>(
            dtAspiranteAneecIdParamSchema,
            req.params
          );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarDtAspiranteAneecInput>(
            eliminarDtAspiranteAneecSchema,
            req.body
          );

        await dtAspiranteAneecBaseService.eliminar(
          id_dt_aspirante_aneec,
          id_ct_usuario_up
        );
      },
      "Aspirante Aneec eliminada exitosamente"
    );
  };
}
