import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Class, ClassRelations} from '../models';

export class ClassRepository extends DefaultCrudRepository<
  Class,
  typeof Class.prototype.id,
  ClassRelations
> {
  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource,
  ) {
    super(Class, dataSource);
  }
}
