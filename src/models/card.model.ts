import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Ability} from './ability.model';
import {Powers} from './powers.model';

@model()
export class Card extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Ability)
  abilityId: string;

  @belongsTo(() => Powers)
  powersId: string;

  @hasMany(() => Powers, {keyTo: 'cardIdHasMany'})
  powersHasMany: Powers[];

  constructor(data?: Partial<Card>) {
    super(data);
  }
}

export interface CardRelations {
  // describe navigational properties here
}

export type CardWithRelations = Card & CardRelations;
