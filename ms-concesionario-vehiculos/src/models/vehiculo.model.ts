import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Marca} from './marca.model';
import {Categoria} from './categoria.model';
import {CategoriaVehiculo} from './categoria-vehiculo.model';
import {Foto} from './foto.model';
import {Proveedor} from './proveedor.model';

@model({
  settings: {
    foreignKeys: {
      fk_vehiculo_id_proveedor: {
        name: 'fk_vehiculo_id_proveedor',
        entity: 'Proveedor',
        entityKey: 'id',
        foreignKey: 'id_proveedor',
      },
      fk_vehiculo_id_marca: {
        name: 'fk_vehiculo_marca',
        entity: 'Marca',
        entityKey: 'id',
        foreignKey: 'id_marca',
      },
    },
  },
})
export class Vehiculo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  serie_chasis: string;

  @property({
    type: 'string',
    required: true,
  })
  serie_motor: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  descuento: number;

  @property({
    type: 'boolean',
    required: true,
  })
  existencia: boolean;

  @belongsTo(() => Marca, {name: 'tiene_marca'})
  id_marca: number;

  @hasMany(() => Categoria, {through: {model: () => CategoriaVehiculo, keyFrom: 'id_vehiculo', keyTo: 'id_categoria'}})
  tiene_categorias: Categoria[];

  @hasMany(() => Foto, {keyTo: 'id_vehiculo'})
  tiene_fotos: Foto[];

  @belongsTo(() => Proveedor, {name: 'tiene_proveedor'})
  id_proveedor: number;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
