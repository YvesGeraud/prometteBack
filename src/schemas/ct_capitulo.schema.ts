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

//TODO ===== SCHEMAS PARA CT_CAPITULO =====

//? Esquema para crear una nueva capitulo
export const crearCtCapituloSchema = z.object({
  clave_capitulo: esquemaNumeroRequerido(1, 100000),
  nombre_capitulo: esquemaTextoRequerido(2, 50),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una capitulo
export const actualizarCtCapituloSchema = z.object({
  clave_capitulo: esquemaNumeroOpcional(1, 100000),
  nombre_capitulo: esquemaTextoOpcional(50),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_in: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de capitulos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctCapituloFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_capitulo: esquemaQueryId,
  clave_capitulo: esquemaQueryNumeroOpcional,
  nombre_capitulo: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de capitulos
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtCapituloInput = z.infer<typeof crearCtCapituloSchema>;
export type ActualizarCtCapituloInput = z.infer<
  typeof actualizarCtCapituloSchema
>;

export type BuscarCtCapituloInput = z.infer<typeof ctCapituloFiltrosSchema>;

//? Esquema para parámetros de URL (ID de capitulo)
export const ctCapituloIdParamSchema = z.object({
  id_ct_capitulo: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtCapituloSchema = esquemaDeleteConUsuario;

export type CtCapituloIdParam = z.infer<typeof ctCapituloIdParamSchema>;

export type EliminarCtCapituloInput = z.infer<typeof eliminarCtCapituloSchema>;

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
