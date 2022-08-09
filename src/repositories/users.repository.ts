import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Users, UsersRelations, Mazo} from '../models';
import {MazoRepository} from './mazo.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly mazo: BelongsToAccessor<Mazo, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource, @repository.getter('MazoRepository') protected mazoRepositoryGetter: Getter<MazoRepository>,
  ) {
    super(Users, dataSource);
    this.mazo = this.createBelongsToAccessorFor('mazo', mazoRepositoryGetter,);
    this.registerInclusionResolver('mazo', this.mazo.inclusionResolver);
  }
}
