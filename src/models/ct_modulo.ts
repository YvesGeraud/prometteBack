import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ct_funcion, ct_funcionId } from './ct_funcion';
import type { ct_usuario, ct_usuarioId } from './ct_usuario';
import type { rl_modulo_area, rl_modulo_areaId } from './rl_modulo_area';

export interface ct_moduloAttributes {
  id_modulo: number;
  nombre_modulo: string;
  modulo_padre?: number;
  clave?: string;
  icono?: string;
  estado: number;
  ct_usuario_in: number;
  ct_usuario_at?: number;
  fecha_in: Date;
  fecha_at: Date;
}

export type ct_moduloPk = "id_modulo";
export type ct_moduloId = ct_modulo[ct_moduloPk];
export type ct_moduloOptionalAttributes = "id_modulo" | "modulo_padre" | "clave" | "icono" | "estado" | "ct_usuario_at" | "fecha_in" | "fecha_at";
export type ct_moduloCreationAttributes = Optional<ct_moduloAttributes, ct_moduloOptionalAttributes>;

export class ct_modulo extends Model<ct_moduloAttributes, ct_moduloCreationAttributes> implements ct_moduloAttributes {
  id_modulo!: number;
  nombre_modulo!: string;
  modulo_padre?: number;
  clave?: string;
  icono?: string;
  estado!: number;
  ct_usuario_in!: number;
  ct_usuario_at?: number;
  fecha_in!: Date;
  fecha_at!: Date;

  // ct_modulo hasMany ct_funcion via ct_modulo_id
  ct_funcions!: ct_funcion[];
  getCt_funcions!: Sequelize.HasManyGetAssociationsMixin<ct_funcion>;
  setCt_funcions!: Sequelize.HasManySetAssociationsMixin<ct_funcion, ct_funcionId>;
  addCt_funcion!: Sequelize.HasManyAddAssociationMixin<ct_funcion, ct_funcionId>;
  addCt_funcions!: Sequelize.HasManyAddAssociationsMixin<ct_funcion, ct_funcionId>;
  createCt_funcion!: Sequelize.HasManyCreateAssociationMixin<ct_funcion>;
  removeCt_funcion!: Sequelize.HasManyRemoveAssociationMixin<ct_funcion, ct_funcionId>;
  removeCt_funcions!: Sequelize.HasManyRemoveAssociationsMixin<ct_funcion, ct_funcionId>;
  hasCt_funcion!: Sequelize.HasManyHasAssociationMixin<ct_funcion, ct_funcionId>;
  hasCt_funcions!: Sequelize.HasManyHasAssociationsMixin<ct_funcion, ct_funcionId>;
  countCt_funcions!: Sequelize.HasManyCountAssociationsMixin;
  // ct_modulo hasMany rl_modulo_area via ct_modulo_id
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
  // ct_modulo belongsTo ct_usuario via ct_usuario_in
  ct_usuario_in_ct_usuario!: ct_usuario;
  getCt_usuario_in_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_in_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_in_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // ct_modulo belongsTo ct_usuario via ct_usuario_at
  ct_usuario_at_ct_usuario!: ct_usuario;
  getCt_usuario_at_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_at_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_at_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ct_modulo {
    return ct_modulo.init({
    id_modulo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_modulo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    modulo_padre: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    clave: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    icono: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
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
    },
    fecha_in: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    fecha_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'ct_modulo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_modulo" },
        ]
      },
      {
        name: "fk_ct_modulo_creado_por",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_in" },
        ]
      },
      {
        name: "fk_ct_modulo_actualizado_por",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_at" },
        ]
      },
    ]
  });
  }
}
