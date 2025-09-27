/**
 * @fileoverview Servicio de ct_capitulo usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_correspondencia_formato_entrega } from "@prisma/client";
import {
  CrearCtCorrespondenciaFormatoEntregaInput,
  ActualizarCtCorrespondenciaFormatoEntregaInput,
  BuscarCtCorrespondenciaFormatoEntregaInput,
} from "../schemas/ct_correspondencia_formato_entrega.schema";

//TODO ===== SERVICIO PARA CT_CORRESPONDENCIA_FORMATO_ENTREGA CON BASE SERVICE =====

export class CtCorrespondenciaFormatoEntregaService extends BaseService<
  ct_correspondencia_formato_entrega,
  CrearCtCorrespondenciaFormatoEntregaInput,
  ActualizarCtCorrespondenciaFormatoEntregaInput,
  BuscarCtCorrespondenciaFormatoEntregaInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_correspondencia_formato_entrega",
    defaultOrderBy: { id_ct_correspondencia_formato_entrega: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(
    filters?: BuscarCtCorrespondenciaFormatoEntregaInput
  ) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(
    filters?: BuscarCtCorrespondenciaFormatoEntregaInput
  ) {
    const where: any = {};

    // Filtro de id_ct_correspondencia_formato_entrega
    if (filters?.id_ct_correspondencia_formato_entrega) {
      where.id_ct_correspondencia_formato_entrega =
        filters.id_ct_correspondencia_formato_entrega;
    }

    // Filtro de nombre
    if (filters?.nombre) {
      where.nombre = {
        contains: filters.nombre,
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
    return "id_ct_correspondencia_formato_entrega";
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
