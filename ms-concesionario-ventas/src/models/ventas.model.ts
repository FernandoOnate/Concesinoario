import {Entity, model, property, hasOne} from '@loopback/repository';
import {Factura} from './factura.model';

@model()
export class Ventas extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_vehiculo: number;

  @property({
    type: 'number',
    required: true,
  })
  id_vendedor: number;

  @property({
    type: 'number',
    required: true,
  })
  id_cliente: number;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @hasOne(() => Factura, {keyTo: 'id_venta'})
  tiene_factura: Factura;

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}

export interface VentasRelations {
  // describe navigational properties here
}

export type VentasWithRelations = Ventas & VentasRelations;
