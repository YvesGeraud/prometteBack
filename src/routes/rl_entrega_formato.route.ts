import { Router } from "express";
import { RlEntregaFormatoBaseController } from "../controllers/rl_entrega_formato.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlEntregaFormatoSchema,
  actualizarRlEntregaFormatoSchema,
  rlEntregaFormatoIdParamSchema,
  rlEntregaFormatoFiltrosSchema,
  eliminarRlEntregaFormatoSchema,
} from "../schemas/rl_entrega_formato.schema";

//TODO ===== RUTAS PARA RL_ENTREGA_FORMATO CON BASE SERVICE =====

const router = Router();
const rlEntregaFormatoController = new RlEntregaFormatoBaseController();

// 📦 Obtener todas las relaciones entrega formato con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlEntregaFormatoFiltrosSchema }),
  rlEntregaFormatoController.obtenerTodasLasEntregasFormato
);

// 📦 Obtener relación entrega formato específica por ID
router.get(
  "/:id_rl_entrega_formato",
  validarRequest({ params: rlEntregaFormatoIdParamSchema }),
  rlEntregaFormatoController.obtenerEntregaFormatoPorId
);

// 📦 Crear nueva relación entrega formato
router.post(
  "/",
  validarRequest({ body: crearRlEntregaFormatoSchema }),
  rlEntregaFormatoController.crearEntregaFormato
);

// 📦 Actualizar relación entrega formato existente
router.put(
  "/:id_rl_entrega_formato",
  validarRequest({
    params: rlEntregaFormatoIdParamSchema,
    body: actualizarRlEntregaFormatoSchema,
  }),
  rlEntregaFormatoController.actualizarEntregaFormato
);

// 📦 Eliminar relación entrega formato
router.delete(
  "/:id_rl_entrega_formato",
  validarRequest({
    params: rlEntregaFormatoIdParamSchema,
    body: eliminarRlEntregaFormatoSchema,
  }),
  rlEntregaFormatoController.eliminarEntregaFormato
);

export default router;

// 🎉 API REST completa para rl_entrega_formato:
// GET    /api/rl_entrega_formato          - Listar con filtros/paginación
// GET    /api/rl_entrega_formato/:id      - Obtener por ID
// POST   /api/rl_entrega_formato          - Crear
// PUT    /api/rl_entrega_formato/:id      - Actualizar
// DELETE /api/rl_entrega_formato/:id      - Eliminar
