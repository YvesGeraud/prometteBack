import { Router } from "express";
import { DtConsumibleInventarioBaseController } from "../controllers/dt_consumible_inventario.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtConsumibleInventarioSchema,
  actualizarDtConsumibleInventarioSchema,
  dtConsumibleInventarioIdParamSchema,
  dtConsumibleInventarioFiltrosSchema,
  eliminarDtConsumibleInventarioSchema,
} from "../schemas/dt_consumible_inventario.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const dtConsumibleInventarioController =
  new DtConsumibleInventarioBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtConsumibleInventarioFiltrosSchema }),
  dtConsumibleInventarioController.obtenerTodasLasConsumibleInventario
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_dt_consumible_inventario",
  validarRequest({ params: dtConsumibleInventarioIdParamSchema }),
  dtConsumibleInventarioController.obtenerConsumibleInventarioPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearDtConsumibleInventarioSchema }),
  dtConsumibleInventarioController.crearConsumibleInventario
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_dt_consumible_inventario",
  validarRequest({
    params: dtConsumibleInventarioIdParamSchema,
    body: actualizarDtConsumibleInventarioSchema,
  }),
  dtConsumibleInventarioController.actualizarConsumibleInventario
);

// 📦 Eliminar entidad
router.delete(
  "/:id_dt_consumible_inventario",
  validarRequest({
    params: dtConsumibleInventarioIdParamSchema,
    body: eliminarDtConsumibleInventarioSchema,
  }),
  dtConsumibleInventarioController.eliminarConsumibleInventario
);

export default router;

// 🎉 API REST completa para dt_consumible_inventario:
// GET    /api/dt_consumible_inventario          - Listar con filtros/paginación
// GET    /api/dt_consumible_inventario/:id      - Obtener por ID
// POST   /api/dt_consumible_inventario          - Crear
// PUT    /api/dt_consumible_inventario/:id      - Actualizar
// DELETE /api/dt_consumible_inventario/:id      - Eliminar
