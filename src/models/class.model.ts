import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Type} from './type.model';

@model()
export class Class extends Entity {
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
    type: 'number',
    default: 1500,
  })
  help?: number;

  @belongsTo(() => Type)
  typeId: string;

  constructor(data?: Partial<Class>) {
    super(data);
  }
}

export interface ClassRelations {
  // describe navigational properties here
}

export type ClassWithRelations = Class & ClassRelations;
