import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Marca, Categoria, CategoriaVehiculo, Foto, Proveedor} from '../models';
import {MarcaRepository} from './marca.repository';
import {CategoriaVehiculoRepository} from './categoria-vehiculo.repository';
import {CategoriaRepository} from './categoria.repository';
import {FotoRepository} from './foto.repository';
import {ProveedorRepository} from './proveedor.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly tiene_marca: BelongsToAccessor<Marca, typeof Vehiculo.prototype.id>;

  public readonly tiene_categorias: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          CategoriaVehiculo,
          typeof Vehiculo.prototype.id
        >;

  public readonly tiene_fotos: HasManyRepositoryFactory<Foto, typeof Vehiculo.prototype.id>;

  public readonly tiene_proveedor: BelongsToAccessor<Proveedor, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>, @repository.getter('CategoriaVehiculoRepository') protected categoriaVehiculoRepositoryGetter: Getter<CategoriaVehiculoRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('FotoRepository') protected fotoRepositoryGetter: Getter<FotoRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.tiene_proveedor = this.createBelongsToAccessorFor('tiene_proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('tiene_proveedor', this.tiene_proveedor.inclusionResolver);
    this.tiene_fotos = this.createHasManyRepositoryFactoryFor('tiene_fotos', fotoRepositoryGetter,);
    this.registerInclusionResolver('tiene_fotos', this.tiene_fotos.inclusionResolver);
    this.tiene_categorias = this.createHasManyThroughRepositoryFactoryFor('tiene_categorias', categoriaRepositoryGetter, categoriaVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tiene_categorias', this.tiene_categorias.inclusionResolver);
    this.tiene_marca = this.createBelongsToAccessorFor('tiene_marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('tiene_marca', this.tiene_marca.inclusionResolver);
  }
}
