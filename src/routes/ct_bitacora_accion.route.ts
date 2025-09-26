import { Router } from "express";
import { CtBitacoraAccionBaseController } from "../controllers/ct_bitacora_accion.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtBitacoraAccionSchema,
  actualizarCtBitacoraAccionSchema,
  ctBitacoraAccionIdParamSchema,
  bitacoraAccionFiltrosSchema,
} from "../schemas/ct_bitacora_accion.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctBitacoraAccionController = new CtBitacoraAccionBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: bitacoraAccionFiltrosSchema }),
  ctBitacoraAccionController.obtenerTodasLasBitacoraAcciones
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_bitacora_accion",
  validarRequest({ params: ctBitacoraAccionIdParamSchema }),
  ctBitacoraAccionController.obtenerBitacoraAccionPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtBitacoraAccionSchema }),
  ctBitacoraAccionController.crearBitacoraAccion
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_bitacora_accion",
  validarRequest({
    params: ctBitacoraAccionIdParamSchema,
    body: actualizarCtBitacoraAccionSchema,
  }),
  ctBitacoraAccionController.actualizarBitacoraAccion
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_bitacora_accion",
  validarRequest({ params: ctBitacoraAccionIdParamSchema }),
  ctBitacoraAccionController.eliminarBitacoraAccion
);

export default router;

// 🎉 API REST completa para ct_bitacora_accion:
// GET    /api/ct_bitacora_accion          - Listar con filtros/paginación
// GET    /api/ct_bitacora_accion/:id      - Obtener por ID
// POST   /api/ct_bitacora_accion          - Crear
// PUT    /api/ct_bitacora_accion/:id      - Actualizar
// DELETE /api/ct_bitacora_accion/:id      - Eliminar
