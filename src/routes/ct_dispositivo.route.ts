import { Router } from "express";
import { CtDispositivoBaseController } from "../controllers/ct_dispositivo.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtDispositivoSchema,
  actualizarCtDispositivoSchema,
  ctDispositivoIdParamSchema,
  ctDispositivoFiltrosSchema,
  eliminarCtDispositivoSchema,
} from "../schemas/ct_dispositivo.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctDispositivoController = new CtDispositivoBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctDispositivoFiltrosSchema }),
  ctDispositivoController.obtenerTodasLasDispositivos
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_dispositivo",
  validarRequest({ params: ctDispositivoIdParamSchema }),
  ctDispositivoController.obtenerDispositivoPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtDispositivoSchema }),
  ctDispositivoController.crearDispositivo
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_dispositivo",
  validarRequest({
    params: ctDispositivoIdParamSchema,
    body: actualizarCtDispositivoSchema,
  }),
  ctDispositivoController.actualizarDispositivo
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_dispositivo",
  validarRequest({
    params: ctDispositivoIdParamSchema,
    body: eliminarCtDispositivoSchema,
  }),
  ctDispositivoController.eliminarDispositivo
);

export default router;

// 🎉 API REST completa para ct_dispositivo:
// GET    /api/ct_dispositivo          - Listar con filtros/paginación
// GET    /api/ct_dispositivo/:id      - Obtener por ID
// POST   /api/ct_dispositivo          - Crear
// PUT    /api/ct_dispositivo/:id      - Actualizar
// DELETE /api/ct_dispositivo/:id      - Eliminar
