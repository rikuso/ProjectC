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
import {Powers} from '../models';
import {PowersRepository} from '../repositories';

export class PowersController {
  constructor(
    @repository(PowersRepository)
    public powersRepository : PowersRepository,
  ) {}

  @post('/powers')
  @response(200, {
    description: 'Powers model instance',
    content: {'application/json': {schema: getModelSchemaRef(Powers)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Powers, {
            title: 'NewPowers',
            exclude: ['id'],
          }),
        },
      },
    })
    powers: Omit<Powers, 'id'>,
  ): Promise<Powers> {
    return this.powersRepository.create(powers);
  }

  @get('/powers/count')
  @response(200, {
    description: 'Powers model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Powers) where?: Where<Powers>,
  ): Promise<Count> {
    return this.powersRepository.count(where);
  }

  @get('/powers')
  @response(200, {
    description: 'Array of Powers model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Powers, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Powers) filter?: Filter<Powers>,
  ): Promise<Powers[]> {
    return this.powersRepository.find(filter);
  }

  @patch('/powers')
  @response(200, {
    description: 'Powers PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Powers, {partial: true}),
        },
      },
    })
    powers: Powers,
    @param.where(Powers) where?: Where<Powers>,
  ): Promise<Count> {
    return this.powersRepository.updateAll(powers, where);
  }

  @get('/powers/{id}')
  @response(200, {
    description: 'Powers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Powers, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Powers, {exclude: 'where'}) filter?: FilterExcludingWhere<Powers>
  ): Promise<Powers> {
    return this.powersRepository.findById(id, filter);
  }

  @patch('/powers/{id}')
  @response(204, {
    description: 'Powers PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Powers, {partial: true}),
        },
      },
    })
    powers: Powers,
  ): Promise<void> {
    await this.powersRepository.updateById(id, powers);
  }

  @put('/powers/{id}')
  @response(204, {
    description: 'Powers PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() powers: Powers,
  ): Promise<void> {
    await this.powersRepository.replaceById(id, powers);
  }

  @del('/powers/{id}')
  @response(204, {
    description: 'Powers DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.powersRepository.deleteById(id);
  }
}
