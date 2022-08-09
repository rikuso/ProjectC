import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Class,
  Type,
} from '../models';
import {ClassRepository} from '../repositories';

export class ClassTypeController {
  constructor(
    @repository(ClassRepository)
    public classRepository: ClassRepository,
  ) { }

  @get('/classes/{id}/type', {
    responses: {
      '200': {
        description: 'Type belonging to Class',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Type)},
          },
        },
      },
    },
  })
  async getType(
    @param.path.string('id') id: typeof Class.prototype.id,
  ): Promise<Type> {
    return this.classRepository.type(id);
  }
}
