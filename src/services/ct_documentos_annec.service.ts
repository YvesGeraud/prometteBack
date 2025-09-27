/**
 * @fileoverview Servicio de ct_documentos_aneec usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_documentos_aneec } from "@prisma/client";
import {
  CrearCtDocumentosAnnecInput,
  ActualizarCtDocumentosAnnecInput,
  BuscarCtDocumentosAnnecInput,
} from "../schemas/ct_documentos_annec.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtDocumentosAnnecService extends BaseService<
  ct_documentos_aneec,
  CrearCtDocumentosAnnecInput,
  ActualizarCtDocumentosAnnecInput,
  BuscarCtDocumentosAnnecInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_documentos_aneec",
    defaultOrderBy: { id_tipo_documento: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtDocumentosAnnecInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtDocumentosAnnecInput) {
    const where: any = {};

    // Filtro de id_tipo_documento
    if (filters?.id_tipo_documento) {
      where.id_tipo_documento = filters.id_tipo_documento;
    }

    // Filtro de nombre
    if (filters?.nombre) {
      where.nombre = {
        contains: filters.nombre,
      };
    }

    // Filtro de estado
    if (filters?.vigencia) {
      where.vigencia = filters.vigencia;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_tipo_documento";
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
