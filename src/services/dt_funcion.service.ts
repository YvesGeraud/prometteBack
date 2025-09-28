/**
 * @fileoverview Servicio de ct_capitulo usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { dt_funcion } from "@prisma/client";
import {
  CrearDtFuncionInput,
  ActualizarDtFuncionInput,
  BuscarDtFuncionInput,
} from "../schemas/dt_funcion.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class DtFuncionService extends BaseService<
  dt_funcion,
  CrearDtFuncionInput,
  ActualizarDtFuncionInput,
  BuscarDtFuncionInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_funcion",
    defaultOrderBy: { id_dt_funcion: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtFuncionInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarDtFuncionInput) {
    const where: any = {};

    // Filtro de id_dt_funcion
    if (filters?.id_dt_funcion) {
      where.id_dt_funcion = filters.id_dt_funcion;
    }

    // Filtro de id_ct_modulo
    if (filters?.id_ct_modulo) {
      where.id_ct_modulo = filters.id_ct_modulo;
    }

    // Filtro de nombre_funcion
    if (filters?.nombre_funcion) {
      where.nombre_funcion = {
        contains: filters.nombre_funcion,
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
    return "id_dt_funcion";
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
