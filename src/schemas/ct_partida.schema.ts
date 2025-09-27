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

//TODO ===== SCHEMAS PARA CT_PARTIDA =====

//? Esquema para crear una nueva partida
export const crearCtPartidaSchema = z.object({
  id_ct_capitulo: esquemaNumeroRequerido(1, 100000),
  clave_partida: esquemaTextoRequerido(2, 10),
  nombre_partida: esquemaTextoRequerido(2, 255),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una partida
export const actualizarCtPartidaSchema = z.object({
  id_ct_capitulo: esquemaNumeroOpcional(1, 100000),
  clave_partida: esquemaTextoOpcional(10),
  nombre_partida: esquemaTextoOpcional(255),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion,
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de partidas
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctPartidaFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_partida: esquemaQueryId,
  id_ct_capitulo: esquemaQueryNumeroOpcional,
  clave_partida: esquemaQueryNumeroOpcional,
  nombre_partida: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de partidas
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtPartidaInput = z.infer<typeof crearCtPartidaSchema>;
export type ActualizarCtPartidaInput = z.infer<
  typeof actualizarCtPartidaSchema
>;

export type BuscarCtPartidaInput = z.infer<typeof ctPartidaFiltrosSchema>;

//? Esquema para parámetros de URL (ID de capitulo)
export const ctPartidaIdParamSchema = z.object({
  id_ct_partida: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtPartidaSchema = esquemaDeleteConUsuario;

export type CtPartidaIdParam = z.infer<typeof ctPartidaIdParamSchema>;

export type EliminarCtPartidaInput = z.infer<typeof eliminarCtPartidaSchema>;

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
