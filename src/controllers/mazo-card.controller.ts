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
  Card,
} from '../models';
import {MazoRepository} from '../repositories';

export class MazoCardController {
  constructor(
    @repository(MazoRepository)
    public mazoRepository: MazoRepository,
  ) { }

  @get('/mazos/{id}/card', {
    responses: {
      '200': {
        description: 'Card belonging to Mazo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Card)},
          },
        },
      },
    },
  })
  async getCard(
    @param.path.string('id') id: typeof Mazo.prototype.id,
  ): Promise<Card> {
    return this.mazoRepository.card(id);
  }
}
