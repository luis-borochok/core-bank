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
