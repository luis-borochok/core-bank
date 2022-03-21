import { ConflictException, Injectable } from '@nestjs/common';
import { AccountRepository } from '../../database/account.repository';
import { Account } from '../../domain/account.entity';
import { AccountCpf } from '../../domain/values-objects/account-cpf.vo';

export interface CreateAccountProps {
  cpf: string;
  name: string;
}

@Injectable()
export class CreateAccountService {
  constructor(private accountRepo: AccountRepository) {}
  async createAccount(props: CreateAccountProps): Promise<Account> {
    const { cpf, name } = props;

    const exists = await this.accountRepo.exists(cpf);

    if (exists) {
      throw new ConflictException({
        message: `Account with CPF '${cpf}' already exists`,
      });
    }

    const acc: Account = Account.create({
      cpf: new AccountCpf({ cpf }),
      name: name,
    });

    await this.accountRepo.save(acc);

    return acc;
  }
}
