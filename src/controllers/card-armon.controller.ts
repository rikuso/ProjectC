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
import {CardArmon} from '../models';
import {CardArmonRepository} from '../repositories';

export class CardArmonController {
  constructor(
    @repository(CardArmonRepository)
    public cardArmonRepository : CardArmonRepository,
  ) {}

  @post('/card-armons')
  @response(200, {
    description: 'CardArmon model instance',
    content: {'application/json': {schema: getModelSchemaRef(CardArmon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardArmon, {
            title: 'NewCardArmon',
            exclude: ['id'],
          }),
        },
      },
    })
    cardArmon: Omit<CardArmon, 'id'>,
  ): Promise<CardArmon> {
    return this.cardArmonRepository.create(cardArmon);
  }

  @get('/card-armons/count')
  @response(200, {
    description: 'CardArmon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CardArmon) where?: Where<CardArmon>,
  ): Promise<Count> {
    return this.cardArmonRepository.count(where);
  }

  @get('/card-armons')
  @response(200, {
    description: 'Array of CardArmon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CardArmon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CardArmon) filter?: Filter<CardArmon>,
  ): Promise<CardArmon[]> {
    return this.cardArmonRepository.find(filter);
  }

  @patch('/card-armons')
  @response(200, {
    description: 'CardArmon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardArmon, {partial: true}),
        },
      },
    })
    cardArmon: CardArmon,
    @param.where(CardArmon) where?: Where<CardArmon>,
  ): Promise<Count> {
    return this.cardArmonRepository.updateAll(cardArmon, where);
  }

  @get('/card-armons/{id}')
  @response(200, {
    description: 'CardArmon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CardArmon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CardArmon, {exclude: 'where'}) filter?: FilterExcludingWhere<CardArmon>
  ): Promise<CardArmon> {
    return this.cardArmonRepository.findById(id, filter);
  }

  @patch('/card-armons/{id}')
  @response(204, {
    description: 'CardArmon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardArmon, {partial: true}),
        },
      },
    })
    cardArmon: CardArmon,
  ): Promise<void> {
    await this.cardArmonRepository.updateById(id, cardArmon);
  }

  @put('/card-armons/{id}')
  @response(204, {
    description: 'CardArmon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cardArmon: CardArmon,
  ): Promise<void> {
    await this.cardArmonRepository.replaceById(id, cardArmon);
  }

  @del('/card-armons/{id}')
  @response(204, {
    description: 'CardArmon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cardArmonRepository.deleteById(id);
  }
}
