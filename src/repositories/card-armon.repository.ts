import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {CardArmon, CardArmonRelations, Weapon, Armon} from '../models';
import {WeaponRepository} from './weapon.repository';
import {ArmonRepository} from './armon.repository';

export class CardArmonRepository extends DefaultCrudRepository<
  CardArmon,
  typeof CardArmon.prototype.id,
  CardArmonRelations
> {

  public readonly weapon: BelongsToAccessor<Weapon, typeof CardArmon.prototype.id>;

  public readonly armon: BelongsToAccessor<Armon, typeof CardArmon.prototype.id>;

  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource, @repository.getter('WeaponRepository') protected weaponRepositoryGetter: Getter<WeaponRepository>, @repository.getter('ArmonRepository') protected armonRepositoryGetter: Getter<ArmonRepository>,
  ) {
    super(CardArmon, dataSource);
    this.armon = this.createBelongsToAccessorFor('armon', armonRepositoryGetter,);
    this.registerInclusionResolver('armon', this.armon.inclusionResolver);
    this.weapon = this.createBelongsToAccessorFor('weapon', weaponRepositoryGetter,);
    this.registerInclusionResolver('weapon', this.weapon.inclusionResolver);
  }
}
