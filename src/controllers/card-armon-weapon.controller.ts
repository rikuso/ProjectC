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
  Weapon,
} from '../models';
import {CardArmonRepository} from '../repositories';

export class CardArmonWeaponController {
  constructor(
    @repository(CardArmonRepository)
    public cardArmonRepository: CardArmonRepository,
  ) { }

  @get('/card-armons/{id}/weapon', {
    responses: {
      '200': {
        description: 'Weapon belonging to CardArmon',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Weapon)},
          },
        },
      },
    },
  })
  async getWeapon(
    @param.path.string('id') id: typeof CardArmon.prototype.id,
  ): Promise<Weapon> {
    return this.cardArmonRepository.weapon(id);
  }
}
