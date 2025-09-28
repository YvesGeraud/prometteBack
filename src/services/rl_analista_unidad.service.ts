/**
 * @fileoverview Servicio de rl_analista_unidad usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_analista_unidad } from "@prisma/client";
import {
  CrearRlAnalistaUnidadInput,
  ActualizarRlAnalistaUnidadInput,
  BuscarRlAnalistaUnidadInput,
} from "../schemas/rl_analista_unidad.schema";

//TODO ===== SERVICIO PARA RL_ANALISTA_UNIDAD CON BASE SERVICE =====

export class RlAnalistaUnidadService extends BaseService<
  rl_analista_unidad,
  CrearRlAnalistaUnidadInput,
  ActualizarRlAnalistaUnidadInput,
  BuscarRlAnalistaUnidadInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_analista_unidad",
    defaultOrderBy: { id_rl_analista_unidad: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarRlAnalistaUnidadInput) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones analista unidad
  protected construirWhereClause(filters?: BuscarRlAnalistaUnidadInput) {
    const where: any = {};

    // Filtro de id_rl_analista_unidad
    if (filters?.id_rl_analista_unidad) {
      where.id_rl_analista_unidad = filters.id_rl_analista_unidad;
    }

    // Filtro de ct_usuario_id
    if (filters?.ct_usuario_id) {
      where.ct_usuario_id = filters.ct_usuario_id;
    }

    // Filtro de rl_area_financiero
    if (filters?.rl_area_financiero) {
      where.rl_area_financiero = filters.rl_area_financiero;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_rl_analista_unidad";
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
