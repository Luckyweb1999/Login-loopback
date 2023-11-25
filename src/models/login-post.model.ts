import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class LoginPost extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  detalle: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LoginPost>) {
    super(data);
  }
}

export interface LoginPostRelations {
  // describe navigational properties here
}

export type LoginPostWithRelations = LoginPost & LoginPostRelations;
