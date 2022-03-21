import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '../../database/account.repository';
import { AccountRepositoryPort } from '../../database/account.repository-port';
import { Account } from '../../domain/account.entity';

export interface GetAccountProps {
  accountId: string;
}

@Injectable()
export class GetAccountService {
  constructor(
    @Inject(AccountRepository)
    private accountRepo: AccountRepositoryPort,
  ) {}
  async getAccount(props: GetAccountProps): Promise<Account> {
    const { accountId } = props;

    const account = await this.accountRepo.findOneByIdOrThrow(accountId);

    return account;
  }
}
