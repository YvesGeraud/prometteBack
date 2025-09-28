/**
 * @fileoverview Servicio de rl_producto_area usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_producto_area } from "@prisma/client";
import {
  CrearRlProductoAreaInput,
  ActualizarRlProductoAreaInput,
  BuscarRlProductoAreaInput,
} from "../schemas/rl_producto_area.schema";

//TODO ===== SERVICIO PARA RL_PRODUCTO_AREA CON BASE SERVICE =====

export class RlProductoAreaService extends BaseService<
  rl_producto_area,
  CrearRlProductoAreaInput,
  ActualizarRlProductoAreaInput,
  BuscarRlProductoAreaInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_producto_area",
    defaultOrderBy: { id_rl_producto_area: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarRlProductoAreaInput) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones producto área
  protected construirWhereClause(filters?: BuscarRlProductoAreaInput) {
    const where: any = {};

    // Filtro de id_rl_producto_area
    if (filters?.id_rl_producto_area) {
      where.id_rl_producto_area = filters.id_rl_producto_area;
    }

    // Filtro de id_ct_producto_consumible
    if (filters?.id_ct_producto_consumible) {
      where.id_ct_producto_consumible = filters.id_ct_producto_consumible;
    }

    // Filtro de id_area_infra
    if (filters?.id_area_infra) {
      where.id_area_infra = filters.id_area_infra;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_rl_producto_area";
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
