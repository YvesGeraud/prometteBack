/**
 * @fileoverview Servicio de ct_capitulo usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_correspondencia_estado } from "@prisma/client";
import {
  CrearCtCorrespondenciaEstadoInput,
  ActualizarCtCorrespondenciaEstadoInput,
  BuscarCtCorrespondenciaEstadoInput,
} from "../schemas/ct_correspondencia_estado.schema";

//TODO ===== SERVICIO PARA CT_CORRESPONDENCIA_ESTADO CON BASE SERVICE =====

export class CtCorrespondenciaEstadoService extends BaseService<
  ct_correspondencia_estado,
  CrearCtCorrespondenciaEstadoInput,
  ActualizarCtCorrespondenciaEstadoInput,
  BuscarCtCorrespondenciaEstadoInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_correspondencia_estado",
    defaultOrderBy: { id_estado: "asc" as const },
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtCorrespondenciaEstadoInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtCorrespondenciaEstadoInput) {
    const where: any = {};

    // Filtro de entidad
    if (filters?.id_estado) {
      where.id_estado = filters.id_estado;
    }

    // Filtro de nombre
    if (filters?.nombre) {
      where.nombre = {
        contains: filters.nombre,
      };
    }

    // Filtro de activo
    if (filters?.activo) {
      where.activo = filters.activo;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_estado";
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
