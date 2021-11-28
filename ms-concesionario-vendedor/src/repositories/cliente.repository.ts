import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Mysql1DataSource} from '../datasources';
import {Cliente, ClienteRelations, Vendedor} from '../models';
import {VendedorRepository} from './vendedor.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly creado_por: BelongsToAccessor<Vendedor, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql1') dataSource: Mysql1DataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>,
  ) {
    super(Cliente, dataSource);
    this.creado_por = this.createBelongsToAccessorFor('creado_por', vendedorRepositoryGetter,);
    this.registerInclusionResolver('creado_por', this.creado_por.inclusionResolver);
  }
}
