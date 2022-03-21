import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetAccountBalanceRequestDTO {
  @ApiProperty({})
  @IsUUID('4')
  id: string;
}
