import { Router } from "express";
import { CtCorrespondenciaPrioridadBaseController } from "../controllers/ct_correspondencia_prioridad.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtCorrespondenciaPrioridadSchema,
  actualizarCtCorrespondenciaPrioridadSchema,
  ctCorrespondenciaPrioridadIdParamSchema,
  eliminarCtCorrespondenciaPrioridadSchema,
  ctCorrespondenciaPrioridadFiltrosSchema,
} from "../schemas/ct_correspondencia_prioridad.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctCorrespondenciaPrioridadController =
  new CtCorrespondenciaPrioridadBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctCorrespondenciaPrioridadFiltrosSchema }),
  ctCorrespondenciaPrioridadController.obtenerTodasLasCorrespondenciasPrioridades
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_prioridad",
  validarRequest({ params: ctCorrespondenciaPrioridadIdParamSchema }),
  ctCorrespondenciaPrioridadController.obtenerCorrespondenciaPrioridadPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtCorrespondenciaPrioridadSchema }),
  ctCorrespondenciaPrioridadController.crearCorrespondenciaPrioridad
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_prioridad",
  validarRequest({
    params: ctCorrespondenciaPrioridadIdParamSchema,
    body: actualizarCtCorrespondenciaPrioridadSchema,
  }),
  ctCorrespondenciaPrioridadController.actualizarCorrespondenciaPrioridad
);

// 📦 Eliminar entidad
router.delete(
  "/:id_prioridad",
  validarRequest({
    params: ctCorrespondenciaPrioridadIdParamSchema,
    //body: eliminarCtCorrespondenciaPrioridadSchema,
  }),
  ctCorrespondenciaPrioridadController.eliminarCorrespondenciaPrioridad
);

export default router;

// 🎉 API REST completa para ct_capitulo:
// GET    /api/ct_capitulo          - Listar con filtros/paginación
// GET    /api/ct_capitulo/:id      - Obtener por ID
// POST   /api/ct_capitulo          - Crear
// PUT    /api/ct_capitulo/:id      - Actualizar
// DELETE /api/ct_capitulo/:id      - Eliminar
