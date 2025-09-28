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

//TODO ===== SCHEMAS PARA DT_TECHO_PRESUPUESTO =====

//? Esquema para crear un nuevo techo presupuestal
export const crearDtTechoPresupuestoSchema = z.object({
  id_rl_area_financiero: esquemaNumeroRequerido(1, 100000),
  id_ct_capitulo: esquemaNumeroRequerido(1, 100000),
  id_ct_financiamiento: esquemaNumeroRequerido(1, 100000),
  cantidad_presupuestada: esquemaNumeroRequerido(0, 999999999999), // Decimal con 3 decimales
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar un techo presupuestal
export const actualizarDtTechoPresupuestoSchema = z.object({
  id_rl_area_financiero: esquemaNumeroOpcional(1, 100000),
  id_ct_capitulo: esquemaNumeroOpcional(1, 100000),
  id_ct_financiamiento: esquemaNumeroOpcional(1, 100000),
  cantidad_presupuestada: esquemaNumeroOpcional(0, 999999999999),
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de techos presupuestales
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtTechoPresupuestoFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_techo_presupuesto: esquemaQueryId,
  id_rl_area_financiero: esquemaQueryNumeroOpcional,
  id_ct_capitulo: esquemaQueryNumeroOpcional,
  id_ct_financiamiento: esquemaQueryNumeroOpcional,
  cantidad_presupuestada: esquemaQueryNumeroOpcional,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de techos presupuestales
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtTechoPresupuestoInput = z.infer<
  typeof crearDtTechoPresupuestoSchema
>;
export type ActualizarDtTechoPresupuestoInput = z.infer<
  typeof actualizarDtTechoPresupuestoSchema
>;

export type BuscarDtTechoPresupuestoInput = z.infer<
  typeof dtTechoPresupuestoFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de techo presupuestal)
export const dtTechoPresupuestoIdParamSchema = z.object({
  id_dt_techo_presupuesto: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtTechoPresupuestoSchema = esquemaDeleteConUsuario;

export type DtTechoPresupuestoIdParam = z.infer<
  typeof dtTechoPresupuestoIdParamSchema
>;

export type EliminarDtTechoPresupuestoInput = z.infer<
  typeof eliminarDtTechoPresupuestoSchema
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
