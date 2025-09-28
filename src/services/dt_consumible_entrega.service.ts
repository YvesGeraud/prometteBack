/**
 * @fileoverview Servicio de dt_consumible_entrega usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { dt_consumible_entrega } from "@prisma/client";
import {
  CrearDtConsumibleEntregaInput,
  ActualizarDtConsumibleEntregaInput,
  BuscarDtConsumibleEntregaInput,
} from "../schemas/dt_consumible_entrega.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class DtConsumibleEntregaService extends BaseService<
  dt_consumible_entrega,
  CrearDtConsumibleEntregaInput,
  ActualizarDtConsumibleEntregaInput,
  BuscarDtConsumibleEntregaInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_consumible_entrega",
    defaultOrderBy: { id_dt_consumible_entrega: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtConsumibleEntregaInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarDtConsumibleEntregaInput) {
    const where: any = {};

    // Filtro de id_dt_consumible_entrega
    if (filters?.id_dt_consumible_entrega) {
      where.id_dt_consumible_entrega = filters.id_dt_consumible_entrega;
    }

    // Filtro de folio
    if (filters?.folio) {
      where.folio = {
        contains: filters.folio,
      };
    }

    // Filtro de id_ct_area
    if (filters?.id_ct_area) {
      where.id_ct_area = filters.id_ct_area;
    }

    // Filtro de id_dt_consumible_inventario
    if (filters?.id_dt_consumible_inventario) {
      where.id_dt_consumible_inventario = filters.id_dt_consumible_inventario;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_dt_consumible_entrega";
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
