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

//TODO ===== SCHEMAS PARA CT_FINANCIAMIENTO =====

//? Esquema para crear una nueva financiamiento
export const crearCtFinanciamientoSchema = z.object({
  nombre_financiamiento: esquemaTextoRequerido(2, 50),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una financiamiento
export const actualizarCtFinanciamientoSchema = z.object({
  nombre_financiamiento: esquemaTextoOpcional(50),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de financiamientos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctFinanciamientoFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_financiamiento: esquemaQueryId,
  nombre_financiamiento: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de financiamientos
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtFinanciamientoInput = z.infer<
  typeof crearCtFinanciamientoSchema
>;
export type ActualizarCtFinanciamientoInput = z.infer<
  typeof actualizarCtFinanciamientoSchema
>;

export type BuscarCtFinanciamientoInput = z.infer<
  typeof ctFinanciamientoFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de financiamiento)
export const ctFinanciamientoIdParamSchema = z.object({
  id_ct_financiamiento: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtFinanciamientoSchema = esquemaDeleteConUsuario;

export type CtFinanciamientoIdParam = z.infer<
  typeof ctFinanciamientoIdParamSchema
>;

export type EliminarCtFinanciamientoInput = z.infer<
  typeof eliminarCtFinanciamientoSchema
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
