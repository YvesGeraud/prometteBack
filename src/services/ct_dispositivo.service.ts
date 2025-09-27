/**
 * @fileoverview Servicio de ct_capitulo usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_dispositivo } from "@prisma/client";
import {
  CrearCtDispositivoInput,
  ActualizarCtDispositivoInput,
  BuscarCtDispositivoInput,
} from "../schemas/ct_dispositivo.schema";

//TODO ===== SERVICIO PARA CT_DISPOSITIVO CON BASE SERVICE =====

export class CtDispositivoService extends BaseService<
  ct_dispositivo,
  CrearCtDispositivoInput,
  ActualizarCtDispositivoInput,
  BuscarCtDispositivoInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_dispositivo",
    defaultOrderBy: { id_ct_dispositivo: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtDispositivoInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtDispositivoInput) {
    const where: any = {};

    // Filtro de id_dispositivo
    if (filters?.id_ct_dispositivo) {
      where.id_ct_dispositivo = filters.id_ct_dispositivo;
    }

    // Filtro de nombre_dispositivo
    if (filters?.nombre_dispositivo) {
      where.nombre_dispositivo = {
        contains: filters.nombre_dispositivo,
      };
    }

    // Filtro de descripcion
    if (filters?.descripcion) {
      where.descripcion = {
        contains: filters.descripcion,
      };
    }

    // Filtro de activo
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_ct_dispositivo";
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
