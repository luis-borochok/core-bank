import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '../../database/account.repository';
import { AccountRepositoryPort } from '../../database/account.repository-port';
import { Account } from '../../domain/account.entity';

export interface DebitAccountProps {
  accountIdToDebit: string;
  value: number;
}

@Injectable()
export class DebitAccountService {
  constructor(
    @Inject(AccountRepository) private accountRepo: AccountRepositoryPort,
  ) {}
  async debitAccount(props: DebitAccountProps): Promise<Account> {
    const { value, accountIdToDebit } = props;

    const accountToDebit = await this.accountRepo.findOneByIdOrThrow(
      accountIdToDebit,
    );

    accountToDebit.debit(value);

    await this.accountRepo.save(accountToDebit);

    return accountToDebit;
  }
}
