import { Account } from '../../domain/account.entity';

export class GetAccountBalanceResponseDTO {
  constructor(account: Account) {
    this.value = account.balance.value;
  }

  value: number;
}
