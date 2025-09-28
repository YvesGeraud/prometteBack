import { Router } from "express";
import { DtPlaneacionesAneecBaseController } from "../controllers/dt_planeaciones_aneec.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtPlaneacionesAneecSchema,
  actualizarDtPlaneacionesAneecSchema,
  dtPlaneacionesAneecIdParamSchema,
  dtPlaneacionesAneecFiltrosSchema,
  eliminarDtPlaneacionesAneecSchema,
} from "../schemas/dt_planeaciones_aneec.schema";

//TODO ===== RUTAS PARA DT_PLANEACIONES_ANEEC CON BASE SERVICE =====

const router = Router();
const dtPlaneacionesAneecController = new DtPlaneacionesAneecBaseController();

// 📦 Obtener todas las planeaciones aneec con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtPlaneacionesAneecFiltrosSchema }),
  dtPlaneacionesAneecController.obtenerTodasLasPlaneacionesAneec
);

// 📦 Obtener planeación aneec específica por ID
router.get(
  "/:id_dt_planeaciones_aneec",
  validarRequest({ params: dtPlaneacionesAneecIdParamSchema }),
  dtPlaneacionesAneecController.obtenerPlaneacionAneecPorId
);

// 📦 Crear nueva planeación aneec
router.post(
  "/",
  validarRequest({ body: crearDtPlaneacionesAneecSchema }),
  dtPlaneacionesAneecController.crearPlaneacionAneec
);

// 📦 Actualizar planeación aneec existente
router.put(
  "/:id_dt_planeaciones_aneec",
  validarRequest({
    params: dtPlaneacionesAneecIdParamSchema,
    body: actualizarDtPlaneacionesAneecSchema,
  }),
  dtPlaneacionesAneecController.actualizarPlaneacionAneec
);

// 📦 Eliminar planeación aneec
router.delete(
  "/:id_dt_planeaciones_aneec",
  validarRequest({
    params: dtPlaneacionesAneecIdParamSchema,
    body: eliminarDtPlaneacionesAneecSchema,
  }),
  dtPlaneacionesAneecController.eliminarPlaneacionAneec
);

export default router;

// 🎉 API REST completa para dt_planeaciones_aneec:
// GET    /api/dt_planeaciones_aneec          - Listar con filtros/paginación
// GET    /api/dt_planeaciones_aneec/:id      - Obtener por ID
// POST   /api/dt_planeaciones_aneec          - Crear
// PUT    /api/dt_planeaciones_aneec/:id      - Actualizar
// DELETE /api/dt_planeaciones_aneec/:id      - Eliminar
