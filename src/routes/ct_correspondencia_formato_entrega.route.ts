import { Router } from "express";
import { CtCorrespondenciaFormatoEntregaBaseController } from "../controllers/ct_correspondencia_formato_entrega.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearCtCorrespondenciaFormatoEntregaSchema,
  actualizarCtCorrespondenciaFormatoEntregaSchema,
  ctCorrespondenciaFormatoEntregaIdParamSchema,
  ctCorrespondenciaFormatoEntregaFiltrosSchema,
  eliminarCtCorrespondenciaFormatoEntregaSchema,
} from "../schemas/ct_correspondencia_formato_entrega.schema";

//TODO ===== RUTAS PARA CT_CORRESPONDENCIA_FORMATO_ENTREGA CON BASE SERVICE =====

const router = Router();
const ctCorrespondenciaFormatoEntregaController =
  new CtCorrespondenciaFormatoEntregaBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: ctCorrespondenciaFormatoEntregaFiltrosSchema }),
  ctCorrespondenciaFormatoEntregaController.obtenerTodasLasCorrespondenciaFormatosEntrega
);

// 📦 Obtener bitacora acción específica por ID
router.get(
  "/:id_ct_correspondencia_formato_entrega",
  validarRequest({ params: ctCorrespondenciaFormatoEntregaIdParamSchema }),
  ctCorrespondenciaFormatoEntregaController.obtenerCorrespondenciaFormatoEntregaPorId
);

// 📦 Crear nueva bitacora acción
router.post(
  "/",
  validarRequest({ body: crearCtCorrespondenciaFormatoEntregaSchema }),
  ctCorrespondenciaFormatoEntregaController.crearCorrespondenciaFormatoEntrega
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_ct_correspondencia_formato_entrega",
  validarRequest({
    params: ctCorrespondenciaFormatoEntregaIdParamSchema,
    body: actualizarCtCorrespondenciaFormatoEntregaSchema,
  }),
  ctCorrespondenciaFormatoEntregaController.actualizarCorrespondenciaFormatoEntrega
);

// 📦 Eliminar entidad
router.delete(
  "/:id_ct_correspondencia_formato_entrega",
  validarRequest({
    params: ctCorrespondenciaFormatoEntregaIdParamSchema,
    body: eliminarCtCorrespondenciaFormatoEntregaSchema,
  }),
  ctCorrespondenciaFormatoEntregaController.eliminarCorrespondenciaFormatoEntrega
);

export default router;

// 🎉 API REST completa para ct_correspondencia_formato_entrega:
// GET    /api/ct_correspondencia_formato_entrega          - Listar con filtros/paginación
// GET    /api/ct_correspondencia_formato_entrega/:id      - Obtener por ID
// POST   /api/ct_correspondencia_formato_entrega          - Crear
// PUT    /api/ct_correspondencia_formato_entrega/:id      - Actualizar
// DELETE /api/ct_correspondencia_formato_entrega/:id      - Eliminar
