import { Router } from "express";
import { RlAreaFinancieroBaseController } from "../controllers/rl_area_financiero.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlAreaFinancieroSchema,
  actualizarRlAreaFinancieroSchema,
  rlAreaFinancieroIdParamSchema,
  rlAreaFinancieroFiltrosSchema,
  eliminarRlAreaFinancieroSchema,
} from "../schemas/rl_area_financiero.schema";

//TODO ===== RUTAS PARA RL_AREA_FINANCIERO CON BASE SERVICE =====

const router = Router();
const rlAreaFinancieroController = new RlAreaFinancieroBaseController();

// 📦 Obtener todas las relaciones área financiero con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlAreaFinancieroFiltrosSchema }),
  rlAreaFinancieroController.obtenerTodasLasAreasFinanciero
);

// 📦 Obtener relación área financiero específica por ID
router.get(
  "/:id_rl_area_financiero",
  validarRequest({ params: rlAreaFinancieroIdParamSchema }),
  rlAreaFinancieroController.obtenerAreaFinancieroPorId
);

// 📦 Crear nueva relación área financiero
router.post(
  "/",
  validarRequest({ body: crearRlAreaFinancieroSchema }),
  rlAreaFinancieroController.crearAreaFinanciero
);

// 📦 Actualizar relación área financiero existente
router.put(
  "/:id_rl_area_financiero",
  validarRequest({
    params: rlAreaFinancieroIdParamSchema,
    body: actualizarRlAreaFinancieroSchema,
  }),
  rlAreaFinancieroController.actualizarAreaFinanciero
);

// 📦 Eliminar relación área financiero
router.delete(
  "/:id_rl_area_financiero",
  validarRequest({
    params: rlAreaFinancieroIdParamSchema,
    body: eliminarRlAreaFinancieroSchema,
  }),
  rlAreaFinancieroController.eliminarAreaFinanciero
);

export default router;

// 🎉 API REST completa para rl_area_financiero:
// GET    /api/rl_area_financiero          - Listar con filtros/paginación
// GET    /api/rl_area_financiero/:id      - Obtener por ID
// POST   /api/rl_area_financiero          - Crear
// PUT    /api/rl_area_financiero/:id      - Actualizar
// DELETE /api/rl_area_financiero/:id      - Eliminar
