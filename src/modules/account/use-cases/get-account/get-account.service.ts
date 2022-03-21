import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../database/account.repository';
import { Account } from '../../domain/account.entity';

export interface GetAccountProps {
  accountId: string;
}

@Injectable()
export class GetAccountService {
  constructor(private accountRepo: AccountRepository) {}
  async getAccount(props: GetAccountProps): Promise<Account> {
    const { accountId } = props;

    const account = await this.accountRepo.findOneByIdOrThrow(accountId);

    return account;
  }
}
