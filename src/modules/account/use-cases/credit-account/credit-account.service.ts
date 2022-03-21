import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '../../database/account.repository';
import { AccountRepositoryPort } from '../../database/account.repository-port';
import { Account } from '../../domain/account.entity';

export interface CreditAccountProps {
  accountIdToCredit: string;
  value: number;
}

@Injectable()
export class CreditAccountService {
  constructor(
    @Inject(AccountRepository) private accountRepo: AccountRepositoryPort,
  ) {}
  async creditAccount(props: CreditAccountProps): Promise<Account> {
    const { value, accountIdToCredit } = props;

    const accountToCredit = await this.accountRepo.findOneByIdOrThrow(
      accountIdToCredit,
    );

    accountToCredit.credit(value);

    await this.accountRepo.save(accountToCredit);

    return accountToCredit;
  }
}
