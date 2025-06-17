import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ct_modulo, ct_moduloId } from './ct_modulo';
import type { ct_usuario, ct_usuarioId } from './ct_usuario';

export interface ct_funcionAttributes {
  id_funcion: number;
  ct_modulo_id?: number;
  nombre_funcion: string;
  descripcion?: string;
  estado: number;
  ct_usuario_in: number;
  ct_usuario_at?: number;
  fecha_in?: Date;
  fecha_at?: Date;
}

export type ct_funcionPk = "id_funcion";
export type ct_funcionId = ct_funcion[ct_funcionPk];
export type ct_funcionOptionalAttributes = "id_funcion" | "ct_modulo_id" | "descripcion" | "estado" | "ct_usuario_at" | "fecha_in" | "fecha_at";
export type ct_funcionCreationAttributes = Optional<ct_funcionAttributes, ct_funcionOptionalAttributes>;

export class ct_funcion extends Model<ct_funcionAttributes, ct_funcionCreationAttributes> implements ct_funcionAttributes {
  id_funcion!: number;
  ct_modulo_id?: number;
  nombre_funcion!: string;
  descripcion?: string;
  estado!: number;
  ct_usuario_in!: number;
  ct_usuario_at?: number;
  fecha_in?: Date;
  fecha_at?: Date;

  // ct_funcion belongsTo ct_modulo via ct_modulo_id
  ct_modulo!: ct_modulo;
  getCt_modulo!: Sequelize.BelongsToGetAssociationMixin<ct_modulo>;
  setCt_modulo!: Sequelize.BelongsToSetAssociationMixin<ct_modulo, ct_moduloId>;
  createCt_modulo!: Sequelize.BelongsToCreateAssociationMixin<ct_modulo>;
  // ct_funcion belongsTo ct_usuario via ct_usuario_in
  ct_usuario_in_ct_usuario!: ct_usuario;
  getCt_usuario_in_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_in_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_in_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // ct_funcion belongsTo ct_usuario via ct_usuario_at
  ct_usuario_at_ct_usuario!: ct_usuario;
  getCt_usuario_at_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_at_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_at_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ct_funcion {
    return ct_funcion.init({
    id_funcion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ct_modulo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ct_modulo',
        key: 'id_modulo'
      }
    },
    nombre_funcion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
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
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    fecha_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ct_funcion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_funcion" },
        ]
      },
      {
        name: "fk_dt_funcion_ct_modulo",
        using: "BTREE",
        fields: [
          { name: "ct_modulo_id" },
        ]
      },
      {
        name: "fk_dt_funcion_creado_por",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_in" },
        ]
      },
      {
        name: "fk_dt_funcion_actualizado_por",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_at" },
        ]
      },
    ]
  });
  }
}
