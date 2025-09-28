import { Router } from "express";
import { DtTechoPresupuestoBaseController } from "../controllers/dt_techo_presupuesto.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtTechoPresupuestoSchema,
  actualizarDtTechoPresupuestoSchema,
  dtTechoPresupuestoIdParamSchema,
  dtTechoPresupuestoFiltrosSchema,
  eliminarDtTechoPresupuestoSchema,
} from "../schemas/dt_techo_presupuesto.schema";

//TODO ===== RUTAS PARA DT_TECHO_PRESUPUESTO CON BASE SERVICE =====

const router = Router();
const dtTechoPresupuestoController = new DtTechoPresupuestoBaseController();

// 📦 Obtener todos los techos presupuestales con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtTechoPresupuestoFiltrosSchema }),
  dtTechoPresupuestoController.obtenerTodosLosTechosPresupuestales
);

// 📦 Obtener techo presupuestal específico por ID
router.get(
  "/:id_dt_techo_presupuesto",
  validarRequest({ params: dtTechoPresupuestoIdParamSchema }),
  dtTechoPresupuestoController.obtenerTechoPresupuestoPorId
);

// 📦 Crear nuevo techo presupuestal
router.post(
  "/",
  validarRequest({ body: crearDtTechoPresupuestoSchema }),
  dtTechoPresupuestoController.crearTechoPresupuesto
);

// 📦 Actualizar techo presupuestal existente
router.put(
  "/:id_dt_techo_presupuesto",
  validarRequest({
    params: dtTechoPresupuestoIdParamSchema,
    body: actualizarDtTechoPresupuestoSchema,
  }),
  dtTechoPresupuestoController.actualizarTechoPresupuesto
);

// 📦 Eliminar techo presupuestal
router.delete(
  "/:id_dt_techo_presupuesto",
  validarRequest({
    params: dtTechoPresupuestoIdParamSchema,
    body: eliminarDtTechoPresupuestoSchema,
  }),
  dtTechoPresupuestoController.eliminarTechoPresupuesto
);

export default router;

// 🎉 API REST completa para dt_techo_presupuesto:
// GET    /api/dt_techo_presupuesto          - Listar con filtros/paginación
// GET    /api/dt_techo_presupuesto/:id      - Obtener por ID
// POST   /api/dt_techo_presupuesto          - Crear
// PUT    /api/dt_techo_presupuesto/:id      - Actualizar
// DELETE /api/dt_techo_presupuesto/:id      - Eliminar
