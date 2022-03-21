import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateAccountService } from './create-account.service';
import { CreateAccountRequestDTO } from './request.dto';
import {
  BadRequestExceptionDTO,
  ConflictAccountExceptionDTO,
  CreateAccountResponseDTO,
} from './response.dto';

@Controller('accounts')
export class CreateAccountController {
  constructor(
    @Inject(CreateAccountService)
    private readonly createAccountService: CreateAccountService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a account' })
  @ApiCreatedResponse({
    type: CreateAccountResponseDTO,
  })
  @ApiConflictResponse({
    type: ConflictAccountExceptionDTO,
  })
  @ApiBadRequestResponse({
    type: BadRequestExceptionDTO,
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
