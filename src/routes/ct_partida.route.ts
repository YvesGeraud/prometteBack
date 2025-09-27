import { Router } from "express";
import { CtPartidaBaseController } from "../controllers/ct_partida.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtPartidaSchema,
  actualizarCtPartidaSchema,
  ctPartidaIdParamSchema,
  ctPartidaFiltrosSchema,
  eliminarCtPartidaSchema,
} from "../schemas/ct_partida.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctPartidaController = new CtPartidaBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctPartidaFiltrosSchema }),
  ctPartidaController.obtenerTodasLasPartidas
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_partida",
  validarRequest({ params: ctPartidaIdParamSchema }),
  ctPartidaController.obtenerPartidaPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtPartidaSchema }),
  ctPartidaController.crearPartida
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_partida",
  validarRequest({
    params: ctPartidaIdParamSchema,
    body: actualizarCtPartidaSchema,
  }),
  ctPartidaController.actualizarPartida
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_partida",
  validarRequest({
    params: ctPartidaIdParamSchema,
    body: eliminarCtPartidaSchema,
  }),
  ctPartidaController.eliminarPartida
);

export default router;

// 🎉 API REST completa para ct_partida:
// GET    /api/ct_partida          - Listar con filtros/paginación
// GET    /api/ct_partida/:id      - Obtener por ID
// POST   /api/ct_partida          - Crear
// PUT    /api/ct_partida/:id      - Actualizar
// DELETE /api/ct_partida/:id      - Eliminar
