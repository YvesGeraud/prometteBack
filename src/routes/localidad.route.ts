import { Router } from "express";
import { CtLocalidadBaseController } from "../controllers/localidad.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtLocalidadSchema,
  actualizarCtLocalidadSchema,
  ctLocalidadIdParamSchema,
  localidadFiltrosSchema,
} from "../schemas/localidadschema";

//TODO ===== RUTAS PARA CT_LOCALIDAD CON BASE SERVICE =====

const router = Router();
const ctLocalidadController = new CtLocalidadBaseController();

// 📦 Obtener todas las localidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: localidadFiltrosSchema }),
  ctLocalidadController.obtenerTodasLasLocalidades
);

// 📦 Obtener localidad específica por ID
router.get(
  "/:id_localidad",
  validarRequest({ params: ctLocalidadIdParamSchema }),
  ctLocalidadController.obtenerEntidadPorId
);

// 📦 Crear nueva localidad
router.post(
  "/",
  validarRequest({ body: crearCtLocalidadSchema }),
  ctLocalidadController.crearEntidad
);

// 📦 Actualizar localidad existente
router.put(
  "/:id_localidad",
  validarRequest({
    params: ctLocalidadIdParamSchema,
    body: actualizarCtLocalidadSchema,
  }),
  ctLocalidadController.actualizarEntidad
);

// 📦 Eliminar localidad
router.delete(
  "/:id_localidad",
  validarRequest({ params: ctLocalidadIdParamSchema }),
  ctLocalidadController.eliminarEntidad
);

export default router;

// 🎉 API REST completa para ct_localidad:
// GET    /api/ct_localidad          - Listar con filtros/paginación
// GET    /api/ct_localidad/:id      - Obtener por ID
// POST   /api/ct_localidad          - Crear
// PUT    /api/ct_localidad/:id      - Actualizar
// DELETE /api/ct_localidad/:id      - Eliminar
