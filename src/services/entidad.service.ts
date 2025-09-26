/**
 * @fileoverview Servicio de ct_entidad usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { Entidad } from "@prisma/client";
import {
  CrearCtEntidadInput,
  ActualizarCtEntidadInput,
  BuscarEntidadInput,
} from "../schemas/entidad.schema";

//TODO ===== SERVICIO PARA CT_MARCA CON BASE SERVICE =====

export class CtEntidadBaseService extends BaseService<
  Entidad,
  CrearCtEntidadInput,
  ActualizarCtEntidadInput,
  BuscarEntidadInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "entidad",
    defaultOrderBy: { nombre: "asc" as const },
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarEntidadInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarEntidadInput) {
    const where: any = {};

    // Filtro de entidad
    if (filters?.id_entidad) {
      where.id_entidad = filters.id_entidad;
    }

    // Filtro de nombre
    if (filters?.nombre) {
      where.nombre = {
        contains: filters.nombre,
      };
    }

    // Filtro de abreviatura
    if (filters?.abreviatura) {
      where.abreviatura = {
        contains: filters.abreviatura,
      };
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_entidad";
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
