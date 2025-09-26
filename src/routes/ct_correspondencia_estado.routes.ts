import { Router } from "express";
import { CtCorrespondenciaEstadoController } from "../controllers/ct_correspondencia_estado.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtCorrespondenciaEstadoSchema,
  actualizarCtCorrespondenciaEstadoSchema,
  ctCorrespondenciaEstadoIdParamSchema,
  ctCorrespondenciaEstadoFiltrosSchema,
} from "../schemas/ct_correspondencia_estado.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctCorrespondenciaEstadoController =
  new CtCorrespondenciaEstadoController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctCorrespondenciaEstadoFiltrosSchema }),
  ctCorrespondenciaEstadoController.obtenerTodasLasCorrespondenciaEstados
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_estado",
  validarRequest({ params: ctCorrespondenciaEstadoIdParamSchema }),
  ctCorrespondenciaEstadoController.obtenerCorrespondenciaEstadoPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtCorrespondenciaEstadoSchema }),
  ctCorrespondenciaEstadoController.crearCorrespondenciaEstado
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_estado",
  validarRequest({
    params: ctCorrespondenciaEstadoIdParamSchema,
    body: actualizarCtCorrespondenciaEstadoSchema,
  }),
  ctCorrespondenciaEstadoController.actualizarCorrespondenciaEstado
);

// 📦 Eliminar entidad
router.delete(
  "/:id_estado",
  validarRequest({ params: ctCorrespondenciaEstadoIdParamSchema }),
  ctCorrespondenciaEstadoController.eliminarCorrespondenciaEstado
);

export default router;

// 🎉 API REST completa para ct_correspondencia_estado:
// GET    /api/ct_correspondencia_estado          - Listar con filtros/paginación
// GET    /api/ct_correspondencia_estado/:id      - Obtener por ID
// POST   /api/ct_correspondencia_estado          - Crear
// PUT    /api/ct_correspondencia_estado/:id      - Actualizar
// DELETE /api/ct_correspondencia_estado/:id      - Eliminar
