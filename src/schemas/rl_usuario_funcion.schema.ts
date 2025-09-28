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

//TODO ===== SCHEMAS PARA RL_USUARIO_FUNCION =====

//? Esquema para crear una nueva relación usuario función
export const crearRlUsuarioFuncionSchema = z.object({
  id_ct_usuario: esquemaNumeroOpcional(1, 100000),
  id_dt_funcion: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoRequerido,
  ct_usuario_in: esquemaUsuarioCreacion, // Campo específico para este modelo
});

//? Esquema para actualizar una relación usuario función
export const actualizarRlUsuarioFuncionSchema = z.object({
  id_ct_usuario: esquemaNumeroOpcional(1, 100000),
  id_dt_funcion: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  ct_usuario_at: esquemaUsuarioCreacion, // Campo específico para este modelo
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones usuario función
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlUsuarioFuncionFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_usuario_funcion: esquemaQueryId,
  id_ct_usuario: esquemaQueryNumeroOpcional,
  id_dt_funcion: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones usuario función
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlUsuarioFuncionInput = z.infer<
  typeof crearRlUsuarioFuncionSchema
>;
export type ActualizarRlUsuarioFuncionInput = z.infer<
  typeof actualizarRlUsuarioFuncionSchema
>;

export type BuscarRlUsuarioFuncionInput = z.infer<
  typeof rlUsuarioFuncionFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación usuario función)
export const rlUsuarioFuncionIdParamSchema = z.object({
  id_rl_usuario_funcion: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlUsuarioFuncionSchema = esquemaDeleteConUsuario;

export type RlUsuarioFuncionIdParam = z.infer<
  typeof rlUsuarioFuncionIdParamSchema
>;

export type EliminarRlUsuarioFuncionInput = z.infer<
  typeof eliminarRlUsuarioFuncionSchema
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
