import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Class, ClassRelations, Type} from '../models';
import {TypeRepository} from './type.repository';

export class ClassRepository extends DefaultCrudRepository<
  Class,
  typeof Class.prototype.id,
  ClassRelations
> {

  public readonly type: BelongsToAccessor<Type, typeof Class.prototype.id>;

  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource, @repository.getter('TypeRepository') protected typeRepositoryGetter: Getter<TypeRepository>,
  ) {
    super(Class, dataSource);
    this.type = this.createBelongsToAccessorFor('type', typeRepositoryGetter,);
    this.registerInclusionResolver('type', this.type.inclusionResolver);
  }
}
