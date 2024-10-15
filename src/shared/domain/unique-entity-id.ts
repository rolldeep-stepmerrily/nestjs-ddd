import { v7 as uuidv7 } from 'uuid';
import { Identifier } from './identifier';

export class UniqueEntityID extends Identifier<string | number | undefined> {
  constructor(id?: string | number) {
    super(id ? id : uuidv7());
  }
}
