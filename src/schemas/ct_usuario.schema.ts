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

//TODO ===== SCHEMAS PARA CT_USUARIO =====

//? Esquema para crear una nueva capitulo
export const crearCtUsuarioSchema = z.object({
  nombre_usuario: esquemaTextoRequerido(2, 50),
  contrasena: esquemaTextoRequerido(2, 50),
  id_dt_rupeet_informacion: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una usuario
export const actualizarCtUsuarioSchema = z.object({
  nombre_usuario: esquemaTextoOpcional(50),
  contrasena: esquemaTextoOpcional(50),
  id_dt_rupeet_informacion: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de capitulos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctUsuarioFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_usuario: esquemaQueryId,
  nombre_usuario: esquemaQueryTexto,
  contrasena: esquemaQueryTexto,
  id_dt_rupeet_informacion: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de capitulos
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtUsuarioInput = z.infer<typeof crearCtUsuarioSchema>;
export type ActualizarCtUsuarioInput = z.infer<
  typeof actualizarCtUsuarioSchema
>;

export type BuscarCtUsuarioInput = z.infer<typeof ctUsuarioFiltrosSchema>;

//? Esquema para parámetros de URL (ID de capitulo)
export const ctUsuarioIdParamSchema = z.object({
  id_ct_usuario: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtUsuarioSchema = esquemaDeleteConUsuario;

export type CtUsuarioIdParam = z.infer<typeof ctUsuarioIdParamSchema>;

export type EliminarCtUsuarioInput = z.infer<typeof eliminarCtUsuarioSchema>;

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
