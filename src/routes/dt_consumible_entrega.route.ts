import { Router } from "express";
import { DtConsumibleEntregaBaseController } from "../controllers/dt_consumible_entrega.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtConsumibleEntregaSchema,
  actualizarDtConsumibleEntregaSchema,
  dtConsumibleEntregaIdParamSchema,
  dtConsumibleEntregaFiltrosSchema,
  eliminarDtConsumibleEntregaSchema,
} from "../schemas/dt_consumible_entrega.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const dtConsumibleEntregaController = new DtConsumibleEntregaBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtConsumibleEntregaFiltrosSchema }),
  dtConsumibleEntregaController.obtenerTodasLasConsumibleEntregas
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_dt_consumible_entrega",
  validarRequest({ params: dtConsumibleEntregaIdParamSchema }),
  dtConsumibleEntregaController.obtenerConsumibleEntregaPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearDtConsumibleEntregaSchema }),
  dtConsumibleEntregaController.crearConsumibleEntrega
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_dt_consumible_entrega",
  validarRequest({
    params: dtConsumibleEntregaIdParamSchema,
    body: actualizarDtConsumibleEntregaSchema,
  }),
  dtConsumibleEntregaController.actualizarConsumibleEntrega
);

// 📦 Eliminar entidad
router.delete(
  "/:id_dt_consumible_entrega",
  validarRequest({
    params: dtConsumibleEntregaIdParamSchema,
    body: eliminarDtConsumibleEntregaSchema,
  }),
  dtConsumibleEntregaController.eliminarConsumibleEntrega
);

export default router;

// 🎉 API REST completa para dt_consumible_entrega:
// GET    /api/dt_consumible_entrega          - Listar con filtros/paginación
// GET    /api/dt_consumible_entrega/:id      - Obtener por ID
// POST   /api/dt_consumible_entrega          - Crear
// PUT    /api/dt_consumible_entrega/:id      - Actualizar
// DELETE /api/dt_consumible_entrega/:id      - Eliminar
