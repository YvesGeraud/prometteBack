/**
 * @fileoverview Servicio de rl_area_financiero usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_area_financiero } from "@prisma/client";
import {
  CrearRlAreaFinancieroInput,
  ActualizarRlAreaFinancieroInput,
  BuscarRlAreaFinancieroInput,
} from "../schemas/rl_area_financiero.schema";

//TODO ===== SERVICIO PARA RL_AREA_FINANCIERO CON BASE SERVICE =====

export class RlAreaFinancieroService extends BaseService<
  rl_area_financiero,
  CrearRlAreaFinancieroInput,
  ActualizarRlAreaFinancieroInput,
  BuscarRlAreaFinancieroInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_area_financiero",
    defaultOrderBy: { id_rl_area_financiero: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarRlAreaFinancieroInput) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones área financiero
  protected construirWhereClause(filters?: BuscarRlAreaFinancieroInput) {
    const where: any = {};

    // Filtro de id_rl_area_financiero
    if (filters?.id_rl_area_financiero) {
      where.id_rl_area_financiero = filters.id_rl_area_financiero;
    }

    // Filtro de id_financiero
    if (filters?.id_financiero) {
      where.id_financiero = filters.id_financiero;
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
    return "id_rl_area_financiero";
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
