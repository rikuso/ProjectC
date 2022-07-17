import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Type, TypeRelations} from '../models';

export class TypeRepository extends DefaultCrudRepository<
  Type,
  typeof Type.prototype.id,
  TypeRelations
> {
  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource,
  ) {
    super(Type, dataSource);
  }
}
