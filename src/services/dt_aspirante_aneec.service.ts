/**
 * @fileoverview Servicio de dt_aspirante_aneec usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_capitulo, dt_aspirante_aneec } from "@prisma/client";
import {
  CrearDtAspiranteAneecInput,
  ActualizarDtAspiranteAneecInput,
  BuscarDtAspiranteAneecInput,
} from "../schemas/dt_aspirante_aneec.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class DtAspiranteAneecService extends BaseService<
  dt_aspirante_aneec,
  CrearDtAspiranteAneecInput,
  ActualizarDtAspiranteAneecInput,
  BuscarDtAspiranteAneecInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_aspirante_aneec",
    defaultOrderBy: { id_dt_aspirante_aneec: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtAspiranteAneecInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarDtAspiranteAneecInput) {
    const where: any = {};

    // Filtro de id_ct_capitulo
    if (filters?.id_dt_aspirante_aneec) {
      where.id_dt_aspirante_aneec = filters.id_dt_aspirante_aneec;
    }

    // Filtro de curp
    if (filters?.curp) {
      where.curp = {
        contains: filters.curp,
      };
    }

    // Filtro de nombre
    if (filters?.nombre) {
      where.nombre = {
        contains: filters.nombre,
      };
    }

    // Filtro de apellido_paterno
    if (filters?.apellido_paterno) {
      where.apellido_paterno = {
        contains: filters.apellido_paterno,
      };
    }

    // Filtro de apellido_materno
    if (filters?.apellido_materno) {
      where.apellido_materno = {
        contains: filters.apellido_materno,
      };
    }

    // Filtro de codigo_postal
    if (filters?.codigo_postal) {
      where.codigo_postal = {
        contains: filters.codigo_postal,
      };
    }

    // Filtro de ct_municipio_id
    if (filters?.ct_municipio_id) {
      where.ct_municipio_id = filters.ct_municipio_id;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_dt_aspirante_aneec";
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
