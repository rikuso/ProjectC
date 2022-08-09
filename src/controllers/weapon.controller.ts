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
import {Weapon} from '../models';
import {WeaponRepository} from '../repositories';

export class WeaponController {
  constructor(
    @repository(WeaponRepository)
    public weaponRepository : WeaponRepository,
  ) {}

  @post('/weapons')
  @response(200, {
    description: 'Weapon model instance',
    content: {'application/json': {schema: getModelSchemaRef(Weapon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weapon, {
            title: 'NewWeapon',
            exclude: ['id'],
          }),
        },
      },
    })
    weapon: Omit<Weapon, 'id'>,
  ): Promise<Weapon> {
    return this.weaponRepository.create(weapon);
  }

  @get('/weapons/count')
  @response(200, {
    description: 'Weapon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Weapon) where?: Where<Weapon>,
  ): Promise<Count> {
    return this.weaponRepository.count(where);
  }

  @get('/weapons')
  @response(200, {
    description: 'Array of Weapon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Weapon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Weapon) filter?: Filter<Weapon>,
  ): Promise<Weapon[]> {
    return this.weaponRepository.find(filter);
  }

  @patch('/weapons')
  @response(200, {
    description: 'Weapon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weapon, {partial: true}),
        },
      },
    })
    weapon: Weapon,
    @param.where(Weapon) where?: Where<Weapon>,
  ): Promise<Count> {
    return this.weaponRepository.updateAll(weapon, where);
  }

  @get('/weapons/{id}')
  @response(200, {
    description: 'Weapon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Weapon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Weapon, {exclude: 'where'}) filter?: FilterExcludingWhere<Weapon>
  ): Promise<Weapon> {
    return this.weaponRepository.findById(id, filter);
  }

  @patch('/weapons/{id}')
  @response(204, {
    description: 'Weapon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weapon, {partial: true}),
        },
      },
    })
    weapon: Weapon,
  ): Promise<void> {
    await this.weaponRepository.updateById(id, weapon);
  }

  @put('/weapons/{id}')
  @response(204, {
    description: 'Weapon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() weapon: Weapon,
  ): Promise<void> {
    await this.weaponRepository.replaceById(id, weapon);
  }

  @del('/weapons/{id}')
  @response(204, {
    description: 'Weapon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.weaponRepository.deleteById(id);
  }
}
