/**
 * @fileoverview Servicio de ct_capitulo usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_capitulo } from "@prisma/client";
import {
  CrearCtCapituloInput,
  ActualizarCtCapituloInput,
  BuscarCtCapituloInput,
} from "../schemas/ct_capitulo.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtCapituloService extends BaseService<
  ct_capitulo,
  CrearCtCapituloInput,
  ActualizarCtCapituloInput,
  BuscarCtCapituloInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_capitulo",
    defaultOrderBy: { id_capitulo: "asc" as const },
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtCapituloInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtCapituloInput) {
    const where: any = {};

    // Filtro de entidad
    if (filters?.id_capitulo) {
      where.id_capitulo = filters.id_capitulo;
    }

    // Filtro de clave_capitulo (campo numérico)
    if (filters?.clave_capitulo) {
      where.clave_capitulo = filters.clave_capitulo;
    }

    // Filtro de abreviatura
    if (filters?.nombre_capitulo) {
      where.nombre_capitulo = {
        contains: filters.nombre_capitulo,
      };
    }

    // Filtro de activo
    if (filters?.activo) {
      where.activo = filters.activo;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_capitulo";
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
