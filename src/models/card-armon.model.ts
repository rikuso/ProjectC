import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Weapon} from './weapon.model';
import {Armon} from './armon.model';

@model()
export class CardArmon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Weapon)
  weaponId: string;

  @belongsTo(() => Armon)
  armonId: string;

  constructor(data?: Partial<CardArmon>) {
    super(data);
  }
}

export interface CardArmonRelations {
  // describe navigational properties here
}

export type CardArmonWithRelations = CardArmon & CardArmonRelations;
