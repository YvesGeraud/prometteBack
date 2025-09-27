import { Router } from "express";
import { CtPuestoBaseController } from "../controllers/ct_puesto.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtPuestoSchema,
  actualizarCtPuestoSchema,
  ctPuestoIdParamSchema,
  ctPuestoFiltrosSchema,
  eliminarCtPuestoSchema,
} from "../schemas/ct_puesto.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctPuestoController = new CtPuestoBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctPuestoFiltrosSchema }),
  ctPuestoController.obtenerTodasLasPuestos
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_puesto",
  validarRequest({ params: ctPuestoIdParamSchema }),
  ctPuestoController.obtenerPuestoPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtPuestoSchema }),
  ctPuestoController.crearPuesto
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_puesto",
  validarRequest({
    params: ctPuestoIdParamSchema,
    body: actualizarCtPuestoSchema,
  }),
  ctPuestoController.actualizarPuesto
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_puesto",
  validarRequest({
    params: ctPuestoIdParamSchema,
    body: eliminarCtPuestoSchema,
  }),
  ctPuestoController.eliminarPuesto
);

export default router;

// 🎉 API REST completa para ct_puesto:
// GET    /api/ct_puesto          - Listar con filtros/paginación
// GET    /api/ct_capitulo/:id      - Obtener por ID
// POST   /api/ct_puesto          - Crear
// PUT    /api/ct_puesto/:id      - Actualizar
// DELETE /api/ct_puesto/:id      - Eliminar
