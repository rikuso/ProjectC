import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Users,
  Mazo,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersMazoController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/mazo', {
    responses: {
      '200': {
        description: 'Mazo belonging to Users',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mazo)},
          },
        },
      },
    },
  })
  async getMazo(
    @param.path.string('id') id: typeof Users.prototype.id,
  ): Promise<Mazo> {
    return this.usersRepository.mazo(id);
  }
}
