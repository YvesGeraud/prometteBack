import { Router } from "express";
import { CtConsumibleProveedorBaseController } from "../controllers/ct_consumible_proveedor.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtConsumibleProveedorSchema,
  actualizarCtConsumibleProveedorSchema,
  ctConsumibleProveedorIdParamSchema,
  ctConsumibleProveedorFiltrosSchema,
  eliminarCtConsumibleProveedorSchema,
} from "../schemas/ct_consumible_proveedor.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctConsumibleProveedorController =
  new CtConsumibleProveedorBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctConsumibleProveedorFiltrosSchema }),
  ctConsumibleProveedorController.obtenerTodasLasConsumiblesProveedores
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_consumible_proveedor",
  validarRequest({ params: ctConsumibleProveedorIdParamSchema }),
  ctConsumibleProveedorController.obtenerConsumiblesProveedorPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtConsumibleProveedorSchema }),
  ctConsumibleProveedorController.crearConsumiblesProveedor
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_consumible_proveedor",
  validarRequest({
    params: ctConsumibleProveedorIdParamSchema,
    body: actualizarCtConsumibleProveedorSchema,
  }),
  ctConsumibleProveedorController.actualizarConsumiblesProveedor
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_consumible_proveedor",
  validarRequest({
    params: ctConsumibleProveedorIdParamSchema,
    body: eliminarCtConsumibleProveedorSchema,
  }),
  ctConsumibleProveedorController.eliminarConsumiblesProveedor
);

export default router;

// 🎉 API REST completa para ct_capitulo:
// GET    /api/ct_consumible_proveedor          - Listar con filtros/paginación
// GET    /api/ct_consumible_proveedor/:id      - Obtener por ID
// POST   /api/ct_consumible_proveedor          - Crear
// PUT    /api/ct_consumible_proveedor/:id      - Actualizar
// DELETE /api/ct_consumible_proveedor/:id      - Eliminar
