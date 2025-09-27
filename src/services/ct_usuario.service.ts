/**
 * @fileoverview Servicio de ct_usuario usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_usuario } from "@prisma/client";
import {
  CrearCtUsuarioInput,
  ActualizarCtUsuarioInput,
  BuscarCtUsuarioInput,
} from "../schemas/ct_usuario.schema";

//TODO ===== SERVICIO PARA CT_USUARIO CON BASE SERVICE =====

export class CtUsuarioService extends BaseService<
  ct_usuario,
  CrearCtUsuarioInput,
  ActualizarCtUsuarioInput,
  BuscarCtUsuarioInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_usuario",
    defaultOrderBy: { id_ct_usuario: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtUsuarioInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtUsuarioInput) {
    const where: any = {};

    // Filtro de id_ct_usuario
    if (filters?.id_ct_usuario) {
      where.id_ct_usuario = filters.id_ct_usuario;
    }

    // Filtro de nombre_usuario
    if (filters?.nombre_usuario) {
      where.nombre_usuario = {
        contains: filters.nombre_usuario,
      };
    }

    // Filtro de id_dt_rupeet_informacion
    if (filters?.id_dt_rupeet_informacion) {
      where.id_dt_rupeet_informacion = filters.id_dt_rupeet_informacion;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_ct_usuario";
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
