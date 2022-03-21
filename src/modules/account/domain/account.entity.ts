import { AggregateRoot } from 'src/domain/base-classes/aggregate-root.base';
import { ID } from 'src/domain/value-objects/identifier.vo';
import { UUID } from 'src/domain/value-objects/unique-entity-id.vo';
import { AccountBalance } from './values-objects/account-balance.vo';
import { AccountCpf } from './values-objects/account-cpf.vo';

export interface CreateAccountProps {
  cpf: AccountCpf;
  name: string;
}

export interface AccountProps extends CreateAccountProps {
  balance: AccountBalance;
}

export class Account extends AggregateRoot<AccountProps> {
  protected _id: ID;

  public static create(createProps: CreateAccountProps): Account {
    const id: ID = UUID.generate();
    const account = new Account({
      props: { ...createProps, balance: new AccountBalance({ value: 0 }) },
      id,
    });

    return account;
  }

  public get balance(): AccountBalance {
    return this.props.balance;
  }

  credit(value: number): void {
    this.props.balance = new AccountBalance({
      value: this.balance.value + value,
    });
    // add event to save operation as a history to account
  }

  debit(value: number): void {
    this.props.balance = new AccountBalance({
      value: this.props.balance.value - value,
    });
    // add event to save operation as a history to account
  }

  public validate(): void {
    // validate fields
  }
}
