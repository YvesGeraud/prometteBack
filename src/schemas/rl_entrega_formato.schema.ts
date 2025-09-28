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

//TODO ===== SCHEMAS PARA RL_ENTREGA_FORMATO =====

//? Esquema para crear una nueva relación entrega formato
export const crearRlEntregaFormatoSchema = z.object({
  folio_formato: esquemaTextoRequerido(1, 20),
  mes_cantidad: esquemaTextoOpcional(100),
  persona_recibe: esquemaTextoOpcional(255),
  estado: esquemaEstadoOpcional, // Opcional en este modelo
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una relación entrega formato
export const actualizarRlEntregaFormatoSchema = z.object({
  folio_formato: esquemaTextoOpcional(20),
  mes_cantidad: esquemaTextoOpcional(100),
  persona_recibe: esquemaTextoOpcional(255),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones entrega formato
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlEntregaFormatoFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_entrega_formato: esquemaQueryId,
  folio_formato: esquemaQueryTexto,
  mes_cantidad: esquemaQueryTexto,
  persona_recibe: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones entrega formato
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlEntregaFormatoInput = z.infer<
  typeof crearRlEntregaFormatoSchema
>;
export type ActualizarRlEntregaFormatoInput = z.infer<
  typeof actualizarRlEntregaFormatoSchema
>;

export type BuscarRlEntregaFormatoInput = z.infer<
  typeof rlEntregaFormatoFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación entrega formato)
export const rlEntregaFormatoIdParamSchema = z.object({
  id_rl_entrega_formato: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlEntregaFormatoSchema = esquemaDeleteConUsuario;

export type RlEntregaFormatoIdParam = z.infer<
  typeof rlEntregaFormatoIdParamSchema
>;

export type EliminarRlEntregaFormatoInput = z.infer<
  typeof eliminarRlEntregaFormatoSchema
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
