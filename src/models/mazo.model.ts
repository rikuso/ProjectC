import {Entity, model, property, belongsTo} from '@loopback/repository';
import {CardWeapon} from './card-weapon.model';
import {CardArmon} from './card-armon.model';
import {Card} from './card.model';
import {Class} from './class.model';

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

  @belongsTo(() => CardWeapon)
  cardWeaponId: string;

  @belongsTo(() => CardArmon)
  cardArmonId: string;

  @belongsTo(() => Card)
  cardId: string;

  @belongsTo(() => Class)
  classId: string;

  constructor(data?: Partial<Mazo>) {
    super(data);
  }
}

export interface MazoRelations {
  // describe navigational properties here
}

export type MazoWithRelations = Mazo & MazoRelations;
