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

//TODO ===== SCHEMAS PARA RL_AREA_FINANCIERO =====

//? Esquema para crear una nueva relación área financiero
export const crearRlAreaFinancieroSchema = z.object({
  id_financiero: esquemaNumeroRequerido(1, 100000),
  id_area_infra: esquemaNumeroRequerido(1, 100000),
  estado: esquemaEstadoOpcional, // Opcional en este modelo
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una relación área financiero
export const actualizarRlAreaFinancieroSchema = z.object({
  id_financiero: esquemaNumeroOpcional(1, 100000),
  id_area_infra: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones área financiero
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlAreaFinancieroFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_area_financiero: esquemaQueryId,
  id_financiero: esquemaQueryNumeroOpcional,
  id_area_infra: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones área financiero
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlAreaFinancieroInput = z.infer<
  typeof crearRlAreaFinancieroSchema
>;
export type ActualizarRlAreaFinancieroInput = z.infer<
  typeof actualizarRlAreaFinancieroSchema
>;

export type BuscarRlAreaFinancieroInput = z.infer<
  typeof rlAreaFinancieroFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación área financiero)
export const rlAreaFinancieroIdParamSchema = z.object({
  id_rl_area_financiero: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlAreaFinancieroSchema = esquemaDeleteConUsuario;

export type RlAreaFinancieroIdParam = z.infer<
  typeof rlAreaFinancieroIdParamSchema
>;

export type EliminarRlAreaFinancieroInput = z.infer<
  typeof eliminarRlAreaFinancieroSchema
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
