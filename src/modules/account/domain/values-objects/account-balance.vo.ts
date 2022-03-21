import { UnprocessableEntityException } from '@nestjs/common';
import { ValueObject } from 'src/domain/base-classes/value-object.base';
import { Guard } from 'src/domain/utils/guard';
import { ArgumentInvalidException } from 'src/exceptions/argument-invalid.exception';

interface AccountBalanceProps {
  value: number;
}

export class AccountBalance extends ValueObject<AccountBalanceProps> {
  get value(): number {
    return this.props.value;
  }

  protected validate(props: AccountBalanceProps): void {
    if (Guard.isEmpty(props.value))
      throw new ArgumentInvalidException('Value cannot be empty');

    if (props.value < 0) {
      throw new UnprocessableEntityException(
        `Account cannot keep with negative values`,
      );
    }
  }
}
