import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Foto, FotoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class FotoRepository extends DefaultCrudRepository<
  Foto,
  typeof Foto.prototype.id,
  FotoRelations
> {

  public readonly tiene_vehiculo: BelongsToAccessor<Vehiculo, typeof Foto.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Foto, dataSource);
    this.tiene_vehiculo = this.createBelongsToAccessorFor('tiene_vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('tiene_vehiculo', this.tiene_vehiculo.inclusionResolver);
  }
}
