import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ct_consumible_factura, ct_consumible_facturaId } from './ct_consumible_factura';
import type { ct_partida, ct_partidaId } from './ct_partida';
import type { ct_unidad_medida, ct_unidad_medidaId } from './ct_unidad_medida';

export interface dt_consumible_inventarioAttributes {
  id_inventario: number;
  folio: string;
  descripcion?: string;
  cantidad: number;
  resta: number;
  ct_partida_id: number;
  ct_unidad_id: number;
  ct_factura_id: number;
  fecha_in: Date;
  fecha_at: Date;
}

export type dt_consumible_inventarioPk = "id_inventario";
export type dt_consumible_inventarioId = dt_consumible_inventario[dt_consumible_inventarioPk];
export type dt_consumible_inventarioOptionalAttributes = "id_inventario" | "descripcion" | "cantidad" | "resta" | "fecha_in" | "fecha_at";
export type dt_consumible_inventarioCreationAttributes = Optional<dt_consumible_inventarioAttributes, dt_consumible_inventarioOptionalAttributes>;

export class dt_consumible_inventario extends Model<dt_consumible_inventarioAttributes, dt_consumible_inventarioCreationAttributes> implements dt_consumible_inventarioAttributes {
  id_inventario!: number;
  folio!: string;
  descripcion?: string;
  cantidad!: number;
  resta!: number;
  ct_partida_id!: number;
  ct_unidad_id!: number;
  ct_factura_id!: number;
  fecha_in!: Date;
  fecha_at!: Date;

  // dt_consumible_inventario belongsTo ct_consumible_factura via ct_factura_id
  ct_factura!: ct_consumible_factura;
  getCt_factura!: Sequelize.BelongsToGetAssociationMixin<ct_consumible_factura>;
  setCt_factura!: Sequelize.BelongsToSetAssociationMixin<ct_consumible_factura, ct_consumible_facturaId>;
  createCt_factura!: Sequelize.BelongsToCreateAssociationMixin<ct_consumible_factura>;
  // dt_consumible_inventario belongsTo ct_partida via ct_partida_id
  ct_partida!: ct_partida;
  getCt_partida!: Sequelize.BelongsToGetAssociationMixin<ct_partida>;
  setCt_partida!: Sequelize.BelongsToSetAssociationMixin<ct_partida, ct_partidaId>;
  createCt_partida!: Sequelize.BelongsToCreateAssociationMixin<ct_partida>;
  // dt_consumible_inventario belongsTo ct_unidad_medida via ct_unidad_id
  ct_unidad!: ct_unidad_medida;
  getCt_unidad!: Sequelize.BelongsToGetAssociationMixin<ct_unidad_medida>;
  setCt_unidad!: Sequelize.BelongsToSetAssociationMixin<ct_unidad_medida, ct_unidad_medidaId>;
  createCt_unidad!: Sequelize.BelongsToCreateAssociationMixin<ct_unidad_medida>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dt_consumible_inventario {
    return dt_consumible_inventario.init({
    id_inventario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    folio: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "folio"
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    resta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ct_partida_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ct_partida',
        key: 'id_partida'
      }
    },
    ct_unidad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ct_unidad_medida',
        key: 'id_unidad'
      }
    },
    ct_factura_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ct_consumible_factura',
        key: 'id_factura'
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
    tableName: 'dt_consumible_inventario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_inventario" },
        ]
      },
      {
        name: "folio",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "folio" },
        ]
      },
      {
        name: "ct_partida_id",
        using: "BTREE",
        fields: [
          { name: "ct_partida_id" },
        ]
      },
      {
        name: "ct_unidad_id",
        using: "BTREE",
        fields: [
          { name: "ct_unidad_id" },
        ]
      },
      {
        name: "ct_factura_id",
        using: "BTREE",
        fields: [
          { name: "ct_factura_id" },
        ]
      },
    ]
  });
  }
}
