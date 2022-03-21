import { Body, Controller, Inject, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreditAccountService } from './credit-account.service';
import { CreditAccountRequestDTO } from './request.dto';
import {
  BadRequestExceptionDTO,
  CreditAccountResponseDTO,
} from './response.dto';

@Controller('accounts')
export class CreditAccountController {
  constructor(
    @Inject(CreditAccountService)
    private readonly creditAccountService: CreditAccountService,
  ) {}

  @Put('/credit')
  @ApiOperation({ summary: 'Credit a account' })
  @ApiOkResponse({
    type: CreditAccountResponseDTO,
  })
  @ApiBadRequestResponse({
    type: BadRequestExceptionDTO,
  })
  async create(
    @Body() body: CreditAccountRequestDTO,
  ): Promise<CreditAccountResponseDTO> {
    const { id, value } = body;
    const accountEntity = await this.creditAccountService.creditAccount({
      accountIdToCredit: id,
      value,
    });
    return new CreditAccountResponseDTO(accountEntity);
  }
}
