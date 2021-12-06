import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_cat_veh_id_vehiculo: {
        name: 'fk_cat_veh_id_vehiculo',
        entity: 'Vehiculo',
        entityKey: 'id',
        foreignKey: 'id_vehiculo',
      },
      fk_cat_veh_id_categoria: {
        name: 'fk_cat_veh_id_categoria',
        entity: 'Categoria',
        entityKey: 'id',
        foreignKey: 'id_categoria',
      },
    },
  },
})
export class CategoriaVehiculo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_vehiculo?: number;

  @property({
    type: 'number',
  })
  id_categoria?: number;

  constructor(data?: Partial<CategoriaVehiculo>) {
    super(data);
  }
}

export interface CategoriaVehiculoRelations {
  // describe navigational properties here
}

export type CategoriaVehiculoWithRelations = CategoriaVehiculo & CategoriaVehiculoRelations;
