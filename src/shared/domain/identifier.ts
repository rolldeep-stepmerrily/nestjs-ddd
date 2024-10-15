export class Identifier<T> {
  constructor(private readonly value: T) {
    this.value = value;
  }

  equals(id?: Identifier<T>): boolean {
    if (!id) {
      return false;
    }

    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.toValue() === this.value;
  }

  toString() {
    return String(this.value);
  }

  toValue(): T {
    return this.value;
  }
}
