/**
 * @fileoverview Servicio de ct_documentos_aneec usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_documento_aneec } from "@prisma/client";
import {
  CrearCtDocumentoAnnecInput,
  ActualizarCtDocumentoAnnecInput,
  BuscarCtDocumentoAnnecInput,
} from "../schemas/ct_documento_annec.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtDocumentoAnnecService extends BaseService<
  ct_documento_aneec,
  CrearCtDocumentoAnnecInput,
  ActualizarCtDocumentoAnnecInput,
  BuscarCtDocumentoAnnecInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_documento_aneec",
    defaultOrderBy: { id_ct_documento_aneec: "asc" as const },
    campoActivo: "estado",
    valorActivo: 1, // Para campos TinyInt: 1=activo, 0=inactivo
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtDocumentoAnnecInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtDocumentoAnnecInput) {
    const where: any = {};

    // Filtro de id_tipo_documento
    if (filters?.id_ct_documento_aneec) {
      where.id_ct_documento_aneec = filters.id_ct_documento_aneec;
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
    return "id_ct_documento_aneec";
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
