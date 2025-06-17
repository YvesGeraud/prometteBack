import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ct_departamento_sistema, ct_departamento_sistemaId } from './ct_departamento_sistema';
import type { ct_puesto, ct_puestoId } from './ct_puesto';
import type { ct_usuario, ct_usuarioId } from './ct_usuario';
import type { rl_justificacion, rl_justificacionId } from './rl_justificacion';
import type { rl_modulo_area, rl_modulo_areaId } from './rl_modulo_area';

export interface ct_areaAttributes {
  id_area: number;
  indice?: string;
  nombre_area: string;
  ct_area_id?: number;
  ct_departamento_id: number;
  estado: number;
  ct_usuario_in: number;
  ct_usuario_at?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ct_areaPk = "id_area";
export type ct_areaId = ct_area[ct_areaPk];
export type ct_areaOptionalAttributes = "id_area" | "indice" | "ct_area_id" | "ct_departamento_id" | "estado" | "ct_usuario_at" | "createdAt" | "updatedAt";
export type ct_areaCreationAttributes = Optional<ct_areaAttributes, ct_areaOptionalAttributes>;

export class ct_area extends Model<ct_areaAttributes, ct_areaCreationAttributes> implements ct_areaAttributes {
  id_area!: number;
  indice?: string;
  nombre_area!: string;
  ct_area_id?: number;
  ct_departamento_id!: number;
  estado!: number;
  ct_usuario_in!: number;
  ct_usuario_at?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // ct_area belongsTo ct_area via ct_area_id
  ct_area!: ct_area;
  getCt_area!: Sequelize.BelongsToGetAssociationMixin<ct_area>;
  setCt_area!: Sequelize.BelongsToSetAssociationMixin<ct_area, ct_areaId>;
  createCt_area!: Sequelize.BelongsToCreateAssociationMixin<ct_area>;
  // ct_area hasMany ct_puesto via ct_area_id
  ct_puestos!: ct_puesto[];
  getCt_puestos!: Sequelize.HasManyGetAssociationsMixin<ct_puesto>;
  setCt_puestos!: Sequelize.HasManySetAssociationsMixin<ct_puesto, ct_puestoId>;
  addCt_puesto!: Sequelize.HasManyAddAssociationMixin<ct_puesto, ct_puestoId>;
  addCt_puestos!: Sequelize.HasManyAddAssociationsMixin<ct_puesto, ct_puestoId>;
  createCt_puesto!: Sequelize.HasManyCreateAssociationMixin<ct_puesto>;
  removeCt_puesto!: Sequelize.HasManyRemoveAssociationMixin<ct_puesto, ct_puestoId>;
  removeCt_puestos!: Sequelize.HasManyRemoveAssociationsMixin<ct_puesto, ct_puestoId>;
  hasCt_puesto!: Sequelize.HasManyHasAssociationMixin<ct_puesto, ct_puestoId>;
  hasCt_puestos!: Sequelize.HasManyHasAssociationsMixin<ct_puesto, ct_puestoId>;
  countCt_puestos!: Sequelize.HasManyCountAssociationsMixin;
  // ct_area hasMany rl_justificacion via ct_area_id
  rl_justificacions!: rl_justificacion[];
  getRl_justificacions!: Sequelize.HasManyGetAssociationsMixin<rl_justificacion>;
  setRl_justificacions!: Sequelize.HasManySetAssociationsMixin<rl_justificacion, rl_justificacionId>;
  addRl_justificacion!: Sequelize.HasManyAddAssociationMixin<rl_justificacion, rl_justificacionId>;
  addRl_justificacions!: Sequelize.HasManyAddAssociationsMixin<rl_justificacion, rl_justificacionId>;
  createRl_justificacion!: Sequelize.HasManyCreateAssociationMixin<rl_justificacion>;
  removeRl_justificacion!: Sequelize.HasManyRemoveAssociationMixin<rl_justificacion, rl_justificacionId>;
  removeRl_justificacions!: Sequelize.HasManyRemoveAssociationsMixin<rl_justificacion, rl_justificacionId>;
  hasRl_justificacion!: Sequelize.HasManyHasAssociationMixin<rl_justificacion, rl_justificacionId>;
  hasRl_justificacions!: Sequelize.HasManyHasAssociationsMixin<rl_justificacion, rl_justificacionId>;
  countRl_justificacions!: Sequelize.HasManyCountAssociationsMixin;
  // ct_area hasMany rl_modulo_area via ct_area_id
  rl_modulo_areas!: rl_modulo_area[];
  getRl_modulo_areas!: Sequelize.HasManyGetAssociationsMixin<rl_modulo_area>;
  setRl_modulo_areas!: Sequelize.HasManySetAssociationsMixin<rl_modulo_area, rl_modulo_areaId>;
  addRl_modulo_area!: Sequelize.HasManyAddAssociationMixin<rl_modulo_area, rl_modulo_areaId>;
  addRl_modulo_areas!: Sequelize.HasManyAddAssociationsMixin<rl_modulo_area, rl_modulo_areaId>;
  createRl_modulo_area!: Sequelize.HasManyCreateAssociationMixin<rl_modulo_area>;
  removeRl_modulo_area!: Sequelize.HasManyRemoveAssociationMixin<rl_modulo_area, rl_modulo_areaId>;
  removeRl_modulo_areas!: Sequelize.HasManyRemoveAssociationsMixin<rl_modulo_area, rl_modulo_areaId>;
  hasRl_modulo_area!: Sequelize.HasManyHasAssociationMixin<rl_modulo_area, rl_modulo_areaId>;
  hasRl_modulo_areas!: Sequelize.HasManyHasAssociationsMixin<rl_modulo_area, rl_modulo_areaId>;
  countRl_modulo_areas!: Sequelize.HasManyCountAssociationsMixin;
  // ct_area belongsTo ct_departamento_sistema via ct_departamento_id
  ct_departamento!: ct_departamento_sistema;
  getCt_departamento!: Sequelize.BelongsToGetAssociationMixin<ct_departamento_sistema>;
  setCt_departamento!: Sequelize.BelongsToSetAssociationMixin<ct_departamento_sistema, ct_departamento_sistemaId>;
  createCt_departamento!: Sequelize.BelongsToCreateAssociationMixin<ct_departamento_sistema>;
  // ct_area belongsTo ct_usuario via ct_usuario_in
  ct_usuario_in_ct_usuario!: ct_usuario;
  getCt_usuario_in_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_in_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_in_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // ct_area belongsTo ct_usuario via ct_usuario_at
  ct_usuario_at_ct_usuario!: ct_usuario;
  getCt_usuario_at_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_at_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_at_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ct_area {
    return ct_area.init({
    id_area: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    indice: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    nombre_area: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ct_area_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      references: {
        model: 'ct_area',
        key: 'id_area'
      }
    },
    ct_departamento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'ct_departamento_sistema',
        key: 'id_departamento'
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    ct_usuario_in: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ct_usuario',
        key: 'id_usuario'
      }
    },
    ct_usuario_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ct_usuario',
        key: 'id_usuario'
      }
    }
  }, {
    sequelize,
    tableName: 'ct_area',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_area" },
        ]
      },
      {
        name: "fk_ct_area_superior",
        using: "BTREE",
        fields: [
          { name: "ct_area_id" },
        ]
      },
      {
        name: "fk_ct_area_departamento",
        using: "BTREE",
        fields: [
          { name: "ct_departamento_id" },
        ]
      },
      {
        name: "fk_ct_area_creado_por",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_in" },
        ]
      },
      {
        name: "fk_ct_area_actualizado_por",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_at" },
        ]
      },
    ]
  });
  }
}
