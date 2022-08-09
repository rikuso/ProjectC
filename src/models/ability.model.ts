import {Entity, model, property} from '@loopback/repository';

@model()
export class Ability extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    default: '',
  })
  img?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  ability: string;

  constructor(data?: Partial<Ability>) {
    super(data);
  }
}

export interface AbilityRelations {
  // describe navigational properties here
}

export type AbilityWithRelations = Ability & AbilityRelations;
