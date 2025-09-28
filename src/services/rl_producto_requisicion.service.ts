/**
 * @fileoverview Servicio de rl_producto_requisicion usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_producto_requisicion } from "@prisma/client";
import {
  CrearRlProductoRequisicionInput,
  ActualizarRlProductoRequisicionInput,
  BuscarRlProductoRequisicionInput,
} from "../schemas/rl_producto_requisicion.schema";

//TODO ===== SERVICIO PARA RL_PRODUCTO_REQUISICION CON BASE SERVICE =====

export class RlProductoRequisicionService extends BaseService<
  rl_producto_requisicion,
  CrearRlProductoRequisicionInput,
  ActualizarRlProductoRequisicionInput,
  BuscarRlProductoRequisicionInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_producto_requisicion",
    defaultOrderBy: { id_rl_producto_requisicion: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarRlProductoRequisicionInput) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones producto requisición
  protected construirWhereClause(filters?: BuscarRlProductoRequisicionInput) {
    const where: any = {};

    // Filtro de id_rl_producto_requisicion
    if (filters?.id_rl_producto_requisicion) {
      where.id_rl_producto_requisicion = filters.id_rl_producto_requisicion;
    }

    // Filtro de id_rl_area_financiero
    if (filters?.id_rl_area_financiero) {
      where.id_rl_area_financiero = filters.id_rl_area_financiero;
    }

    // Filtro de id_dt_techo_presupuesto
    if (filters?.id_dt_techo_presupuesto) {
      where.id_dt_techo_presupuesto = filters.id_dt_techo_presupuesto;
    }

    // Filtro de id_ct_producto_consumible
    if (filters?.id_ct_producto_consumible) {
      where.id_ct_producto_consumible = filters.id_ct_producto_consumible;
    }

    // Filtro de cantidad
    if (filters?.cantidad) {
      where.cantidad = filters.cantidad;
    }

    // Filtro de mes
    if (filters?.mes) {
      where.mes = {
        contains: filters.mes,
      };
    }

    // Filtro de total
    if (filters?.total) {
      where.total = filters.total;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_rl_producto_requisicion";
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
