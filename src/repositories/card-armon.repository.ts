import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {CardArmon, CardArmonRelations} from '../models';

export class CardArmonRepository extends DefaultCrudRepository<
  CardArmon,
  typeof CardArmon.prototype.id,
  CardArmonRelations
> {
  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource,
  ) {
    super(CardArmon, dataSource);
  }
}
