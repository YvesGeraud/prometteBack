/**
 * @fileoverview Servicio de ct_partida usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_capitulo, ct_partida } from "@prisma/client";
import {
  CrearCtPartidaInput,
  ActualizarCtPartidaInput,
  BuscarCtPartidaInput,
} from "../schemas/ct_partida.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtPartidaService extends BaseService<
  ct_partida,
  CrearCtPartidaInput,
  ActualizarCtPartidaInput,
  BuscarCtPartidaInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_partida",
    defaultOrderBy: { id_ct_partida: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtPartidaInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtPartidaInput) {
    const where: any = {};

    // Filtro de id_ct_partida
    if (filters?.id_ct_partida) {
      where.id_ct_partida = filters.id_ct_partida;
    }

    // Filtro de id_ct_capitulo
    if (filters?.id_ct_capitulo) {
      where.id_ct_capitulo = filters.id_ct_capitulo;
    }

    // Filtro de clave_partida
    if (filters?.clave_partida) {
      where.clave_partida = {
        contains: filters.clave_partida,
      };
    }

    // Filtro de nombre_partida
    if (filters?.nombre_partida) {
      where.nombre_partida = {
        contains: filters.nombre_partida,
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
    return "id_ct_partida";
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
