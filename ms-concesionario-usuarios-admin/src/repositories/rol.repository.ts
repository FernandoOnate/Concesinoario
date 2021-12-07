import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype._id,
  RolRelations
> {

  public readonly esta_asociado_a: HasManyRepositoryFactory<Usuario, typeof Rol.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.esta_asociado_a = this.createHasManyRepositoryFactoryFor('esta_asociado_a', usuarioRepositoryGetter,);
    this.registerInclusionResolver('esta_asociado_a', this.esta_asociado_a.inclusionResolver);
  }
}
