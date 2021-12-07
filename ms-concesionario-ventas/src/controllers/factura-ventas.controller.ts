import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Ventas,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaVentasController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/ventas', {
    responses: {
      '200': {
        description: 'Ventas belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ventas)},
          },
        },
      },
    },
  })
  async getVentas(
    @param.path.number('id') id: typeof Factura.prototype.id,
  ): Promise<Ventas> {
    return this.facturaRepository.pertenece_a(id);
  }
}
