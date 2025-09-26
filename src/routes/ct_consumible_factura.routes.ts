import { Router } from "express";
import { CtConsumibleFacturaBaseController } from "../controllers/ct_consumible_factura.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtConsumibleFacturaSchema,
  actualizarCtConsumibleFacturaSchema,
  ctConsumibleFacturaIdParamSchema,
  ctConsumibleFacturaFiltrosSchema,
} from "../schemas/ct_consumible_factura.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctConsumibleFacturaController = new CtConsumibleFacturaBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctConsumibleFacturaFiltrosSchema }),
  ctConsumibleFacturaController.obtenerTodasLasConsumiblesFacturas
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_factura",
  validarRequest({ params: ctConsumibleFacturaIdParamSchema }),
  ctConsumibleFacturaController.obtenerConsumibleFacturaPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtConsumibleFacturaSchema }),
  ctConsumibleFacturaController.crearConsumibleFactura
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_factura",
  validarRequest({
    params: ctConsumibleFacturaIdParamSchema,
    body: actualizarCtConsumibleFacturaSchema,
  }),
  ctConsumibleFacturaController.actualizarConsumibleFactura
);

// 📦 Eliminar entidad
router.delete(
  "/:id_factura",
  validarRequest({ params: ctConsumibleFacturaIdParamSchema }),
  ctConsumibleFacturaController.eliminarConsumibleFactura
);

export default router;

// 🎉 API REST completa para ct_capitulo:
// GET    /api/ct_consumible_factura          - Listar con filtros/paginación
// GET    /api/ct_consumible_factura/:id      - Obtener por ID
// POST   /api/ct_consumible_factura          - Crear
// PUT    /api/ct_consumible_factura/:id      - Actualizar
// DELETE /api/ct_consumible_factura/:id      - Eliminar
