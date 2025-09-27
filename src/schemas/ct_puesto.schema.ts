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

//TODO ===== SCHEMAS PARA CT_PUESTO =====

//? Esquema para crear una nueva puesto
export const crearCtPuestoSchema = z.object({
  nombre: esquemaTextoRequerido(2, 50),
  descripcion: esquemaTextoOpcional(255),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una puesto
export const actualizarCtPuestoSchema = z.object({
  nombre: esquemaNumeroOpcional(1, 100000),
  descripcion: esquemaTextoOpcional(50),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de puestos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctPuestoFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_puesto: esquemaQueryId,
  nombre: esquemaQueryNumeroOpcional,
  descripcion: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de puestos
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtPuestoInput = z.infer<typeof crearCtPuestoSchema>;
export type ActualizarCtPuestoInput = z.infer<typeof actualizarCtPuestoSchema>;

export type BuscarCtPuestoInput = z.infer<typeof ctPuestoFiltrosSchema>;

//? Esquema para parámetros de URL (ID de puesto)
export const ctPuestoIdParamSchema = z.object({
  id_ct_puesto: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtPuestoSchema = esquemaDeleteConUsuario;

export type CtPuestoIdParam = z.infer<typeof ctPuestoIdParamSchema>;

export type EliminarCtPuestoInput = z.infer<typeof eliminarCtPuestoSchema>;

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
