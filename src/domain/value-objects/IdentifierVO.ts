import { DomainPrimitive, ValueObject } from '../base-classes/ValueObject.base';

export abstract class ID extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  public get value(): string {
    return this.props.value;
  }

  protected abstract validate({ value }: DomainPrimitive<string>): void;
}
