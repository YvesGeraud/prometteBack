import { Router } from "express";
import { CtModuloBaseController } from "../controllers/ct_modulo.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtModuloSchema,
  actualizarCtModuloSchema,
  ctModuloIdParamSchema,
  ctModuloFiltrosSchema,
  eliminarCtModuloSchema,
} from "../schemas/ct_modulo.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctModuloController = new CtModuloBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctModuloFiltrosSchema }),
  ctModuloController.obtenerTodasLasModulos
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_modulo",
  validarRequest({ params: ctModuloIdParamSchema }),
  ctModuloController.obtenerModuloPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtModuloSchema }),
  ctModuloController.crearModulo
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_modulo",
  validarRequest({
    params: ctModuloIdParamSchema,
    body: actualizarCtModuloSchema,
  }),
  ctModuloController.actualizarModulo
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_modulo",
  validarRequest({
    params: ctModuloIdParamSchema,
    body: eliminarCtModuloSchema,
  }),
  ctModuloController.eliminarModulo
);

export default router;

// 🎉 API REST completa para ct_modulo:
// GET    /api/ct_modulo          - Listar con filtros/paginación
// GET    /api/ct_modulo/:id      - Obtener por ID
// POST   /api/ct_modulo          - Crear
// PUT    /api/ct_modulo/:id      - Actualizar
// DELETE /api/ct_modulo/:id      - Eliminar
