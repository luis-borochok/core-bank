import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetAccountBalanceRequestDTO {
  @ApiProperty({
    title: 'Account to credit',
    type: 'string',
    example: '547546bb-ff50-4996-a263-6dc735e8dcab',
  })
  @IsUUID('4')
  id: string;
}
