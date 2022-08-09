import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CardWeapon} from '../models';
import {CardWeaponRepository} from '../repositories';

export class CardWeaponController {
  constructor(
    @repository(CardWeaponRepository)
    public cardWeaponRepository : CardWeaponRepository,
  ) {}

  @post('/card-weapons')
  @response(200, {
    description: 'CardWeapon model instance',
    content: {'application/json': {schema: getModelSchemaRef(CardWeapon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardWeapon, {
            title: 'NewCardWeapon',
            exclude: ['id'],
          }),
        },
      },
    })
    cardWeapon: Omit<CardWeapon, 'id'>,
  ): Promise<CardWeapon> {
    return this.cardWeaponRepository.create(cardWeapon);
  }

  @get('/card-weapons/count')
  @response(200, {
    description: 'CardWeapon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CardWeapon) where?: Where<CardWeapon>,
  ): Promise<Count> {
    return this.cardWeaponRepository.count(where);
  }

  @get('/card-weapons')
  @response(200, {
    description: 'Array of CardWeapon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CardWeapon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CardWeapon) filter?: Filter<CardWeapon>,
  ): Promise<CardWeapon[]> {
    return this.cardWeaponRepository.find(filter);
  }

  @patch('/card-weapons')
  @response(200, {
    description: 'CardWeapon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardWeapon, {partial: true}),
        },
      },
    })
    cardWeapon: CardWeapon,
    @param.where(CardWeapon) where?: Where<CardWeapon>,
  ): Promise<Count> {
    return this.cardWeaponRepository.updateAll(cardWeapon, where);
  }

  @get('/card-weapons/{id}')
  @response(200, {
    description: 'CardWeapon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CardWeapon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CardWeapon, {exclude: 'where'}) filter?: FilterExcludingWhere<CardWeapon>
  ): Promise<CardWeapon> {
    return this.cardWeaponRepository.findById(id, filter);
  }

  @patch('/card-weapons/{id}')
  @response(204, {
    description: 'CardWeapon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardWeapon, {partial: true}),
        },
      },
    })
    cardWeapon: CardWeapon,
  ): Promise<void> {
    await this.cardWeaponRepository.updateById(id, cardWeapon);
  }

  @put('/card-weapons/{id}')
  @response(204, {
    description: 'CardWeapon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cardWeapon: CardWeapon,
  ): Promise<void> {
    await this.cardWeaponRepository.replaceById(id, cardWeapon);
  }

  @del('/card-weapons/{id}')
  @response(204, {
    description: 'CardWeapon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cardWeaponRepository.deleteById(id);
  }
}
