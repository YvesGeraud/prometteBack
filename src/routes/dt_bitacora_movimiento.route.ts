import { Router } from "express";
import { DtBitacoraMovimientoBaseController } from "../controllers/dt_bitacora_movimiento.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtBitacoraMovimientoSchema,
  actualizarDtBitacoraMovimientoSchema,
  dtBitacoraMovimientoIdParamSchema,
  dtBitacoraMovimientoFiltrosSchema,
  eliminarDtBitacoraMovimientoSchema,
} from "../schemas/dt_bitacora_movimiento.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const dtBitacoraMovimientoController = new DtBitacoraMovimientoBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtBitacoraMovimientoFiltrosSchema }),
  dtBitacoraMovimientoController.obtenerTodasLasDtBitacoraMovimiento
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_dt_bitacora_movimiento",
  validarRequest({ params: dtBitacoraMovimientoIdParamSchema }),
  dtBitacoraMovimientoController.obtenerDtBitacoraMovimientoPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearDtBitacoraMovimientoSchema }),
  dtBitacoraMovimientoController.crearDtBitacoraMovimiento
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_dt_bitacora_movimiento",
  validarRequest({
    params: dtBitacoraMovimientoIdParamSchema,
    body: actualizarDtBitacoraMovimientoSchema,
  }),
  dtBitacoraMovimientoController.actualizarDtBitacoraMovimiento
);

// 📦 Eliminar entidad
router.delete(
  "/:id_dt_bitacora_movimiento",
  validarRequest({
    params: dtBitacoraMovimientoIdParamSchema,
    body: eliminarDtBitacoraMovimientoSchema,
  }),
  dtBitacoraMovimientoController.eliminarDtBitacoraMovimiento
);

export default router;

// 🎉 API REST completa para ct_capitulo:
// GET    /api/ct_capitulo          - Listar con filtros/paginación
// GET    /api/ct_capitulo/:id      - Obtener por ID
// POST   /api/ct_capitulo          - Crear
// PUT    /api/ct_capitulo/:id      - Actualizar
// DELETE /api/ct_capitulo/:id      - Eliminar
