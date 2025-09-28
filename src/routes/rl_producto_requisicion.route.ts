import { Router } from "express";
import { RlProductoRequisicionBaseController } from "../controllers/rl_producto_requisicion.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlProductoRequisicionSchema,
  actualizarRlProductoRequisicionSchema,
  rlProductoRequisicionIdParamSchema,
  rlProductoRequisicionFiltrosSchema,
  eliminarRlProductoRequisicionSchema,
} from "../schemas/rl_producto_requisicion.schema";

//TODO ===== RUTAS PARA RL_PRODUCTO_REQUISICION CON BASE SERVICE =====

const router = Router();
const rlProductoRequisicionController =
  new RlProductoRequisicionBaseController();

// 📦 Obtener todas las relaciones producto requisición con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlProductoRequisicionFiltrosSchema }),
  rlProductoRequisicionController.obtenerTodasLasProductosRequisicion
);

// 📦 Obtener relación producto requisición específica por ID
router.get(
  "/:id_rl_producto_requisicion",
  validarRequest({ params: rlProductoRequisicionIdParamSchema }),
  rlProductoRequisicionController.obtenerProductoRequisicionPorId
);

// 📦 Crear nueva relación producto requisición
router.post(
  "/",
  validarRequest({ body: crearRlProductoRequisicionSchema }),
  rlProductoRequisicionController.crearProductoRequisicion
);

// 📦 Actualizar relación producto requisición existente
router.put(
  "/:id_rl_producto_requisicion",
  validarRequest({
    params: rlProductoRequisicionIdParamSchema,
    body: actualizarRlProductoRequisicionSchema,
  }),
  rlProductoRequisicionController.actualizarProductoRequisicion
);

// 📦 Eliminar relación producto requisición
router.delete(
  "/:id_rl_producto_requisicion",
  validarRequest({
    params: rlProductoRequisicionIdParamSchema,
    body: eliminarRlProductoRequisicionSchema,
  }),
  rlProductoRequisicionController.eliminarProductoRequisicion
);

export default router;

// 🎉 API REST completa para rl_producto_requisicion:
// GET    /api/rl_producto_requisicion          - Listar con filtros/paginación
// GET    /api/rl_producto_requisicion/:id       - Obtener por ID
// POST   /api/rl_producto_requisicion           - Crear
// PUT    /api/rl_producto_requisicion/:id       - Actualizar
// DELETE /api/rl_producto_requisicion/:id       - Eliminar
