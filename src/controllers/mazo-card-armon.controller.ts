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
  CardArmon,
} from '../models';
import {MazoRepository} from '../repositories';

export class MazoCardArmonController {
  constructor(
    @repository(MazoRepository)
    public mazoRepository: MazoRepository,
  ) { }

  @get('/mazos/{id}/card-armon', {
    responses: {
      '200': {
        description: 'CardArmon belonging to Mazo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CardArmon)},
          },
        },
      },
    },
  })
  async getCardArmon(
    @param.path.string('id') id: typeof Mazo.prototype.id,
  ): Promise<CardArmon> {
    return this.mazoRepository.cardArmon(id);
  }
}
