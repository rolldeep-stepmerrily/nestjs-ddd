import { UniqueEntityID } from './unique-entity-id';

const isEntity = (v: any): v is EntityClass<any> => {
  return v instanceof EntityClass;
};

export abstract class EntityClass<T> {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: EntityClass<T>): boolean {
    if (!object) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}

export function Entity<T extends { new (...args: any[]): any }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
    }
  };
}
