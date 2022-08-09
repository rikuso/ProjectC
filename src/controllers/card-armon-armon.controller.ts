import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CardArmon,
  Armon,
} from '../models';
import {CardArmonRepository} from '../repositories';

export class CardArmonArmonController {
  constructor(
    @repository(CardArmonRepository)
    public cardArmonRepository: CardArmonRepository,
  ) { }

  @get('/card-armons/{id}/armon', {
    responses: {
      '200': {
        description: 'Armon belonging to CardArmon',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Armon)},
          },
        },
      },
    },
  })
  async getArmon(
    @param.path.string('id') id: typeof CardArmon.prototype.id,
  ): Promise<Armon> {
    return this.cardArmonRepository.armon(id);
  }
}
