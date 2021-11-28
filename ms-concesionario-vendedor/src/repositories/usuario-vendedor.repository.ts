import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Mysql1DataSource} from '../datasources';
import {UsuarioVendedor, UsuarioVendedorRelations} from '../models';

export class UsuarioVendedorRepository extends DefaultCrudRepository<
  UsuarioVendedor,
  typeof UsuarioVendedor.prototype.id,
  UsuarioVendedorRelations
> {
  constructor(
    @inject('datasources.mysql1') dataSource: Mysql1DataSource,
  ) {
    super(UsuarioVendedor, dataSource);
  }
}
