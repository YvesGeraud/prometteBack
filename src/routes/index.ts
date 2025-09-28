import { Router } from "express";

import authRoutes from "./authRoutes";
import reportesRoutes from "./reportes.routes";

//?catalogos importados
import ctBitacoraAccionRoutes from "./ct_bitacora_accion.route";
import ctBitacoraEntidadRoutes from "./ct_bitacora_entidad.route";
import ctCapituloRoutes from "./ct_capitulo.route";
import ctConsumibleProveedorRoutes from "./ct_consumible_proveedor.route";
import ctConsumibleFacturaRoutes from "./ct_consumible_factura.route";
import ctCorrespondenciaEstadoRoutes from "./ct_correspondencia_estado.route";
import ctCorrespondenciaFormatoEntregaRoutes from "./ct_correspondencia_formato_entrega.route";
import ctCorrespondenciaPrioridadRoutes from "./ct_correspondencia_prioridad.route";
import ctDispositivoRoutes from "./ct_dispositivo.route";
import ctDocumentoAnnecRoutes from "./ct_documento_annec.route";
import ctFinanciamientoRoutes from "./ct_financiamiento.route";
import ctModuloRoutes from "./ct_modulo.route";
import ctPartidaRoutes from "./ct_partida.route";
import ctProductoConsumibleRoutes from "./ct_producto_consumible.route";
import ctPuestoRoutes from "./ct_puesto.route";
import ctUnidadMedidaRoutes from "./ct_unidad_medida.route";
import ctUsuarioRoutes from "./ct_usuario.routes";

/*import entidadRoutes from "./entidad.route";
import municipioRoutes from "./municipio.route";
import localidadRoutes from "./localidad.route";*/

//?Descripciones importados
import dtAspiranteAneecRoutes from "./dt_aspirante_aneec.route";
import dtBitacoraMovimientoRoutes from "./dt_bitacora_movimiento.route";
import dtConsumibleEntregaRoutes from "./dt_consumible_entrega.route";
import dtConsumibleInventarioRoutes from "./dt_consumible_inventario.route";
import dtCorrespondenciaRoutes from "./dt_correspondencia.route";
import dtDiagnosticoAneecRoutes from "./dt_diagnostico_aneec.route";
import dtFuncionRoutes from "./dt_funcion.routes";

const router = Router();

// Montar las rutas con sus prefijos
//router.use("/auth", authRoutes);
//router.use("/reportes", reportesRoutes);

//?catalogos
router.use("/ct_bitacora_accion", ctBitacoraAccionRoutes);
router.use("/ct_bitacora_entidad", ctBitacoraEntidadRoutes);
router.use("/ct_capitulo", ctCapituloRoutes);
router.use("/ct_consumible_proveedor", ctConsumibleProveedorRoutes);
router.use("/ct_consumible_factura", ctConsumibleFacturaRoutes);
router.use("/ct_correspondencia_estado", ctCorrespondenciaEstadoRoutes);
router.use(
  "/ct_correspondencia_formato_entrega",
  ctCorrespondenciaFormatoEntregaRoutes
);
router.use("/ct_correspondencia_prioridad", ctCorrespondenciaPrioridadRoutes);
router.use("/ct_dispositivo", ctDispositivoRoutes);
router.use("/ct_documento_annec", ctDocumentoAnnecRoutes);
router.use("/ct_financiamiento", ctFinanciamientoRoutes);
router.use("/ct_modulo", ctModuloRoutes);
router.use("/ct_partida", ctPartidaRoutes);
router.use("/ct_producto_consumible", ctProductoConsumibleRoutes);
router.use("/ct_puesto", ctPuestoRoutes);
router.use("/ct_unidad_medida", ctUnidadMedidaRoutes);
router.use("/ct_usuario", ctUsuarioRoutes);
router.use("/dt_consumible_entrega", dtConsumibleEntregaRoutes);
router.use("/dt_funcion", dtFuncionRoutes);

/*router.use("/entidad", entidadRoutes);
router.use("/municipio", municipioRoutes);
router.use("/localidad", localidadRoutes);*/

//?Descripciones
router.use("/dt_aspirante_aneec", dtAspiranteAneecRoutes);
router.use("/dt_bitacora_movimiento", dtBitacoraMovimientoRoutes);
router.use("/dt_consumible_entrega", dtConsumibleEntregaRoutes);
router.use("/dt_consumible_inventario", dtConsumibleInventarioRoutes);
router.use("/dt_correspondencia", dtCorrespondenciaRoutes);
router.use("/dt_diagnostico_aneec", dtDiagnosticoAneecRoutes);

// Ruta de salud para las APIs
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

export default router;
