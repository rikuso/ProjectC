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
import {Armon} from '../models';
import {ArmonRepository} from '../repositories';

export class ArmonController {
  constructor(
    @repository(ArmonRepository)
    public armonRepository : ArmonRepository,
  ) {}

  @post('/armons')
  @response(200, {
    description: 'Armon model instance',
    content: {'application/json': {schema: getModelSchemaRef(Armon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Armon, {
            title: 'NewArmon',
            exclude: ['id'],
          }),
        },
      },
    })
    armon: Omit<Armon, 'id'>,
  ): Promise<Armon> {
    return this.armonRepository.create(armon);
  }

  @get('/armons/count')
  @response(200, {
    description: 'Armon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Armon) where?: Where<Armon>,
  ): Promise<Count> {
    return this.armonRepository.count(where);
  }

  @get('/armons')
  @response(200, {
    description: 'Array of Armon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Armon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Armon) filter?: Filter<Armon>,
  ): Promise<Armon[]> {
    return this.armonRepository.find(filter);
  }

  @patch('/armons')
  @response(200, {
    description: 'Armon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Armon, {partial: true}),
        },
      },
    })
    armon: Armon,
    @param.where(Armon) where?: Where<Armon>,
  ): Promise<Count> {
    return this.armonRepository.updateAll(armon, where);
  }

  @get('/armons/{id}')
  @response(200, {
    description: 'Armon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Armon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Armon, {exclude: 'where'}) filter?: FilterExcludingWhere<Armon>
  ): Promise<Armon> {
    return this.armonRepository.findById(id, filter);
  }

  @patch('/armons/{id}')
  @response(204, {
    description: 'Armon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Armon, {partial: true}),
        },
      },
    })
    armon: Armon,
  ): Promise<void> {
    await this.armonRepository.updateById(id, armon);
  }

  @put('/armons/{id}')
  @response(204, {
    description: 'Armon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() armon: Armon,
  ): Promise<void> {
    await this.armonRepository.replaceById(id, armon);
  }

  @del('/armons/{id}')
  @response(204, {
    description: 'Armon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.armonRepository.deleteById(id);
  }
}
