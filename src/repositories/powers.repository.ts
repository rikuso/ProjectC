import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Powers, PowersRelations} from '../models';

export class PowersRepository extends DefaultCrudRepository<
  Powers,
  typeof Powers.prototype.id,
  PowersRelations
> {
  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource,
  ) {
    super(Powers, dataSource);
  }
}
