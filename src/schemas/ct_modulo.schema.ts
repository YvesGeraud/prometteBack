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

//TODO ===== SCHEMAS PARA CT_MODULO =====

//? Esquema para crear una nueva modulo
export const crearCtModuloSchema = z.object({
  nombre_modulo: esquemaTextoRequerido(2, 100),
  estado: esquemaEstadoRequerido,
  //id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una modulo
export const actualizarCtModuloSchema = z.object({
  nombre_modulo: esquemaTextoOpcional(100),
  estado: esquemaEstadoOpcional,
  /*id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_in: esquemaFechaOpcional,*/
});

//? Schema para filtros y paginación de modulos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctModuloFiltrosSchema = z.object({
  //? Filtros específicos
  id_modulo: esquemaQueryId,
  nombre_modulo: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  /*id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,*/

  //? Filtros para incluir inactivos de modulos
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtModuloInput = z.infer<typeof crearCtModuloSchema>;
export type ActualizarCtModuloInput = z.infer<typeof actualizarCtModuloSchema>;

export type BuscarCtModuloInput = z.infer<typeof ctModuloFiltrosSchema>;

//? Esquema para parámetros de URL (ID de modulo)
export const ctModuloIdParamSchema = z.object({
  id_modulo: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtModuloSchema = esquemaDeleteConUsuario;

export type CtModuloIdParam = z.infer<typeof ctModuloIdParamSchema>;

export type EliminarCtModuloInput = z.infer<typeof eliminarCtModuloSchema>;

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
