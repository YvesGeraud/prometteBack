import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CtUsuarioService } from "../services/ct_usuario.service";
import {
  CrearCtUsuarioInput,
  ActualizarCtUsuarioInput,
  ctUsuarioIdParamSchema,
  CtUsuarioIdParam,
  EliminarCtUsuarioInput,
  eliminarCtUsuarioSchema,
} from "../schemas/ct_usuario.schema";
import { PaginationInput } from "../schemas/commonSchemas";

//TODO ===== CONTROLADOR PARA CT_USUARIO CON BASE SERVICE =====
const ctUsuarioBaseService = new CtUsuarioService();

export class CtUsuarioBaseController extends BaseController {
  /**
   * 📦 Crear nuevo usuario
   * @route POST /api/inventario/capitulo
   */
  crearUsuario = async (req: Request, res: Response): Promise<void> => {
    await this.manejarCreacion(
      req,
      res,
      async () => {
        const usuarioData: CrearCtUsuarioInput = req.body;
        return await ctUsuarioBaseService.crear(usuarioData);
      },
      "Usuario creado exitosamente"
    );
  };

  /**
   * 📦 Obtener usuario por ID
   * @route GET /api/inventario/capitulo/:id_ct_capitulo
   */
  obtenerUsuarioPorId = async (req: Request, res: Response): Promise<void> => {
    await this.manejarOperacion(
      req,
      res,
      async () => {
        const { id_ct_usuario } = this.validarDatosConEsquema<CtUsuarioIdParam>(
          ctUsuarioIdParamSchema,
          req.params
        );

        return await ctUsuarioBaseService.obtenerPorId(id_ct_usuario);
      },
      "Usuario obtenida exitosamente"
    );
  };

  /**
   * 📦 Obtener todas las usuarios con filtros y paginación
   * @route GET /api/inventario/capitulo
   *
   * Query parameters soportados:
   * - id_ct_usuario: Filtrar por ID de usuario (búsqueda parcial)
   * - nombre_usuario: Filtrar por nombre de usuario (búsqueda parcial)
   * - contrasena: Filtrar por contraseña de usuario (búsqueda parcial)
   * - id_dt_rupeet_informacion: Filtrar por ID de información de Rúpeet (búsqueda parcial)
   * - activo: Filtrar por activo (true/false)
   * - incluirInactivos: Incluir registros eliminados/inactivos (true/false, default: false)
   * - pagina: Número de página (default: 1)
   * - limite: Elementos por página (default: 10)
   *
   * 🔄 SOFT DELETE: Por defecto solo muestra registros activos
   */
  obtenerTodasLasUsuarios = async (
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

        return await ctUsuarioBaseService.obtenerTodos(filters, pagination);
      },
      "Usuarios obtenidas exitosamente"
    );
  };

  /**
   * 📦 Actualizar usuario
   * @route PUT /api/inventario/usuario/:id_ct_usuario
   */
  actualizarUsuario = async (req: Request, res: Response): Promise<void> => {
    await this.manejarActualizacion(
      req,
      res,
      async () => {
        const { id_ct_usuario } = this.validarDatosConEsquema<CtUsuarioIdParam>(
          ctUsuarioIdParamSchema,
          req.params
        );
        const usuarioData: ActualizarCtUsuarioInput = req.body;

        return await ctUsuarioBaseService.actualizar(
          id_ct_usuario,
          usuarioData
        );
      },
      "Usuario actualizada exitosamente"
    );
  };

  /**
   * 📦 Eliminar usuario
   * @route DELETE /api/inventario/usuario/:id_ct_usuario
   */
  eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
    await this.manejarEliminacion(
      req,
      res,
      async () => {
        const { id_ct_usuario } = this.validarDatosConEsquema<CtUsuarioIdParam>(
          ctUsuarioIdParamSchema,
          req.params
        );

        const { id_ct_usuario_up } =
          this.validarDatosConEsquema<EliminarCtUsuarioInput>(
            eliminarCtUsuarioSchema,
            req.body
          );

        await ctUsuarioBaseService.eliminar(id_ct_usuario, id_ct_usuario_up);
      },
      "Usuario eliminada exitosamente"
    );
  };
}
