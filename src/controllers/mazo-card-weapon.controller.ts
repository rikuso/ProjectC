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
  CardWeapon,
} from '../models';
import {MazoRepository} from '../repositories';

export class MazoCardWeaponController {
  constructor(
    @repository(MazoRepository)
    public mazoRepository: MazoRepository,
  ) { }

  @get('/mazos/{id}/card-weapon', {
    responses: {
      '200': {
        description: 'CardWeapon belonging to Mazo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CardWeapon)},
          },
        },
      },
    },
  })
  async getCardWeapon(
    @param.path.string('id') id: typeof Mazo.prototype.id,
  ): Promise<CardWeapon> {
    return this.mazoRepository.cardWeapon(id);
  }
}
