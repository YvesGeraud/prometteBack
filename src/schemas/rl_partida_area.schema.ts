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

//TODO ===== SCHEMAS PARA RL_PARTIDA_AREA =====

//? Esquema para crear una nueva relación partida área
export const crearRlPartidaAreaSchema = z.object({
  id_area_infra: esquemaNumeroRequerido(1, 100000),
  id_ct_partida: esquemaNumeroRequerido(1, 100000),
  estado: esquemaEstadoOpcional, // Opcional en este modelo
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una relación partida área
export const actualizarRlPartidaAreaSchema = z.object({
  id_area_infra: esquemaNumeroOpcional(1, 100000),
  id_ct_partida: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones partida área
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlPartidaAreaFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_partida_area: esquemaQueryId,
  id_area_infra: esquemaQueryNumeroOpcional,
  id_ct_partida: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones partida área
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlPartidaAreaInput = z.infer<typeof crearRlPartidaAreaSchema>;
export type ActualizarRlPartidaAreaInput = z.infer<
  typeof actualizarRlPartidaAreaSchema
>;

export type BuscarRlPartidaAreaInput = z.infer<
  typeof rlPartidaAreaFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación partida área)
export const rlPartidaAreaIdParamSchema = z.object({
  id_rl_partida_area: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlPartidaAreaSchema = esquemaDeleteConUsuario;

export type RlPartidaAreaIdParam = z.infer<typeof rlPartidaAreaIdParamSchema>;

export type EliminarRlPartidaAreaInput = z.infer<
  typeof eliminarRlPartidaAreaSchema
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
