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

//TODO ===== SCHEMAS PARA DT_PROYECTO_ANUAL =====

//? Esquema para crear un nuevo proyecto anual
export const crearDtProyectoAnualSchema = z.object({
  a_o: esquemaNumeroRequerido(2000, 2100), // Año entre 2000 y 2100
  id_dt_techo_presupuesto: esquemaNumeroRequerido(1, 100000),
  monto_asignado: esquemaNumeroRequerido(0, 999999999999), // Decimal con 3 decimales
  monto_utilizado: esquemaNumeroRequerido(0, 999999999999),
  monto_disponible: esquemaNumeroRequerido(0, 999999999999),
  descripcion: esquemaTextoOpcional(255),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar un proyecto anual
export const actualizarDtProyectoAnualSchema = z.object({
  a_o: esquemaNumeroOpcional(2000, 2100),
  id_dt_techo_presupuesto: esquemaNumeroOpcional(1, 100000),
  monto_asignado: esquemaNumeroOpcional(0, 999999999999),
  monto_utilizado: esquemaNumeroOpcional(0, 999999999999),
  monto_disponible: esquemaNumeroOpcional(0, 999999999999),
  descripcion: esquemaTextoOpcional(255),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de proyectos anuales
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtProyectoAnualFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_proyecto_anual: esquemaQueryId,
  a_o: esquemaQueryNumeroOpcional,
  id_dt_techo_presupuesto: esquemaQueryNumeroOpcional,
  monto_asignado: esquemaQueryNumeroOpcional,
  monto_utilizado: esquemaQueryNumeroOpcional,
  monto_disponible: esquemaQueryNumeroOpcional,
  descripcion: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de proyectos anuales
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtProyectoAnualInput = z.infer<
  typeof crearDtProyectoAnualSchema
>;
export type ActualizarDtProyectoAnualInput = z.infer<
  typeof actualizarDtProyectoAnualSchema
>;

export type BuscarDtProyectoAnualInput = z.infer<
  typeof dtProyectoAnualFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de proyecto anual)
export const dtProyectoAnualIdParamSchema = z.object({
  id_dt_proyecto_anual: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtProyectoAnualSchema = esquemaDeleteConUsuario;

export type DtProyectoAnualIdParam = z.infer<
  typeof dtProyectoAnualIdParamSchema
>;

export type EliminarDtProyectoAnualInput = z.infer<
  typeof eliminarDtProyectoAnualSchema
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
