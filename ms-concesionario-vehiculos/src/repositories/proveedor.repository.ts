import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  public readonly tiene_vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Proveedor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Proveedor, dataSource);
    this.tiene_vehiculos = this.createHasManyRepositoryFactoryFor('tiene_vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('tiene_vehiculos', this.tiene_vehiculos.inclusionResolver);
  }
}
