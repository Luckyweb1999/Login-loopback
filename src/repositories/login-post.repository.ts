import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgreSqlDataSource} from '../datasources';
import {LoginPost, LoginPostRelations} from '../models';

export class LoginPostRepository extends DefaultCrudRepository<
  LoginPost,
  typeof LoginPost.prototype.id,
  LoginPostRelations
> {
  constructor(
    @inject('datasources.PostgreSQL') dataSource: PostgreSqlDataSource,
  ) {
    super(LoginPost, dataSource);
  }
}
