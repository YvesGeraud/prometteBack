import { Router } from "express";
import { RlPartidaAreaBaseController } from "../controllers/rl_partida_area.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlPartidaAreaSchema,
  actualizarRlPartidaAreaSchema,
  rlPartidaAreaIdParamSchema,
  rlPartidaAreaFiltrosSchema,
  eliminarRlPartidaAreaSchema,
} from "../schemas/rl_partida_area.schema";

//TODO ===== RUTAS PARA RL_PARTIDA_AREA CON BASE SERVICE =====

const router = Router();
const rlPartidaAreaController = new RlPartidaAreaBaseController();

// 📦 Obtener todas las relaciones partida área con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlPartidaAreaFiltrosSchema }),
  rlPartidaAreaController.obtenerTodasLasPartidasArea
);

// 📦 Obtener relación partida área específica por ID
router.get(
  "/:id_rl_partida_area",
  validarRequest({ params: rlPartidaAreaIdParamSchema }),
  rlPartidaAreaController.obtenerPartidaAreaPorId
);

// 📦 Crear nueva relación partida área
router.post(
  "/",
  validarRequest({ body: crearRlPartidaAreaSchema }),
  rlPartidaAreaController.crearPartidaArea
);

// 📦 Actualizar relación partida área existente
router.put(
  "/:id_rl_partida_area",
  validarRequest({
    params: rlPartidaAreaIdParamSchema,
    body: actualizarRlPartidaAreaSchema,
  }),
  rlPartidaAreaController.actualizarPartidaArea
);

// 📦 Eliminar relación partida área
router.delete(
  "/:id_rl_partida_area",
  validarRequest({
    params: rlPartidaAreaIdParamSchema,
    body: eliminarRlPartidaAreaSchema,
  }),
  rlPartidaAreaController.eliminarPartidaArea
);

export default router;

// 🎉 API REST completa para rl_partida_area:
// GET    /api/rl_partida_area          - Listar con filtros/paginación
// GET    /api/rl_partida_area/:id      - Obtener por ID
// POST   /api/rl_partida_area          - Crear
// PUT    /api/rl_partida_area/:id      - Actualizar
// DELETE /api/rl_partida_area/:id      - Eliminar
