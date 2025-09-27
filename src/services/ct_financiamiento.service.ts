/**
 * @fileoverview Servicio de ct_financiamiento usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_financiamiento } from "@prisma/client";
import {
  CrearCtFinanciamientoInput,
  ActualizarCtFinanciamientoInput,
  BuscarCtFinanciamientoInput,
} from "../schemas/ct_financiamiento.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtFinanciamientoService extends BaseService<
  ct_financiamiento,
  CrearCtFinanciamientoInput,
  ActualizarCtFinanciamientoInput,
  BuscarCtFinanciamientoInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_financiamiento",
    defaultOrderBy: { id_financiamiento: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtFinanciamientoInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtFinanciamientoInput) {
    const where: any = {};

    // Filtro de id_financiamiento
    if (filters?.id_financiamiento) {
      where.id_financiamiento = filters.id_financiamiento;
    }

    // Filtro de nombre_financiamiento
    if (filters?.nombre_financiamiento) {
      where.nombre_financiamiento = {
        contains: filters.nombre_financiamiento,
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
    return "id_financiamiento";
  }

  // ✨ ¡YA TIENES CRUD COMPLETO AUTOMÁTICAMENTE!
  // - obtenerTodos() con paginación ✅
  // - obtenerPorId() ✅
  // - crear() con validaciones ✅
  // - actualizar() con verificaciones ✅
  // - eliminar() con manejo de errores ✅
}

// 🎉 TOTAL: ¡Solo 18 líneas para CRUD completo!
// Sin BaseService serían ~150 líneas 😱
