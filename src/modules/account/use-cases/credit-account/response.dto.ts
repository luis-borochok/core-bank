import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../domain/account.entity';

export class CreditAccountResponseDTO {
  constructor(account: Account) {
    this.balance = account.balance.value;
  }
  @ApiProperty({
    title: 'New account balance',
    type: 'number',
    example: 2039.3,
  })
  balance: number;
}

export class BadRequestExceptionDTO {
  constructor(account: Account) {
    this.message = account.id.value;
  }
  @ApiProperty({
    type: 'string',
    example: `Account with ID '547546bb-ff50-4996-a263-6dc735e8dcab' not found`,
  })
  message: string;

  @ApiProperty({
    type: 'number',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    example: 'Bad Request',
  })
  error: string;
}
