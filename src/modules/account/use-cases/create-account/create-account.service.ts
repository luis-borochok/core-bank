import { Injectable } from '@nestjs/common';
import { Account } from '../../domain/account.entity';
import { AccountCpf } from '../../domain/values-objects/AccountCpf.vo';

export interface CreateAccountProps {
  cpf: string;
  name: string;
}

@Injectable()
export class CreateAccountService {
  async createAccount(props: CreateAccountProps): Promise<Account> {
    const { cpf, name } = props;
    const acc: Account = Account.create({
      cpf: new AccountCpf({ cpf }),
      name: name,
    });

    return acc;
  }
}
