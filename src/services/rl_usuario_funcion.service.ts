/**
 * @fileoverview Servicio de rl_usuario_funcion usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_usuario_funcion } from "@prisma/client";
import {
  CrearRlUsuarioFuncionInput,
  ActualizarRlUsuarioFuncionInput,
  BuscarRlUsuarioFuncionInput,
} from "../schemas/rl_usuario_funcion.schema";

//TODO ===== SERVICIO PARA RL_USUARIO_FUNCION CON BASE SERVICE =====

export class RlUsuarioFuncionService extends BaseService<
  rl_usuario_funcion,
  CrearRlUsuarioFuncionInput,
  ActualizarRlUsuarioFuncionInput,
  BuscarRlUsuarioFuncionInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_usuario_funcion",
    defaultOrderBy: { id_rl_usuario_funcion: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarRlUsuarioFuncionInput) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones usuario función
  protected construirWhereClause(filters?: BuscarRlUsuarioFuncionInput) {
    const where: any = {};

    // Filtro de id_rl_usuario_funcion
    if (filters?.id_rl_usuario_funcion) {
      where.id_rl_usuario_funcion = filters.id_rl_usuario_funcion;
    }

    // Filtro de id_ct_usuario
    if (filters?.id_ct_usuario) {
      where.id_ct_usuario = filters.id_ct_usuario;
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
    return "id_rl_usuario_funcion";
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
