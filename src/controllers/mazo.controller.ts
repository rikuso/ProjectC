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
import {Mazo} from '../models';
import {MazoRepository} from '../repositories';

export class MazoController {
  constructor(
    @repository(MazoRepository)
    public mazoRepository : MazoRepository,
  ) {}

  @post('/mazos')
  @response(200, {
    description: 'Mazo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mazo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mazo, {
            title: 'NewMazo',
            exclude: ['id'],
          }),
        },
      },
    })
    mazo: Omit<Mazo, 'id'>,
  ): Promise<Mazo> {
    return this.mazoRepository.create(mazo);
  }

  @get('/mazos/count')
  @response(200, {
    description: 'Mazo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mazo) where?: Where<Mazo>,
  ): Promise<Count> {
    return this.mazoRepository.count(where);
  }

  @get('/mazos')
  @response(200, {
    description: 'Array of Mazo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mazo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mazo) filter?: Filter<Mazo>,
  ): Promise<Mazo[]> {
    return this.mazoRepository.find(filter);
  }

  @patch('/mazos')
  @response(200, {
    description: 'Mazo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mazo, {partial: true}),
        },
      },
    })
    mazo: Mazo,
    @param.where(Mazo) where?: Where<Mazo>,
  ): Promise<Count> {
    return this.mazoRepository.updateAll(mazo, where);
  }

  @get('/mazos/{id}')
  @response(200, {
    description: 'Mazo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mazo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mazo, {exclude: 'where'}) filter?: FilterExcludingWhere<Mazo>
  ): Promise<Mazo> {
    return this.mazoRepository.findById(id, filter);
  }

  @patch('/mazos/{id}')
  @response(204, {
    description: 'Mazo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mazo, {partial: true}),
        },
      },
    })
    mazo: Mazo,
  ): Promise<void> {
    await this.mazoRepository.updateById(id, mazo);
  }

  @put('/mazos/{id}')
  @response(204, {
    description: 'Mazo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mazo: Mazo,
  ): Promise<void> {
    await this.mazoRepository.replaceById(id, mazo);
  }

  @del('/mazos/{id}')
  @response(204, {
    description: 'Mazo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mazoRepository.deleteById(id);
  }
}
