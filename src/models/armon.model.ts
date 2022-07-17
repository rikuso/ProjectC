import {Entity, model, property} from '@loopback/repository';

@model()
export class Armon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  img?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  defens: number;

  @property({
    type: 'string',
    required: true,
  })
  style: string;

  @property({
    type: 'string',
  })
  head_part?: string;

  @property({
    type: 'string',
  })
  chest_part?: string;

  @property({
    type: 'string',
  })
  party_boots?: string;


  constructor(data?: Partial<Armon>) {
    super(data);
  }
}

export interface ArmonRelations {
  // describe navigational properties here
}

export type ArmonWithRelations = Armon & ArmonRelations;
