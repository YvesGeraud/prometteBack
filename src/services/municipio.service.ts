/**
 * @fileoverview Servicio de ct_localidad usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { Municipio } from "@prisma/client";
import {
  CrearCtMunicipioInput,
  ActualizarCtMunicipioInput,
  BuscarMunicipiosInput,
} from "../schemas/municipio.schema";

//TODO ===== SERVICIO PARA CT_MUNICIPIO CON BASE SERVICE =====

export class CtMunicipioBaseService extends BaseService<
  Municipio,
  CrearCtMunicipioInput,
  ActualizarCtMunicipioInput,
  BuscarMunicipiosInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "municipio",
    defaultOrderBy: { id_municipio: "asc" as const },
  };

  // 🔗 Includes condicionales basados en filtros
  protected configurarIncludes(filters?: BuscarMunicipiosInput) {
    // Por defecto, sin includes para mejor performance
    const includes: any = {};

    // Solo incluir entidad si se solicita explícitamente
    if (filters?.incluir_entidad) {
      includes.ct_entidad = true;
    }

    // 🎯 IMPORTANTE: Si no hay includes, retornar undefined para que Prisma no incluya nada
    return Object.keys(includes).length > 0 ? includes : undefined;
  }

  // 🔍 Filtros específicos para municipios
  protected construirWhereClause(filters?: BuscarMunicipiosInput) {
    const where: any = {};
    const conditions: any[] = [];

    // Filtro de municipio
    if (filters?.id_municipio) {
      conditions.push({
        id_municipio: filters.id_municipio,
      });
    }

    // Filtro de municipio (simplificado para compatibilidad)
    if (filters?.nombre) {
      conditions.push({
        nombre: {
          contains: filters.nombre,
        },
      });
    }

    // Filtro de municipio
    if (filters?.cve_mun) {
      conditions.push({
        cve_mun: filters.cve_mun,
      });
    }

    // Filtro de ámbito
    if (filters?.id_entidad) {
      conditions.push({
        id_entidad: filters.id_entidad,
      });
    }

    // Si hay condiciones, usar AND, sino where vacío
    if (conditions.length > 0) {
      where.AND = conditions;
    }

    return where;
  }

  // ✅ NO necesitamos sobreescribir getPrimaryKeyField()
  // El algoritmo inteligente detecta: ct_municipio → id_municipio automáticamente
}
