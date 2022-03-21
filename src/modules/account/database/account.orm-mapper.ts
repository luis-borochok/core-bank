import { UUID } from 'src/domain/value-objects/unique-entity-id.vo';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/base-classes/orm-mapper.base';
import { Account, AccountProps } from '../domain/account.entity';
import { AccountBalance } from '../domain/values-objects/account-balance.vo';
import { AccountCpf } from '../domain/values-objects/account-cpf.vo';
import { AccountOrmEntity } from './account.orm-entity';

export class AccountOrmMapper extends OrmMapper<Account, AccountOrmEntity> {
  protected toOrmProps(entity: Account): OrmEntityProps<AccountOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<AccountOrmEntity> = {
      cpf: props.cpf.value,
      name: props.name,
      balance: props.balance.value,
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: AccountOrmEntity,
  ): EntityProps<AccountProps> {
    const id = new UUID(ormEntity.id);
    const props: AccountProps = {
      cpf: new AccountCpf({
        cpf: ormEntity.cpf,
      }),
      name: ormEntity.name,
      balance: new AccountBalance({ value: ormEntity.balance }),
    };
    return { id, props };
  }
}
