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

//TODO ===== SCHEMAS PARA CT_CORRESPONDENCIA_PRIORIDAD =====

//? Esquema para crear una nueva capitulo
export const crearCtCorrespondenciaPrioridadSchema = z.object({
  nombre: esquemaTextoRequerido(2, 50),
  activo: esquemaEstadoRequerido,
  //id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una capitulo
export const actualizarCtCorrespondenciaPrioridadSchema = z.object({
  nombre: esquemaTextoOpcional(50),
  activo: esquemaEstadoOpcional,
  /*id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_in: esquemaFechaOpcional,*/
});

//? Schema para filtros y paginación de capitulos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctCorrespondenciaPrioridadFiltrosSchema = z.object({
  //? Filtros específicos
  id_prioridad: esquemaQueryId,
  nombre: esquemaQueryTexto,
  activo: esquemaQueryBoolean,
  /*id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,*/

  //? Filtros para incluir inactivos de capitulos
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtCorrespondenciaPrioridadInput = z.infer<
  typeof crearCtCorrespondenciaPrioridadSchema
>;
export type ActualizarCtCorrespondenciaPrioridadInput = z.infer<
  typeof actualizarCtCorrespondenciaPrioridadSchema
>;

export type BuscarCtCorrespondenciaPrioridadInput = z.infer<
  typeof ctCorrespondenciaPrioridadFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de capitulo)
export const ctCorrespondenciaPrioridadIdParamSchema = z.object({
  id_prioridad: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtCorrespondenciaPrioridadSchema = esquemaDeleteConUsuario;

export type CtCorrespondenciaPrioridadIdParam = z.infer<
  typeof ctCorrespondenciaPrioridadIdParamSchema
>;

export type EliminarCtCorrespondenciaPrioridadInput = z.infer<
  typeof eliminarCtCorrespondenciaPrioridadSchema
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
