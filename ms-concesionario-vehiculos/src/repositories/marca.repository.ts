import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Marca, MarcaRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype.id,
  MarcaRelations
> {

  public readonly tiene_vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Marca.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Marca, dataSource);
    this.tiene_vehiculos = this.createHasManyRepositoryFactoryFor('tiene_vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('tiene_vehiculos', this.tiene_vehiculos.inclusionResolver);
  }
}
