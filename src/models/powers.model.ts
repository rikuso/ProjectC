import {Entity, model, property} from '@loopback/repository';

@model()
export class Powers extends Entity {
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
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  powers: number;

  @property({
    type: 'string',
  })
  cardIdHasMany?: string;

  constructor(data?: Partial<Powers>) {
    super(data);
  }
}

export interface PowersRelations {
  // describe navigational properties here
}

export type PowersWithRelations = Powers & PowersRelations;
