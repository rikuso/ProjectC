import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProjectCDataSource} from '../datasources';
import {Mazo, MazoRelations} from '../models';

export class MazoRepository extends DefaultCrudRepository<
  Mazo,
  typeof Mazo.prototype.id,
  MazoRelations
> {
  constructor(
    @inject('datasources.ProjectC') dataSource: ProjectCDataSource,
  ) {
    super(Mazo, dataSource);
  }
}
