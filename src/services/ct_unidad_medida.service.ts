/**
 * @fileoverview Servicio de ct_unidad_medida usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_unidad_medida } from "@prisma/client";
import {
  CrearCtUnidadMedidaInput,
  ActualizarCtUnidadMedidaInput,
  BuscarCtUnidadMedidaInput,
} from "../schemas/ct_unidad_medida.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtUnidadMedidaService extends BaseService<
  ct_unidad_medida,
  CrearCtUnidadMedidaInput,
  ActualizarCtUnidadMedidaInput,
  BuscarCtUnidadMedidaInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_unidad_medida",
    defaultOrderBy: { id_ct_unidad_medida: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtUnidadMedidaInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtUnidadMedidaInput) {
    const where: any = {};

    // Filtro de id_ct_unidad_medida
    if (filters?.id_ct_unidad_medida) {
      where.id_ct_unidad_medida = filters.id_ct_unidad_medida;
    }

    // Filtro de clave_unidad
    if (filters?.clave_unidad) {
      where.clave_unidad = filters.clave_unidad;
    }

    // Filtro de nombre_unidad
    if (filters?.nombre_unidad) {
      where.nombre_unidad = {
        contains: filters.nombre_unidad,
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
    return "id_ct_unidad_medida";
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
