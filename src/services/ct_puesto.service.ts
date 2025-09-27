/**
 * @fileoverview Servicio de ct_puesto usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_puesto } from "@prisma/client";
import {
  CrearCtPuestoInput,
  ActualizarCtPuestoInput,
  BuscarCtPuestoInput,
} from "../schemas/ct_puesto.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtPuestoService extends BaseService<
  ct_puesto,
  CrearCtPuestoInput,
  ActualizarCtPuestoInput,
  BuscarCtPuestoInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_puesto",
    defaultOrderBy: { id_ct_puesto: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtPuestoInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtPuestoInput) {
    const where: any = {};

    // Filtro de id_ct_puesto
    if (filters?.id_ct_puesto) {
      where.id_ct_puesto = filters.id_ct_puesto;
    }

    // Filtro de nombre
    if (filters?.nombre) {
      where.nombre = {
        contains: filters.nombre,
      };
    }

    // Filtro de descripcion
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
    return "id_ct_puesto";
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
