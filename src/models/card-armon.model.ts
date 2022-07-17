import {Entity, model, property} from '@loopback/repository';

@model()
export class CardArmon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<CardArmon>) {
    super(data);
  }
}

export interface CardArmonRelations {
  // describe navigational properties here
}

export type CardArmonWithRelations = CardArmon & CardArmonRelations;
