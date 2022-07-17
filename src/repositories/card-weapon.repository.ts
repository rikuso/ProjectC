import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {CardWeapon, CardWeaponRelations} from '../models';

export class CardWeaponRepository extends DefaultCrudRepository<
  CardWeapon,
  typeof CardWeapon.prototype.id,
  CardWeaponRelations
> {
  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource,
  ) {
    super(CardWeapon, dataSource);
  }
}
