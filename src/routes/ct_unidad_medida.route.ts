import { Router } from "express";
import { CtUnidadMedidaBaseController } from "../controllers/ct_unidad_medida.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtUnidadMedidaSchema,
  actualizarCtUnidadMedidaSchema,
  ctUnidadMedidaIdParamSchema,
  ctUnidadMedidaFiltrosSchema,
  eliminarCtUnidadMedidaSchema,
} from "../schemas/ct_unidad_medida.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctUnidadMedidaController = new CtUnidadMedidaBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctUnidadMedidaFiltrosSchema }),
  ctUnidadMedidaController.obtenerTodasLasUnidadesMedidas
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_unidad_medida",
  validarRequest({ params: ctUnidadMedidaIdParamSchema }),
  ctUnidadMedidaController.obtenerUnidadMedidaPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtUnidadMedidaSchema }),
  ctUnidadMedidaController.crearUnidadMedida
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_unidad_medida",
  validarRequest({
    params: ctUnidadMedidaIdParamSchema,
    body: actualizarCtUnidadMedidaSchema,
  }),
  ctUnidadMedidaController.actualizarUnidadMedida
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_unidad_medida",
  validarRequest({
    params: ctUnidadMedidaIdParamSchema,
    body: eliminarCtUnidadMedidaSchema,
  }),
  ctUnidadMedidaController.eliminarUnidadMedida
);

export default router;

// 🎉 API REST completa para ct_unidad_medida:
// GET    /api/ct_unidad_medida          - Listar con filtros/paginación
// GET    /api/ct_unidad_medida/:id      - Obtener por ID
// POST   /api/ct_unidad_medida          - Crear
// PUT    /api/ct_unidad_medida/:id      - Actualizar
// DELETE /api/ct_unidad_medida/:id      - Eliminar
