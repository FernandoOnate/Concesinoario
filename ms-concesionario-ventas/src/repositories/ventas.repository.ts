import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ventas, VentasRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id,
  VentasRelations
> {

  public readonly tiene_factura: HasOneRepositoryFactory<Factura, typeof Ventas.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Ventas, dataSource);
    this.tiene_factura = this.createHasOneRepositoryFactoryFor('tiene_factura', facturaRepositoryGetter);
    this.registerInclusionResolver('tiene_factura', this.tiene_factura.inclusionResolver);
  }
}
