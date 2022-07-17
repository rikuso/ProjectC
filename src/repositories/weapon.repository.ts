import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Weapon, WeaponRelations} from '../models';

export class WeaponRepository extends DefaultCrudRepository<
  Weapon,
  typeof Weapon.prototype.id,
  WeaponRelations
> {
  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource,
  ) {
    super(Weapon, dataSource);
  }
}
