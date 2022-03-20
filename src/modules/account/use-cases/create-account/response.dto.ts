import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../domain/account.entity';

export class CreateAccountResponseDTO {
  constructor(account: Account) {
    this.id = account.id.value;
  }
  @ApiProperty({
    title: 'ID from created account',
    type: 'string',
    example: '3535b138-77d9-413c-98d0-ea29e33f1252',
  })
  id: string;
}
export class ConflictAccountExceptionDTO {
  constructor(account: Account) {
    this.message = account.id.value;
  }
  @ApiProperty({
    type: 'string',
    example: `Account with CPF '811.433.200-00' already exists`,
  })
  message: string;
}
export class BadRequestExceptionDTO {
  constructor(account: Account) {
    this.message = account.id.value;
  }
  @ApiProperty({
    type: 'string',
    examples: [`CPF has a incorrect format`],
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
