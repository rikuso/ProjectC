import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mazo,
  Class,
} from '../models';
import {MazoRepository} from '../repositories';

export class MazoClassController {
  constructor(
    @repository(MazoRepository)
    public mazoRepository: MazoRepository,
  ) { }

  @get('/mazos/{id}/class', {
    responses: {
      '200': {
        description: 'Class belonging to Mazo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Class)},
          },
        },
      },
    },
  })
  async getClass(
    @param.path.string('id') id: typeof Mazo.prototype.id,
  ): Promise<Class> {
    return this.mazoRepository.class(id);
  }
}
