import { UUID } from 'src/domain/value-objects/unique-entity-id.vo';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/base-classes/orm-mapper.base';
import { Account, AccountProps } from '../../domain/account.entity';
import { AccountCpf } from '../../domain/values-objects/AccountCpf.vo';
import { AccountOrmEntity } from './account.orm-entity';

export class AccountOrmMapper extends OrmMapper<Account, AccountOrmEntity> {
  protected toOrmProps(entity: Account): OrmEntityProps<AccountOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<AccountOrmEntity> = {
      cpf: props.cpf.value,
      name: props.name,
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
    };
    return { id, props };
  }
}
