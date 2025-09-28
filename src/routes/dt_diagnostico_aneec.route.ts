import { Router } from "express";
import { DtDiagnosticoAneecBaseController } from "../controllers/dt_diagnostico_aneec.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtDiagnosticoAneecSchema,
  actualizarDtDiagnosticoAneecSchema,
  dtDiagnosticoAneecIdParamSchema,
  dtDiagnosticoAneecFiltrosSchema,
  eliminarDtDiagnosticoAneecSchema,
} from "../schemas/dt_diagnostico_aneec.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const dtDiagnosticoAneecController = new DtDiagnosticoAneecBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtDiagnosticoAneecFiltrosSchema }),
  dtDiagnosticoAneecController.obtenerTodasLasDiagnosticoAneec
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_dt_diagnostico_aneec",
  validarRequest({ params: dtDiagnosticoAneecIdParamSchema }),
  dtDiagnosticoAneecController.obtenerDiagnosticoAneecPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearDtDiagnosticoAneecSchema }),
  dtDiagnosticoAneecController.crearDiagnosticoAneec
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_dt_diagnostico_aneec",
  validarRequest({
    params: dtDiagnosticoAneecIdParamSchema,
    body: actualizarDtDiagnosticoAneecSchema,
  }),
  dtDiagnosticoAneecController.actualizarDiagnosticoAneec
);

// 📦 Eliminar entidad
router.delete(
  "/:id_dt_diagnostico_aneec",
  validarRequest({
    params: dtDiagnosticoAneecIdParamSchema,
    body: eliminarDtDiagnosticoAneecSchema,
  }),
  dtDiagnosticoAneecController.eliminarDiagnosticoAneec
);

export default router;

// 🎉 API REST completa para dt_diagnostico_aneec:
// GET    /api/dt_diagnostico_aneec          - Listar con filtros/paginación
// GET    /api/dt_diagnostico_aneec/:id      - Obtener por ID
// POST   /api/dt_diagnostico_aneec          - Crear
// PUT    /api/dt_diagnostico_aneec/:id      - Actualizar
// DELETE /api/dt_diagnostico_aneec/:id      - Eliminar
