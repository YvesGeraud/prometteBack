import { Router } from "express";
import { DtAspiranteAneecBaseController } from "../controllers/dt_aspirante_aneec.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtAspiranteAneecSchema,
  actualizarDtAspiranteAneecSchema,
  dtAspiranteAneecIdParamSchema,
  dtAspiranteAneecFiltrosSchema,
  eliminarDtAspiranteAneecSchema,
} from "../schemas/dt_aspirante_aneec.schema";

//TODO ===== RUTAS PARA DT_ASPIRANTE_ANEEC CON BASE SERVICE =====

const router = Router();
const dtAspiranteAneecController = new DtAspiranteAneecBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtAspiranteAneecFiltrosSchema }),
  dtAspiranteAneecController.obtenerTodasLasAspirantesAneec
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_dt_aspirante_aneec",
  validarRequest({ params: dtAspiranteAneecIdParamSchema }),
  dtAspiranteAneecController.obtenerAspiranteAneecPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearDtAspiranteAneecSchema }),
  dtAspiranteAneecController.crearAspiranteAneec
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_dt_aspirante_aneec",
  validarRequest({
    params: dtAspiranteAneecIdParamSchema,
    body: actualizarDtAspiranteAneecSchema,
  }),
  dtAspiranteAneecController.actualizarAspiranteAneec
);

// 📦 Eliminar entidad
router.delete(
  "/:id_dt_aspirante_aneec",
  validarRequest({
    params: dtAspiranteAneecIdParamSchema,
    body: eliminarDtAspiranteAneecSchema,
  }),
  dtAspiranteAneecController.eliminarAspiranteAneec
);

export default router;

// 🎉 API REST completa para dt_aspirante_aneec:
// GET    /api/dt_aspirante_aneec          - Listar con filtros/paginación
// GET    /api/dt_aspirante_aneec/:id      - Obtener por ID
// POST   /api/dt_aspirante_aneec          - Crear
// PUT    /api/dt_aspirante_aneec/:id      - Actualizar
// DELETE /api/dt_aspirante_aneec/:id      - Eliminar
