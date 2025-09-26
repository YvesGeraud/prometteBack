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
  paginationSchema,
  idParamSchema,
} from "./commonSchemas";

//TODO ===== SCHEMAS PARA CT_BITACORA_ACCION =====

//? Esquema para crear una nueva acción
export const crearCtBitacoraAccionSchema = z.object({
  accion: esquemaTextoRequerido(2, 50),
  descripcion: esquemaTextoOpcional(255),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una acción
export const actualizarCtBitacoraAccionSchema = z.object({
  accion: esquemaTextoRequerido(2, 50),
  descripcion: esquemaTextoOpcional(255),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_in: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de entidades
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const bitacoraAccionFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_bitacora_accion: esquemaQueryId,
  accion: esquemaQueryTexto,
  descripcion: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtBitacoraAccionInput = z.infer<
  typeof crearCtBitacoraAccionSchema
>;
export type ActualizarCtBitacoraAccionInput = z.infer<
  typeof actualizarCtBitacoraAccionSchema
>;

export type BuscarBitacoraAccionInput = z.infer<
  typeof bitacoraAccionFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de bitácora acción)
export const ctBitacoraAccionIdParamSchema = z.object({
  id_ct_bitacora_accion: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtBitacoraAccionSchema = esquemaDeleteConUsuario;

export type CtBitacoraAccionIdParam = z.infer<
  typeof ctBitacoraAccionIdParamSchema
>;

export type EliminarCtBitacoraAccionInput = z.infer<
  typeof eliminarCtBitacoraAccionSchema
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
