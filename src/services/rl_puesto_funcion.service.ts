/**
 * @fileoverview Servicio de rl_puesto_funcion usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_puesto_funcion } from "@prisma/client";
import {
  CrearRlPuestoFuncionInput,
  ActualizarRlPuestoFuncionInput,
  BuscarRlPuestoFuncionInput,
} from "../schemas/rl_puesto_funcion.schema";

//TODO ===== SERVICIO PARA RL_PUESTO_FUNCION CON BASE SERVICE =====

export class RlPuestoFuncionService extends BaseService<
  rl_puesto_funcion,
  CrearRlPuestoFuncionInput,
  ActualizarRlPuestoFuncionInput,
  BuscarRlPuestoFuncionInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_puesto_funcion",
    defaultOrderBy: { id_rl_puesto_funcion: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarRlPuestoFuncionInput) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones puesto función
  protected construirWhereClause(filters?: BuscarRlPuestoFuncionInput) {
    const where: any = {};

    // Filtro de id_rl_puesto_funcion
    if (filters?.id_rl_puesto_funcion) {
      where.id_rl_puesto_funcion = filters.id_rl_puesto_funcion;
    }

    // Filtro de id_ct_puesto
    if (filters?.id_ct_puesto) {
      where.id_ct_puesto = filters.id_ct_puesto;
    }

    // Filtro de id_dt_funcion
    if (filters?.id_dt_funcion) {
      where.id_dt_funcion = filters.id_dt_funcion;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_rl_puesto_funcion";
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
