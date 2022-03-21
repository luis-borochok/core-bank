import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class CreditAccountRequestDTO {
  @ApiProperty({
    title: 'Account to credit',
    type: 'string',
    example: '547546bb-ff50-4996-a263-6dc735e8dcab',
  })
  @IsUUID('4')
  readonly id: string;

  @ApiProperty({
    title: 'Value to credit on account',
    type: 'number',
    example: 2000,
  })
  @IsNumber()
  readonly value: number;
}
