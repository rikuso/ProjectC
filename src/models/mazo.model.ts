import {Entity, model, property} from '@loopback/repository';

@model()
export class Mazo extends Entity {
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
    type: 'boolean',
    default: true,
  })
  active?: boolean;


  constructor(data?: Partial<Mazo>) {
    super(data);
  }
}

export interface MazoRelations {
  // describe navigational properties here
}

export type MazoWithRelations = Mazo & MazoRelations;
