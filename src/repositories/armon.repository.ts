import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Armon, ArmonRelations} from '../models';

export class ArmonRepository extends DefaultCrudRepository<
  Armon,
  typeof Armon.prototype.id,
  ArmonRelations
> {
  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource,
  ) {
    super(Armon, dataSource);
  }
}
