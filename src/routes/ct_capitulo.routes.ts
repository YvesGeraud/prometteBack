import { Router } from "express";
import { CtCapituloBaseController } from "../controllers/ct_capitulo.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtCapituloSchema,
  actualizarCtCapituloSchema,
  ctCapituloIdParamSchema,
  ctCapituloFiltrosSchema,
} from "../schemas/ct_capitulo.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctCapituloController = new CtCapituloBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctCapituloFiltrosSchema }),
  ctCapituloController.obtenerTodasLasCapitulos
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_capitulo",
  validarRequest({ params: ctCapituloIdParamSchema }),
  ctCapituloController.obtenerCapituloPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtCapituloSchema }),
  ctCapituloController.crearCapitulo
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_capitulo",
  validarRequest({
    params: ctCapituloIdParamSchema,
    body: actualizarCtCapituloSchema,
  }),
  ctCapituloController.actualizarCapitulo
);

// 📦 Eliminar entidad
router.delete(
  "/:id_capitulo",
  validarRequest({ params: ctCapituloIdParamSchema }),
  ctCapituloController.eliminarCapitulo
);

export default router;

// 🎉 API REST completa para ct_capitulo:
// GET    /api/ct_capitulo          - Listar con filtros/paginación
// GET    /api/ct_capitulo/:id      - Obtener por ID
// POST   /api/ct_capitulo          - Crear
// PUT    /api/ct_capitulo/:id      - Actualizar
// DELETE /api/ct_capitulo/:id      - Eliminar
