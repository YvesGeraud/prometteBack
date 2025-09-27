import { Router } from "express";
import { CtFinanciamientoBaseController } from "../controllers/ct_financiamiento.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtFinanciamientoSchema,
  actualizarCtFinanciamientoSchema,
  ctFinanciamientoIdParamSchema,
  ctFinanciamientoFiltrosSchema,
  eliminarCtFinanciamientoSchema,
} from "../schemas/ct_financiamiento.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctFinanciamientoController = new CtFinanciamientoBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctFinanciamientoFiltrosSchema }),
  ctFinanciamientoController.obtenerTodasLasFinanciamientos
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_financiamiento",
  validarRequest({ params: ctFinanciamientoIdParamSchema }),
  ctFinanciamientoController.obtenerFinanciamientoPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtFinanciamientoSchema }),
  ctFinanciamientoController.crearFinanciamiento
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_financiamiento",
  validarRequest({
    params: ctFinanciamientoIdParamSchema,
    body: actualizarCtFinanciamientoSchema,
  }),
  ctFinanciamientoController.actualizarFinanciamiento
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_financiamiento",
  validarRequest({
    params: ctFinanciamientoIdParamSchema,
    body: eliminarCtFinanciamientoSchema,
  }),
  ctFinanciamientoController.eliminarFinanciamiento
);

export default router;

// 🎉 API REST completa para ct_financiamiento:
// GET    /api/ct_financiamiento          - Listar con filtros/paginación
// GET    /api/ct_financiamiento/:id      - Obtener por ID
// POST   /api/ct_financiamiento          - Crear
// PUT    /api/ct_financiamiento/:id      - Actualizar
// DELETE /api/ct_financiamiento/:id      - Eliminar
