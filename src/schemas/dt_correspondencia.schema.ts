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
  esquemaFechaRequerida,
} from "./commonSchemas";

//TODO ===== SCHEMAS PARA DT_CORRESPONDENCIA =====

//? Esquema para crear una nueva correspondencia
export const crearDtCorrespondenciaSchema = z.object({
  asunto: esquemaTextoRequerido(255),
  descripcion: esquemaTextoOpcional(255),
  remitente: esquemaTextoRequerido(255),
  destinatario: esquemaTextoRequerido(255),
  id_ct_correspondencia_prioridad: esquemaNumeroRequerido(1, 100000),
  id_tipo: esquemaNumeroRequerido(1, 100000),
  id_rl_entrega_formato: esquemaNumeroRequerido(1, 100000),
  folio: esquemaTextoOpcional(100),
  fecha_documento: esquemaFechaRequerida,
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una correspondencia
export const actualizarDtCorrespondenciaSchema = z.object({
  asunto: esquemaTextoOpcional(255),
  descripcion: esquemaTextoOpcional(255),
  remitente: esquemaTextoOpcional(255),
  destinatario: esquemaTextoOpcional(255),
  id_ct_correspondencia_prioridad: esquemaNumeroOpcional(1, 100000),
  id_tipo: esquemaNumeroOpcional(1, 100000),
  id_rl_entrega_formato: esquemaNumeroOpcional(1, 100000),
  folio: esquemaTextoOpcional(100),
  fecha_documento: esquemaFechaOpcional,
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de correspondencias
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtCorrespondenciaFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_correspondencia: esquemaQueryId,
  asunto: esquemaQueryTexto,
  descripcion: esquemaQueryTexto,
  remitente: esquemaQueryTexto,
  destinatario: esquemaQueryTexto,
  id_ct_correspondencia_prioridad: esquemaQueryNumeroOpcional,
  id_tipo: esquemaQueryNumeroOpcional,
  id_rl_entrega_formato: esquemaQueryNumeroOpcional,
  folio: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de correspondencias
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtCorrespondenciaInput = z.infer<
  typeof crearDtCorrespondenciaSchema
>;
export type ActualizarDtCorrespondenciaInput = z.infer<
  typeof actualizarDtCorrespondenciaSchema
>;

export type BuscarDtCorrespondenciaInput = z.infer<
  typeof dtCorrespondenciaFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de correspondencia)
export const dtCorrespondenciaIdParamSchema = z.object({
  id_dt_correspondencia: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtCorrespondenciaSchema = esquemaDeleteConUsuario;

export type DtCorrespondenciaIdParam = z.infer<
  typeof dtCorrespondenciaIdParamSchema
>;

export type EliminarDtCorrespondenciaInput = z.infer<
  typeof eliminarDtCorrespondenciaSchema
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
