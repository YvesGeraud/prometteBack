/**
 * @fileoverview Servicio de rl_partida_area usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_partida_area } from "@prisma/client";
import {
  CrearRlPartidaAreaInput,
  ActualizarRlPartidaAreaInput,
  BuscarRlPartidaAreaInput,
} from "../schemas/rl_partida_area.schema";

//TODO ===== SERVICIO PARA RL_PARTIDA_AREA CON BASE SERVICE =====

export class RlPartidaAreaService extends BaseService<
  rl_partida_area,
  CrearRlPartidaAreaInput,
  ActualizarRlPartidaAreaInput,
  BuscarRlPartidaAreaInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_partida_area",
    defaultOrderBy: { id_rl_partida_area: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarRlPartidaAreaInput) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones partida área
  protected construirWhereClause(filters?: BuscarRlPartidaAreaInput) {
    const where: any = {};

    // Filtro de id_rl_partida_area
    if (filters?.id_rl_partida_area) {
      where.id_rl_partida_area = filters.id_rl_partida_area;
    }

    // Filtro de id_area_infra
    if (filters?.id_area_infra) {
      where.id_area_infra = filters.id_area_infra;
    }

    // Filtro de id_ct_partida
    if (filters?.id_ct_partida) {
      where.id_ct_partida = filters.id_ct_partida;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_rl_partida_area";
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
