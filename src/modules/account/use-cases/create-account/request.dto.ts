import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateAccountRequestDTO {
  @ApiProperty({
    title: 'CPF from account manager',
    type: 'string',
    example: '180.362.020-00',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
    {
      message: 'CPF has a incorrect format',
    },
  )
  readonly cpf: string;

  @ApiProperty({
    title: 'Name of account manager',
    type: 'string',
    example: 'Josh Hildenberg',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
