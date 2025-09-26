import { Router } from "express";
import { CtConsumiblesProveedorBaseController } from "../controllers/ct_consumible_proveedor.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtConsumiblesProveedorSchema,
  actualizarCtConsumiblesProveedorSchema,
  ctConsumiblesProveedorIdParamSchema,
  ctConsumiblesProveedorFiltrosSchema,
} from "../schemas/ct_consumibles_proveedor.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctConsumiblesProveedorController =
  new CtConsumiblesProveedorBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctConsumiblesProveedorFiltrosSchema }),
  ctConsumiblesProveedorController.obtenerTodasLasConsumiblesProveedores
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_proveedor",
  validarRequest({ params: ctConsumiblesProveedorIdParamSchema }),
  ctConsumiblesProveedorController.obtenerConsumiblesProveedorPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtConsumiblesProveedorSchema }),
  ctConsumiblesProveedorController.crearConsumiblesProveedor
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_proveedor",
  validarRequest({
    params: ctConsumiblesProveedorIdParamSchema,
    body: actualizarCtConsumiblesProveedorSchema,
  }),
  ctConsumiblesProveedorController.actualizarConsumiblesProveedor
);

// 📦 Eliminar entidad
router.delete(
  "/:id_proveedor",
  validarRequest({ params: ctConsumiblesProveedorIdParamSchema }),
  ctConsumiblesProveedorController.eliminarConsumiblesProveedor
);

export default router;

// 🎉 API REST completa para ct_capitulo:
// GET    /api/ct_capitulo          - Listar con filtros/paginación
// GET    /api/ct_capitulo/:id      - Obtener por ID
// POST   /api/ct_capitulo          - Crear
// PUT    /api/ct_capitulo/:id      - Actualizar
// DELETE /api/ct_capitulo/:id      - Eliminar
