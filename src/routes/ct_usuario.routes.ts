import { Router } from "express";
import { CtUsuarioBaseController } from "../controllers/ct_usuario.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtUsuarioSchema,
  actualizarCtUsuarioSchema,
  ctUsuarioIdParamSchema,
  ctUsuarioFiltrosSchema,
  eliminarCtUsuarioSchema,
} from "../schemas/ct_usuario.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctUsuarioController = new CtUsuarioBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctUsuarioFiltrosSchema }),
  ctUsuarioController.obtenerTodasLasUsuarios
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_usuario",
  validarRequest({ params: ctUsuarioIdParamSchema }),
  ctUsuarioController.obtenerUsuarioPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtUsuarioSchema }),
  ctUsuarioController.crearUsuario
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_usuario",
  validarRequest({
    params: ctUsuarioIdParamSchema,
    body: actualizarCtUsuarioSchema,
  }),
  ctUsuarioController.actualizarUsuario
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_usuario",
  validarRequest({
    params: ctUsuarioIdParamSchema,
    body: eliminarCtUsuarioSchema,
  }),
  ctUsuarioController.eliminarUsuario
);

export default router;

// 🎉 API REST completa para ct_capitulo:
// GET    /api/ct_capitulo          - Listar con filtros/paginación
// GET    /api/ct_capitulo/:id      - Obtener por ID
// POST   /api/ct_capitulo          - Crear
// PUT    /api/ct_capitulo/:id      - Actualizar
// DELETE /api/ct_capitulo/:id      - Eliminar
