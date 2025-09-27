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

//TODO ===== SCHEMAS PARA CT_DISPOSITIVO =====

//? Esquema para crear una nueva dispositivo
export const crearCtDispositivoSchema = z.object({
  nombre_dispositivo: esquemaTextoRequerido(2, 100),
  descripcion: esquemaTextoRequerido(2, 255),
  /*estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,*/
});

//? Esquema para actualizar una dispositivo
export const actualizarCtDispositivoSchema = z.object({
  nombre_dispositivo: esquemaTextoOpcional(100),
  descripcion: esquemaTextoOpcional(255),
  /*estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización*/
  /*fecha_in: esquemaFechaOpcional,*/
});

//? Schema para filtros y paginación de dispositivos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctDispositivoFiltrosSchema = z.object({
  //? Filtros específicos
  id_dispositivo: esquemaQueryId,
  nombre_dispositivo: esquemaQueryTexto,
  descripcion: esquemaQueryTexto,
  /*estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,*/

  //? Filtros para incluir inactivos de dispositivos
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtDispositivoInput = z.infer<typeof crearCtDispositivoSchema>;
export type ActualizarCtDispositivoInput = z.infer<
  typeof actualizarCtDispositivoSchema
>;

export type BuscarCtDispositivoInput = z.infer<
  typeof ctDispositivoFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de dispositivo)
export const ctDispositivoIdParamSchema = z.object({
  id_dispositivo: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtDispositivoSchema = esquemaDeleteConUsuario;

export type CtDispositivoIdParam = z.infer<typeof ctDispositivoIdParamSchema>;

export type EliminarCtDispositivoInput = z.infer<
  typeof eliminarCtDispositivoSchema
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
