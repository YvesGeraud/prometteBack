import { Router } from "express";
import { RlAnalistaUnidadBaseController } from "../controllers/rl_analista_unidad.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlAnalistaUnidadSchema,
  actualizarRlAnalistaUnidadSchema,
  rlAnalistaUnidadIdParamSchema,
  rlAnalistaUnidadFiltrosSchema,
  eliminarRlAnalistaUnidadSchema,
} from "../schemas/rl_analista_unidad.schema";

//TODO ===== RUTAS PARA RL_ANALISTA_UNIDAD CON BASE SERVICE =====

const router = Router();
const rlAnalistaUnidadController = new RlAnalistaUnidadBaseController();

// 📦 Obtener todas las relaciones analista unidad con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlAnalistaUnidadFiltrosSchema }),
  rlAnalistaUnidadController.obtenerTodasLasAnalistasUnidad
);

// 📦 Obtener relación analista unidad específica por ID
router.get(
  "/:id_rl_analista_unidad",
  validarRequest({ params: rlAnalistaUnidadIdParamSchema }),
  rlAnalistaUnidadController.obtenerAnalistaUnidadPorId
);

// 📦 Crear nueva relación analista unidad
router.post(
  "/",
  validarRequest({ body: crearRlAnalistaUnidadSchema }),
  rlAnalistaUnidadController.crearAnalistaUnidad
);

// 📦 Actualizar relación analista unidad existente
router.put(
  "/:id_rl_analista_unidad",
  validarRequest({
    params: rlAnalistaUnidadIdParamSchema,
    body: actualizarRlAnalistaUnidadSchema,
  }),
  rlAnalistaUnidadController.actualizarAnalistaUnidad
);

// 📦 Eliminar relación analista unidad
router.delete(
  "/:id_rl_analista_unidad",
  validarRequest({
    params: rlAnalistaUnidadIdParamSchema,
    body: eliminarRlAnalistaUnidadSchema,
  }),
  rlAnalistaUnidadController.eliminarAnalistaUnidad
);

export default router;

// 🎉 API REST completa para rl_analista_unidad:
// GET    /api/rl_analista_unidad          - Listar con filtros/paginación
// GET    /api/rl_analista_unidad/:id      - Obtener por ID
// POST   /api/rl_analista_unidad          - Crear
// PUT    /api/rl_analista_unidad/:id      - Actualizar
// DELETE /api/rl_analista_unidad/:id      - Eliminar
