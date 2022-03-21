import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class MovementAccountRequestDTO {
  @ApiProperty({
    title: 'Account to debit',
    type: 'string',
    example: '547546bb-ff50-4996-a263-6dc735e8dcab',
  })
  @IsUUID('4')
  readonly creditAccountId: string;

  @ApiProperty({
    title: 'Account to credit',
    type: 'string',
    example: '78cf0da8-eedd-400c-9c7a-1bd4d98d7e34',
  })
  @IsUUID('4')
  readonly debitAccountId: string;

  @ApiProperty({
    title: 'Value to movement on accounts',
    type: 'number',
    example: 2000,
  })
  @IsNumber()
  readonly value: number;
}
