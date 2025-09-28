import { Router } from "express";
import { DtCorrespondenciaBaseController } from "../controllers/dt_correspondencia.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtCorrespondenciaSchema,
  actualizarDtCorrespondenciaSchema,
  dtCorrespondenciaIdParamSchema,
  dtCorrespondenciaFiltrosSchema,
  eliminarDtCorrespondenciaSchema,
} from "../schemas/dt_correspondencia.schema";

//TODO ===== RUTAS PARA DT_CORRESPONDENCIA CON BASE SERVICE =====

const router = Router();
const dtCorrespondenciaController = new DtCorrespondenciaBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtCorrespondenciaFiltrosSchema }),
  dtCorrespondenciaController.obtenerTodasLasCorrespondencias
);

// 📦 Obtener correspondencia específica por ID
router.get(
  "/:id_dt_correspondencia",
  validarRequest({ params: dtCorrespondenciaIdParamSchema }),
  dtCorrespondenciaController.obtenerCorrespondenciaPorId
);

// 📦 Crear nueva correspondencia
router.post(
  "/",
  validarRequest({ body: crearDtCorrespondenciaSchema }),
  dtCorrespondenciaController.crearCorrespondencia
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_dt_correspondencia",
  validarRequest({
    params: dtCorrespondenciaIdParamSchema,
    body: actualizarDtCorrespondenciaSchema,
  }),
  dtCorrespondenciaController.actualizarCorrespondencia
);

// 📦 Eliminar entidad
router.delete(
  "/:id_dt_correspondencia",
  validarRequest({
    params: dtCorrespondenciaIdParamSchema,
    body: eliminarDtCorrespondenciaSchema,
  }),
  dtCorrespondenciaController.eliminarCorrespondencia
);

export default router;

// 🎉 API REST completa para dt_correspondencia:
// GET    /api/dt_correspondencia          - Listar con filtros/paginación
// GET    /api/dt_correspondencia/:id      - Obtener por ID
// POST   /api/dt_correspondencia          - Crear
// PUT    /api/dt_correspondencia/:id      - Actualizar
// DELETE /api/dt_correspondencia/:id      - Eliminar
