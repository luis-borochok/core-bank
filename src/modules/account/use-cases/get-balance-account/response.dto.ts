import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../domain/account.entity';

export class GetAccountBalanceResponseDTO {
  constructor(account: Account) {
    this.balance = account.balance.value;
  }
  @ApiProperty({
    example: 200,
  })
  balance: number;
}
