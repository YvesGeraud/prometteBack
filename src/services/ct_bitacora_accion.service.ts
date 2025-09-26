/**
 * @fileoverview Servicio de ct_bitacora_accion usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_bitacora_accion } from "@prisma/client";
import {
  CrearCtBitacoraAccionInput,
  ActualizarCtBitacoraAccionInput,
  BuscarBitacoraAccionInput,
} from "../schemas/ct_bitacora_accion.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtBitacoraAccionService extends BaseService<
  ct_bitacora_accion,
  CrearCtBitacoraAccionInput,
  ActualizarCtBitacoraAccionInput,
  BuscarBitacoraAccionInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_bitacora_accion",
    defaultOrderBy: { id_ct_bitacora_accion: "asc" as const },
    campoActivo: "estado", // Este modelo usa 'estado' en lugar de 'activo'
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarBitacoraAccionInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarBitacoraAccionInput) {
    const where: any = {};

    // Filtro de entidad
    if (filters?.id_ct_bitacora_accion) {
      where.id_ct_bitacora_accion = filters.id_ct_bitacora_accion;
    }

    // Filtro de nombre
    if (filters?.accion) {
      where.accion = {
        contains: filters.accion,
      };
    }

    // Filtro de abreviatura
    if (filters?.descripcion) {
      where.descripcion = {
        contains: filters.descripcion,
      };
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_ct_bitacora_accion";
  }

  // ✨ ¡YA TIENES CRUD COMPLETO AUTOMÁTICAMENTE!
  // - obtenerTodos() con paginación ✅
  // - obtenerPorId() ✅
  // - crear() con validaciones ✅
  // - actualizar() con verificaciones ✅
  // - eliminar() con manejo de errores y auditoría ✅
}

// 🎉 TOTAL: ¡Solo ~25 líneas para CRUD completo con auditoría!
// Sin BaseService serían ~200 líneas 😱
