import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAccountService } from './create-account.service';
import { CreateAccountRequestDTO } from './request.dto';
import { CreateAccountResponseDTO } from './response.dto';

export type responseId = {
  id: string;
};

@Controller('accounts')
export class CreateAccountController {
  constructor(private readonly createAccountService: CreateAccountService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a account' })
  @ApiCreatedResponse({
    type: CreateAccountResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(
    @Body() body: CreateAccountRequestDTO,
  ): Promise<CreateAccountResponseDTO> {
    const { cpf, name } = body;
    const accountEntity = await this.createAccountService.createAccount({
      cpf,
      name,
    });
    return new CreateAccountResponseDTO(accountEntity);
  }
}
