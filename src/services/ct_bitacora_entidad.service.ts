/**
 * @fileoverview Servicio de ct_bitacora_entidad usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_bitacora_entidad } from "@prisma/client";
import {
  CrearCtBitacoraEntidadInput,
  ActualizarCtBitacoraEntidadInput,
  BuscarBitacoraEntidadInput,
} from "../schemas/ct_bitacora_entidad.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ENTIDAD CON BASE SERVICE =====

export class CtBitacoraEntidadService extends BaseService<
  ct_bitacora_entidad,
  CrearCtBitacoraEntidadInput,
  ActualizarCtBitacoraEntidadInput,
  BuscarBitacoraEntidadInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_bitacora_entidad",
    defaultOrderBy: { id_ct_bitacora_entidad: "asc" as const },
    campoActivo: "estado", // Este modelo usa 'estado' en lugar de 'activo'
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarBitacoraEntidadInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarBitacoraEntidadInput) {
    const where: any = {};

    //? Filtro de id_ct_bitacora_entidad
    if (filters?.id_ct_bitacora_entidad) {
      where.id_ct_bitacora_entidad = filters.id_ct_bitacora_entidad;
    }

    //? Filtro de entidad
    if (filters?.entidad) {
      where.entidad = {
        contains: filters.entidad,
      };
    }

    //? Filtro de descripcion
    if (filters?.descripcion) {
      where.descripcion = {
        contains: filters.descripcion,
      };
    }

    //? Filtro de activo
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_ct_bitacora_entidad";
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
