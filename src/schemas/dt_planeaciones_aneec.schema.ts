import { z } from "zod";
import {
  esquemaTextoRequerido,
  esquemaTextoOpcional,
  esquemaEstadoRequerido,
  esquemaEstadoOpcional,
  esquemaUsuarioCreacion,
  esquemaUsuarioActualizacion,
  esquemaFechaOpcional,
  esquemaQueryId,
  esquemaQueryTexto,
  esquemaQueryBoolean,
  esquemaPaginaQuery,
  esquemaLimiteQuery,
  esquemaParamId,
  esquemaDeleteConUsuario,
  esquemaNumeroRequerido,
  esquemaQueryNumeroRequerido,
  paginationSchema,
  idParamSchema,
  esquemaQueryNumeroOpcional,
  esquemaNumeroOpcional,
} from "./commonSchemas";

//TODO ===== SCHEMAS PARA DT_PLANEACIONES_ANEEC =====

//? Esquema para crear una nueva planeación aneec
export const crearDtPlaneacionesAneecSchema = z.object({
  ruta_documento: esquemaTextoRequerido(1, 50),
  id_ct_documento_aneec: esquemaNumeroRequerido(1, 100000),
  id_dt_aspirante_aneec: esquemaNumeroRequerido(1, 100000),
  id_dt_diagnostico_aneec: esquemaNumeroRequerido(1, 100000),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una planeación aneec
export const actualizarDtPlaneacionesAneecSchema = z.object({
  ruta_documento: esquemaTextoOpcional(50),
  id_ct_documento_aneec: esquemaNumeroOpcional(1, 100000),
  id_dt_aspirante_aneec: esquemaNumeroOpcional(1, 100000),
  id_dt_diagnostico_aneec: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de planeaciones aneec
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtPlaneacionesAneecFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_planeaciones_aneec: esquemaQueryId,
  ruta_documento: esquemaQueryTexto,
  id_ct_documento_aneec: esquemaQueryNumeroOpcional,
  id_dt_aspirante_aneec: esquemaQueryNumeroOpcional,
  id_dt_diagnostico_aneec: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de planeaciones aneec
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtPlaneacionesAneecInput = z.infer<
  typeof crearDtPlaneacionesAneecSchema
>;
export type ActualizarDtPlaneacionesAneecInput = z.infer<
  typeof actualizarDtPlaneacionesAneecSchema
>;

export type BuscarDtPlaneacionesAneecInput = z.infer<
  typeof dtPlaneacionesAneecFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de planeación aneec)
export const dtPlaneacionesAneecIdParamSchema = z.object({
  id_dt_planeaciones_aneec: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtPlaneacionesAneecSchema = esquemaDeleteConUsuario;

export type DtPlaneacionesAneecIdParam = z.infer<
  typeof dtPlaneacionesAneecIdParamSchema
>;

export type EliminarDtPlaneacionesAneecInput = z.infer<
  typeof eliminarDtPlaneacionesAneecSchema
>;

/*
🎉 SCHEMA REFACTORIZADO CON ESQUEMAS BASE REUTILIZABLES

✅ Beneficios:
- ✨ Código más limpio y mantenible
- 🔄 Reutilización de validaciones comunes
- 📝 Consistencia en mensajes de error
- 🚀 Fácil actualización de validaciones globales
- 🛡️ Menos duplicación de código

🔧 Esquemas utilizados:
- esquemaTextoRequerido/Opcional - Para campos de texto
- esquemaEstadoRequerido/Opcional - Para campos booleanos de estado
- esquemaUsuarioCreacion/Actualización - Para auditoría de usuarios
- esquemaQueryId/Texto/Boolean - Para filtros en query parameters
- esquemaPaginaQuery/LimiteQuery - Para paginación
- esquemaParamId - Para parámetros de URL
- esquemaDeleteConUsuario - Para eliminación con auditoría
*/
