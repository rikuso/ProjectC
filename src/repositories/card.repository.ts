import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Card, CardRelations, Ability, Powers} from '../models';
import {AbilityRepository} from './ability.repository';
import {PowersRepository} from './powers.repository';

export class CardRepository extends DefaultCrudRepository<
  Card,
  typeof Card.prototype.id,
  CardRelations
> {

  public readonly ability: BelongsToAccessor<Ability, typeof Card.prototype.id>;

  public readonly powers: BelongsToAccessor<Powers, typeof Card.prototype.id>;

  public readonly powersHasMany: HasManyRepositoryFactory<Powers, typeof Card.prototype.id>;

  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource, @repository.getter('AbilityRepository') protected abilityRepositoryGetter: Getter<AbilityRepository>, @repository.getter('PowersRepository') protected powersRepositoryGetter: Getter<PowersRepository>,
  ) {
    super(Card, dataSource);
    this.powersHasMany = this.createHasManyRepositoryFactoryFor('powersHasMany', powersRepositoryGetter,);
    this.registerInclusionResolver('powersHasMany', this.powersHasMany.inclusionResolver);
    this.powers = this.createBelongsToAccessorFor('powers', powersRepositoryGetter,);
    this.registerInclusionResolver('powers', this.powers.inclusionResolver);
    this.ability = this.createBelongsToAccessorFor('ability', abilityRepositoryGetter,);
    this.registerInclusionResolver('ability', this.ability.inclusionResolver);
  }
}
