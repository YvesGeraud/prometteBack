import { Router } from "express";
import { RlJustificacionBaseController } from "../controllers/rl_justificacion.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlJustificacionSchema,
  actualizarRlJustificacionSchema,
  rlJustificacionIdParamSchema,
  rlJustificacionFiltrosSchema,
  eliminarRlJustificacionSchema,
} from "../schemas/rl_justificacion.schema";

//TODO ===== RUTAS PARA RL_JUSTIFICACION CON BASE SERVICE =====

const router = Router();
const rlJustificacionController = new RlJustificacionBaseController();

// 📦 Obtener todas las relaciones justificación con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlJustificacionFiltrosSchema }),
  rlJustificacionController.obtenerTodasLasJustificaciones
);

// 📦 Obtener relación justificación específica por ID
router.get(
  "/:id_rl_justificacion",
  validarRequest({ params: rlJustificacionIdParamSchema }),
  rlJustificacionController.obtenerJustificacionPorId
);

// 📦 Crear nueva relación justificación
router.post(
  "/",
  validarRequest({ body: crearRlJustificacionSchema }),
  rlJustificacionController.crearJustificacion
);

// 📦 Actualizar relación justificación existente
router.put(
  "/:id_rl_justificacion",
  validarRequest({
    params: rlJustificacionIdParamSchema,
    body: actualizarRlJustificacionSchema,
  }),
  rlJustificacionController.actualizarJustificacion
);

// 📦 Eliminar relación justificación
router.delete(
  "/:id_rl_justificacion",
  validarRequest({
    params: rlJustificacionIdParamSchema,
    body: eliminarRlJustificacionSchema,
  }),
  rlJustificacionController.eliminarJustificacion
);

export default router;

// 🎉 API REST completa para rl_justificacion:
// GET    /api/rl_justificacion          - Listar con filtros/paginación
// GET    /api/rl_justificacion/:id      - Obtener por ID
// POST   /api/rl_justificacion          - Crear
// PUT    /api/rl_justificacion/:id      - Actualizar
// DELETE /api/rl_justificacion/:id       - Eliminar
