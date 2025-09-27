import { Router } from "express";
import { CtDocumentoAnnecBaseController } from "../controllers/ct_documento_annec.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtDocumentoAnnecSchema,
  actualizarCtDocumentoAnnecSchema,
  ctDocumentoAnnecIdParamSchema,
  ctDocumentoAnnecFiltrosSchema,
  eliminarCtDocumentoAnnecSchema,
} from "../schemas/ct_documento_annec.schema";

//TODO ===== RUTAS PARA CT_BITACORA_ACCION CON BASE SERVICE =====

const router = Router();
const ctDocumentoAnnecController = new CtDocumentoAnnecBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctDocumentoAnnecFiltrosSchema }),
  ctDocumentoAnnecController.obtenerTodasLasDocumentosAnnec
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_documento_aneec",
  validarRequest({ params: ctDocumentoAnnecIdParamSchema }),
  ctDocumentoAnnecController.obtenerDocumentosAnnecPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtDocumentoAnnecSchema }),
  ctDocumentoAnnecController.crearDocumentosAnnec
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_documento_aneec",
  validarRequest({
    params: ctDocumentoAnnecIdParamSchema,
    body: actualizarCtDocumentoAnnecSchema,
  }),
  ctDocumentoAnnecController.actualizarDocumentosAnnec
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_documento_aneec",
  validarRequest({
    params: ctDocumentoAnnecIdParamSchema,
    body: eliminarCtDocumentoAnnecSchema,
  }),
  ctDocumentoAnnecController.eliminarDocumentosAnnec
);

export default router;

// 🎉 API REST completa para ct_documentos_annec:
// GET    /api/ct_documentos_annec          - Listar con filtros/paginación
// GET    /api/ct_documentos_annec/:id      - Obtener por ID
// POST   /api/ct_documentos_annec          - Crear
// PUT    /api/ct_documentos_annec/:id      - Actualizar
// DELETE /api/ct_documentos_annec/:id      - Eliminar
