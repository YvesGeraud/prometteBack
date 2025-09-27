import { Router } from "express";
import { CtProductoConsumibleBaseController } from "../controllers/ct_producto_consumible.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtProductoConsumibleSchema,
  actualizarCtProductoConsumibleSchema,
  ctProductoConsumibleIdParamSchema,
  ctProductoConsumibleFiltrosSchema,
  eliminarCtProductoConsumibleSchema,
} from "../schemas/ct_producto_consumible.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctProductoConsumibleController = new CtProductoConsumibleBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctProductoConsumibleFiltrosSchema }),
  ctProductoConsumibleController.obtenerTodasLasProductoConsumibles
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_producto_consumible",
  validarRequest({ params: ctProductoConsumibleIdParamSchema }),
  ctProductoConsumibleController.obtenerProductoConsumiblePorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtProductoConsumibleSchema }),
  ctProductoConsumibleController.crearProductoConsumible
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_producto_consumible",
  validarRequest({
    params: ctProductoConsumibleIdParamSchema,
    body: actualizarCtProductoConsumibleSchema,
  }),
  ctProductoConsumibleController.actualizarProductoConsumible
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_producto_consumible",
  validarRequest({
    params: ctProductoConsumibleIdParamSchema,
    body: eliminarCtProductoConsumibleSchema,
  }),
  ctProductoConsumibleController.eliminarProductoConsumible
);

export default router;

// 🎉 API REST completa para ct_capitulo:
// GET    /api/ct_producto_consumible          - Listar con filtros/paginación
// GET    /api/ct_producto_consumible/:id      - Obtener por ID
// POST   /api/ct_producto_consumible          - Crear
// PUT    /api/ct_producto_consumible/:id      - Actualizar
// DELETE /api/ct_producto_consumible/:id      - Eliminar
