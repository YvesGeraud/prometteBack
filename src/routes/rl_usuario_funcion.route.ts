import { Router } from "express";
import { RlUsuarioFuncionBaseController } from "../controllers/rl_usuario_funcion.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlUsuarioFuncionSchema,
  actualizarRlUsuarioFuncionSchema,
  rlUsuarioFuncionIdParamSchema,
  rlUsuarioFuncionFiltrosSchema,
  eliminarRlUsuarioFuncionSchema,
} from "../schemas/rl_usuario_funcion.schema";

//TODO ===== RUTAS PARA RL_USUARIO_FUNCION CON BASE SERVICE =====

const router = Router();
const rlUsuarioFuncionController = new RlUsuarioFuncionBaseController();

// 📦 Obtener todas las relaciones usuario función con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlUsuarioFuncionFiltrosSchema }),
  rlUsuarioFuncionController.obtenerTodasLasUsuariosFuncion
);

// 📦 Obtener relación usuario función específica por ID
router.get(
  "/:id_rl_usuario_funcion",
  validarRequest({ params: rlUsuarioFuncionIdParamSchema }),
  rlUsuarioFuncionController.obtenerUsuarioFuncionPorId
);

// 📦 Crear nueva relación usuario función
router.post(
  "/",
  validarRequest({ body: crearRlUsuarioFuncionSchema }),
  rlUsuarioFuncionController.crearUsuarioFuncion
);

// 📦 Actualizar relación usuario función existente
router.put(
  "/:id_rl_usuario_funcion",
  validarRequest({
    params: rlUsuarioFuncionIdParamSchema,
    body: actualizarRlUsuarioFuncionSchema,
  }),
  rlUsuarioFuncionController.actualizarUsuarioFuncion
);

// 📦 Eliminar relación usuario función
router.delete(
  "/:id_rl_usuario_funcion",
  validarRequest({
    params: rlUsuarioFuncionIdParamSchema,
    body: eliminarRlUsuarioFuncionSchema,
  }),
  rlUsuarioFuncionController.eliminarUsuarioFuncion
);

export default router;

// 🎉 API REST completa para rl_usuario_funcion:
// GET    /api/rl_usuario_funcion          - Listar con filtros/paginación
// GET    /api/rl_usuario_funcion/:id       - Obtener por ID
// POST   /api/rl_usuario_funcion           - Crear
// PUT    /api/rl_usuario_funcion/:id       - Actualizar
// DELETE /api/rl_usuario_funcion/:id       - Eliminar
