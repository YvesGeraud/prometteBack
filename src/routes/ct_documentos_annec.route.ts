import { Router } from "express";
import { CtDocumentosAnnecBaseController } from "../controllers/ct_documentos_annec.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtDocumentosAnnecSchema,
  actualizarCtDocumentosAnnecSchema,
  ctDocumentosAnnecIdParamSchema,
  ctDocumentosAnnecFiltrosSchema,
  eliminarCtDocumentosAnnecSchema,
} from "../schemas/ct_documentos_annec.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctDocumentosAnnecController = new CtDocumentosAnnecBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctDocumentosAnnecFiltrosSchema }),
  ctDocumentosAnnecController.obtenerTodasLasDocumentosAnnec
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_tipo_documento",
  validarRequest({ params: ctDocumentosAnnecIdParamSchema }),
  ctDocumentosAnnecController.obtenerDocumentosAnnecPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtDocumentosAnnecSchema }),
  ctDocumentosAnnecController.crearDocumentosAnnec
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_tipo_documento",
  validarRequest({
    params: ctDocumentosAnnecIdParamSchema,
    body: actualizarCtDocumentosAnnecSchema,
  }),
  ctDocumentosAnnecController.actualizarDocumentosAnnec
);

// 📦 Eliminar entidad
router.delete(
  "/:id_tipo_documento",
  validarRequest({
    params: ctDocumentosAnnecIdParamSchema,
    //body: eliminarCtDocumentosAnnecSchema,
  }),
  ctDocumentosAnnecController.eliminarDocumentosAnnec
);

export default router;

// 🎉 API REST completa para ct_documentos_annec:
// GET    /api/ct_documentos_annec          - Listar con filtros/paginación
// GET    /api/ct_documentos_annec/:id      - Obtener por ID
// POST   /api/ct_documentos_annec          - Crear
// PUT    /api/ct_documentos_annec/:id      - Actualizar
// DELETE /api/ct_documentos_annec/:id      - Eliminar
