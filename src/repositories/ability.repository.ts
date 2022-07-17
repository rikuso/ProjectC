import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Ability, AbilityRelations} from '../models';

export class AbilityRepository extends DefaultCrudRepository<
  Ability,
  typeof Ability.prototype.id,
  AbilityRelations
> {
  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource,
  ) {
    super(Ability, dataSource);
  }
}
