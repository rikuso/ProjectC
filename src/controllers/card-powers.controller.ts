import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Card,
  Powers,
} from '../models';
import {CardRepository} from '../repositories';

export class CardPowersController {
  constructor(
    @repository(CardRepository)
    public cardRepository: CardRepository,
  ) { }

  @get('/cards/{id}/powers', {
    responses: {
      '200': {
        description: 'Powers belonging to Card',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Powers)},
          },
        },
      },
    },
  })
  async getPowers(
    @param.path.string('id') id: typeof Card.prototype.id,
  ): Promise<Powers> {
    return this.cardRepository.powers(id);
  }
}
