import { Router } from "express";
import { RlUsuarioPuestoBaseController } from "../controllers/rl_usuario_puesto.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlUsuarioPuestoSchema,
  actualizarRlUsuarioPuestoSchema,
  rlUsuarioPuestoIdParamSchema,
  rlUsuarioPuestoFiltrosSchema,
  eliminarRlUsuarioPuestoSchema,
} from "../schemas/rl_usuario_puesto.schema";

//TODO ===== RUTAS PARA RL_USUARIO_PUESTO CON BASE SERVICE =====

const router = Router();
const rlUsuarioPuestoController = new RlUsuarioPuestoBaseController();

// 📦 Obtener todas las relaciones usuario puesto con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlUsuarioPuestoFiltrosSchema }),
  rlUsuarioPuestoController.obtenerTodasLasUsuariosPuesto
);

// 📦 Obtener relación usuario puesto específica por ID
router.get(
  "/:id_rl_usuario_puesto",
  validarRequest({ params: rlUsuarioPuestoIdParamSchema }),
  rlUsuarioPuestoController.obtenerUsuarioPuestoPorId
);

// 📦 Crear nueva relación usuario puesto
router.post(
  "/",
  validarRequest({ body: crearRlUsuarioPuestoSchema }),
  rlUsuarioPuestoController.crearUsuarioPuesto
);

// 📦 Actualizar relación usuario puesto existente
router.put(
  "/:id_rl_usuario_puesto",
  validarRequest({
    params: rlUsuarioPuestoIdParamSchema,
    body: actualizarRlUsuarioPuestoSchema,
  }),
  rlUsuarioPuestoController.actualizarUsuarioPuesto
);

// 📦 Eliminar relación usuario puesto
router.delete(
  "/:id_rl_usuario_puesto",
  validarRequest({
    params: rlUsuarioPuestoIdParamSchema,
    body: eliminarRlUsuarioPuestoSchema,
  }),
  rlUsuarioPuestoController.eliminarUsuarioPuesto
);

export default router;

// 🎉 API REST completa para rl_usuario_puesto:
// GET    /api/rl_usuario_puesto          - Listar con filtros/paginación
// GET    /api/rl_usuario_puesto/:id      - Obtener por ID
// POST   /api/rl_usuario_puesto          - Crear
// PUT    /api/rl_usuario_puesto/:id      - Actualizar
// DELETE /api/rl_usuario_puesto/:id      - Eliminar
