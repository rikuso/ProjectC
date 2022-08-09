import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Mazo, MazoRelations, CardWeapon, CardArmon, Card, Class} from '../models';
import {CardWeaponRepository} from './card-weapon.repository';
import {CardArmonRepository} from './card-armon.repository';
import {CardRepository} from './card.repository';
import {ClassRepository} from './class.repository';

export class MazoRepository extends DefaultCrudRepository<
  Mazo,
  typeof Mazo.prototype.id,
  MazoRelations
> {

  public readonly cardWeapon: BelongsToAccessor<CardWeapon, typeof Mazo.prototype.id>;

  public readonly cardArmon: BelongsToAccessor<CardArmon, typeof Mazo.prototype.id>;

  public readonly card: BelongsToAccessor<Card, typeof Mazo.prototype.id>;

  public readonly class: BelongsToAccessor<Class, typeof Mazo.prototype.id>;

  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource, @repository.getter('CardWeaponRepository') protected cardWeaponRepositoryGetter: Getter<CardWeaponRepository>, @repository.getter('CardArmonRepository') protected cardArmonRepositoryGetter: Getter<CardArmonRepository>, @repository.getter('CardRepository') protected cardRepositoryGetter: Getter<CardRepository>, @repository.getter('ClassRepository') protected classRepositoryGetter: Getter<ClassRepository>,
  ) {
    super(Mazo, dataSource);
    this.class = this.createBelongsToAccessorFor('class', classRepositoryGetter,);
    this.registerInclusionResolver('class', this.class.inclusionResolver);
    this.card = this.createBelongsToAccessorFor('card', cardRepositoryGetter,);
    this.registerInclusionResolver('card', this.card.inclusionResolver);
    this.cardArmon = this.createBelongsToAccessorFor('cardArmon', cardArmonRepositoryGetter,);
    this.registerInclusionResolver('cardArmon', this.cardArmon.inclusionResolver);
    this.cardWeapon = this.createBelongsToAccessorFor('cardWeapon', cardWeaponRepositoryGetter,);
    this.registerInclusionResolver('cardWeapon', this.cardWeapon.inclusionResolver);
  }
}
