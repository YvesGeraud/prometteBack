import { Router } from "express";
import { RlProductoAreaBaseController } from "../controllers/rl_producto_area.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlProductoAreaSchema,
  actualizarRlProductoAreaSchema,
  rlProductoAreaIdParamSchema,
  rlProductoAreaFiltrosSchema,
  eliminarRlProductoAreaSchema,
} from "../schemas/rl_producto_area.schema";

//TODO ===== RUTAS PARA RL_PRODUCTO_AREA CON BASE SERVICE =====

const router = Router();
const rlProductoAreaController = new RlProductoAreaBaseController();

// 📦 Obtener todas las relaciones producto área con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlProductoAreaFiltrosSchema }),
  rlProductoAreaController.obtenerTodasLasProductosArea
);

// 📦 Obtener relación producto área específica por ID
router.get(
  "/:id_rl_producto_area",
  validarRequest({ params: rlProductoAreaIdParamSchema }),
  rlProductoAreaController.obtenerProductoAreaPorId
);

// 📦 Crear nueva relación producto área
router.post(
  "/",
  validarRequest({ body: crearRlProductoAreaSchema }),
  rlProductoAreaController.crearProductoArea
);

// 📦 Actualizar relación producto área existente
router.put(
  "/:id_rl_producto_area",
  validarRequest({
    params: rlProductoAreaIdParamSchema,
    body: actualizarRlProductoAreaSchema,
  }),
  rlProductoAreaController.actualizarProductoArea
);

// 📦 Eliminar relación producto área
router.delete(
  "/:id_rl_producto_area",
  validarRequest({
    params: rlProductoAreaIdParamSchema,
    body: eliminarRlProductoAreaSchema,
  }),
  rlProductoAreaController.eliminarProductoArea
);

export default router;

// 🎉 API REST completa para rl_producto_area:
// GET    /api/rl_producto_area          - Listar con filtros/paginación
// GET    /api/rl_producto_area/:id       - Obtener por ID
// POST   /api/rl_producto_area           - Crear
// PUT    /api/rl_producto_area/:id        - Actualizar
// DELETE /api/rl_producto_area/:id        - Eliminar
