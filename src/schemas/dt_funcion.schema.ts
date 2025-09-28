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

//TODO ===== SCHEMAS PARA DT_FUNCION =====

//? Esquema para crear una nueva capitulo
export const crearDtFuncionSchema = z.object({
  id_ct_modulo: esquemaNumeroRequerido(1, 100000),
  nombre_funcion: esquemaTextoRequerido(2, 100),
  descripcion: esquemaTextoRequerido(2, 255),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una capitulo
export const actualizarDtFuncionSchema = z.object({
  id_ct_modulo: esquemaNumeroOpcional(1, 100000),
  nombre_funcion: esquemaTextoOpcional(100),
  descripcion: esquemaTextoOpcional(255),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de funciones
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtFuncionFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_funcion: esquemaQueryId,
  id_ct_modulo: esquemaQueryNumeroOpcional,
  nombre_funcion: esquemaQueryTexto,
  descripcion: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_up: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de funciones
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtFuncionInput = z.infer<typeof crearDtFuncionSchema>;
export type ActualizarDtFuncionInput = z.infer<
  typeof actualizarDtFuncionSchema
>;

export type BuscarDtFuncionInput = z.infer<typeof dtFuncionFiltrosSchema>;

//? Esquema para parámetros de URL (ID de capitulo)
export const dtFuncionIdParamSchema = z.object({
  id_dt_funcion: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtFuncionSchema = esquemaDeleteConUsuario;

export type DtFuncionIdParam = z.infer<typeof dtFuncionIdParamSchema>;

export type EliminarDtFuncionInput = z.infer<typeof eliminarDtFuncionSchema>;

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
