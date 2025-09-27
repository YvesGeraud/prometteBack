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

//TODO ===== SCHEMAS PARA CT_CORRESPONDENCIA_ESTADO =====

//? Esquema para crear una nueva correspondencia estado
export const crearCtCorrespondenciaEstadoSchema = z.object({
  nombre: esquemaTextoRequerido(2, 50),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una correspondencia estado
export const actualizarCtCorrespondenciaEstadoSchema = z.object({
  nombre: esquemaTextoOpcional(50),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_in: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de correspondencia estados
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctCorrespondenciaEstadoFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_correspondencia_estado: esquemaQueryId,
  nombre: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de correspondencia estados
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtCorrespondenciaEstadoInput = z.infer<
  typeof crearCtCorrespondenciaEstadoSchema
>;
export type ActualizarCtCorrespondenciaEstadoInput = z.infer<
  typeof actualizarCtCorrespondenciaEstadoSchema
>;

export type BuscarCtCorrespondenciaEstadoInput = z.infer<
  typeof ctCorrespondenciaEstadoFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de correspondencia estado)
export const ctCorrespondenciaEstadoIdParamSchema = z.object({
  id_ct_correspondencia_estado: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtCorrespondenciaEstadoSchema = esquemaDeleteConUsuario;

export type CtCorrespondenciaEstadoIdParam = z.infer<
  typeof ctCorrespondenciaEstadoIdParamSchema
>;

export type EliminarCtCorrespondenciaEstadoInput = z.infer<
  typeof eliminarCtCorrespondenciaEstadoSchema
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
