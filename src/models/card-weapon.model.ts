import {Entity, model, property} from '@loopback/repository';

@model()
export class CardWeapon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<CardWeapon>) {
    super(data);
  }
}

export interface CardWeaponRelations {
  // describe navigational properties here
}

export type CardWeaponWithRelations = CardWeapon & CardWeaponRelations;
