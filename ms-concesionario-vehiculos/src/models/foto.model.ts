import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model({
  settings: {
    foreignKeys: {
      fk_foto_id_vehiculo: {
        name: 'fk_foto_id_vehiculo',
        entity: 'Vehiculo',
        entityKey: 'id',
        foreignKey: 'id_vehiculo',
      },
    },
  },
})

export class Foto extends Entity {
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
  nombre: string;

  @belongsTo(() => Vehiculo, {name: 'tiene_vehiculo'})
  id_vehiculo: number;

  constructor(data?: Partial<Foto>) {
    super(data);
  }
}

export interface FotoRelations {
  // describe navigational properties here
}

export type FotoWithRelations = Foto & FotoRelations;
