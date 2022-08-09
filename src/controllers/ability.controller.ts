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
import {Ability} from '../models';
import {AbilityRepository} from '../repositories';

export class AbilityController {
  constructor(
    @repository(AbilityRepository)
    public abilityRepository : AbilityRepository,
  ) {}

  @post('/abilities')
  @response(200, {
    description: 'Ability model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ability)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ability, {
            title: 'NewAbility',
            exclude: ['id'],
          }),
        },
      },
    })
    ability: Omit<Ability, 'id'>,
  ): Promise<Ability> {
    return this.abilityRepository.create(ability);
  }

  @get('/abilities/count')
  @response(200, {
    description: 'Ability model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ability) where?: Where<Ability>,
  ): Promise<Count> {
    return this.abilityRepository.count(where);
  }

  @get('/abilities')
  @response(200, {
    description: 'Array of Ability model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ability, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ability) filter?: Filter<Ability>,
  ): Promise<Ability[]> {
    return this.abilityRepository.find(filter);
  }

  @patch('/abilities')
  @response(200, {
    description: 'Ability PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ability, {partial: true}),
        },
      },
    })
    ability: Ability,
    @param.where(Ability) where?: Where<Ability>,
  ): Promise<Count> {
    return this.abilityRepository.updateAll(ability, where);
  }

  @get('/abilities/{id}')
  @response(200, {
    description: 'Ability model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ability, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ability, {exclude: 'where'}) filter?: FilterExcludingWhere<Ability>
  ): Promise<Ability> {
    return this.abilityRepository.findById(id, filter);
  }

  @patch('/abilities/{id}')
  @response(204, {
    description: 'Ability PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ability, {partial: true}),
        },
      },
    })
    ability: Ability,
  ): Promise<void> {
    await this.abilityRepository.updateById(id, ability);
  }

  @put('/abilities/{id}')
  @response(204, {
    description: 'Ability PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ability: Ability,
  ): Promise<void> {
    await this.abilityRepository.replaceById(id, ability);
  }

  @del('/abilities/{id}')
  @response(204, {
    description: 'Ability DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.abilityRepository.deleteById(id);
  }
}
