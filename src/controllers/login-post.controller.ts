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
import {LoginPost} from '../models';
import {LoginPostRepository} from '../repositories';

export class LoginPostController {
  constructor(
    @repository(LoginPostRepository)
    public loginPostRepository : LoginPostRepository,
  ) {}

  @post('/login-posts')
  @response(200, {
    description: 'LoginPost model instance',
    content: {'application/json': {schema: getModelSchemaRef(LoginPost)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LoginPost, {
            title: 'NewLoginPost',
            exclude: ['id'],
          }),
        },
      },
    })
    loginPost: Omit<LoginPost, 'id'>,
  ): Promise<LoginPost> {
    return this.loginPostRepository.create(loginPost);
  }

  @get('/login-posts/count')
  @response(200, {
    description: 'LoginPost model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LoginPost) where?: Where<LoginPost>,
  ): Promise<Count> {
    return this.loginPostRepository.count(where);
  }

  @get('/login-posts')
  @response(200, {
    description: 'Array of LoginPost model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LoginPost, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LoginPost) filter?: Filter<LoginPost>,
  ): Promise<LoginPost[]> {
    return this.loginPostRepository.find(filter);
  }

  @patch('/login-posts')
  @response(200, {
    description: 'LoginPost PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LoginPost, {partial: true}),
        },
      },
    })
    loginPost: LoginPost,
    @param.where(LoginPost) where?: Where<LoginPost>,
  ): Promise<Count> {
    return this.loginPostRepository.updateAll(loginPost, where);
  }

  @get('/login-posts/{id}')
  @response(200, {
    description: 'LoginPost model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LoginPost, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LoginPost, {exclude: 'where'}) filter?: FilterExcludingWhere<LoginPost>
  ): Promise<LoginPost> {
    return this.loginPostRepository.findById(id, filter);
  }

  @patch('/login-posts/{id}')
  @response(204, {
    description: 'LoginPost PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LoginPost, {partial: true}),
        },
      },
    })
    loginPost: LoginPost,
  ): Promise<void> {
    await this.loginPostRepository.updateById(id, loginPost);
  }

  @put('/login-posts/{id}')
  @response(204, {
    description: 'LoginPost PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() loginPost: LoginPost,
  ): Promise<void> {
    await this.loginPostRepository.replaceById(id, loginPost);
  }

  @del('/login-posts/{id}')
  @response(204, {
    description: 'LoginPost DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.loginPostRepository.deleteById(id);
  }
}
