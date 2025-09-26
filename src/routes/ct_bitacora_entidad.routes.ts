import { Router } from "express";
import { CtBitacoraEntidadBaseController } from "../controllers/ct_bitacora_entidad.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtBitacoraEntidadSchema,
  actualizarCtBitacoraEntidadSchema,
  ctBitacoraEntidadIdParamSchema,
  ctBitacoraEntidadFiltrosSchema,
} from "../schemas/ct_bitacora_entidad.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctBitacoraEntidadController = new CtBitacoraEntidadBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctBitacoraEntidadFiltrosSchema }),
  ctBitacoraEntidadController.obtenerTodasLasBitacorasEntidades
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_bitacora_entidad",
  validarRequest({ params: ctBitacoraEntidadIdParamSchema }),
  ctBitacoraEntidadController.obtenerBitacoraEntidadPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtBitacoraEntidadSchema }),
  ctBitacoraEntidadController.crearBitacoraEntidad
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_bitacora_entidad",
  validarRequest({
    params: ctBitacoraEntidadIdParamSchema,
    body: actualizarCtBitacoraEntidadSchema,
  }),
  ctBitacoraEntidadController.actualizarBitacoraEntidad
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_bitacora_entidad",
  validarRequest({ params: ctBitacoraEntidadIdParamSchema }),
  ctBitacoraEntidadController.eliminarBitacoraEntidad
);

export default router;

// 🎉 API REST completa para ct_bitacora_entidad:
// GET    /api/ct_bitacora_entidad          - Listar con filtros/paginación
// GET    /api/ct_bitacora_entidad/:id      - Obtener por ID
// POST   /api/ct_bitacora_entidad          - Crear
// PUT    /api/ct_bitacora_entidad/:id      - Actualizar
// DELETE /api/ct_bitacora_entidad/:id      - Eliminar
