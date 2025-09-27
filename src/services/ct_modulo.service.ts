/**
 * @fileoverview Servicio de ct_modulo usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_modulo } from "@prisma/client";
import {
  CrearCtModuloInput,
  ActualizarCtModuloInput,
  BuscarCtModuloInput,
} from "../schemas/ct_modulo.schema";

//TODO ===== SERVICIO PARA CT_MODULO CON BASE SERVICE =====

export class CtModuloService extends BaseService<
  ct_modulo,
  CrearCtModuloInput,
  ActualizarCtModuloInput,
  BuscarCtModuloInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_modulo",
    defaultOrderBy: { id_modulo: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtModuloInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtModuloInput) {
    const where: any = {};

    // Filtro de id_modulo
    if (filters?.id_modulo) {
      where.id_modulo = filters.id_modulo;
    }

    // Filtro de nombre_modulo
    if (filters?.nombre_modulo) {
      where.nombre_modulo = {
        contains: filters.nombre_modulo,
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
    return "id_modulo";
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
