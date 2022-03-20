import { AggregateRoot } from 'src/domain/base-classes/aggregate-root.base';
import { ID } from 'src/domain/value-objects/identifier.vo';
import { UUID } from 'src/domain/value-objects/unique-entity-id.vo';
import { AccountCpf } from './values-objects/AccountCpf.vo';

export interface CreateAccountProps {
  cpf: AccountCpf;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AccountProps extends CreateAccountProps {}

export class Account extends AggregateRoot<AccountProps> {
  protected _id: ID;

  public static create(props: AccountProps): Account {
    const id: ID = UUID.generate();
    const account = new Account({
      props,
      id,
    });

    return account;
  }

  public validate(): void {
    // validate fields
  }
}
