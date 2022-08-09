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
  Ability,
} from '../models';
import {CardRepository} from '../repositories';

export class CardAbilityController {
  constructor(
    @repository(CardRepository)
    public cardRepository: CardRepository,
  ) { }

  @get('/cards/{id}/ability', {
    responses: {
      '200': {
        description: 'Ability belonging to Card',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ability)},
          },
        },
      },
    },
  })
  async getAbility(
    @param.path.string('id') id: typeof Card.prototype.id,
  ): Promise<Ability> {
    return this.cardRepository.ability(id);
  }
}
