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

//TODO ===== SCHEMAS PARA RL_PUESTO_FUNCION =====

//? Esquema para crear una nueva relación puesto función
export const crearRlPuestoFuncionSchema = z.object({
  id_ct_puesto: esquemaNumeroOpcional(1, 100000),
  id_dt_funcion: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una relación puesto función
export const actualizarRlPuestoFuncionSchema = z.object({
  id_ct_puesto: esquemaNumeroOpcional(1, 100000),
  id_dt_funcion: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones puesto función
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlPuestoFuncionFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_puesto_funcion: esquemaQueryId,
  id_ct_puesto: esquemaQueryNumeroOpcional,
  id_dt_funcion: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones puesto función
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlPuestoFuncionInput = z.infer<
  typeof crearRlPuestoFuncionSchema
>;
export type ActualizarRlPuestoFuncionInput = z.infer<
  typeof actualizarRlPuestoFuncionSchema
>;

export type BuscarRlPuestoFuncionInput = z.infer<
  typeof rlPuestoFuncionFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación puesto función)
export const rlPuestoFuncionIdParamSchema = z.object({
  id_rl_puesto_funcion: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlPuestoFuncionSchema = esquemaDeleteConUsuario;

export type RlPuestoFuncionIdParam = z.infer<
  typeof rlPuestoFuncionIdParamSchema
>;

export type EliminarRlPuestoFuncionInput = z.infer<
  typeof eliminarRlPuestoFuncionSchema
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
