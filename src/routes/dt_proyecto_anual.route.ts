import { Router } from "express";
import { DtProyectoAnualBaseController } from "../controllers/dt_proyecto_anual.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtProyectoAnualSchema,
  actualizarDtProyectoAnualSchema,
  dtProyectoAnualIdParamSchema,
  dtProyectoAnualFiltrosSchema,
  eliminarDtProyectoAnualSchema,
} from "../schemas/dt_proyecto_anual.schema";

//TODO ===== RUTAS PARA DT_PROYECTO_ANUAL CON BASE SERVICE =====

const router = Router();
const dtProyectoAnualController = new DtProyectoAnualBaseController();

// 📦 Obtener todos los proyectos anuales con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtProyectoAnualFiltrosSchema }),
  dtProyectoAnualController.obtenerTodosLosProyectosAnuales
);

// 📦 Obtener proyecto anual específico por ID
router.get(
  "/:id_dt_proyecto_anual",
  validarRequest({ params: dtProyectoAnualIdParamSchema }),
  dtProyectoAnualController.obtenerProyectoAnualPorId
);

// 📦 Crear nuevo proyecto anual
router.post(
  "/",
  validarRequest({ body: crearDtProyectoAnualSchema }),
  dtProyectoAnualController.crearProyectoAnual
);

// 📦 Actualizar proyecto anual existente
router.put(
  "/:id_dt_proyecto_anual",
  validarRequest({
    params: dtProyectoAnualIdParamSchema,
    body: actualizarDtProyectoAnualSchema,
  }),
  dtProyectoAnualController.actualizarProyectoAnual
);

// 📦 Eliminar proyecto anual
router.delete(
  "/:id_dt_proyecto_anual",
  validarRequest({
    params: dtProyectoAnualIdParamSchema,
    body: eliminarDtProyectoAnualSchema,
  }),
  dtProyectoAnualController.eliminarProyectoAnual
);

export default router;

// 🎉 API REST completa para dt_proyecto_anual:
// GET    /api/dt_proyecto_anual          - Listar con filtros/paginación
// GET    /api/dt_proyecto_anual/:id      - Obtener por ID
// POST   /api/dt_proyecto_anual          - Crear
// PUT    /api/dt_proyecto_anual/:id      - Actualizar
// DELETE /api/dt_proyecto_anual/:id      - Eliminar
